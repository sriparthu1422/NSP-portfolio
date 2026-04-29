import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import Button from '../../components/common/Button';

const socials = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:admin@sriparthu.com', label: 'Email' },
];

const Typewriter = ({ text, speed = 80, delay = 0, className = "", onComplete }) => {
  const [displayedText, setDisplayText] = React.useState('');
  const started = React.useRef(false);
  
  React.useEffect(() => {
    if (started.current) return;
    
    const timeout = setTimeout(() => {
      started.current = true;
      let i = 0;
      const interval = setInterval(() => {
        setDisplayText(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          if (onComplete) onComplete();
        }
      }, speed);
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [text, speed, delay, onComplete]);
  
  return <span className={className}>{displayedText}</span>;
};

const TextCycler = ({ phrases, speed = 80, waitTime = 2000, className = "" }) => {
  const [index, setIndex] = React.useState(0);
  const [displayText, setDisplayText] = React.useState('');
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    let timer;
    const currentPhrase = phrases[index];
    
    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayText(currentPhrase.slice(0, displayText.length - 1));
      }, speed / 2);
    } else {
      timer = setTimeout(() => {
        setDisplayText(currentPhrase.slice(0, displayText.length + 1));
      }, speed);
    }

    if (!isDeleting && displayText === currentPhrase) {
      timer = setTimeout(() => setIsDeleting(true), waitTime);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % phrases.length);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, index, phrases, speed, waitTime]);

  return <span className={className}>{displayText}<span className="animate-pulse ml-0.5 border-r-2 border-accent-orange">&nbsp;</span></span>;
};

const HeroSection = () => {
  const heroRef = useRef();
  const bgRef = useRef();
  const [startName, setStartName] = React.useState(false);
  const [startParagraph, setStartParagraph] = React.useState(false);
  const [showExtras, setShowExtras] = React.useState(false);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 1.2 } });

    tl.to('.hero-badge', { opacity: 1, y: 0, duration: 0.8 }, 0.2)
      .to('.hero-title-init', { opacity: 1, y: 0, duration: 0.8, onComplete: () => setStartName(true) }, 0.4);

    // Subtle parallax on the dot background
    gsap.to(bgRef.current, {
      yPercent: 10,
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, { scope: heroRef });

  return (
    <section ref={heroRef} className="min-h-[85vh] md:min-h-[80vh] flex items-center justify-center pt-12 md:pt-20 relative">
      {/* Parallax dots */}
      <div
        ref={bgRef}
        className="absolute top-0 left-0 w-full h-[120vh] -z-10 opacity-30 dark:opacity-20 pointer-events-none hero-dot-bg"
      />

      <div className="text-center relative z-10 px-4">
        <div className="hero-badge mb-5 md:mb-6 inline-block px-4 py-1.5 rounded-full glass text-accent-orange font-medium text-xs md:text-sm border-white/40 opacity-0 translate-y-4">
          Available for new opportunities
        </div>

        <h1 className="hero-title-init opacity-0 translate-y-4 text-hero font-display font-black tracking-tight mb-5 md:mb-6 min-h-[1.2em]">
          <Typewriter text="Hi, I'm " onComplete={() => setStartName(true)} />
          {startName && <Typewriter text="Sri Parthu" className="text-accent-orange" onComplete={() => setStartParagraph(true)} />}
        </h1>

        <p className="text-base md:text-xl lg:text-2xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto mb-8 md:mb-10 leading-relaxed font-light min-h-[4em] md:min-h-[3em]">
          {startParagraph && (
            <Typewriter 
              text="I build scalable, high-performance web applications using modern technologies, with hands-on expertise in " 
              speed={40}
              onComplete={() => setShowExtras(true)}
            />
          )}
          {showExtras && (
            <TextCycler 
              phrases={["GenAI.", "Full Stack Developer.", "DevOps."]} 
              className="text-accent-orange font-semibold"
            />
          )}
        </p>

        <div className={`transition-all duration-1000 ${showExtras ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4`}>
          <Button as="a" href="#projects" size="lg" icon={ArrowRight} className="w-full sm:w-auto">
            View Work
          </Button>
          <Button as="a" href="#contact" variant="secondary" size="lg" className="w-full sm:w-auto">
            Contact Me
          </Button>
        </div>

        <div className={`transition-all duration-1000 delay-300 ${showExtras ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} mt-12 md:mt-16 flex items-center justify-center gap-6 md:gap-8 text-slate-400`}>
          {socials.map(({ icon: Icon, href, label }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" className="p-2 hover:text-accent-orange transition-all hover:-translate-y-1" aria-label={label}>
              <Icon size={22} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

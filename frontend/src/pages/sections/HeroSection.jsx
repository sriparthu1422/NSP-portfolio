import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);
import { ArrowRight, Github, Linkedin, Mail, CheckCircle2 } from 'lucide-react';
import Button from '../../components/common/Button';

const socials = [
  { icon: Github, href: 'https://github.com/sriparthu1422', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/sriparthu-nallabelli-881744400/', label: 'LinkedIn' },
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

const HeroSection = () => {
  const heroRef = useRef();
  const bgRef = useRef();
  const [startName, setStartName] = React.useState(false);
  const [startParagraph, setStartParagraph] = React.useState(false);

  const [introComplete, setIntroComplete] = React.useState(() => {
    return window.nsp_intro_complete === true;
  });

  React.useEffect(() => {
    if (window.nsp_intro_complete) {
      setIntroComplete(true);
      return;
    }
    const handleIntroComplete = () => setIntroComplete(true);
    window.addEventListener('nsp_intro_complete', handleIntroComplete);
    return () => window.removeEventListener('nsp_intro_complete', handleIntroComplete);
  }, []);

  // SEO Observer for Home
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        document.title = "SriParthu | Full Stack Developer, React Developer & AI Solutions Expert";
        document.querySelector('meta[name="description"]')?.setAttribute("content", "SriParthu is a Full Stack Developer specializing in React.js, Next.js, Node.js, SEO, Digital Marketing, and AI-powered web solutions. Building fast, scalable, and modern websites.");
      }
    }, { threshold: 0.3 });
    
    if (heroRef.current) observer.observe(heroRef.current);
    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current);
    };
  }, []);

  useGSAP(() => {
    if (!introComplete) return;

    const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 1.2 } });

    tl.to('.hero-badge', { opacity: 1, y: 0, duration: 0.8 }, 0.2)
      .to('.hero-title-init', { opacity: 1, y: 0, duration: 0.8, onComplete: () => setStartName(true) }, 0.4);

    gsap.to(bgRef.current, {
      yPercent: 10,
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, { scope: heroRef, dependencies: [introComplete] });

  return (
    <section ref={heroRef} className="min-h-[85vh] flex flex-col items-center justify-start pt-2 md:pt-8 relative pb-16">
      <div
        ref={bgRef}
        className="absolute top-0 left-0 w-full h-[120vh] -z-10 opacity-30 dark:opacity-20 pointer-events-none hero-dot-bg"
      />

      <div className="text-center relative z-10 px-4 w-full max-w-6xl mx-auto">
        <div className="hero-badge mb-5 md:mb-6 inline-block px-4 py-1.5 rounded-full glass text-accent-orange font-medium text-xs md:text-sm border-white/40 opacity-0 translate-y-4">
          SriParthu – Full Stack Developer & Digital Solutions Expert
        </div>

        <h1 className="hero-title-init opacity-0 translate-y-4 text-4xl md:text-6xl lg:text-7xl font-display font-black tracking-tight mb-5 md:mb-8 min-h-[1.2em]">
          {introComplete && <Typewriter text="Build Fast, Modern & " onComplete={() => setStartName(true)} />}
          <br className="hidden md:block" />
          {introComplete && startName && <Typewriter text="Scalable Digital Experiences" className="text-accent-orange" onComplete={() => setStartParagraph(true)} />}
        </h1>

        <div className={`transition-all duration-1000 ${startParagraph ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} text-base md:text-xl lg:text-2xl text-slate-500 dark:text-slate-400 max-w-4xl mx-auto mb-8 md:mb-12 leading-relaxed font-light`}>
          <p className="mb-4">
            Hi, I'm SriParthu, a passionate Full Stack Developer specializing in modern web development, responsive website design, performance marketing, and AI-powered solutions.
          </p>
          <p className="text-sm md:text-lg">
            I help startups, businesses, and entrepreneurs transform their ideas into high-performing digital products. From stunning frontend interfaces to powerful backend systems, I create websites and applications that are fast, secure, scalable, and optimized for user engagement.
          </p>
        </div>

        <div className={`transition-all duration-1000 delay-300 ${startParagraph ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4`}>
          <Button as="a" href="#projects" size="lg" icon={ArrowRight} className="w-full sm:w-auto">
            View Work
          </Button>
          <Button as="a" href="#contact" variant="secondary" size="lg" className="w-full sm:w-auto">
            Contact Me
          </Button>
        </div>

        <div className={`transition-all duration-1000 delay-500 ${startParagraph ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} mt-10 md:mt-12 flex items-center justify-center gap-6 md:gap-8 text-slate-400`}>
          {socials.map(({ icon: Icon, href, label }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" className="p-2 hover:text-accent-orange transition-all hover:-translate-y-1" aria-label={label}>
              <Icon size={22} />
            </a>
          ))}
        </div>

        {/* Extended Home Content */}
        <div className={`transition-all duration-1000 delay-700 ${startParagraph ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} mt-24 md:mt-32 text-left grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16`}>
          <div className="glass p-8 md:p-10 rounded-3xl border-white/10">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-slate-800 dark:text-slate-200">What I Do</h2>
            <ul className="space-y-4">
              {[
                "Full Stack Web Development", "React.js & Next.js Development", "Node.js Backend Development", 
                "REST API Integration", "Responsive Website Design", "Performance Optimization", 
                "Search Engine Optimization (SEO)", "Digital Marketing Solutions", "AI & Automation Integration"
              ].map(item => (
                <li key={item} className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                  <CheckCircle2 className="text-accent-orange mt-1 flex-shrink-0" size={20} />
                  <span className="text-base md:text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-10 md:space-y-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-5 text-slate-800 dark:text-slate-200">Why Work With Me?</h2>
              <div className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed space-y-4">
                <p>I combine technical expertise with business-focused thinking to deliver solutions that not only look great but also generate results. Every project is built with performance, scalability, and user experience in mind.</p>
                <p>Whether you need a business website, portfolio, landing page, web application, or AI-powered solution, I can help bring your vision to life.</p>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-5 text-slate-800 dark:text-slate-200">Technologies I Work With</h2>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {[
                  "React.js", "Next.js", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap", 
                  "Node.js", "Express.js", "MongoDB", "Git", "GitHub", "Docker", "REST APIs", 
                  "AI Tools", "Automation Platforms"
                ].map(tech => (
                  <span key={tech} className="px-4 py-2 text-sm md:text-base glass rounded-xl text-slate-700 dark:text-slate-300 border-white/10 font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={`transition-all duration-1000 delay-1000 ${startParagraph ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} mt-20 md:mt-24 glass p-10 md:p-16 rounded-[2rem] relative overflow-hidden border-orange-500/20`}>
          <div className="absolute inset-0 bg-gradient-to-br from-accent-orange/10 to-transparent"></div>
          <div className="relative z-10 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800 dark:text-slate-200">Let's Build Something Amazing</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto mb-8">
              Ready to create a powerful online presence? Let's work together to develop modern digital solutions that help your business grow.
            </p>
            <Button as="a" href="#contact" size="lg" icon={ArrowRight}>
              Let's Connect
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

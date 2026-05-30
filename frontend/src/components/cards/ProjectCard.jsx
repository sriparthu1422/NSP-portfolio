import React, { useRef } from 'react';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const ProjectCard = ({ project }) => {
  const { title, description, techStack, liveLink, githubLink, image } = project;
  const cardRef = useRef();
  const imageRef = useRef();
  const overlayRef = useRef();

  useGSAP(() => {
    // Hover animation setup
    const mm = gsap.matchMedia();
    
    mm.add("(min-width: 1024px)", () => {
      const hoverTl = gsap.timeline({ paused: true });
      
      hoverTl.to(imageRef.current, { 
        scale: 1.1, 
        duration: 0.6, 
        ease: 'power2.out' 
      }, 0)
      .to(overlayRef.current, { 
        opacity: 1, 
        duration: 0.4, 
        ease: 'power2.inOut' 
      }, 0);

      const onMouseEnter = () => hoverTl.play();
      const onMouseLeave = () => hoverTl.reverse();

      cardRef.current.addEventListener('mouseenter', onMouseEnter);
      cardRef.current.addEventListener('mouseleave', onMouseLeave);

      return () => {
        cardRef.current.removeEventListener('mouseenter', onMouseEnter);
        cardRef.current.removeEventListener('mouseleave', onMouseLeave);
      };
    });
  }, { scope: cardRef });

  return (
    <div 
      ref={cardRef}
      className="group flex flex-col glass rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 opacity-0 translate-y-8"
    >
      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden">
        <img 
          ref={imageRef}
          src={image?.url || 'https://via.placeholder.com/600x400'} 
          alt={title}
          loading="lazy"
          className="object-cover w-full h-full"
        />
        <div 
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 flex items-end p-6"
        >
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex-grow flex flex-col">
        <div className="flex gap-2 mb-4 flex-wrap">
          {techStack?.map((tech, index) => (
            <span key={index} className="text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-md bg-accent-orange/10 text-accent-orange">
              {tech}
            </span>
          ))}
        </div>
        
        <h3 className="text-2xl font-display font-bold mb-3 text-accent-orange transition-colors">
          {title}
        </h3>
        
        <p className="text-white/90 dark:text-white/80 text-sm leading-relaxed mb-6 flex-grow font-light">
          {description}
        </p>

        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          {liveLink ? (
            <a 
              href={liveLink} 
              target="_blank" 
              rel="noreferrer"
              className="text-sm font-bold flex items-center gap-2 group/btn text-accent-orange hover:text-white transition-colors"
            >
              Live Site 
              <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
            </a>
          ) : (
            <span className="text-sm font-bold text-slate-400">Coming Soon</span>
          )}

          {githubLink && (
            <a 
              href={githubLink} 
              target="_blank" 
              rel="noreferrer"
              className="p-2 bg-white/5 border border-white/10 hover:border-accent-orange/40 backdrop-blur-md rounded-full text-slate-400 hover:text-accent-orange transition-all hover:scale-105 active:scale-95"
              aria-label={`View ${title} source code on GitHub`}
            >
              <Github size={18} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

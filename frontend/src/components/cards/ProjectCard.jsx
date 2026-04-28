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
          className="object-cover w-full h-full"
        />
        <div 
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent opacity-0 flex items-end p-6"
        >
          <div className="flex gap-4">
            {githubLink && (
              <a href={githubLink} target="_blank" rel="noreferrer" className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-accent-orange transition-colors">
                <Github size={20} />
              </a>
            )}
            {liveLink && (
              <a href={liveLink} target="_blank" rel="noreferrer" className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-accent-orange transition-colors">
                <ExternalLink size={20} />
              </a>
            )}
          </div>
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
        
        <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-accent-orange transition-colors">
          {title}
        </h3>
        
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
          {description}
        </p>

        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <button className="text-sm font-bold flex items-center gap-2 group/btn hover:text-accent-orange transition-colors">
            View Details 
            <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

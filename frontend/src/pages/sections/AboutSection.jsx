import React from 'react';
import { Layers, Cloud, Cpu } from 'lucide-react';
import SectionHeading from '../../components/common/SectionHeading';
import Section from '../../components/layout/Section';

const stats = [
  { value: 'Fresher', label: 'Passionate Developer' },
  { value: '1', label: 'Project Delivered' },
];

const skills = [
  { icon: Cpu, title: 'GenAI', desc: 'OpenAI, LangChain, RAG, Python' },
  { icon: Layers, title: 'Fullstack', desc: 'MERN, Next.js, Redux, GSAP' },
  { icon: Cloud, title: 'DevOps', desc: 'AWS, Docker, CI/CD, Terraform' },
];

const AboutSection = () => (
  <Section id="about">
    <SectionHeading subtitle="Crafting digital experiences with precision and passion.">
      About Me
    </SectionHeading>

    <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
      {/* Text + Stats */}
      <div className="space-y-5 md:space-y-6 text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed">
        <p className="scroll-reveal">
          I am a passionate developer with expertise in Full Stack Application Development, DevOps, and Generative AI. I enjoy building scalable, high-performance web applications and continuously exploring modern technologies to create efficient, real-world solutions.
        </p>
        <p className="scroll-reveal">
          My focus is on writing clean, maintainable code and delivering seamless user experiences while leveraging automation and AI to enhance productivity.
        </p>

        <div className="grid grid-cols-2 gap-3 md:gap-4 pt-2 md:pt-4 grid-stagger">
          {stats.map(({ value, label }) => (
            <div key={label} className="p-4 glass rounded-xl text-center sm:text-left">
              <h4 className="text-accent-orange font-bold text-xl md:text-2xl">{value}</h4>
              <p className="text-xs md:text-sm">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Skill Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 grid-stagger">
        {skills.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex flex-col items-center p-5 md:p-6 glass rounded-2xl border-orange-500/10">
            <Icon className="text-accent-orange mb-3 md:mb-4" size={36} />
            <h3 className="font-bold mb-1.5 md:mb-2 text-sm md:text-base">{title}</h3>
            <p className="text-[10px] md:text-xs text-center text-slate-500">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </Section>
);

export default AboutSection;

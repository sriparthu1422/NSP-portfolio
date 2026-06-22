import React from 'react';
import { Layers, Cloud, Cpu, Code, Megaphone } from 'lucide-react';
import SectionHeading from '../../components/common/SectionHeading';
import Section from '../../components/layout/Section';

const expertise = [
  { icon: Code, title: 'Full Stack Development', desc: 'Building scalable and responsive web applications using React.js, Next.js, Node.js, Express.js, and MongoDB.' },
  { icon: Layers, title: 'Frontend Development', desc: 'Creating modern, user-friendly, and visually appealing interfaces that deliver exceptional user experiences across all devices.' },
  { icon: Cloud, title: 'Backend Development', desc: 'Developing secure APIs, database architectures, authentication systems, and server-side solutions that power modern applications.' },
  { icon: Megaphone, title: 'Digital Marketing', desc: 'Helping businesses increase their online visibility through SEO, performance marketing, lead generation strategies, and digital growth initiatives.' },
  { icon: Cpu, title: 'Generative AI & Automation', desc: 'Leveraging AI tools and automation platforms to improve productivity, streamline workflows, and build intelligent digital experiences.' },
];

const AboutSection = () => {
  // SEO Observer for About Section
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        document.title = "About SriParthu | Full Stack Developer, Digital Marketer & AI Enthusiast";
        document.querySelector('meta[name="description"]')?.setAttribute("content", "Learn more about SriParthu, a Full Stack Developer skilled in React.js, Node.js, Digital Marketing, SEO, Performance Marketing, and Generative AI solutions.");
      }
    }, { threshold: 0.3 });
    
    const section = document.getElementById('about');
    if (section) observer.observe(section);
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <Section id="about">
      <SectionHeading subtitle="Passionate Developer, Digital Marketer & AI Enthusiast">
        About Me
      </SectionHeading>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        <div className="space-y-5 md:space-y-6 text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 scroll-reveal">Hello! I'm SriParthu</h3>
          <p className="scroll-reveal">
            I'm a Full Stack Developer with expertise in web development, digital marketing, performance marketing, and Generative AI tools.
          </p>
          <p className="scroll-reveal">
            I enjoy building modern digital experiences that solve real-world problems and create value for businesses and users alike. My journey into technology started with a curiosity about how websites work and has evolved into a passion for developing complete digital solutions.
          </p>
          <p className="scroll-reveal">
            Over the years, I have worked with various technologies, frameworks, and tools to create responsive websites, web applications, automation workflows, and marketing-driven digital platforms. I continuously learn new technologies to stay ahead in the rapidly evolving tech industry.
          </p>
          
          <div className="mt-8 scroll-reveal">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">My Mission</h3>
            <p className="mb-4">My goal is to help businesses and individuals establish a strong digital presence through innovative technology, strategic marketing, and user-focused design.</p>
            <p>I believe that great products are built by combining creativity, technology, and a deep understanding of user needs. Every project I work on is an opportunity to create meaningful impact and deliver measurable results.</p>
          </div>
          
          <div className="mt-8 scroll-reveal glass p-6 md:p-8 rounded-2xl border-orange-500/10">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-3">Let's Connect</h3>
            <p className="mb-4 text-sm md:text-base">I'm always open to discussing new opportunities, collaborations, freelance projects, and innovative ideas. If you're looking for a dedicated developer who is passionate about technology and growth, let's connect and build something extraordinary together.</p>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 scroll-reveal">My Expertise</h3>
          <div className="grid grid-cols-1 gap-4 md:gap-6 grid-stagger">
            {expertise.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4 p-5 md:p-6 glass rounded-2xl border-orange-500/10 transition-transform hover:-translate-y-1">
                <div className="flex-shrink-0">
                  <Icon className="text-accent-orange" size={32} />
                </div>
                <div>
                  <h4 className="font-bold mb-2 text-base md:text-lg text-slate-800 dark:text-slate-200">{title}</h4>
                  <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default AboutSection;

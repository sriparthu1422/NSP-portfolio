import React from 'react';
import { Github, Linkedin, Mail, ArrowUp, ExternalLink } from 'lucide-react';

const socials = [
  { icon: Github, href: 'https://github.com/sriparthu1422', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/sriparthu-nallabelli-881744400/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:admin@sriparthu.com', label: 'Email' },
];

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative mt-20 pb-10 overflow-hidden">
      {/* Decorative gradient background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-[300px] bg-accent-orange/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass border border-white/20 dark:border-slate-800/20 rounded-[2.5rem] p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16">
            
            {/* Branding & Bio */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-2 group cursor-pointer" onClick={scrollToTop}>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-orange to-orange-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform">
                  S
                </div>
                <span className="text-2xl font-display font-bold tracking-tight">Sri Parthu</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
                A dedicated Full Stack Developer & GenAI enthusiast focused on building high-performance, visually stunning web applications that deliver real value.
              </p>
              <div className="flex gap-4">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="w-11 h-11 rounded-xl glass border-white/40 flex items-center justify-center hover:text-accent-orange hover:border-accent-orange/50 hover:-translate-y-1 transition-all group"
                    aria-label={label}
                  >
                    <Icon size={20} className="group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white">Navigation</h4>
              <ul className="space-y-3">
                {['Home', 'About', 'Projects', 'Blog', 'Contact'].map((item) => (
                  <li key={item}>
                    <a 
                      href={`#${item.toLowerCase()}`} 
                      className="text-slate-500 hover:text-accent-orange transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-accent-orange transition-colors" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services/Focus */}
            <div className="space-y-6">
              <h4 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white">What I Do</h4>
              <ul className="space-y-3">
                {['MERN Development', 'GenAI Solutions', 'DevOps & Cloud', 'UI/UX Design'].map((service) => (
                  <li key={service} className="text-slate-500 flex items-center gap-2">
                    <CheckCircle className="text-accent-orange/40" size={14} />
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} <span className="font-bold text-slate-900 dark:text-white">Sri Parthu</span>. Built with ❤️ and React.
            </p>
            <button 
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-sm font-bold text-accent-orange hover:text-orange-400 transition-colors"
            >
              Back to Top
              <div className="w-8 h-8 rounded-full glass border-accent-orange/20 flex items-center justify-center group-hover:-translate-y-1 transition-transform">
                <ArrowUp size={14} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Internal icon import
import { CheckCircle } from 'lucide-react';

export default Footer;

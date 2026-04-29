import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const socials = [
  { icon: Github, href: 'https://github.com/sriparthu1422', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/sriparthu-nallabelli-881744400/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:admin@sriparthu.com', label: 'Email' },
];

const Footer = () => (
  <footer className="glass border-t border-white/20 dark:border-slate-800/20 pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        {/* Brand Section */}
        <div className="space-y-4">
          <h3 className="text-2xl font-display font-black tracking-tighter">
            Sri <span className="text-accent-orange">Parthu</span>
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
            A passionate Developer enthusiast building the future of the web with modern technologies.
          </p>
          <div className="flex space-x-4 pt-2">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 glass border-white/10 text-slate-500 hover:text-accent-orange hover:border-accent-orange/50 transition-all rounded-xl"
                aria-label={label}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white mb-6">Explore</h4>
          <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
            <li><a href="#about" className="hover:text-accent-orange transition-colors">About Me</a></li>
            <li><a href="#projects" className="hover:text-accent-orange transition-colors">Projects</a></li>
            <li><a href="#blog" className="hover:text-accent-orange transition-colors">Blog</a></li>
            <li><a href="#contact" className="hover:text-accent-orange transition-colors">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white mb-6">Connect</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            Open for collaborations and remote opportunities.
          </p>
          <a 
            href="mailto:admin@sriparthu.com" 
            className="inline-flex items-center gap-2 px-4 py-2 glass border-orange-500/20 text-accent-orange text-sm font-bold rounded-xl hover:bg-accent-orange hover:text-white transition-all"
          >
            <Mail size={16} /> Hire Me
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 uppercase tracking-widest">
        <p>© {new Date().getFullYear()} Sri Parthu. All rights reserved.</p>
        <div className="flex gap-6">
          <span className="hover:text-accent-orange cursor-default">Privacy Policy</span>
          <span className="hover:text-accent-orange cursor-default">Terms of Service</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;

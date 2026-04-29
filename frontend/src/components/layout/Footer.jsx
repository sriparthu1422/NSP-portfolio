import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const socials = [
  { icon: Github, href: 'https://github.com/sriparthu1422', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/sriparthu-nallabelli-881744400/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:admin@sriparthu.com', label: 'Email' },
];

const Footer = () => (
  <footer className="glass border-t border-white/20 dark:border-slate-800/20 py-8 md:py-10">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <div className="flex justify-center space-x-6 mb-4">
        {socials.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="p-2 hover:text-accent-orange hover:-translate-y-1 transition-all"
            aria-label={label}
          >
            <Icon size={20} />
          </a>
        ))}
      </div>
      <p className="text-xs md:text-sm text-slate-500">
        © {new Date().getFullYear()} Sri Parthu. Built with MERN Stack.
      </p>
    </div>
  </footer>
);

export default Footer;

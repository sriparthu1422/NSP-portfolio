import React, { useRef, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Sun, Moon, Github, Linkedin, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Layout = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navRef = useRef();
  const lastScrollY = useRef(0);

  useGSAP(() => {
    // Hide/Show Navbar on scroll
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down
        gsap.to(navRef.current, { y: '-100%', duration: 0.4, ease: 'power2.inOut' });
      } else {
        // Scrolling up
        gsap.to(navRef.current, { y: '0%', duration: 0.4, ease: 'power2.out' });
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Link Hover Animation Helper
  const onLinkEnter = (e) => {
    const underline = e.currentTarget.querySelector('.nav-underline');
    gsap.to(underline, { width: '100%', left: '0%', duration: 0.3, ease: 'power2.out' });
  };

  const onLinkLeave = (e) => {
    const underline = e.currentTarget.querySelector('.nav-underline');
    gsap.to(underline, { width: '0%', left: '100%', duration: 0.3, ease: 'power2.in' });
  };

  const NavLink = ({ to, href, children }) => {
    const content = (
      <div className="relative py-1 group cursor-pointer" onMouseEnter={onLinkEnter} onMouseLeave={onLinkLeave}>
        {children}
        <div className="nav-underline absolute bottom-0 left-full w-0 h-0.5 bg-accent-orange rounded-full pointer-events-none" />
      </div>
    );

    return href ? (
      <a href={href} className="hover:text-accent-orange transition-colors">{content}</a>
    ) : (
      <Link to={to} className="hover:text-accent-orange transition-colors">{content}</Link>
    );
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navigation */}
      <nav ref={navRef} className="fixed w-full z-50 glass top-0 transition-shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link to="/" className="text-2xl font-display font-bold tracking-tight text-accent-orange hover:scale-105 transition-transform">
              SP<span className="text-slate-800 dark:text-white">.</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLink to="/">Home</NavLink>
              <NavLink href="#about">About</NavLink>
              <NavLink href="#projects">Projects</NavLink>
              <NavLink href="#blog">Blog</NavLink>
              <NavLink href="#contact">Contact</NavLink>
              
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-all hover:scale-110 active:scale-95"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <button onClick={toggleTheme} className="p-2">
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden glass border-t border-white/20 dark:border-slate-800/20">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" className="block px-3 py-2 rounded-md hover:bg-accent-orange/10" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <a href="#about" className="block px-3 py-2 rounded-md hover:bg-accent-orange/10" onClick={() => setIsMenuOpen(false)}>About</a>
              <a href="#projects" className="block px-3 py-2 rounded-md hover:bg-accent-orange/10" onClick={() => setIsMenuOpen(false)}>Projects</a>
              <a href="#blog" className="block px-3 py-2 rounded-md hover:bg-accent-orange/10" onClick={() => setIsMenuOpen(false)}>Blog</a>
              <a href="#contact" className="block px-3 py-2 rounded-md hover:bg-accent-orange/10" onClick={() => setIsMenuOpen(false)}>Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-16 hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="glass border-t border-white/20 dark:border-slate-800/20 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-accent-orange hover:-translate-y-1 transition-transform"><Github size={20} /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-accent-orange hover:-translate-y-1 transition-transform"><Linkedin size={20} /></a>
          </div>
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Sri Parthu. Built with MERN Stack.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

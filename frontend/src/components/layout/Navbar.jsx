import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import sriparthu from '../../assets/img.png';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navRef = useRef();
  const lastScrollY = useRef(0);

  useGSAP(() => {
    // Navigation bar remains permanently fixed
    gsap.set(navRef.current, { y: '0%' });
  }, []);

  const onLinkEnter = (e) => {
    const underline = e.currentTarget.querySelector('.nav-underline');
    if (underline) gsap.to(underline, { width: '100%', left: '0%', duration: 0.3, ease: 'power2.out' });
  };

  const onLinkLeave = (e) => {
    const underline = e.currentTarget.querySelector('.nav-underline');
    if (underline) gsap.to(underline, { width: '0%', left: '100%', duration: 0.3, ease: 'power2.in' });
  };

  const NavLink = ({ to, href, children }) => {
    const inner = (
      <div className="relative py-1 cursor-pointer" onMouseEnter={onLinkEnter} onMouseLeave={onLinkLeave}>
        {children}
        <div className="nav-underline absolute bottom-0 left-full w-0 h-0.5 bg-accent-orange rounded-full pointer-events-none" />
      </div>
    );
    return href ? (
      <a href={href} className="hover:text-accent-orange transition-colors">{inner}</a>
    ) : (
      <Link to={to} className="hover:text-accent-orange transition-colors" onClick={() => {
        if (window.location.pathname === '/') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }}>{inner}</Link>
    );
  };

  const links = [
    { label: 'Home', to: '/' },
    { label: 'About', href: '/#about' },
    { label: 'Projects', href: '/#projects' },
    { label: 'Blog', href: '/#blog' },
    { label: 'Contact', href: '/#contact' },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav ref={navRef} className="fixed w-full z-50 glass top-0 transition-shadow" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group transition-all" onClick={() => {
            if (window.location.pathname === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}>
            <div className="relative w-14 h-14 flex-shrink-0">
              <div className="absolute inset-0 rounded-full bg-accent-orange animate-pulse opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative w-full h-full rounded-full border-[3px] border-accent-orange overflow-hidden shadow-lg shadow-orange-500/20">
                <img 
                  src={sriparthu} 
                  alt="Sri Parthu" 
                  className="w-full h-full object-cover object-center scale-[1.01] group-hover:scale-105 transition-transform duration-500 will-change-transform [backface-visibility:hidden] [transform:translateZ(0)]" 
                />
              </div>
            </div>
            <div className="text-3xl font-display font-black tracking-tighter flex items-center">
              <span className="text-accent-orange">N</span>
              <span className="text-slate-900 dark:text-white">SP.</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <NavLink key={link.label} to={link.to} href={link.href}>
                {link.label}
              </NavLink>
            ))}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-all hover:scale-110 active:scale-95"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center space-x-2">
            <button onClick={toggleTheme} className="p-2.5 rounded-lg" aria-label="Toggle theme">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2.5 rounded-lg" aria-label="Toggle menu">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden glass border-t border-white/20 dark:border-slate-800/20 overflow-hidden transition-all duration-300 ease-out ${
          isMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-1">
          {links.map((link) =>
            link.to ? (
              <Link key={link.label} to={link.to} className="block px-3 py-3 rounded-lg hover:bg-accent-orange/10 transition-colors text-base" onClick={() => {
                if (window.location.pathname === '/') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
                closeMenu();
              }}>
                {link.label}
              </Link>
            ) : (
              <a key={link.label} href={link.href} className="block px-3 py-3 rounded-lg hover:bg-accent-orange/10 transition-colors text-base" onClick={closeMenu}>
                {link.label}
              </a>
            )
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

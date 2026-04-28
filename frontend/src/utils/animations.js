import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Reusable animation presets and configurations
 */
export const animationConfig = {
  ease: 'expo.out',
  duration: 1.2,
  stagger: 0.1,
  revealDistance: 40,
};

/**
 * Checks if the user prefers reduced motion
 * @returns {boolean}
 */
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Standard reveal animation using ScrollTrigger
 * @param {HTMLElement} element - The element to animate
 * @param {object} options - Custom GSAP options
 */
export const scrollReveal = (element, options = {}) => {
  if (prefersReducedMotion()) {
    gsap.set(element, { opacity: 1, y: 0 });
    return;
  }

  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y: animationConfig.revealDistance,
      ...options.from,
    },
    {
      opacity: 1,
      y: 0,
      duration: animationConfig.duration,
      ease: animationConfig.ease,
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
        once: true,
        ...options.scrollTrigger,
      },
      ...options.to,
    }
  );
};

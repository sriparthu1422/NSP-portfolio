import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook that sets up GSAP ScrollTrigger-based reveal animations.
 * Looks for `.scroll-reveal` and `.grid-stagger` elements within the given scope.
 *
 * @param {React.RefObject} containerRef - ref for the GSAP scope
 */
const useScrollReveal = (containerRef, dependencies = []) => {
  useGSAP(() => {
    // Section reveals — fade + slide up once
    const sections = gsap.utils.toArray('.scroll-reveal');
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );
    });

    // Grid staggers — children animate in sequence
    const grids = gsap.utils.toArray('.grid-stagger');
    grids.forEach((grid) => {
      // If the grid is empty, skip
      if (grid.children.length === 0) return;

      gsap.fromTo(
        grid.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 80%',
            once: true,
          },
        }
      );
    });
  }, { scope: containerRef, dependencies: [...dependencies] });
};

export default useScrollReveal;

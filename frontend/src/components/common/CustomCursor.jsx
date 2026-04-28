import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const mainCursor = useRef(null);
  const secondaryCursor = useRef(null);

  useEffect(() => {
    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      
      // Main small dot follows instantly
      gsap.to(mainCursor.current, {
        x: clientX,
        y: clientY,
        duration: 0.1,
      });

      // Larger ring follows with delay/lag for "luxury" feel
      gsap.to(secondaryCursor.current, {
        x: clientX,
        y: clientY,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    const onMouseDown = () => {
      gsap.to([mainCursor.current, secondaryCursor.current], { scale: 0.7, duration: 0.2 });
    };

    const onMouseUp = () => {
      gsap.to([mainCursor.current, secondaryCursor.current], { scale: 1, duration: 0.2 });
    };

    // Add hover effect for interactive elements
    const onMouseEnterLink = () => {
      gsap.to(secondaryCursor.current, { scale: 2, backgroundColor: 'rgba(249, 115, 22, 0.2)', borderColor: 'transparent', duration: 0.3 });
      gsap.to(mainCursor.current, { backgroundColor: '#f97316', duration: 0.3 });
    };

    const onMouseLeaveLink = () => {
      gsap.to(secondaryCursor.current, { scale: 1, backgroundColor: 'transparent', borderColor: '#f97316', duration: 0.3 });
      gsap.to(mainCursor.current, { backgroundColor: '#f97316', duration: 0.3 });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    const links = document.querySelectorAll('a, button, input, textarea, [role="button"]');
    links.forEach(link => {
      link.addEventListener('mouseenter', onMouseEnterLink);
      link.addEventListener('mouseleave', onMouseLeaveLink);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      links.forEach(link => {
        link.removeEventListener('mouseenter', onMouseEnterLink);
        link.removeEventListener('mouseleave', onMouseLeaveLink);
      });
    };
  }, []);

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[9999]">
      {/* Main Dot */}
      <div 
        ref={mainCursor}
        className="fixed top-0 left-0 w-2 h-2 bg-accent-orange rounded-full -translate-x-1/2 -translate-y-1/2"
      />
      {/* Secondary Ring */}
      <div 
        ref={secondaryCursor}
        className="fixed top-0 left-0 w-8 h-8 border-2 border-accent-orange rounded-full -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
};

export default CustomCursor;

import React from 'react';

const Section = ({ id, children, className = '' }) => (
  <section
    id={id}
    className={`scroll-mt-24 md:scroll-mt-32 scroll-reveal ${className}`}
  >
    {children}
  </section>
);

export default Section;

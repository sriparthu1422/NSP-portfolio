import React from 'react';

const SectionHeading = ({ children, subtitle }) => (
  <div className="mb-10 md:mb-14 text-center section-reveal">
    <h2 className="text-heading font-display font-bold mb-4">{children}</h2>
    <div className="h-1.5 w-16 bg-accent-orange mx-auto rounded-full" />
    {subtitle && (
      <p className="mt-4 text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
        {subtitle}
      </p>
    )}
  </div>
);

export default SectionHeading;

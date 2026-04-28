import React from 'react';

const Spinner = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-6 w-6 border-2',
    md: 'h-10 w-10 border-2',
    lg: 'h-14 w-14 border-[3px]',
  };

  return (
    <div className="flex justify-center py-20" aria-label="Loading">
      <div
        className={`animate-spin rounded-full border-accent-orange border-t-transparent ${sizeClasses[size]}`}
      />
    </div>
  );
};

export default Spinner;

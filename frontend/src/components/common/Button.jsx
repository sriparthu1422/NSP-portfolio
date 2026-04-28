import React from 'react';

const variants = {
  primary:
    'bg-accent-orange text-white hover:shadow-lg hover:shadow-orange-500/30',
  secondary:
    'glass font-bold hover:bg-slate-100 dark:hover:bg-slate-800',
  ghost:
    'hover:text-accent-orange',
};

const sizes = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-base rounded-xl',
  lg: 'px-8 py-4 text-base rounded-xl',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconSize = 20,
  className = '',
  as: Tag = 'button',
  ...props
}) => {
  return (
    <Tag
      className={`inline-flex items-center justify-center gap-2 font-bold transition-all active:scale-[0.98] ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
      {Icon && <Icon size={iconSize} />}
    </Tag>
  );
};

export default Button;

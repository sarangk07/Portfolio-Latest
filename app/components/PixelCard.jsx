'use client';

import React from 'react';

const PixelCard = ({
  children,
  variant = 'default', // default, elevated
  hover = true,
  className = '',
  ...props
}) => {
  const baseStyles = `
    relative
    bg-gradient-to-b from-pixel-secondary to-pixel-dark
    border-2 border-pixel-elevated
    transition-all duration-300
  `;

  const variantStyles = {
    default: `
      shadow-[4px_4px_0_0_#0a0a12]
      ${hover ? 'hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-pixel-text-secondary hover:shadow-[6px_6px_0_0_#0a0a12]' : ''}
    `,
    elevated: `
      shadow-[6px_6px_0_0_#0a0a12,8px_8px_20px_rgba(0,0,0,0.3)]
      ${hover ? 'hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#0a0a12,10px_10px_25px_rgba(0,0,0,0.4)]' : ''}
    `,
  };

  return (
    <div
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${className}
      `.replace(/\s+/g, ' ').trim()}
      {...props}
    >
      {/* Top highlight line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default PixelCard;

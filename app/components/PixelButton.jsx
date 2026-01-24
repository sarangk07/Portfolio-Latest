'use client';

import React from 'react';

const PixelButton = ({
    children,
    href,
    onClick,
    variant = 'primary', // primary, secondary, ghost
    size = 'md', // sm, md, lg
    className = '',
    ...props
}) => {
    const baseStyles = `
    relative inline-flex items-center justify-center
    font-pixel uppercase tracking-wider
    cursor-pointer transition-all duration-150
    border-2 select-none
  `;

    const sizeStyles = {
        sm: 'px-4 py-2 text-xs',
        md: 'px-6 py-3 text-sm',
        lg: 'px-8 py-4 text-base',
    };

    const variantStyles = {
        primary: `
      bg-gradient-to-b from-pixel-elevated to-pixel-secondary
      border-pixel-cyan text-pixel-text
      shadow-[0_4px_0_0_#0a0a12,0_6px_10px_rgba(0,0,0,0.3)]
      hover:shadow-[0_6px_0_0_#0a0a12,0_8px_15px_rgba(0,0,0,0.4)]
      hover:border-pixel-text hover:text-pixel-text
      hover:-translate-y-0.5
      active:translate-y-0.5 active:shadow-[0_2px_0_0_#0a0a12,0_3px_5px_rgba(0,0,0,0.3)]
    `,
        secondary: `
      bg-gradient-to-b from-pixel-tertiary to-pixel-secondary
      border-pixel-elevated text-pixel-text
      shadow-[0_4px_0_0_#0a0a12,0_6px_10px_rgba(0,0,0,0.3)]
      hover:shadow-[0_6px_0_0_#0a0a12,0_8px_15px_rgba(0,0,0,0.4)]
      hover:border-pixel-text hover:text-pixel-text
      hover:-translate-y-0.5
      active:translate-y-0.5 active:shadow-[0_2px_0_0_#0a0a12,0_3px_5px_rgba(0,0,0,0.3)]
    `,
        ghost: `
      bg-transparent border-pixel-text-muted text-pixel-text-secondary
      hover:border-pixel-text hover:text-pixel-text
    `,
    };

    const combinedClassName = `
    ${baseStyles}
    ${sizeStyles[size]}
    ${variantStyles[variant]}
    ${className}
  `.replace(/\s+/g, ' ').trim();

    if (href) {
        return (
            <a
                href={href}
                className={combinedClassName}
                target="_blank"
                rel="noopener noreferrer"
                {...props}
            >
                {children}
            </a>
        );
    }

    return (
        <button
            onClick={onClick}
            className={combinedClassName}
            {...props}
        >
            {children}
        </button>
    );
};

export default PixelButton;

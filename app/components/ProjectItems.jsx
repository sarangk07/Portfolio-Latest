'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

const ProjectItem = ({
  title,
  subtitle,
  description,
  imageSrc,
  liveUrl,
  githubUrl,
  tags = [],
}) => {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!cardRef.current) return;

    gsap.fromTo(cardRef.current,
      {
        opacity: 0,
        y: 50,
        scale: 0.98,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top bottom-=100',
          end: 'top center',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="
        group relative
        bg-gradient-to-b from-pixel-secondary to-pixel-dark
        border-2 border-pixel-elevated
        shadow-[4px_4px_0_0_#0a0a12]
        transition-all duration-300
        hover:-translate-x-1 hover:-translate-y-1
        hover:shadow-[6px_6px_0_0_#0a0a12]
        hover:border-pixel-text-muted
        overflow-hidden
      "
    >
      {/* Top highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-10" />

      {/* Image Container */}
      <div className="relative overflow-hidden">
        <div className="relative aspect-video overflow-hidden bg-pixel-dark">
          {imageSrc && (
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-pixel-dark via-transparent to-transparent opacity-60" />
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="
                  px-2 py-1 text-xs font-pixel-mono
                  bg-pixel-dark/80 border border-pixel-elevated
                  text-pixel-text-secondary backdrop-blur-sm
                "
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-pixel text-lg text-pixel-text transition-all duration-300">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs font-pixel-mono text-pixel-text-muted mt-1">
                {subtitle}
              </p>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-pixel-elevated hover:border-pixel-text-secondary hover:text-pixel-text transition-all duration-200"
                title="Live Demo"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-pixel-elevated hover:border-pixel-text-secondary hover:text-pixel-text transition-all duration-200"
                title="GitHub"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {description && (
          <p className="text-sm font-pixel-body text-pixel-text-secondary leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Bottom border on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-pixel-text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

export default ProjectItem;
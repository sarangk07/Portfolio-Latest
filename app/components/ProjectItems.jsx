'use client'

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ProjectItem = ({ choiceTheme, timeTheme, children }) => {
  const containerRef = useRef(null);
  const bottomBorderRef = useRef(null);

  const getBorderColor = () => {
    switch (timeTheme) {
      case 'morning': return '#67e8f9';
      case 'afternoon': return '#10b981';
      default: return '#71717a';
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;


    const tl = gsap.timeline({
      defaults: {
        ease: 'power2.inOut',
        duration: 0.8
      },
      paused: true
    });


    tl.fromTo(bottomBorderRef.current, 
      { scaleX: 0, transformOrigin: 'left' },
      { scaleX: 1 }
    );

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top center+=100',
      end: 'bottom center-=100',
      toggleActions: 'play none none reverse',
      scrub: 0.5,
      onUpdate: (self) => {
        requestAnimationFrame(() => {
          tl.progress(self.progress);
        });
      }
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [timeTheme]);

  const textColor = choiceTheme === 'red' || choiceTheme === 'blue' ? 'text-zinc-100' :
                   choiceTheme === 'white' ? 'text-zinc-400' :
                   'text-gray-200';

  const bgColor = choiceTheme === 'white' ? 'bg-zinc-200' :
                 choiceTheme !== 'red' && choiceTheme !== 'blue' ? 'bg-stone-950' :
                 '';

  return (
    <div
      ref={containerRef}
      className={`
        project-item relative
        ${textColor}
        ${bgColor}
        w-72 h-44 md:w-[580px] md:h-96 
        pl-4 pr-4 md:bg-transparent
      `}
    >
      <div className="relative z-10">
        {children}
      </div>
      
      <div 
        ref={bottomBorderRef}
        className="absolute bottom-0 left-0 h-1 w-full transform-gpu"
        style={{ backgroundColor: getBorderColor() }}
      />
    </div>
  );
};

export default ProjectItem;
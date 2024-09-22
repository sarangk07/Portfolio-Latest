'use client'

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger, Draggable, MotionPathPlugin, ModifiersPlugin } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, Draggable, MotionPathPlugin, ModifiersPlugin);

export default function AutoScrollImages({ images }) {
  const containerRef = useRef(null);
  let animationRef = useRef(null); 

  useEffect(() => {
    const totalWidth = containerRef.current.scrollWidth / 2; 
    
    
    const animation = gsap.to(containerRef.current, {
      x: `-=${totalWidth}`, 
      duration: 20,        
      ease: "none",        
      repeat: -1,           
      modifiers: {
        x: (x) => {
          return (parseFloat(x) % totalWidth) + "px";
        }
      }
    });

    
    animationRef.current = animation;

    return () => {
      animation.kill(); 
    };
  }, []);


  const handlePause = () => {
    if (animationRef.current) {
      animationRef.current.pause();
    }
  };

 
  const handleResume = () => {
    if (animationRef.current) {
      animationRef.current.resume();
    }
  };

  return (
    <div 
      className="relative overflow-hidden w-full h-24"
      onMouseEnter={handlePause}  
      onMouseLeave={handleResume} 
      onClick={handlePause}       
    >
      <div
        ref={containerRef}
        className="flex h-full absolute"
        style={{
          display: "flex",
        }}
      >
        {[...images, ...images].map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`img-${index % images.length}`}
            className="opacity-50 w-auto h-full mr-5"
          />
        ))}
      </div>
    </div>
  );
}

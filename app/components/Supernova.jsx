'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Supernova = ({ scale = 1 }) => {
  const containerRef = useRef(null);
  const diskRef = useRef(null);
  const particlesRef = useRef([]);
  const intervalRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const disk = diskRef.current;
    const particles = particlesRef.current;

    // Color palette - purple/blue galaxy tones
    const colors = ['#7c3aed', '#00d9ff', '#a855f7', '#3b82f6', '#d946ef'];

    // Clear any existing content and intervals
    container.innerHTML = '';
    particles.length = 0;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // --- Mouse Parallax (subtle effect only) ---
    let lastMouseUpdateTime = 0;
    const MOUSE_UPDATE_THROTTLE = 16; // ~60fps

    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastMouseUpdateTime >= MOUSE_UPDATE_THROTTLE) {
        targetMouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
        targetMouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
        lastMouseUpdateTime = now;
      }
    };

    // Animate parallax with much slower/less movement
    const animateParallax = () => {
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.15;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.15;

      if (Math.abs(targetMouseRef.current.x) > 0.01 || Math.abs(targetMouseRef.current.y) > 0.01) {
        gsap.set(container, {
          x: -mouseRef.current.x * 5,
          y: -mouseRef.current.y * 5,
          overwrite: false
        });
      }

      rafRef.current = requestAnimationFrame(animateParallax);
    };

    rafRef.current = requestAnimationFrame(animateParallax);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });



    // Create galaxy core (tiny bright center)
    const core = document.createElement('div');
    core.className = 'absolute rounded-full';
    core.style.width = '4px';
    core.style.height = '4px';
    core.style.left = '50%';
    core.style.top = '50%';
    core.style.transform = 'translate(-50%, -50%)';
    core.style.background = 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(124,58,237,0.6) 50%, transparent 100%)';
    core.style.boxShadow = '0 0 6px 2px rgba(124, 58, 237, 0.5), 0 0 12px 3px rgba(0, 217, 255, 0.2)';
    container.appendChild(core);

    // Create fast spinning galaxy disk
    const diskElement = document.createElement('div');
    diskElement.className = 'absolute will-change-transform';
    diskElement.style.width = '40px';
    diskElement.style.height = '40px';
    diskElement.style.left = '50%';
    diskElement.style.top = '50%';
    diskElement.style.transform = 'translate(-50%, -50%)';
    diskElement.style.borderRadius = '50%';
    diskElement.style.background = 'radial-gradient(ellipse at center, rgba(124,58,237,0.15) 0%, rgba(0,217,255,0.05) 40%, transparent 70%)';
    diskElement.style.filter = 'blur(2px)';
    container.appendChild(diskElement);
    diskRef.current = diskElement;

    // Create fast orbiting particles (spiral arms effect)
    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute rounded-full will-change-transform';
      const size = Math.random() * 2 + 0.5;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = '50%';
      particle.style.top = '50%';
      particle.style.transform = 'translate(-50%, -50%)';
      
      const color = colors[Math.floor(Math.random() * colors.length)];
      particle.style.backgroundColor = color;
      particle.style.boxShadow = `0 0 ${size}px ${color}`;
      
      container.appendChild(particle);
      particles.push(particle);

      // Spiral orbit parameters - slow and smooth
      const orbitRadius = 8 + Math.random() * 25;
      const orbitDuration = 4 + Math.random() * 6; // Slow orbits (4-10 seconds)
      const startAngle = Math.random() * Math.PI * 2;
      const orbitDirection = Math.random() > 0.5 ? 1 : -1;
      const spiralOffset = Math.random() * Math.PI * 2;

      // Animate particle in fast spiral orbit
      const animateParticle = () => {
        gsap.to(particle, {
          x: Math.cos(startAngle) * orbitRadius,
          y: Math.sin(startAngle) * orbitRadius,
          rotation: 360 * orbitDirection,
          duration: orbitDuration,
          ease: 'none',
          repeat: -1,
          onUpdate: function() {
            const progress = this.progress();
            const angle = startAngle + progress * Math.PI * 2 * orbitDirection;
            // Add spiral movement
            const spiralRadius = orbitRadius * (0.8 + 0.4 * Math.sin(progress * Math.PI * 2 + spiralOffset));
            gsap.set(particle, {
              x: Math.cos(angle) * spiralRadius,
              y: Math.sin(angle) * spiralRadius,
              rotation: progress * 360 * orbitDirection
            });
          }
        });
      };
      animateParticle();

      // Slow opacity pulsing
      gsap.to(particle, {
        opacity: 0.3,
        scale: 0.7,
        duration: 3 + Math.random() * 2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: Math.random() * 2
      });
    }

    // Slow spinning disk animation
    gsap.to(diskElement, {
      rotation: 360,
      duration: 20,
      ease: 'none',
      repeat: -1
    });

    // Core slow pulse
    gsap.to(core, {
      scale: 1.6,
      opacity: 0.6,
      duration: 4,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true
    });

    // Occasional shooting star effect
    const createShootingStar = () => {
      const star = document.createElement('div');
      star.className = 'absolute rounded-full will-change-transform';
      star.style.width = '2px';
      star.style.height = '2px';
      star.style.left = '50%';
      star.style.top = '50%';
      star.style.transform = 'translate(-50%, -50%)';
      star.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      star.style.boxShadow = `0 0 3px 1px ${star.style.backgroundColor}`;
      container.appendChild(star);

      const angle = Math.random() * Math.PI * 2;
      const distance = 40 + Math.random() * 30;
      const duration = 1.5 + Math.random() * 1.5;

      gsap.set(star, { x: 0, y: 0, opacity: 1, scale: 1 });
      
      gsap.to(star, {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        opacity: 0,
        scale: 0.2,
        duration: duration,
        ease: 'power2.out',
        onComplete: () => star.remove()
      });
    };

    // Random shooting stars (slower)
    intervalRef.current = setInterval(() => {
      if (Math.random() > 0.7) {
        createShootingStar();
      }
    }, 2000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      gsap.killTweensOf([...particles, diskElement, core]);
    };
  }, []);

  // Apply scale from scroll animation
  useEffect(() => {
    if (containerRef.current) {
      // Always apply scale transform
      containerRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`;
    }
  }, [scale]);

  return (
    <div
      ref={containerRef}
      className="supernova-container absolute pointer-events-none overflow-hidden"
      style={{ 
        zIndex: 1,
        width: '120px',
        height: '120px',
        left: '50%',
        top: '50%'
      }}
    />
  );
};

export default Supernova;

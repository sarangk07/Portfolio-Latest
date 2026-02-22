'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const FloatingParticles = () => {
    const containerRef = useRef(null);
    const starsLayerRef = useRef(null);
    const debrisLayerRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const targetMouseRef = useRef({ x: 0, y: 0 });
    const rafRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current || !starsLayerRef.current || !debrisLayerRef.current) return;

        const starsLayer = starsLayerRef.current;
        const debrisLayer = debrisLayerRef.current;

        // Clear layers
        starsLayer.innerHTML = '';
        debrisLayer.innerHTML = '';

        // --- Configuration ---
        // Optimized particles - Lenis removed so we have headroom
        // More particles for better visual impact without performance hit
        const starCount = 60;    // More twinkling stars
        const debrisCount = 25;  // More moving particles

        const debrisColors = [
            'bg-pixel-text-muted',
            'bg-pixel-cyan',
            'bg-pixel-purple',
            'bg-pixel-text-secondary',
            'bg-pixel-text'
        ];

        const allParticles = [];

        // --- Create Stars ---
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            const size = Math.random() * 2.5 + 0.5;  // Slightly larger for more visibility

            star.className = 'absolute bg-white rounded-none opacity-20 will-change-opacity';
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;

            starsLayer.appendChild(star);
            allParticles.push(star);

            // More dynamic twinkling with varied speeds
            gsap.to(star, {
                opacity: Math.random() * 0.7 + 0.1,  // More variation in opacity
                duration: Math.random() * 4 + 1.5,   // Longer blink cycles for smoothness
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: Math.random() * 4,
                force3D: false
            });

            // Add gentle scale variation to stars for twinkling effect
            gsap.to(star, {
                scale: Math.random() * 1.5 + 0.7,
                duration: Math.random() * 3 + 1,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: Math.random() * 3,
                force3D: false
            });
        }

        // --- Create Debris ---
        for (let i = 0; i < debrisCount; i++) {
            const particle = document.createElement('div');
            const size = Math.random() * 4 + 1;
            const colorClass = debrisColors[Math.floor(Math.random() * debrisColors.length)];

            particle.className = `absolute ${colorClass} rounded-none opacity-40`;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;

            debrisLayer.appendChild(particle);
            allParticles.push(particle);

            // More dynamic and varied orbital animations for rich visual effect
            gsap.to(particle, {
                x: `random(-100, 100)`,   // Increased range for more movement
                y: `random(-100, 100)`,   // Wider drift
                rotation: `random(0, 720)`,  // Full 2 rotations
                duration: `random(20, 45)`,  // Varied speeds
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                force3D: false
            });

            gsap.to(particle, {
                scale: `random(0.6, 1.5)`,  // More dramatic scale variation
                duration: `random(4, 8)`,   // Quick scale changes
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                force3D: false
            });

            // Enhanced opacity fading for depth effect
            gsap.to(particle, {
                opacity: `random(0.15, 0.7)`,
                duration: `random(3, 6)`,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                force3D: false
            });
        }

        // --- OPTIMIZED Mouse Parallax with Throttling & RequestAnimationFrame ---
        // This is the key: Use RAF instead of direct event updates + smart throttling
        let lastMouseUpdateTime = 0;
        const MOUSE_UPDATE_THROTTLE = 16; // ~60fps (16.67ms per frame)

        const handleMouseMove = (e) => {
            const now = Date.now();
            
            // Only update target on throttle interval (not every pixel movement)
            if (now - lastMouseUpdateTime >= MOUSE_UPDATE_THROTTLE) {
                targetMouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
                targetMouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
                lastMouseUpdateTime = now;
            }
        };

        // Use RAF to smoothly interpolate mouse position instead of direct updates
        const animateParallax = () => {
            // Smooth interpolation (easing towards target)
            mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.15;
            mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.15;

            // Apply parallax only when mouse has moved significantly (reduces unnecessary updates)
            if (Math.abs(targetMouseRef.current.x) > 0.01 || Math.abs(targetMouseRef.current.y) > 0.01) {
                // Debris layer parallax (closer - more movement)
                gsap.set(debrisLayer, {
                    x: -mouseRef.current.x * 35,
                    y: -mouseRef.current.y * 35,
                    overwrite: false
                });

                // Stars layer parallax (farther - less movement)
                gsap.set(starsLayer, {
                    x: -mouseRef.current.x * 12,
                    y: -mouseRef.current.y * 12,
                    overwrite: false
                });
            }

            rafRef.current = requestAnimationFrame(animateParallax);
        };

        // Start the parallax animation loop
        rafRef.current = requestAnimationFrame(animateParallax);

        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            window.removeEventListener('mousemove', handleMouseMove);
            allParticles.forEach(p => gsap.killTweensOf(p));
            gsap.killTweensOf(starsLayer);
            gsap.killTweensOf(debrisLayer);
            if (starsLayer) starsLayer.innerHTML = '';
            if (debrisLayer) debrisLayer.innerHTML = '';
        };

    }, []);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 overflow-hidden pointer-events-none z-0"
            aria-hidden="true"
        >
            <div ref={starsLayerRef} className="absolute inset-0" />
            <div ref={debrisLayerRef} className="absolute inset-0" />
        </div>
    );
};

export default FloatingParticles;

'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const FloatingParticles = () => {
    const containerRef = useRef(null);
    const starsLayerRef = useRef(null);
    const debrisLayerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current || !starsLayerRef.current || !debrisLayerRef.current) return;

        const starsLayer = starsLayerRef.current;
        const debrisLayer = debrisLayerRef.current;

        // Clear layers
        starsLayer.innerHTML = '';
        debrisLayer.innerHTML = '';

        // --- Configuration ---
        const starCount = 40;
        const debrisCount = 15;

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
            const size = Math.random() * 3 + 1;

            star.className = 'absolute bg-white rounded-none opacity-20 will-change-transform will-change-opacity';
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;

            starsLayer.appendChild(star);
            allParticles.push(star);

            gsap.to(star, {
                opacity: Math.random() * 0.8 + 0.2,
                scale: Math.random() * 1.5 + 0.5,
                duration: Math.random() * 2 + 1,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: Math.random() * 2,
                force3D: true
            });
        }

        // --- Create Debris ---
        for (let i = 0; i < debrisCount; i++) {
            const particle = document.createElement('div');
            const size = Math.random() * 6 + 2;
            const colorClass = debrisColors[Math.floor(Math.random() * debrisColors.length)];

            particle.className = `absolute ${colorClass} rounded-none opacity-40 will-change-transform`;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;

            debrisLayer.appendChild(particle);
            allParticles.push(particle);

            gsap.to(particle, {
                x: `random(-100, 100)`,
                y: `random(-100, 100)`,
                rotation: `random(0, 360)`,
                duration: `random(20, 40)`,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                force3D: true
            });

            gsap.to(particle, {
                scale: `random(0.8, 1.2)`,
                duration: `random(3, 6)`,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                force3D: true
            });
        }

        // --- Mouse Interaction (Layer Parallax) ---
        // We animate the layers, not the particles, to avoid conflict
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth - 0.5) * 2; // -1 to 1
            const y = (clientY / window.innerHeight - 0.5) * 2;

            // Move debris layer more (closer)
            gsap.to(debrisLayer, {
                duration: 1,
                x: -x * 40,
                y: -y * 40,
                ease: 'power2.out',
                overwrite: 'auto'
            });

            // Move stars layer less (farther)
            gsap.to(starsLayer, {
                duration: 1.5,
                x: -x * 15,
                y: -y * 15,
                ease: 'power2.out',
                overwrite: 'auto'
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            allParticles.forEach(p => gsap.killTweensOf(p));
            gsap.killTweensOf(starsLayer);
            gsap.killTweensOf(debrisLayer);
            window.removeEventListener('mousemove', handleMouseMove);
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
            <div ref={starsLayerRef} className="absolute inset-0 will-change-transform" />
            <div ref={debrisLayerRef} className="absolute inset-0 will-change-transform" />
        </div>
    );
};

export default FloatingParticles;

'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const FloatingLogos = ({ scrollTriggerId = null }) => {
    const containerRef = useRef(null);
    const logosRef = useRef([]);

    // Framework/Library data with emojis as icons
    const logos = [
        { name: 'React', icon: '/logos/reactp.png', color: 'text-cyan-400' },
        { name: 'Next.js', icon: '/logos/nextjsp.png', color: 'text-white' },
        { name: 'JavaScript', icon: '/logos/jsp.png', color: 'text-yellow-400' },
        { name: 'Tailwind', icon: '/logos/tailwindp.png', color: 'text-cyan-300' },
        { name: 'GSAP', icon: '/logos/gsap.png', color: 'text-green-400' },
        { name: 'HTML', icon: '/logos/htmlp.png', color: 'text-orange-400' },
        { name: 'CSS', icon: '/logos/cssp.png', color: 'text-blue-400' },
        { name: 'Redux', icon: '/logos/jsp.png', color: 'text-purple-400' },
        { name: 'Node.js', icon: '/logos/nodejsp.png', color: 'text-green-500' },
        { name: 'Express', icon: '/logos/gsap.png', color: 'text-gray-300' },
        { name: 'PostgreSQL', icon: '/logos/psqlp.png', color: 'text-blue-500' },
        { name: 'Python', icon: '/logos/python.png', color: 'text-blue-300' },
        { name: 'Sanity', icon: '/logos/sanityp.png', color: 'text-blue-300' },
        { name: 'Playwright', icon: '/logos/playwrightp.png', color: 'text-green-400' },

    ];

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;

        // Clear previous logos
        container.innerHTML = '';
        logosRef.current = [];

        // Create logo elements
        logos.forEach((logo, index) => {
            const logoElement = document.createElement('div');
            logoElement.className = `absolute flex flex-col items-center justify-center will-change-transform`;
            logoElement.style.width = '60px';
            logoElement.style.height = '60px';
            logoElement.style.left = `${Math.random() * 100}%`;
            logoElement.style.top = `${Math.random() * 100}%`;

            // Logo icon
            const icon = document.createElement('img');
            icon.src = logo.icon;
            icon.alt = logo.name;
            icon.className = `w-12 h-12 drop-shadow-lg object-contain`;
            icon.style.filter = 'drop-shadow(0 0 8px rgba(0, 217, 255, 0.2))';

            // Logo label
            const label = document.createElement('div');
            label.className = 'font-pixel text-xs mt-1 text-pixel-text-secondary opacity-0 group-hover:opacity-100 transition-opacity';
            label.textContent = logo.name;

            logoElement.appendChild(icon);
            // Hover tooltip
            logoElement.title = logo.name;

            container.appendChild(logoElement);
            logosRef.current.push(logoElement);

            // Randomized animation for each logo
            const duration = Math.random() * 10 + 8; // 8-18 seconds (faster movement)
            const xDistance = Math.random() * 200 - 100; // -100 to 100px
            const yDistance = Math.random() * 200 - 100; // -100 to 100px
            const rotation = Math.random() * 360;

            // Animate position and rotation
            gsap.to(logoElement, {
                x: xDistance,
                y: yDistance,
                rotation: rotation,
                duration: duration,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                force3D: false,
            });

            // Subtle scale pulse for interest
            gsap.to(logoElement, {
                scale: () => {
                    const scales = [0.8, 1, 1.1];
                    return scales[Math.floor(Math.random() * scales.length)];
                },
                duration: Math.random() * 3 + 2,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                force3D: false,
                delay: Math.random() * 2,
            });

            // Opacity variation for depth
            gsap.to(logoElement, {
                opacity: () => Math.random() * 0.5 + 0.5,
                duration: Math.random() * 4 + 2,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                force3D: false,
                delay: Math.random() * 1.5,
            });
        });

        // Optional: Pause animations on hover for better UX
        // const handleMouseEnter = () => {
        //     gsap.globalTimeline.pause();
        // };

        // const handleMouseLeave = () => {
        //     gsap.globalTimeline.play();
        // };

        // container.addEventListener('mouseenter', handleMouseEnter);
        // container.addEventListener('mouseleave', handleMouseLeave);

        // return () => {
        //     container.removeEventListener('mouseenter', handleMouseEnter);
        //     container.removeEventListener('mouseleave', handleMouseLeave);
        // };
    }, []);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 overflow-hidden pointer-events-auto"
            style={{
                filter: 'drop-shadow(0 0 10px rgba(0, 217, 255, 0.1))',
            }}
        />
    );
};

export default FloatingLogos;

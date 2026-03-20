'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CometSkills = () => {
    const containerRef = useRef(null);
    const cometsRef = useRef([]);
    const mouseRef = useRef({ x: 0, y: 0, vx: 0, vy: 0, lastX: 0, lastY: 0 });
    const [isHovering, setIsHovering] = useState(false);

    // Framework/Library data with logo images
    const skills = [
        { name: 'React', icon: '/logos/reactp.png' },
        { name: 'Next.js', icon: '/logos/nextjsp.png' },
        { name: 'JavaScript', icon: '/logos/jsp.png' },
        { name: 'Tailwind', icon: '/logos/tailwindp.png' },
        { name: 'GSAP', icon: '/logos/gsap.png' },
        { name: 'HTML', icon: '/logos/htmlp.png' },
        { name: 'CSS', icon: '/logos/cssp.png' },
        { name: 'Redux', icon: '/logos/jsp.png' },
        { name: 'Node.js', icon: '/logos/nodejsp.png' },
        { name: 'PostgreSQL', icon: '/logos/psqlp.png' },
        { name: 'Python', icon: '/logos/python.png' },
        { name: 'Sanity', icon: '/logos/sanity.jpg' },
        { name: 'Playwright', icon: '/logos/playwrightp.png' },
    ];

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        let animationId;

        // Function to initialize comets
        const initializeComets = () => {
            // Use clientWidth/clientHeight for proper dimensions
            let containerWidth = container.clientWidth;
            let containerHeight = container.clientHeight;

            // Fallback: try getBoundingClientRect if clientWidth is 0
            if (containerWidth === 0 || containerHeight === 0) {
                const rect = container.getBoundingClientRect();
                containerWidth = rect.width;
                containerHeight = rect.height;
            }

            // If still no dimensions, retry after a brief delay
            if (containerWidth === 0 || containerHeight === 0) {
                setTimeout(initializeComets, 150);
                return;
            }

            // Clear previous comets
            container.innerHTML = '';
            cometsRef.current = [];

            // Create comet elements
            skills.forEach((skill, index) => {
                const comet = document.createElement('div');

                // Random size between 60-100px
                const size = Math.random() * 50 + 70;

                // Random position within container - spread across full width
                const x = Math.random() * (containerWidth - size);
                const y = Math.random() * (containerHeight - size);

                comet.className = 'comet absolute flex items-center justify-center will-change-transform cursor-pointer';
                comet.style.width = `${size}px`;
                comet.style.height = `${size}px`;
                comet.style.left = `0px`;
                comet.style.top = `0px`;
                comet.style.zIndex = '1';

                // Stone/comet-like styling
                const borderRadius = `${45 + Math.random() * 20}% ${45 + Math.random() * 20}% ${45 + Math.random() * 20}% ${45 + Math.random() * 20}%`;
                comet.style.borderRadius = borderRadius;

                comet.style.background = 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15), rgba(255,255,255,0.02))';
                comet.style.backdropFilter = 'blur(8px)';
                comet.style.border = '1px solid rgba(255,255,255,0.1)';
                comet.style.boxShadow = `
                    0 0 ${15 + Math.random() * 20}px rgba(0, 217, 255, 0.15),
                    inset 0 0 ${10 + Math.random() * 15}px rgba(255,255,255,0.05),
                    0 4px 20px rgba(0,0,0,0.3)
                `;

                // Create logo image
                const img = document.createElement('img');
                img.src = skill.icon;
                img.alt = skill.name;
                img.className = 'object-contain drop-shadow-lg';
                img.style.width = `${size * 0.6}px`;
                img.style.height = `${size * 0.6}px`;
                img.style.filter = 'drop-shadow(0 0 5px rgba(0, 217, 255, 0.3))';

                comet.appendChild(img);
                comet.title = skill.name;

                container.appendChild(comet);
                cometsRef.current.push({
                    element: comet,
                    x: x,
                    y: y,
                    baseX: x,
                    baseY: y,
                    vx: 0,
                    vy: 0,
                    size: size,
                    floatSpeed: Math.random() * 0.3 + 0.15,
                    floatAmplitude: Math.random() * 10 + 5,
                    floatPhase: Math.random() * Math.PI * 2,
                    floatPhaseY: Math.random() * Math.PI * 2,
                    rotationSpeed: (Math.random() - 0.5) * 0.3,
                    currentRotation: Math.random() * 360,
                    mass: size / 60,
                });

                // Hover effects
                comet.addEventListener('mouseenter', () => {
                    gsap.to(comet, {
                        scale: 1.3,
                        boxShadow: `
                            0 0 40px rgba(0, 217, 255, 0.6),
                            inset 0 0 25px rgba(255,255,255,0.15),
                            0 12px 40px rgba(0,0,0,0.5)
                        `,
                        duration: 0.15,
                        ease: 'power2.out'
                    });
                    comet.style.cursor = 'grab';
                });

                comet.addEventListener('mouseleave', () => {
                    gsap.to(comet, {
                        scale: 1,
                        boxShadow: `
                            0 0 ${15 + Math.random() * 20}px rgba(0, 217, 255, 0.15),
                            inset 0 0 ${10 + Math.random() * 15}px rgba(255,255,255,0.05),
                            0 4px 20px rgba(0,0,0,0.3)
                        `,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                    comet.style.cursor = 'pointer';
                });
            });

            // Animation loop
            let time = 0;

            const animate = () => {
                time += 0.016;

                const mouseX = mouseRef.current.x;
                const mouseY = mouseRef.current.y;
                const mouseVX = mouseRef.current.vx;
                const mouseVY = mouseRef.current.vy;

                const mouseSpeed = Math.sqrt(mouseVX * mouseVX + mouseVY * mouseVY);

                cometsRef.current.forEach((comet, index) => {
                    // Floating animation (subtle movement)
                    const floatX = Math.sin(time * comet.floatSpeed + comet.floatPhase) * comet.floatAmplitude;
                    const floatY = Math.sin(time * comet.floatSpeed + comet.floatPhaseY) * comet.floatAmplitude * 0.6;

                    comet.currentRotation += comet.rotationSpeed + (comet.vx * 0.1);

                    // Apply floating animation directly to position (no spring pulling back)
                    comet.x += floatX * 0.005;
                    comet.y += floatY * 0.005;

                    // Mouse repulsion
                    const cometCenterX = comet.x + comet.size / 2;
                    const cometCenterY = comet.y + comet.size / 2;

                    const dx = cometCenterX - mouseX;
                    const dy = cometCenterY - mouseY;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    const baseRadius = comet.size * 0.6;
                    const interactRadius = baseRadius + Math.min(mouseSpeed * 1, 30);

                    if (distance < interactRadius && distance > 0.1) {
                        const repulsionStrength = 1.0;
                        const force = (1 - distance / interactRadius) * repulsionStrength;
                        const angle = Math.atan2(dy, dx);

                        comet.vx += Math.cos(angle) * force * (60 / comet.mass);
                        comet.vy += Math.sin(angle) * force * (60 / comet.mass);
                    }

                    // Only apply damping - no spring force pulling back
                    const damping = 0.93;
                    comet.vx *= damping;
                    comet.vy *= damping;

                    comet.x += comet.vx;
                    comet.y += comet.vy;

                    // Boundary collision - keep comets inside with padding
                    const padding = 10;
                    const minX = padding;
                    const maxX = containerWidth - comet.size - padding;
                    const minY = padding;
                    const maxY = containerHeight - comet.size - padding;

                    if (comet.x < minX) {
                        comet.x = minX;
                        comet.vx = Math.abs(comet.vx) * 0.5;
                    }
                    if (comet.x > maxX) {
                        comet.x = maxX;
                        comet.vx = -Math.abs(comet.vx) * 0.5;
                    }
                    if (comet.y < minY) {
                        comet.y = minY;
                        comet.vy = Math.abs(comet.vy) * 0.5;
                    }
                    if (comet.y > maxY) {
                        comet.y = maxY;
                        comet.vy = -Math.abs(comet.vy) * 0.5;
                    }

                    comet.element.style.transform = `
                        translate(${comet.x}px, ${comet.y}px)
                        rotate(${comet.currentRotation}deg)
                    `;
                });

                mouseRef.current.vx *= 0.8;
                mouseRef.current.vy *= 0.8;

                animationId = requestAnimationFrame(animate);
            };

            animate();
        };

        initializeComets();

        return () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        };
    }, []);

    // Track mouse position and velocity
    const handleMouseMove = (e) => {
        if (!containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();

        const currentX = e.clientX - containerRect.left;
        const currentY = e.clientY - containerRect.top;

        mouseRef.current.vx = currentX - mouseRef.current.lastX;
        mouseRef.current.vy = currentY - mouseRef.current.lastY;

        mouseRef.current.lastX = currentX;
        mouseRef.current.lastY = currentY;

        mouseRef.current.x = currentX;
        mouseRef.current.y = currentY;
    };

    const handleMouseEnter = (e) => {
        setIsHovering(true);
        if (!containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        mouseRef.current.x = e.clientX - containerRect.left;
        mouseRef.current.y = e.clientY - containerRect.top;
        mouseRef.current.lastX = mouseRef.current.x;
        mouseRef.current.lastY = mouseRef.current.y;
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
    };

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 overflow-hidden user-select-none"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective: '1000px',
                pointerEvents: 'auto',
            }}
        />
    );
};

export default CometSkills;

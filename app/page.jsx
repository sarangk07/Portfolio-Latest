'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import PixelButton from './components/PixelButton';
import PixelCard from './components/PixelCard';

import ProjectItem from './components/ProjectItems';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

export default function Home() {
  const heroRef = useRef(null);
  const nameRef = useRef(null);
  const subtitleRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [showStudyProjects, setShowStudyProjects] = useState(false);

  // Skills data
  const frontendSkills = [
    { name: 'JavaScript', level: 85 },
    { name: 'React.js', level: 88 },
    { name: 'Next.js', level: 80 },
    { name: 'HTML & CSS', level: 95 },
    { name: 'Tailwind CSS', level: 95 },
  ];

  const backendSkills = [
    { name: 'Python', level: 40 },
    { name: 'Django & DRF', level: 35 },
    { name: 'Node.js', level: 55 },
    { name: 'Express.js', level: 55 },
    { name: 'PostgreSQL', level: 60 },
    { name: 'MS SQL Server', level: 55 },
  ];


  const toolsSkills = [
    { name: 'GSAP', level: 70 },
    { name: 'Redux', level: 50 },
    { name: 'Git', level: 65 },
  ];

  // Projects data
  const projects = [
    {
      title: 'chikeys',
      subtitle: 'Static Restaurant Project',
      description: 'A static restaurant website with modern UI and smooth user experience.',
      imageSrc: '/chikeysStatic.PNG',
      liveUrl: 'https://www.chikeys.com/en',
      githubUrl: null,
      tags: ['Nextjs', 'GSAP', 'Tailwind CSS'],
    },
    {
      title: 'Beone',
      subtitle: 'Full Stack E-commerce Project',
      description: 'A complete e-commerce platform ',
      imageSrc: '/beonetrading.PNG',
      liveUrl: 'https://www.beonetrading.com/',
      githubUrl: null,
      tags: ['Nodejs', 'Expressjs', 'MSSQL', 'AWS', 'Razorpay', 'Shiprocket', 'Reactjs', 'Tailwindcss'],
    },
    {
      title: 'Nextlooksports',
      subtitle: 'Static Corporate Project',
      description: 'A static corporate website with modern UI and smooth user experience.',
      imageSrc: '/nextlookstatic.PNG',
      liveUrl: 'https://corporate.nextlooksports.com/',
      githubUrl: null,
      tags: ['Nextjs', 'Tailwind CSS'],
    },
    {
      title: 'Nextlook',
      subtitle: 'Full Stack E-commerce Project',
      description: 'A complete e-commerce platform ',
      imageSrc: '/nextlookecom.PNG',
      liveUrl: 'https://www.nextlooksports.com/',
      githubUrl: null,
      tags: ['Nodejs', 'Expressjs', 'MSSQL', 'AWS', 'OTO', 'Reactjs', 'Tailwindcss'],
    },

    {
      title: 'Dhole Radio',
      subtitle: 'Mini Project',
      description: 'Online radio streaming application with custom equalizer and theme support.',
      imageSrc: '/Sansong.PNG',
      liveUrl: 'https://online-radio-ashen.vercel.app/',
      githubUrl: null,
      tags: ['React', 'Web Audio API', 'GSAP', 'Tailwindcss'],
    },
    {
      title: 'RentKaroo',
      subtitle: 'Full Stack Project',
      description: 'A complete car rental platform with user authentication, payment integration via Razorpay, and AWS deployment.',
      imageSrc: '/RentKaro.PNG',
      liveUrl: 'https://rentkaro.shop/',
      githubUrl: 'https://github.com/sarangk07/Rent_karoo',
      tags: ['Django', 'PostgreSQL', 'AWS', 'Razorpay'],
    },
    {
      title: 'Torque Tribe',
      subtitle: 'In Progress',
      description: 'Car accessories e-commerce platform with modern animations and full-stack architecture.',
      imageSrc: '/Mode-Arena-latest.PNG',
      liveUrl: 'https://torque-tribe.vercel.app/',
      githubUrl: 'https://github.com/sarangk07/Car-Modz',
      tags: ['Next.js', 'Redux', 'GSAP', 'Django'],
    },
    {
      title: 'Virtual Mingle',
      subtitle: 'Main Project',
      description: 'Social media platform with real-time features, modern UI animations, and responsive design.',
      imageSrc: '/social-meadia.PNG',
      liveUrl: 'https://social-media-azure-alpha.vercel.app/',
      githubUrl: 'https://github.com/sarangk07/Social-Media--Frontend-',
      tags: ['Next.js', 'GSAP', 'Tailwind'],
    },

    {
      title: 'Baby Land',
      subtitle: 'Mini Project',
      description: 'E-commerce website for baby products with clean UI and smooth user experience.',
      imageSrc: '/Baby-Products.PNG',
      liveUrl: 'https://ecommerce-baby-products.vercel.app/',
      githubUrl: 'https://github.com/sarangk07/Ecommerce-baby-products',
      tags: ['React', 'Bootstrap'],
    },
    {
      title: 'Theyyam Web',
      subtitle: 'Mini Project',
      description: 'Cultural website showcasing the traditional Theyyam festival with immersive visuals.',
      imageSrc: '/theyyam2.PNG',
      liveUrl: 'https://theyyam-web.vercel.app/',
      githubUrl: null,
      tags: ['Next.js', 'GSAP'],
    },
  ];

  const mainProjects = projects.slice(0, 4);
  const studyProjects = projects.slice(4);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  useEffect(() => {
    setMounted(true);
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  useEffect(() => {
    if (!mounted || !heroRef.current) return;

    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo(nameRef.current,
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out', delay: 0.3 }
      );

      gsap.fromTo(subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.6 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, [mounted]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-pixel-dark flex items-center justify-center">
        <div className="text-pixel-text font-pixel animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-pixel-dark text-pixel-text overflow-x-hidden">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 bg-pixel-grid bg-grid opacity-50 pointer-events-none" />

      {/* Subtle gradient overlay */}
      <div className="fixed inset-0 bg-gradient-radial from-pixel-tertiary/20 via-transparent to-transparent pointer-events-none" />

      {/* ===== HERO SECTION ===== */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8"
      >
        {/* Decorative corner elements - hidden on mobile */}
        <div className="hidden sm:block absolute top-6 left-6 w-12 lg:w-16 h-12 lg:h-16 border-l-2 border-t-2 border-pixel-text-muted/30" />
        <div className="hidden sm:block absolute top-6 right-6 w-12 lg:w-16 h-12 lg:h-16 border-r-2 border-t-2 border-pixel-text-muted/30" />
        <div className="hidden sm:block absolute bottom-6 left-6 w-12 lg:w-16 h-12 lg:h-16 border-l-2 border-b-2 border-pixel-text-muted/30" />
        <div className="hidden sm:block absolute bottom-6 right-6 w-12 lg:w-16 h-12 lg:h-16 border-r-2 border-b-2 border-pixel-text-muted/30" />

        <div className="text-center space-y-6 sm:space-y-8 relative z-10 w-full max-w-2xl mx-auto">
          {/* Name */}
          <div ref={nameRef} className="space-y-3 sm:space-y-4">
            <p className="font-pixel text-sm sm:text-lg text-pixel-text-secondary tracking-widest uppercase">Hi, i'm</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-pixel text-pixel-text tracking-wide leading-tight">
              SARANG K
            </h1>
            <div className="h-[2px] w-16 sm:w-24 mx-auto bg-pixel-text-muted" />
          </div>

          {/* Subtitle */}
          <div ref={subtitleRef} className="space-y-4 sm:space-y-6">
            <p className="font-pixel text-sm sm:text-base md:text-lg text-pixel-text-secondary tracking-wide">
              Frontend Developer • Full Stack Enthusiast
            </p>

            <p className="max-w-md lg:max-w-lg mx-auto font-pixel-body text-pixel-text-muted text-base sm:text-lg leading-relaxed px-4 sm:px-0">
              Building modern web experiences with clean code and thoughtful design.
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-4 sm:pt-6">
            <PixelButton
              href="https://drive.google.com/file/d/1UvJjKtmezPk-4623rI-QvvhJkL9jR-7K/view"
              size="md"
              className="sm:text-sm"
            >
              View Resume
            </PixelButton>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-pixel-text-muted">
          <span className="font-pixel-mono text-xs hidden sm:block">Scroll</span>
          <div className="animate-bounce-arrow">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>



      {/* ===== PROJECTS SECTION ===== */}
      <section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-pixel-secondary/30 to-transparent">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-pixel text-pixel-text mb-4">Projects</h2>
            <div className="h-[2px] w-12 sm:w-16 mx-auto bg-pixel-text-muted" />
            <p className="mt-4 font-pixel-body text-pixel-text-secondary text-sm sm:text-base">
              Featured work that I&apos;m proud of
            </p>
          </div>

          {/* Main Projects */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
            {mainProjects.map((project, index) => (
              <ProjectItem
                key={index}
                {...project}
              />
            ))}
          </div>

          {/* Show More Section */}
          {!showStudyProjects ? (
            <div className="text-center mt-12 space-y-4">
              <p className="font-pixel-body text-pixel-text-muted text-sm sm:text-base max-w-xl mx-auto">
                These are projects I created while learning and mastering my tech stack.
              </p>
              <PixelButton
                onClick={() => setShowStudyProjects(true)}
                variant="secondary"
                size="md"
              >
                View Learning Projects
              </PixelButton>
            </div>
          ) : (
            <div className="mt-8 space-y-12">
              <div className="text-center relative">
                <div className="absolute inset-x-0 top-1/2 h-px bg-pixel-text-muted/30 -z-10"></div>
                <span className="bg-pixel-dark px-4 font-pixel text-pixel-text-secondary text-sm">Learning Projects</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {studyProjects.map((project, index) => (
                  <ProjectItem
                    key={index}
                    {...project}
                  />
                ))}
              </div>
              <div className="text-center mt-8">
                <PixelButton
                  onClick={() => setShowStudyProjects(false)}
                  variant="ghost"
                  size="sm"
                >
                  Show Less
                </PixelButton>
              </div>
            </div>
          )}
        </div>
      </section>


      {/* ===== SKILLS SECTION ===== */}
      <section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-pixel text-pixel-text mb-4">Built Using</h2>
            <div className="h-[2px] w-12 sm:w-16 mx-auto bg-pixel-text-muted" />
          </div>

          {/* Skills Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Frontend */}
            <PixelCard className="p-4 sm:p-6 h-full">
              <h3 className="font-pixel text-pixel-text text-base sm:text-lg mb-4 sm:mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-pixel-text-muted" />
                Frontend
              </h3>
              <div className="flex flex-wrap gap-3">
                {frontendSkills.map((skill) => (
                  <div
                    key={skill.name}
                    className="px-3 py-2 bg-pixel-dark border-2 border-pixel-elevated text-pixel-text font-pixel text-xs sm:text-sm hover:border-pixel-text-secondary transition-colors cursor-default"
                  >
                    {skill.name}
                  </div>
                ))}
              </div>
            </PixelCard>

            {/* Backend */}
            <PixelCard className="p-4 sm:p-6 h-full">
              <h3 className="font-pixel text-pixel-text text-base sm:text-lg mb-4 sm:mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-pixel-text-muted" />
                Backend
              </h3>
              <div className="flex flex-wrap gap-3">
                {backendSkills.map((skill) => (
                  <div
                    key={skill.name}
                    className="px-3 py-2 bg-pixel-dark border-2 border-pixel-elevated text-pixel-text font-pixel text-xs sm:text-sm hover:border-pixel-text-secondary transition-colors cursor-default"
                  >
                    {skill.name}
                  </div>
                ))}
              </div>
            </PixelCard>

            {/* Tools */}
            <PixelCard className="p-4 sm:p-6 sm:col-span-2 lg:col-span-1 h-full">
              <h3 className="font-pixel text-pixel-text text-base sm:text-lg mb-4 sm:mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-pixel-text-muted" />
                Tools
              </h3>
              <div className="flex flex-wrap gap-3">
                {toolsSkills.map((skill) => (
                  <div
                    key={skill.name}
                    className="px-3 py-2 bg-pixel-dark border-2 border-pixel-elevated text-pixel-text font-pixel text-xs sm:text-sm hover:border-pixel-text-secondary transition-colors cursor-default"
                  >
                    {skill.name}
                  </div>
                ))}
              </div>
            </PixelCard>
          </div>
        </div>
      </section>


      {/* ===== CONTACT SECTION ===== */}
      <section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl lg:max-w-3xl mx-auto text-center">
          {/* Decorative frame */}
          <div className="relative p-6 sm:p-8 lg:p-12 border-2 border-pixel-elevated bg-pixel-secondary/30">
            {/* Corner decorations - visible on larger screens */}
            <div className="hidden sm:block absolute -top-1 -left-1 w-3 lg:w-4 h-3 lg:h-4 border-l-2 border-t-2 border-pixel-text-muted" />
            <div className="hidden sm:block absolute -top-1 -right-1 w-3 lg:w-4 h-3 lg:h-4 border-r-2 border-t-2 border-pixel-text-muted" />
            <div className="hidden sm:block absolute -bottom-1 -left-1 w-3 lg:w-4 h-3 lg:h-4 border-l-2 border-b-2 border-pixel-text-muted" />
            <div className="hidden sm:block absolute -bottom-1 -right-1 w-3 lg:w-4 h-3 lg:h-4 border-r-2 border-b-2 border-pixel-text-muted" />

            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-pixel text-pixel-text">
                Let&apos;s Collaborate
              </h2>

              <p className="font-pixel-body text-base sm:text-lg text-pixel-text-secondary max-w-md mx-auto px-2 sm:px-0">
                Got a project in mind? I&apos;d love to help turn your ideas into reality.
              </p>

              <div className="pt-2 sm:pt-4">
                <PixelButton
                  href="mailto:sarang00005@gmail.com"
                  size="md"
                >
                  Get In Touch
                </PixelButton>
              </div>

              {/* Social Links */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 pt-4 sm:pt-6">
                {/* GitHub */}
                <a
                  href="https://github.com/sarangk07"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 sm:p-3 border-2 border-pixel-elevated hover:border-pixel-text text-pixel-text-secondary hover:text-pixel-text transition-all duration-200"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/sarang-k-2b7844244/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 sm:p-3 border-2 border-pixel-elevated hover:border-pixel-text text-pixel-text-secondary hover:text-pixel-text transition-all duration-200"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>

                {/* X/Twitter */}
                <a
                  href="#"
                  className="p-2.5 sm:p-3 border-2 border-pixel-elevated hover:border-pixel-text text-pixel-text-secondary hover:text-pixel-text transition-all duration-200"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="relative py-6 sm:py-8 px-4 sm:px-6 border-t border-pixel-elevated">
        <div className="max-w-6xl mx-auto text-center">
          <p className="font-pixel-mono text-xs sm:text-sm text-pixel-text-muted">
            © 2024 SARANG. All Rights Reserved.
          </p>
          <p className="font-pixel-mono text-xs text-pixel-text-muted mt-2">
            Built with Next.js + Tailwind CSS
          </p>
        </div>
      </footer>
    </main >
  );
}


'use client'
import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger, ScrollToPlugin } from 'gsap/dist/ScrollTrigger'
import TrustIcon from '../components/AnimatedSVG'






// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

function New() {
  const containerRef = useRef()
  const panelsContainerRef = useRef() // Ref for the panels container
  const [activePanel, setActivePanel] = useState(0)
  
  // Sample project data
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A fully responsive e-commerce solution with real-time inventory management.",
      tech: ["React", "Node.js", "MongoDB"],
      color: "bg-emerald-500"
    },
    {
      title: "Travel App",
      description: "Travel planning application with interactive maps and itinerary management.",
      tech: ["React Native", "Firebase", "Mapbox"],
      color: "bg-blue-500"
    },
    {
      title: "Health Dashboard",
      description: "Healthcare analytics dashboard with data visualization and reporting.",
      tech: ["Vue.js", "D3.js", "Python"],
      color: "bg-purple-500"
    },
    {
      title: "Travel App",
      description: "Travel planning application with interactive maps and itinerary management.",
      tech: ["React Native", "Firebase", "Mapbox"],
      color: "bg-red-500"
    },
    {
      title: "Health Dashboard",
      description: "Healthcare analytics dashboard with data visualization and reporting.",
      tech: ["Vue.js", "D3.js", "Python"],
      color: "bg-orange-500"
    }
  ]
  
  useEffect(() => {
    const totalPanels = projects.length;
    
    // Create horizontal scroll animation
    const scrollTween = gsap.to(panelsContainerRef.current, {
      x: -window.innerWidth * (totalPanels - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (totalPanels - 1),
        start: "top top",
        end: () => "+=" + (window.innerWidth * (totalPanels - 1)),
        onUpdate: self => {
          const progress = self.progress;
          // Calculate active panel index correctly
          const panelIndex = Math.min(Math.floor(progress * totalPanels), totalPanels - 1);
          setActivePanel(panelIndex);
        }
      }
    })
    
    // Cleanup
    return () => {
      scrollTween.scrollTrigger.kill()
    }
  }, [projects.length]) // Add dependency
  
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden font-pixelify-sans">
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 w-full h-16 bg-black bg-opacity-90 flex items-center justify-between px-8 py-10 z-50">
        <div className="text-xl font-bold">LOGO</div>
        <div className="flex space-x-8">
          <a href="#about" className="hover:text-emerald-400 transition-colors border px-3 py-1" >Resume</a>
          {/* <a href="#projects" className="hover:text-emerald-400 transition-colors">Projects</a>
          <a href="#contact" className="hover:text-emerald-400 transition-colors">Contact</a> */}
        </div>
      </nav>
      
      {/* Horizontal Scrolling Container */}
      <div 
        ref={containerRef} 
        className="h-screen w-full overflow-hidden "
      >
        {/* Panels Container - this is what we'll animate */}
        <div 
          ref={panelsContainerRef} 
          className="flex h-full relative"
        >
          {projects.map((project, index) => (
            <section 
              key={index} 
              className="panel h-full w-screen flex-shrink-0 flex items-center justify-center "
            >
              <div className={`${project.color} rounded-2xl w-full  h-4/5 flex flex-col  justify-center items-center  transform transition-transform duration-700 `}>
                {/* <h2 className="text-5xl font-bold mb-6">{project.title}</h2>
                <p className="text-xl mb-6 text-center max-w-2xl">{project.description}</p>
                <div className="flex space-x-4">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="bg-black bg-opacity-30 px-4 py-2 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-8 text-lg">
                  {index + 1} / {projects.length}
                </div> */}


                <div className='bg-gray-100 h-2/3 w-full text-black relative'>

<p>
  {index + 1}
</p>
<div className='max-w-48 absolute -bottom-10 left-20'>
<img className='' src="/new/pngs/tree2.png" alt="" />

</div>

<div className='max-w-52 absolute -bottom-5 right-20'>
<img className='' src="/new/pngs/tree1.png" alt="" />




<TrustIcon/>


</div>
                </div>




                <div className='bg-gray-500 h-1/3 w-full' >

                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
      
      {/* Instructions */}
      {/* <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 text-white text-opacity-70 text-sm z-40">
        Scroll vertically to navigate horizontally
      </div> */}
    </div>
  )
}

export default New
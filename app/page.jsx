
'use client';

import { useEffect, useRef, useState,useCallback  } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import ChatBubble from './components/ChatBubble';
// import ContactButton from './components/ContactBtn';
import Image from 'next/image';
// import AutoScrollImages from './components/AutoScrollImg';


export default function Home() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const contactRef = useRef(null);
  const footerRef = useRef(null);
  const projectsRef = useRef(null);
  
 
  const [greeting, setGreeting] = useState('');
  const [timeTheme, setTimeTheme] = useState('');
  const [choiceTheme, setChoiceTheme] = useState('dark');

  const updateTimeBasedContent = useCallback(() => {
    const hours = new Date().getHours();
    let newGreeting;
    let newTheme;

    if (hours < 12) {
      newGreeting = 'Good Morning';
      newTheme = 'morning';
    } else if (hours < 18) {
      newGreeting = 'Good Afternoon';
      newTheme = 'afternoon';
    } else {
      newGreeting = 'Good Evening';
      newTheme = 'evening';
    }

    setGreeting(newGreeting);
    setTimeTheme(newTheme);
  }, []);

  useEffect(() => {
    updateTimeBasedContent();
    const timer = setInterval(updateTimeBasedContent, 60000); 

    return () => clearInterval(timer);
  }, [updateTimeBasedContent]);




  useEffect(() => {

    
    gsap.registerPlugin(ScrollTrigger);

    const animationDelay = setTimeout(() => {
      if (containerRef.current && titleRef.current && contactRef.current && footerRef.current) {
        const ctx = gsap.context(() => {


          

          // Fade-in and slide-in animations-----------------------------------------------
          gsap.fromTo(
            titleRef.current,
            { opacity: 0, x: -50 },
            { opacity: 1, x: 0, duration: 1, ease: 'power2.out', delay: 1 }
          );

          gsap.fromTo(
            contactRef.current,
            { opacity: 0, x: -50 },
            { opacity: 1, x: 0, duration: 1, ease: 'power2.out', delay: 1 }
          );

          // Footer slide-up animation-----------------------------------------------
          gsap.fromTo(
            footerRef.current,
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power2.out', delay: 1.5 }
          );
          
          // Wave-animation - skill bars-----------------------------------------------
          const pixelBars = document.querySelectorAll('.pixel-bar');
          if (pixelBars.length > 0) {
            gsap.to(pixelBars, {
              duration: 1.5,
              y: '5%',
              x: '5%',
              rotation: 1,
              repeat: 1,
              yoyo: true,
              ease: 'sine.inOut',
              stagger: 0.15,
            });
          }

          // Project-items animation-----------------------------------------------
          const projectItems = gsap.utils.toArray('.project-item');
          if (projectItems.length > 0) {
            gsap.set(projectItems, { opacity: 0, x: (i) => i % 2 === 0 ? -50 : 50 });
            
            ScrollTrigger.batch(projectItems, {
              onEnter: (batch) => gsap.to(batch, {
                opacity: 1,
                x: 0,
                stagger: 0.15,
                overwrite: true,
                duration: 1,
                ease: 'power2.out',
              }),
              start: 'top 80%',
              once: true
            });
          }

          
          const handleResize = () => {
            ScrollTrigger.refresh(true);
          };

          window.addEventListener('resize', handleResize);

          
          return () => {
            window.removeEventListener('resize', handleResize);
            ScrollTrigger.getAll().forEach(st => st.kill());
          };
        });

        return () => {
          ctx.revert(); 
        };
      }
    }, 100);



    // Lazy loading -----------------------------------------------
    const lazyImages = document.querySelectorAll('img[data-src]');
    const onIntersection = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.getAttribute('data-src');
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    };

    const observer = new IntersectionObserver(onIntersection);
    lazyImages.forEach(img => {
      observer.observe(img);
    });


    
    return () => {
      clearTimeout(animationDelay);
      // clearTimeout(loadingTimer);
      observer.disconnect();
    };
  }, []);



  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx2 = gsap.context(() => {
      

      //animation for skill bars when theme is red-----------------------------------------------
      if (choiceTheme === 'red') {
        
      } else {
        // Reset animation when theme is not red-----------------------------------------------
        const skillBars = document.querySelectorAll('.pixel-bar > div');
        skillBars.forEach((bar) => {
          gsap.to(bar, { x: 0, duration: 0.3 });
        });
      }
    });

    return () => ctx2.revert();
  }, [choiceTheme]);
 
  //system dark mode , avoiding-------------------------
  useEffect(() => {
    document.documentElement.style.colorScheme = 'none';
  }, []);






  return (
    <>
    
      <div
        ref={containerRef}
        className={`relative cursor-default  backdrop-brightness-105 bg-blend-hard-light h-fit  font-medium  top-left-animation  ${choiceTheme == 'white' ? 'bg-zinc-100 font-pixelify-sans' : choiceTheme == 'blue' ? 'font-spicy-rice-regular' : 'font-serif bg-black'}`}
      >

        <div className={`h-1/5 md:h-3/5 flex flex-col w-full text-center ${choiceTheme == 'red' ?  'text-red-200' : choiceTheme == 'blue' ? 'text-blue-200' : choiceTheme == 'white' ? 'text-zinc-400' : 'text-gray-200'}`}>
          <div
            ref={titleRef}
            className={`h-[45rem] md:h-[42rem] overflow-hidden backdrop-hue-rotate-90 backdrop-grayscale  backdrop-contrast-150 backdrop-blur-md backdrop-brightness-110 rounded-b-xl pt-9 ml-4 mr-4 flex flex-col justify-center items-center ${choiceTheme == 'red' ?  'bg-red-600 text-zinc-900' : choiceTheme == 'blue' ? ' text-zinc-50 bg-gradient-to-r from-black via-blue-600 to-black shadow-md shadow-black/50' : choiceTheme == 'white' ? 'pt-28 bg-zinc-100 text-zinc-800' : 'bg-gradient-to-r from-black via-gray-900 to-black shadow-lg shadow-black/50'}`}
          >

            <div className='flex flex-col z-50 absolute right-2 top-4'>
              <p onClick={()=> setChoiceTheme('blue')} className='w-4 h-4 bg-blue-500 mt-3 border border-white rounded-sm'/>
              {/* <p onClick={()=> setChoiceTheme('red')} className='w-4 h-4 bg-red-500 mt-3 border border-white rounded-sm'/> */}
              <p onClick={()=> setChoiceTheme('white')} className='w-4 h-4 bg-white mt-3 border border-white rounded-sm'/>
              <p onClick={()=> setChoiceTheme('dark')} className='w-4 h-4 bg-zinc-900 mt-3 border border-white rounded-sm'/>
            </div>
            <div  className='flex z-30 absolute left-0 top-5 '>
              <Image src="/LOGOP.png" alt="logo" width={100} height={100} loading='lazy' className='w-28  md:w-32 '/>
            </div>

              
            
              <button className={`relative rounded-md px-2 mb-2 py-2  border-2 border-white hover:bg-white hover:text-black transition-colors duration-200  text-sm ${choiceTheme == 'red' ?  'bg-red-600 border-zinc-900' : choiceTheme == 'blue' ? 'bg-blue-600' : choiceTheme == 'white' ? 'bg-zinc-100 border-zinc-500' : 'bg-zinc-950 text-white hover:border-white'}`}>
              <a
                className="font-mono "
                href="https://drive.google.com/file/d/1UvJjKtmezPk-4623rI-QvvhJkL9jR-7K/view"
                target="_blank"  
                rel="noopener noreferrer" 
              >
                VIEW CV
              </a>
              </button>

              <div className='flex flex-col justify-center items-center h-screen '>
                <p className='text-[3rem] md:text-[6rem]'>Hello, I'M</p>
                
                <p className='text-[4rem] md:text-[10rem]'>SARANG</p>
              </div>
            
            
          </div>
          <div className="flex flex-col md:flex md:flex-row  m-4 rounded-lg backdrop-hue-rotate-90 backdrop-grayscale  backdrop-contrast-150 backdrop-blur-md backdrop-brightness-110">
            


            <div
              ref={contactRef}
              className={` m-3${choiceTheme == 'white' ? 'h-4/4 md:w-3/3' : 'h-4/4 md:w-3/3 '}`}
            >
              <div className={`relative h-52 md:h-72  text-right ${timeTheme === 'morning' ? 'bg-cyan-600 ' : timeTheme === 'afternoon' ? 'bg-emerald-500' : 'bg-zinc-500'}  p-4`}>
              
                <div className={`absolute -bottom-2 -right-2  w-full h-full ${choiceTheme == 'red' ?  'bg-red-700 ' : choiceTheme == 'blue' ? 'bg-black ' : choiceTheme == 'white' ? 'bg-zinc-100 text-zinc-500 border-2 border-zinc-300' : 'bg-black  border-2 rounded-md '}`}></div>
              
                <div className={` ${choiceTheme == 'white' ? 'font-silkscreen-regular ' : 'font-sans text-lg '} relative  flex flex-col justify-between font-semi-bold md:text-3xl  z-10 w-full h-full text-stone-900 overflow-y-scroll text-md `} style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  
                  <p className={`leading-relaxed md:leading-relaxed ${choiceTheme == 'white' ? 'text-gray-500' : choiceTheme == 'blue' ? 'text-white ' : choiceTheme == 'dark' ? 'text-zinc-200' : 'text-stone-900'}`}><span className={`${timeTheme === 'morning' ? 'text-cyan-500' : timeTheme === 'afternoon' ? 'text-emerald-500' : 'text-zinc-500'} font-bold `}>{greeting}</span> everyone! I'M <span className='font-bold '>Sarang </span>— a dedicated developer, driven by a passion for coding, committed to achieving excellence, and constantly seeking opportunities to grow and learn.</p>
  
                </div>
              </div>





            <div className={`${choiceTheme == 'white '|| 'dark' ? 'flex flex-col md:flex-row md:justify-around' : ''}`}>
              <div className='text-left mt-3 rounded-xl p-4'>
                <div className='underline underline-offset-8 text-2xl mb-4 '>Skills</div>
                
                
                <div className={`space-y-4  text-xs ${choiceTheme == 'white' ? 'font-silkscreen-regular' : ' font-serif'}`}>
                  <div className='flex items-center justify-between'>
                    <span className='font-bold '>JavaScript</span>
                    <div className='relative ml-1 w-64 h-4  pixel-bar bg-stone-800'>
                      <div className={`absolute pl-1 top-0 left-0 h-full  pixel-bar ${timeTheme === 'morning' ? 'bg-cyan-500' : timeTheme === 'afternoon' ? 'bg-emerald-500' : 'bg-zinc-500'} ${choiceTheme === 'red' ? ' bg-red-600 animate-glow' : ''}`} style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='font-bold'>Reactjs</span>
                    <div className='relative ml-1 w-64 h-4 pixel-bar bg-stone-800'>
                      <div className={`absolute pl-1 top-0 left-0 h-full  pixel-bar ${timeTheme === 'morning' ? 'bg-cyan-500' : timeTheme === 'afternoon' ? 'bg-emerald-500' : 'bg-zinc-500'} ${choiceTheme === 'red' ? ' bg-red-600 ' : ''}`} style={{ width: '88%' }}></div>
                    </div>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='font-bold'>Nextjs</span>
                    <div className='relative ml-1 w-64 h-4 pixel-bar bg-stone-800'>
                      <div className={`absolute  top-0 left-0 h-full  pixel-bar ${timeTheme === 'morning' ? 'bg-cyan-500' : timeTheme === 'afternoon' ? 'bg-emerald-500' : 'bg-zinc-500'} ${choiceTheme === 'red' ? ' bg-red-600 animate-glow' : ''}`} style={{ width: '80%' }}></div>
                    </div>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='font-bold'>HTML & CSS</span>
                    <div className='relative ml-1 w-64 h-4 pixel-bar bg-stone-800'>
                      <div className={`absolute  top-0 left-0 h-full  pixel-bar ${timeTheme === 'morning' ? 'bg-cyan-500' : timeTheme === 'afternoon' ? 'bg-emerald-500' : 'bg-zinc-500'} ${choiceTheme === 'red' ? ' bg-red-600 ' : ''}`} style={{ width: '95%' }}></div>
                    </div>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='font-bold'>Python</span>
                    <div className='relative ml-1 w-64 h-4 pixel-bar bg-stone-800'>
                      <div className={`absolute  top-0 left-0 h-full  pixel-bar ${timeTheme === 'morning' ? 'bg-cyan-500' : timeTheme === 'afternoon' ? 'bg-emerald-500' : 'bg-zinc-500'} ${choiceTheme === 'red' ? ' bg-red-600 animate-glow' : ''}`} style={{ width: '80%' }}></div>
                    </div>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='font-bold'>PSQL</span>
                    <div className='relative ml-1 w-64 h-4 pixel-bar bg-stone-800'>
                      <div className={`absolute top-0 left-0 h-full  pixel-bar ${timeTheme === 'morning' ? 'bg-cyan-500' : timeTheme === 'afternoon' ? 'bg-emerald-500' : 'bg-zinc-500'} ${choiceTheme === 'red' ? ' bg-red-600 ' : ''}`} style={{ width: '70%' }}></div>
                    </div>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='font-bold'>Django & DRF</span>
                    <div className='relative ml-1 w-64 h-4 pixel-bar bg-stone-800'>
                      <div className={`absolute  top-0 left-0 h-full  pixel-bar ${timeTheme === 'morning' ? 'bg-cyan-500' : timeTheme === 'afternoon' ? 'bg-emerald-500' : 'bg-zinc-500'} ${choiceTheme === 'red' ? ' bg-red-600 animate-glow' : ''}`} style={{ width: '70%' }}></div>
                    </div>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='font-bold'>ORM</span>
                    <div className='relative ml-1 w-64 h-4 pixel-bar bg-stone-800'>
                      <div className={`absolute  top-0 left-0 h-full  pixel-bar ${timeTheme === 'morning' ? 'bg-cyan-500' : timeTheme === 'afternoon' ? 'bg-emerald-500' : 'bg-zinc-500'} ${choiceTheme === 'red' ? ' bg-red-600 ' : ''}`} style={{ width: '60%' }}></div>
                    </div>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='font-bold'>Tailwind CSS</span>
                    <div className='relative ml-1 w-64 h-4 pixel-bar bg-stone-800'>
                      <div className={`absolute  top-0 left-0 h-full  pixel-bar ${timeTheme === 'morning' ? 'bg-cyan-500' : timeTheme === 'afternoon' ? 'bg-emerald-500' : 'bg-zinc-500'} ${choiceTheme === 'red' ? ' bg-red-600 animate-glow' : ''}`} style={{ width: '95%' }}></div>
                    </div>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='font-bold'>Redux</span>
                    <div className='relative ml-1 w-64 h-4 pixel-bar bg-stone-800'>
                      <div className={`absolute  top-0 left-0 h-full  pixel-bar ${timeTheme === 'morning' ? 'bg-cyan-500' : timeTheme === 'afternoon' ? 'bg-emerald-500' : 'bg-zinc-500'} ${choiceTheme === 'red' ? ' bg-red-600 ' : ''}`} style={{ width: '70%' }}></div>
                    </div>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='font-bold hover:font-extrabold'>GSAP</span>
                    <div className='relative ml-1 w-64 h-4 pixel-bar bg-stone-800'>
                      <div className={`absolute  top-0 left-0 h-full  pixel-bar ${timeTheme === 'morning' ? 'bg-cyan-500' : timeTheme === 'afternoon' ? 'bg-emerald-500' : 'bg-zinc-500'} ${choiceTheme === 'red' ? ' bg-red-600 animate-glow' : ''}`} style={{ width: '50%' }}></div>
                    </div>
                  </div>

                </div>

              </div>



                {choiceTheme == 'white' || 'dark' ?
                  <>
                    <div className='hidden lg:flex'>
                      <img className='opacity-[0.50]' src="./graphics1.png" alt="" />
                    </div>
                  </>
                :
                  <>

                  </>
                }
              
            </div>  


            </div>
          </div>
        </div>







        <div className={`h-2/5 text-gray-200 m-2 rounded-lg   text-2xl ${choiceTheme == 'red' ?  'bg-black font-sans' : choiceTheme == 'blue' ? 'font-serif bg-black' : choiceTheme == 'white' ? 'font-pixelify-sans bg-zinc-200 text-gray-900' : 'bg-black font-sans text-gray-200 border-t-4'}`}>
          <div className="m-4 ">
            <p className={`${choiceTheme == 'white' ? 'text-zinc-500' : ''} flex items-center justify-center mb-5`}>
             My Projects
            </p>
            <div ref={projectsRef} className='flex  items-center flex-col overflow-hidden md:overflow-x-auto custom-scrollbar text-zinc-900 mb-3 pb-5'>
              <div className={`relative right-11  md:right-32 mt-5 md:mt-0 project-item md:ml-5 ml-10 mb-3 w-fit  ${choiceTheme == 'white' ? 'bg-zinc-100' : ''} bg-pixel-pattern bg-pixel p-1 cursor-pointer`}>
                  <div
                   className={`
                   ${choiceTheme == 'red' ?  ' text-zinc-100' : choiceTheme == 'blue' ? 'text-zinc-100' : choiceTheme == 'white' ? 'bg-zinc-200 text-zinc-400' : 'bg-stone-950 text-gray-200'}  w-72 h-44 md:w-[580px] md:h-96 pl-4 pr-4 md:bg-transparent
                   `}>
                    <div className='flex justify-between'>
                      <p>
                      BaBy Land <span className='text-xs'> <a href="https://github.com/sarangk07/Ecommerce-baby-products" target="_blank">- git</a></span>
                      </p>
                      <p className='text-xs md:text-sm cursor-default'>Mini-Project</p>
                    </div>
                    
                  
                  <a href="https://ecommerce-baby-products.vercel.app/" target="_blank">
                  {/* <img className={`${choiceTheme == 'red' ?  'shadow-custom-red ' : choiceTheme == 'blue' ? 'shadow-custom-blue' :'shadow-md'} opacity-[0.9] md:w-fit md:h-72 h-44 w-64`} src="https://i.pinimg.com/564x/d8/fe/c7/d8fec7801132a9a4f9c530b98396e295.jpg" alt="" loading='lazy' data-src="./Baby-Products.PNG" /> */}
                  
                  <Image
                    className={`${choiceTheme == 'red' ? 'shadow-custom-red' : choiceTheme == 'blue' ? 'shadow-custom-blue' : 'shadow-md'} opacity-[0.9] md:w-fit md:h-72 h-44 w-64`}
                    src="/Baby-Products.PNG"
                    alt="Baby Land"
                    width={500}
                    height={300}
                    loading='lazy'
                    
                    
                  />
                  </a>
                  <p className='hidden md:flex text-md  cursor-default hover:text-black'>Developed a small e-commerce website with Reactjs,Bootstrap</p>

                </div>


                <div className={`
                   ${choiceTheme == 'red' ? 'bg-red-600 animate-glow' : choiceTheme == 'blue' ? 'bg-blue-600 animate-glowBlue' : choiceTheme == 'white' ? 'bg-zinc-400' : 'bg-zinc-800'}
                  hidden md:flex h-full w-2 absolute top-1 -right-64 `} />              
              </div>



              <div className={`relative left-1  md:left-32 mt-5 md:mt-0 project-item md:ml-5 ml-10 mb-3 w-fit  ${choiceTheme == 'white' ? 'bg-zinc-100' : ''} bg-pixel-pattern bg-pixel p-1 cursor-pointer`}>
                  <div className={`
                 ${choiceTheme == 'red' ?  ' text-zinc-100' : choiceTheme == 'blue' ? 'text-zinc-100' : choiceTheme == 'white' ? 'bg-zinc-200 text-zinc-400' : 'bg-stone-950 text-gray-200'}  w-72 h-44 md:w-[580px] md:h-96 pl-4 pr-4 md:bg-transparent
                  `}>
                    <div className='flex justify-between'>
                      <p>
                        Modes Arena <span className='text-xs'> <a href="https://github.com/sarangk07/Car-Modz" target="_blank">- git</a></span>
                      </p>
                      <p className='hidden md:flex text-xs md:text-sm cursor-default'>
                        Main-Project
                      </p>
                    </div>
                  {/* <img className={`${choiceTheme == 'red' ?  'shadow-custom-red ' : choiceTheme == 'blue' ? 'shadow-custom-blue' :'shadow-md'} md:w-fit md:h-72 h-44 w-64`} src="https://i.pinimg.com/564x/d8/fe/c7/d8fec7801132a9a4f9c530b98396e295.jpg" alt="" loading='lazy' data-src="./ModeArea.PNG" /> */}


                  <Image
                    className={`${choiceTheme == 'red' ? 'shadow-custom-red' : choiceTheme == 'blue' ? 'shadow-custom-blue' : 'shadow-md'} opacity-[0.9] md:w-fit md:h-72 h-44 w-64`}
                    src="/Mode-Arena-latest.PNG"
                    alt="ModeArea"
                    width={500}
                    height={300}
                    loading='lazy'
                  />

                  <p className='hidden cursor-default md:flex md:flex-col text-md hover:text-black'>Developed a website for car accesseries with <span className='text-[17px] font-bold'>Nextjs,Tailwindcss,Redux,GSAP,Python-Django,DRF,SQLlite</span></p>

                </div>
                <div className={`
                   ${choiceTheme == 'red' ? 'bg-red-600 animate-glow' : choiceTheme == 'blue' ? 'bg-blue-600 animate-glowBlue' : choiceTheme == 'white' ? 'bg-zinc-400' : 'bg-zinc-800'}
                  hidden md:flex h-full w-2 absolute top-1 -left-64 `} />
              </div>



              <div className={`relative right-11  md:right-32 mt-5 md:mt-0 project-item md:ml-5 ml-10 mb-3 w-fit  ${choiceTheme == 'white' ? 'bg-zinc-100' : ''} bg-pixel-pattern bg-pixel p-1 cursor-pointer`}>
                  <div className={`
                   ${choiceTheme == 'red' ?  ' text-zinc-100' : choiceTheme == 'blue' ? 'text-zinc-100' : choiceTheme == 'white' ? 'bg-zinc-200 text-zinc-400' : 'bg-stone-950 text-gray-200'}  w-72 h-44 md:w-[580px] md:h-96 pl-4 pr-4 md:bg-transparent
                    `}>

                    <div className='flex justify-between'>
                      <p>
                        RentKaroo <span className='text-xs'> <a href="https://github.com/sarangk07/Rent_karoo" target="_blank">- git</a></span>
                      </p>
                      {/* <p className=' text-xs md:text-sm cursor-default'>
                        Main-Project
                      </p> */}
                    </div>
                   <a href="https://rentkaro.shop/" target="_blank">
                   {/* <img className={`${choiceTheme == 'red' ?  'shadow-custom-red ' : choiceTheme == 'blue' ? 'shadow-custom-blue' :'shadow-md'} md:w-fit md:h-72 h-44 w-64`} src="https://i.pinimg.com/564x/d8/fe/c7/d8fec7801132a9a4f9c530b98396e295.jpg" alt="" loading='lazy' data-src="./RentKaro.PNG" /> */}
                   
                   <Image
                      className={`${choiceTheme == 'red' ? 'shadow-custom-red' : choiceTheme == 'blue' ? 'shadow-custom-blue' : 'shadow-md'} opacity-[0.9] md:w-fit md:h-72 h-44 w-64`}
                      src="/RentKaro.PNG"
                      alt="RentKaro"
                      width={500}
                      height={300}
                      loading='lazy'
                    />
                   
                   </a>
                  <p className='hidden cursor-default md:flex text-md hover:text-black'>Developed a Rent a Car website using python Django,PSQL,JWT,SMTP,AWS,Razorpay</p>

                </div>
                <div className={`
                  ${choiceTheme == 'red' ? 'bg-red-600 animate-glow' : choiceTheme == 'blue' ? 'bg-blue-600 animate-glowBlue' : choiceTheme == 'white' ? 'bg-zinc-400' : 'bg-zinc-800'}
                  hidden md:flex h-full w-2 absolute top-1 -right-64 `} />
              </div>



              <div className={`relative left-1  md:left-32 mt-5 md:mt-0 project-item md:ml-5 ml-10 mb-3 w-fit  ${choiceTheme == 'white' ? 'bg-zinc-100' : ''} bg-pixel-pattern bg-pixel p-1 cursor-pointer`}>
                  <div className={`
                    ${choiceTheme == 'red' ?  ' text-zinc-100' : choiceTheme == 'blue' ? 'text-zinc-100' : choiceTheme == 'white' ? 'bg-zinc-200 text-zinc-400' : 'bg-stone-950 text-gray-200'}  w-72 h-44 md:w-[580px] md:h-96 pl-4 pr-4 md:bg-transparent
                    
                    `}>

                      <div className='flex justify-between'>
                      <p>
                        Virtual Mingle <span className='text-xs'> <a href="https://github.com/sarangk07/Social-Media--Frontend-" target="_blank">- git</a></span>
                      </p>
                      <p className='hidden md:flex text-xs md:text-sm cursor-default'>
                        Main-Project
                      </p>
                    </div>
                  <a href="https://social-media-azure-alpha.vercel.app/" target="_blank">
                  {/* <img  className={`${choiceTheme == 'red' ?  'shadow-custom-red ' : choiceTheme == 'blue' ? 'shadow-custom-blue' :'shadow-md'} md:w-fit md:h-72 h-44 w-64`} src="https://i.pinimg.com/564x/d8/fe/c7/d8fec7801132a9a4f9c530b98396e295.jpg" alt="" loading='lazy' data-src="./social-meadia.PNG" /> */}
                  
                  <Image
                    className={`${choiceTheme == 'red' ? 'shadow-custom-red' : choiceTheme == 'blue' ? 'shadow-custom-blue' : 'shadow-md'} opacity-[0.9] md:w-fit md:h-72 h-44 w-64`}
                    src="/social-meadia.PNG"
                    alt="social-meadia"
                    width={500}
                    height={300}
                    loading='lazy'
                  />
                  
                  </a>
                  <p className='hidden cursor-default md:flex text-md hover:text-black'>Developed a social meadia website using NEXTJS ,API ,Tailwindcss ,GSAP</p>
                </div>
                <div className={`
                   ${choiceTheme == 'red' ? 'bg-red-600 animate-glow' : choiceTheme == 'blue' ? 'bg-blue-600 animate-glowBlue' : choiceTheme == 'white' ? 'bg-zinc-400' : 'bg-zinc-800'}
                  hidden md:flex h-full w-2 absolute top-1 -left-64 `} />

              </div>


              <div className={`relative right-11  md:right-32 mt-5 md:mt-0 project-item md:ml-5 ml-10 mb-3 w-fit  ${choiceTheme == 'white' ? 'bg-zinc-100' : ''} bg-pixel-pattern bg-pixel p-1 cursor-pointer`}>
                  <div className={`
                    ${choiceTheme == 'red' ?  ' text-zinc-100' : choiceTheme == 'blue' ? 'text-zinc-100' : choiceTheme == 'white' ? 'bg-zinc-200 text-zinc-400' : 'bg-stone-950 text-gray-200'}  w-72 h-44 md:w-[580px] md:h-96 pl-4 pr-4 md:bg-transparent
                    
                    `}>

                      <div className='flex justify-between'>
                      <p>
                        QuZ <span className='text-xs'> <a href="https://github.com/sarangk07/quz" target="_blank">- git</a></span>
                      </p>
                      <p className='flex text-xs md:text-sm cursor-default'>
                        Mini-Project
                      </p>
                    </div>
                  <a href="https://quz-game.vercel.app/" target="_blank">
                  {/* <img  className={`${choiceTheme == 'red' ?  'shadow-custom-red ' : choiceTheme == 'blue' ? 'shadow-custom-blue' :'shadow-md'} md:w-fit md:h-72 h-44 w-64`} src="https://i.pinimg.com/564x/d8/fe/c7/d8fec7801132a9a4f9c530b98396e295.jpg" alt="" loading='lazy' data-src="./social-meadia.PNG" /> */}
                  
                  <Image
                    className={`${choiceTheme == 'red' ? 'shadow-custom-red' : choiceTheme == 'blue' ? 'shadow-custom-blue' : 'shadow-md'} opacity-[0.9] md:w-fit md:h-72 h-44 w-64`}
                    src="/quz.PNG"
                    alt="qz"
                    width={500}
                    height={300}
                    loading='lazy'
                  />
                  
                  </a>
                  <p className='hidden cursor-default md:flex text-md hover:text-black'>Developed a Quiz-game using NEXTJS ,Open-Trivia API ,Tailwindcss</p>
                </div>
                <div className={`
                  ${choiceTheme == 'red' ? 'bg-red-600 animate-glow' : choiceTheme == 'blue' ? 'bg-blue-600 animate-glowBlue' : choiceTheme == 'white' ? 'bg-zinc-400' : 'bg-zinc-800'}
                  hidden md:flex h-full w-2 absolute top-1 -right-64 `} />

              </div>


              <div className={`relative left-1  md:left-32 mt-5 md:mt-0 project-item md:ml-5 ml-10 mb-3 w-fit  ${choiceTheme == 'white' ? 'bg-zinc-100' : ''} bg-pixel-pattern bg-pixel p-1 cursor-pointer`}>
                  <div className={`
                    ${choiceTheme == 'red' ?  ' text-zinc-100' : choiceTheme == 'blue' ? 'text-zinc-100' : choiceTheme == 'white' ? 'bg-zinc-200 text-zinc-400' : 'bg-stone-950 text-gray-200'}  w-72 h-44 md:w-[580px] md:h-96 pl-4 pr-4 md:bg-transparent
                    
                    `}>

                      <div className='flex justify-between'>
                      <p>
                        Poki-Arena<span className='text-xs'> </span>
                      </p>
                      <p className='flex text-xs md:text-sm cursor-default'>
                        in-progress
                      </p>
                    </div>
                  <a href="https://mini-games-five.vercel.app/" target="_blank">
                  {/* <img  className={`${choiceTheme == 'red' ?  'shadow-custom-red ' : choiceTheme == 'blue' ? 'shadow-custom-blue' :'shadow-md'} md:w-fit md:h-72 h-44 w-64`} src="https://i.pinimg.com/564x/d8/fe/c7/d8fec7801132a9a4f9c530b98396e295.jpg" alt="" loading='lazy' data-src="./social-meadia.PNG" /> */}
                  
                  <Image
                    className={`${choiceTheme == 'red' ? 'shadow-custom-red' : choiceTheme == 'blue' ? 'shadow-custom-blue' : 'shadow-md'} opacity-[0.9] md:w-fit md:h-72 h-44 w-64`}
                    src="/poki-arena.png"
                    alt="poki-arena"
                    width={500}
                    height={300}
                    loading='lazy'
                  />
                  
                  </a>
                  <p className='hidden cursor-default md:flex text-md hover:text-black'>Developed a LUDO game using NEXTJS, Tailwindcss.</p>
                </div>
                <div className={`
                   ${choiceTheme == 'red' ? 'bg-red-600 animate-glow' : choiceTheme == 'blue' ? 'bg-blue-600 animate-glowBlue' : choiceTheme == 'white' ? 'bg-zinc-400' : 'bg-zinc-800'}
                  hidden md:flex h-full w-2 absolute top-1 -left-64 `} />

              </div>



            </div>
          </div>




          <div className="m-4 flex border-spacing-9  border-t-4">
            <div className={`${choiceTheme == 'white' ? 'text-zinc-400' : ''} w-full p-3 flex flex-col justify-center items-center overflow-x-auto  custom-scrollbar`}>
              <p>
                "Got a project in mind? Let’s turn it into reality.
              </p>
              <p>
                Let’s build something amazing together.
              </p>
              
              <p className='mb-5'>
                Reach out and let’s collaborate on your next big idea."
              </p>
              
              
               <a href="mailto:sarang00005@gmail.com" className='border  p-2 pt-1 m-2 rounded-lg' >sarang00005@gmail.com</a>


               <div className=' flex md:mt-5 mt-0 ml-4 justify-center '>
                
                <svg
                 className={`w-10 h-10 ${choiceTheme == 'white' ? 'hover:text-zinc-400 text-black transform hover:duration-200' : 'text-white'} `} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    fillRule="evenodd" 
                    clipRule="evenodd" 
                    d="M128 32C74.9807 32 32 74.9807 32 128V384C32 437.019 74.9807 480 128 480H384C437.019 480 480 437.019 480 384V128C480 74.9807 437.019 32 384 32H128ZM175.999 116.001C169.372 107.165 156.836 105.374 147.999 112.001C139.163 118.629 137.372 131.165 143.999 140.001L230.999 256.001L143.999 372.001C137.372 380.838 139.163 393.374 147.999 400.001C156.836 406.629 169.372 404.838 175.999 396.001L255.999 289.335L335.999 396.001C342.627 404.838 355.163 406.629 363.999 400.001C372.836 393.374 374.627 380.838 367.999 372.001L280.999 256.001L367.999 140.001C374.627 131.165 372.836 118.629 363.999 112.001C355.163 105.374 342.627 107.165 335.999 116.001L255.999 222.668L175.999 116.001Z" 
                    fill="currentColor" 
                  />
                </svg>

                <a href="https://www.linkedin.com/in/sarang-k-2b7844244/">
                <svg className={`w-10 h-10 ${choiceTheme == 'white' ?  'hover:text-zinc-400 text-blue-600 transform hover:duration-200' : 'text-white'} `} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 107.3 107.3">
                  <g id="Layer_2" data-name="Layer 2">
                    <g data-name="图层 1">
                      <path 
                        className="cls-1" 
                        d="M82,58.16v20a.89.89,0,0,1-.9.89H70.78a.89.89,0,0,1-.89-.89V59.56c0-4.89-1.75-8.24-6.14-8.24a6.62,6.62,0,0,0-6.21,4.43,8.29,8.29,0,0,0-.4,3V78.16a.89.89,0,0,1-.9.89H45.92a.88.88,0,0,1-.89-.89c0-5,.12-29,0-34.63a.89.89,0,0,1,.89-.91h10.3a.9.9,0,0,1,.9.9v4.26a.83.83,0,0,0-.08.12h.08v-.12a12,12,0,0,1,10.91-6c8,0,14,5.2,14,16.39ZM27.11,79.05H37.43a.89.89,0,0,0,.89-.89V43.52a.89.89,0,0,0-.89-.9H27.11a.9.9,0,0,0-.9.9V78.16A.89.89,0,0,0,27.11,79.05Z"
                        fill="currentColor"
                      />
                      <circle className="cls-1" cx="31.91" cy="31.5" r="6.48" fill="currentColor"/>
                      <path 
                        className="cls-1" 
                        d="M88.49,6.89a11.94,11.94,0,0,1,11.92,11.92V88.49a11.94,11.94,0,0,1-11.92,11.92H18.81A11.94,11.94,0,0,1,6.89,88.49V18.81A11.94,11.94,0,0,1,18.81,6.89H88.49m0-6.89H18.81A18.81,18.81,0,0,0,0,18.81V88.49A18.81,18.81,0,0,0,18.81,107.3H88.49A18.81,18.81,0,0,0,107.3,88.49V18.81A18.81,18.81,0,0,0,88.49,0Z" 
                        fill="currentColor"
                      />
                    </g>
                  </g>
                </svg>
                </a>


                <a href="https://github.com/sarangk07">
                <svg className={`w-10 h-10 ${choiceTheme == 'white' ? 'hover:text-zinc-400 text-zinc-900 transform hover:duration-100' : 'text-white'} `} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
                  <g fill="currentColor">
                    <path fillRule="evenodd" d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z" clipRule="evenodd"></path>
                    <path d="M26.484 91.806c-.133.3-.605.39-1.035.185-.44-.196-.685-.605-.543-.906.13-.31.603-.395 1.04-.188.44.197.69.61.537.91zm-.743-.55M28.93 94.535c-.287.267-.85.143-1.232-.28-.396-.42-.47-.983-.177-1.254.298-.266.844-.14 1.24.28.394.426.472.984.17 1.255zm-.575-.618M31.312 98.012c-.37.258-.976.017-1.35-.52-.37-.538-.37-1.183.01-1.44.373-.258.97-.025 1.35.507.368.545.368 1.19-.01 1.452zm0 0M34.573 101.373c-.33.365-1.036.267-1.552-.23-.527-.487-.674-1.18-.343-1.544.336-.366 1.045-.264 1.564.23.527.486.686 1.18.333 1.543zm0 0M39.073 103.324c-.147.473-.825.688-1.51.486-.683-.207-1.13-.76-.99-1.238.14-.477.823-.7 1.512-.485.683.206 1.13.756.988 1.237zm0 0M44.016 103.685c.017.498-.563.91-1.28.92-.723.017-1.308-.387-1.315-.877 0-.503.568-.91 1.29-.924.717-.013 1.306.387 1.306.88zm0 0M48.614 102.903c.086.485-.413.984-1.126 1.117-.7.13-1.35-.172-1.44-.653-.086-.498.422-.997 1.122-1.126.714-.123 1.354.17 1.444.663zm0 0"></path>
                  </g>
                </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div
          ref={footerRef}
          className={`h-2/5 md:h-1/5 rounded-lg ml-2 mr-2  text-center font-pixelify-sans text-2xl ${choiceTheme == 'red' ?  'bg-zinc-950 ' : choiceTheme == 'blue' ? 'bg-zinc-950' : choiceTheme == 'white' ? 'bg-zinc-200 ' : 'bg-zinc-950'}`}
        >
          TNX
        </div>
      </div>
      
    </>
  );
}

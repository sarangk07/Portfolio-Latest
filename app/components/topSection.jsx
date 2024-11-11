import { memo } from 'react';
import Image from 'next/image';

// Extract theme classes to reduce computation
const getThemeClasses = {
  container: {
    white: 'bg-zinc-100 font-pixelify-sans',
    blue: 'font-spicy-rice-regular',
    dark: 'font-serif bg-black',
  },
  text: {
    red: 'text-red-200',
    blue: 'text-blue-200',
    white: 'text-zinc-400',
    dark: 'text-gray-200',
  },
  title: {
    red: 'bg-red-600 text-zinc-900',
    blue: 'text-zinc-50 bg-gradient-to-r from-black via-blue-600 to-black shadow-md shadow-black/50',
    white: 'pt-28 bg-zinc-100 text-zinc-800',
    dark: 'bg-gradient-to-r from-black via-gray-900 to-black shadow-lg shadow-black/50',
  },
};

// Memoized theme buttons component
const ThemeButtons = memo(({ setChoiceTheme }) => (
  <div className='flex flex-col z-50 absolute right-2 top-4'>
    <button 
      onClick={() => setChoiceTheme('blue')} 
      className='w-4 h-4 bg-blue-500 mt-3 border border-white rounded-sm'
      aria-label="Blue theme"
    />
    <button 
      onClick={() => setChoiceTheme('white')} 
      className='w-4 h-4 bg-white mt-3 border border-white rounded-sm'
      aria-label="White theme"
    />
    <button 
      onClick={() => setChoiceTheme('dark')} 
      className='w-4 h-4 bg-zinc-900 mt-3 border border-white rounded-sm'
      aria-label="Dark theme"
    />
  </div>
));

// Memoized skill bar component
const SkillBar = memo(({ skill, percentage, timeTheme, choiceTheme }) => (
  <div className='flex items-center justify-between'>
    <span className='font-bold'>{skill}</span>
    <div className='relative ml-1 w-64 h-4 pixel-bar bg-stone-800'>
      <div 
        className={`absolute top-0 left-0 h-full pixel-bar
          ${timeTheme === 'morning' ? 'bg-cyan-500' : 
            timeTheme === 'afternoon' ? 'bg-emerald-500' : 
            'bg-zinc-500'}
          ${choiceTheme === 'red' ? 'bg-red-600' : ''}`
        }
        style={{ 
          width: `${percentage}%`,
          transform: 'translateZ(0)' // Hardware acceleration
        }}
      />
    </div>
  </div>
));

const skills = [
  { name: 'JavaScript', level: 85 },
  { name: 'Reactjs', level: 88 },
  { name: 'Nextjs', level: 80 },
  { name: 'HTML & CSS', level: 95 },
  { name: 'Python', level: 80 },
  { name: 'PSQL', level: 70 },
  { name: 'Django & DRF', level: 70 },
  { name: 'ORM', level: 60 },
  { name: 'Tailwind CSS', level: 95 },
  { name: 'Redux', level: 70 },
  { name: 'GSAP', level: 50 },
];

const Portfolio = ({titleRef, contactRef, choiceTheme, timeTheme, greeting, setChoiceTheme }) => {
  // Compute classes once
 
  const textClass = getThemeClasses.text[choiceTheme] || getThemeClasses.text.dark;
  const titleClass = getThemeClasses.title[choiceTheme] || getThemeClasses.title.dark;

  return (
    <>
      <div className={`h-1/5 md:h-3/5 flex flex-col w-full text-center ${textClass}`}>
        <div
          ref={titleRef}
          className={`h-[45rem] md:h-[42rem] overflow-hidden backdrop-hue-rotate-90 backdrop-grayscale backdrop-contrast-150 backdrop-blur-md backdrop-brightness-110 rounded-b-xl pt-9 mx-4 flex flex-col justify-center items-center ${titleClass}`}
        >
          <ThemeButtons setChoiceTheme={setChoiceTheme} />
          
          <a
            href="https://drive.google.com/file/d/1UvJjKtmezPk-4623rI-QvvhJkL9jR-7K/view"
            target="_blank"
            rel="noopener noreferrer"
            className={`relative rounded-sm px-2 mb-2 py-2 border-2 border-white hover:bg-white hover:text-black transition-colors duration-200 text-sm font-mono
              ${choiceTheme === 'white' ? 'border-zinc-500' : 'text-white hover:border-white'}`}
          >
            VIEW CV
          </a>
          
          <div className='flex flex-col justify-center items-center h-screen'>
            <h1 className='text-[2rem] md:text-[3rem]'>Hello, I'M</h1>
            <h2 className='text-[1.5rem] md:text-[2rem]'>SARANG</h2>
          </div>
        </div>

        <div className="flex flex-col md:flex-row m-4 rounded-lg backdrop-hue-rotate-90 backdrop-grayscale backdrop-contrast-150 backdrop-blur-md backdrop-brightness-110">
          <div ref={contactRef} className="m-3 h-4/4 md:w-3/3">
            {/* Skills section */}
            <div className="text-left mt-3 rounded-xl p-4">
              <h3 className="underline underline-offset-8 text-2xl mb-4">Skills</h3>
              <div className={`space-y-4 text-xs ${choiceTheme === 'white' ? 'font-silkscreen-regular' : 'font-serif'}`}>
                {skills.map((skill) => (
                  <SkillBar
                    key={skill.name}
                    skill={skill.name}
                    percentage={skill.level}
                    timeTheme={timeTheme}
                    choiceTheme={choiceTheme}
                  />
                ))}
              </div>
            </div>
            
            {/* Conditional image rendering */}
            {(choiceTheme === 'white' || choiceTheme === 'dark') && (
              <div className="hidden lg:block">
                <Image
                  src="/graphics1.png"
                  alt="Decorative graphics"
                  width={300}
                  height={300}
                  className="opacity-50"
                  loading="lazy"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Portfolio);
// 'use client';

// import { useEffect, useRef } from 'react';
// import gsap from 'gsap';

// const TrustIcon = () => {
//   const containerRef = useRef(null);
//   const pathsRef = useRef([]);
//   pathsRef.current = [];

//   useEffect(() => {
//     if (typeof window === 'undefined' || !containerRef.current) return;
    
//     // Extract all animated path elements
//     const animatedPaths = Array.from(containerRef.current.querySelectorAll('g.animated-path > path'));
    
//     // Path interpolation function
//     const interpolatePath = (path1, path2, progress) => {
//       const extractNumbers = (path) => {
//         return path.match(/-?\d*\.?\d+/g).map(Number);
//       };
      
//       const nums1 = extractNumbers(path1);
//       const nums2 = extractNumbers(path2);
      
//       if (!nums1 || !nums2) return path1;
      
//       const interpolated = nums1.map((val, index) => {
//         if (index >= nums2.length) return val;
//         return val + (nums2[index] - val) * progress;
//       });
      
//       return `M${interpolated[0]},${interpolated[1]} C${interpolated[2]},${interpolated[3]} ${interpolated[4]},${interpolated[5]} ${interpolated[6]},${interpolated[7]} C${interpolated[8]},${interpolated[9]} ${interpolated[10]},${interpolated[11]} ${interpolated[12]},${interpolated[13]}`;
//     };
    
//     // Define the key path states - made circular for seamless looping
//     const pathStages = [
//       "M0,-799 C492.37,-799 799.05,-397.67 799.76,1.65 C800.47,402.58 477,801.5 0,801.5",
//       "M0,-799 C457.48,-799 741.89,-397.77 742.54,1.55 C743.20,402.48 442.67,801.5 0,801.5",
//       "M0,-799 C292.34,-799 471.24,-398.23 471.67,1.11 C472.09,402.02 280.12,801.5 0,801.5",
//       "M0,-799 C127.19,-799 200.60,-398.68 200.79,0.66 C200.98,401.56 117.58,801.5 0,801.5",
//       "M0,-799 C-37.96,-799 -70.04,-399.14 -70.08,0.21 C-70.13,401.11 -44.96,801.5 0,801.5",
//       "M0,-799 C-203.11,-799 -340.68,-399.60 -340.96,-0.24 C-341.24,400.65 -207.50,801.5 0,801.5",
//       "M0,-799 C-368.25,-799 -611.32,-400.06 -611.83,-0.69 C-612.35,400.19 -370.05,801.5 0,801.5",
//       // Added extra states to make the loop seamless
//       "M0,-799 C-450.00,-799 -700.00,-400.50 -700.50,-1.00 C-701.00,399.50 -440.00,801.5 0,801.5",
//       "M0,-799 C-492.37,-799 -799.05,-397.67 -799.76,1.65 C-800.47,402.58 -477,801.5 0,801.5",
//       // Critical: The last state flows back to the first state
//       "M0,-799 C-457.48,-799 -741.89,-397.77 -742.54,1.55 C-743.20,402.48 -442.67,801.5 0,801.5"
//     ];
    
//     // Create the animation timeline
//     const tl = gsap.timeline({
//       repeat: -1,
//       ease: "none"
//     });
    
//     // Calculate total animation duration based on number of paths
//     const totalDuration = 4; // Total time for one complete cycle
//     const staggerDelay = totalDuration / animatedPaths.length;
    
//     // Create the animation sequence with seamless looping
//     animatedPaths.forEach((path, index) => {
//       // Set initial path
//       path.setAttribute('d', pathStages[0]);
      
//       // Calculate the starting point in the animation cycle for this path
//       // This creates the illusion of continuous motion
//       const startProgress = index / animatedPaths.length;
      
//       // Create animation for this path
//       tl.to(path, {
//         duration: totalDuration,
//         onUpdate: function() {
//           // Calculate the current position in the animation cycle
//           const globalProgress = (this.progress() + startProgress) % 1;
          
//           // Map to path stages
//           const stageIndex = Math.floor(globalProgress * (pathStages.length - 1));
//           const nextStageIndex = (stageIndex + 1) % pathStages.length;
//           const stageProgress = (globalProgress * (pathStages.length - 1)) - stageIndex;
          
//           const interpolatedPath = interpolatePath(
//             pathStages[stageIndex], 
//             pathStages[nextStageIndex], 
//             stageProgress
//           );
          
//           path.setAttribute('d', interpolatedPath);
//         }
//       }, 0);
//     });
    
//     return () => {
//       tl.kill();
//     };
//   }, []);
  
//   return (
//     <div id="trust1" ref={containerRef} className="trust-icon">
//       <svg 
//         xmlns="http://www.w3.org/2000/svg" 
//         viewBox="0 0 1700 1700" 
//         width="1700" 
//         height="1700" 
//         style={{ width: '100%', height: '100%', transform: 'translate3d(0px, 0px, 0px)' }} 
//         preserveAspectRatio="xMidYMid meet"
//       >
//         <defs>
//           <clipPath id="__lottie_element_197">
//             <rect width="1700" height="1700" x="0" y="0" />
//           </clipPath>
//         </defs>
//         <g clipPath="url(#__lottie_element_197)">
//           {/* Static outer circle - does not animate */}
//           <g style={{ display: 'block' }} transform="matrix(0,1,-1,0,850,850)" opacity="1">
//             <path
//               strokeLinecap="butt" 
//               strokeLinejoin="miter" 
//               fillOpacity="0" 
//               strokeMiterlimit="4" 
//               stroke="rgb(239,76,44)" 
//               strokeOpacity="1" 
//               strokeWidth="18"
//               d="M0,-800 C441.52,-800 800,-441.52 800,0 C800,441.52 441.52,800 0,800 C-441.52,800 -800,441.52 -800,0 C-800,-441.52 -441.52,-800 0,-800z"
//             />
//           </g>
          
//           {/* Multiple animated paths - these will draw sequentially */}
//           {[...Array(8)].map((_, index) => (
//             <g key={index} className="animated-path" style={{ display: 'block' }} transform="matrix(0,1,-1,0,850,850)" opacity="1">
//               <path
//                 ref={el => pathsRef.current[index] = el}
//                 strokeLinecap="butt" 
//                 strokeLinejoin="miter" 
//                 fillOpacity="0" 
//                 strokeMiterlimit="4" 
//                 stroke="rgb(239,76,44)" 
//                 strokeOpacity="1" 
//                 strokeWidth="18"
//                 d="M0,-799 C492.37,-799 799.05,-397.67 799.76,1.65 C800.47,402.58 477,801.5 0,801.5"
//               />
//             </g>
//           ))}
//         </g>
//       </svg>
//     </div>
//   );
// };

// export default TrustIcon;


















'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const TrustIcon = () => {
  const containerRef = useRef(null);
  const pathsRef = useRef([]);
  pathsRef.current = [];

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;
    
    // Extract all animated path elements
    const animatedPaths = Array.from(containerRef.current.querySelectorAll('g.animated-path > path'));
    
    // Path interpolation function
    const interpolatePath = (path1, path2, progress) => {
      const extractNumbers = (path) => {
        return path.match(/-?\d*\.?\d+/g).map(Number);
      };
      
      const nums1 = extractNumbers(path1);
      const nums2 = extractNumbers(path2);
      
      if (!nums1 || !nums2) return path1;
      
      const interpolated = nums1.map((val, index) => {
        if (index >= nums2.length) return val;
        return val + (nums2[index] - val) * progress;
      });
      
      return `M${interpolated[0]},${interpolated[1]} C${interpolated[2]},${interpolated[3]} ${interpolated[4]},${interpolated[5]} ${interpolated[6]},${interpolated[7]} C${interpolated[8]},${interpolated[9]} ${interpolated[10]},${interpolated[11]} ${interpolated[12]},${interpolated[13]}`;
    };
    
    // Define the key path states - made circular for seamless looping
    const pathStages = [
      "M0,-799 C492.37,-799 799.05,-397.67 799.76,1.65 C800.47,402.58 477,801.5 0,801.5",
      "M0,-799 C457.48,-799 741.89,-397.77 742.54,1.55 C743.20,402.48 442.67,801.5 0,801.5",
      "M0,-799 C292.34,-799 471.24,-398.23 471.67,1.11 C472.09,402.02 280.12,801.5 0,801.5",
      "M0,-799 C127.19,-799 200.60,-398.68 200.79,0.66 C200.98,401.56 117.58,801.5 0,801.5",
      "M0,-799 C-37.96,-799 -70.04,-399.14 -70.08,0.21 C-70.13,401.11 -44.96,801.5 0,801.5",
      "M0,-799 C-203.11,-799 -340.68,-399.60 -340.96,-0.24 C-341.24,400.65 -207.50,801.5 0,801.5",
      "M0,-799 C-368.25,-799 -611.32,-400.06 -611.83,-0.69 C-612.35,400.19 -370.05,801.5 0,801.5",
      "M0,-799 C-450.00,-799 -700.00,-400.50 -700.50,-1.00 C-701.00,399.50 -440.00,801.5 0,801.5",
      "M0,-799 C-492.37,-799 -799.05,-397.67 -799.76,1.65 C-800.47,402.58 -477,801.5 0,801.5",
      "M0,-799 C-457.48,-799 -741.89,-397.77 -742.54,1.55 C-743.20,402.48 -442.67,801.5 0,801.5"
    ];
    
    // Create the animation timeline
    const tl = gsap.timeline({
      repeat: -1,
      ease: "none"
    });
    
    // Slower animation: increased from 4 to 6 seconds
    const totalDuration = 10;
    const staggerDelay = totalDuration / animatedPaths.length;
    
    // Create the animation sequence with seamless looping in reverse direction
    animatedPaths.forEach((path, index) => {
      // Set initial path
      path.setAttribute('d', pathStages[0]);
      
      // Calculate the starting point in the animation cycle for this path (reversed)
      // For reverse direction, we invert the startProgress calculation
      const startProgress = 1 - (index / animatedPaths.length);
      
      tl.to(path, {
        duration: totalDuration,
        onUpdate: function() {
          // Calculate the current position in the animation cycle (reversed)
          const globalProgress = (1 - (this.progress() + startProgress) % 1) % 1;
          
          // Map to path stages
          const stageIndex = Math.floor(globalProgress * (pathStages.length - 1));
          const nextStageIndex = (stageIndex + 1) % pathStages.length;
          const stageProgress = (globalProgress * (pathStages.length - 1)) - stageIndex;
          
          const interpolatedPath = interpolatePath(
            pathStages[stageIndex], 
            pathStages[nextStageIndex], 
            stageProgress
          );
          
          path.setAttribute('d', interpolatedPath);
        }
      }, 0);
    });
    
    return () => {
      tl.kill();
    };
  }, []);
  
  return (
    <div id="trust1" ref={containerRef} className="trust-icon">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1700 1700" 
        width="1700" 
        height="1700" 
        style={{ width: '100%', height: '100%', transform: 'translate3d(0px, 0px, 0px)' }} 
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <clipPath id="__lottie_element_197">
            <rect width="1700" height="1700" x="0" y="0" />
          </clipPath>
        </defs>
        <g clipPath="url(#__lottie_element_197)">
          {/* Static outer circle - does not animate */}
          <g style={{ display: 'block' }} transform="matrix(0,1,-1,0,850,850)" opacity="1">
            <path
              strokeLinecap="butt" 
              strokeLinejoin="miter" 
              fillOpacity="0" 
              strokeMiterlimit="4" 
              stroke="rgb(239,76,44)" 
              strokeOpacity="1" 
              strokeWidth="18"
              d="M0,-800 C441.52,-800 800,-441.52 800,0 C800,441.52 441.52,800 0,800 C-441.52,800 -800,441.52 -800,0 C-800,-441.52 -441.52,-800 0,-800z"
            />
          </g>
          
          {/* Multiple animated paths - these will draw sequentially in reverse */}
          {[...Array(8)].map((_, index) => (
            <g key={index} className="animated-path" style={{ display: 'block' }} transform="matrix(0,1,-1,0,850,850)" opacity="1">
              <path
                ref={el => pathsRef.current[index] = el}
                strokeLinecap="butt" 
                strokeLinejoin="miter" 
                fillOpacity="0" 
                strokeMiterlimit="4" 
                stroke="rgb(239,76,44)" 
                strokeOpacity="1" 
                strokeWidth="18"
                d="M0,-799 C492.37,-799 799.05,-397.67 799.76,1.65 C800.47,402.58 477,801.5 0,801.5"
              />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
};

export default TrustIcon;
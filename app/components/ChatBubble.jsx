



import React, { useState, useEffect, useCallback } from 'react';
import { Sparkles } from 'lucide-react';

const ChatBubble = ({ messages, typingSpeed = 50 }) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showBubble, setShowBubble] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [imageSrc, setImageSrc] = useState('./pixA1.png'); // Initial image
  const [flipImage, setFlipImage] = useState(false); // State to track flipping

  const startTyping = useCallback(() => {
    setCurrentMessageIndex(0);
    setDisplayedText('');
    setIsTyping(true);
    setShowBubble(true);
    setShowSparkle(false);
  }, []);

  useEffect(() => {
    startTyping();
  }, [startTyping]);

  useEffect(() => {
    if (currentMessageIndex < messages.length) {
      const message = messages[currentMessageIndex];
      let charIndex = 0;

      const typingInterval = setInterval(() => {
        if (charIndex < message.length) {
          setDisplayedText(message.slice(0, charIndex + 1));
          charIndex++;

          // Switch images every 3 characters to slow down the toggle speed
          if (charIndex % 3 === 0) {
            setImageSrc((prevSrc) => {
              // Toggle between images
              const newSrc = prevSrc === './pixA2.png' ? './pixA1.png' : './pixA2.png';
              
              // If the new image is the second one, flip it
              setFlipImage(newSrc === './pixA1.png');
              
              return newSrc;
            });
          }

        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
          setImageSrc('./pixA2.png'); // Reset to default image after typing
          setFlipImage(false); // Reset the flip
          setTimeout(() => {
            if (currentMessageIndex === messages.length - 1) {
              setShowBubble(false);
              setShowSparkle(true);
            } else {
              setIsTyping(true);
              setDisplayedText('');
              setCurrentMessageIndex((prev) => prev + 1);
            }
          }, 2000);
        }
      }, typingSpeed);

      return () => clearInterval(typingInterval);
    }
  }, [currentMessageIndex, messages, typingSpeed]);

  return (
    <div className=" font-jersey">
      <img 
        className={`w-12 top-4  md:top-0 md:w-14 absolute cursor-pointer  ${flipImage ? 'scale-x-[-1]' : ''}`} 
        src={imageSrc} // Dynamic image source
        alt="Cartoon character" 
        onClick={startTyping}
      />
      {showSparkle && (
        <Sparkles 
          className="size-15 relative bottom-20 left-10  text-yellow-400 animate-pulse" 
          
        />
      )}
      {showBubble && (
        <div className="absolute left-16 top-0 bg-white border-2 border-black rounded-lg p-3 min-w-[200px] max-w-[300px] shadow-md">
          <div className="absolute left-[-10px] top-4 w-0 h-0 
                          border-t-[10px] border-t-transparent
                          border-r-[10px] border-r-black
                          border-b-[10px] border-b-transparent">
          </div>
          <div className="absolute left-[-8px] top-4 w-0 h-0 
                          border-t-[10px] border-t-transparent
                          border-r-[10px] border-r-white
                          border-b-[10px] border-b-transparent">
          </div>
          <p className="text-black text-md font-mono">
            {displayedText}
            {isTyping && <span className="animate-pulse">|</span>}
          </p>
        </div>
      )}
    </div>
  );
};

export default ChatBubble;

import React, { memo } from 'react';

/**
 * Button component for flipping the coin
 */
const FlipButton = memo(({ onClick, disabled }) => {
  return (
    <div
      className={`flex justify-center items-center w-full h-auto relative cursor-pointer transition 
        hover:scale-105 active:scale-95 ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
      onClick={onClick}
    >
      <img src="/images/left-button.png" alt="Flip button" className="h-full w-auto" />
      <span className="absolute font-['Bowlby_One'] font-normal text-5xl leading-[100%] tracking-normal align-middle">
        FLIP
      </span>
    </div>
  );
});

export default FlipButton; 
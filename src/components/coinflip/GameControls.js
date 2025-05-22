import React, { memo } from 'react';
import BetPanel from './BetPanel';
import ChoiceSelector from './ChoiceSelector';
import FlipButton from './FlipButton';

/**
 * Component that combines all game controls
 */
const GameControls = memo(({ 
  selectedSide, 
  onSelectSide, 
  onBetSelect, 
  onFlip, 
  isFlipping 
}) => {
  return (
    <div className='flex flex-col gap-4 w-auto h-auto items-start justify-start'>
      <span className="font-['Bowlby_One'] font-normal text-xl text-[#000000CC] leading-[100%] tracking-normal align-middle">
        BET AMOUNT
      </span>
      <BetPanel onBetSelect={onBetSelect} />
      
      <span className="font-['Bowlby_One'] font-normal text-xl text-[#000000CC] leading-[100%] tracking-normal align-middle">
        YOUR CHOICE
      </span>
      <ChoiceSelector selectedSide={selectedSide} onSelectSide={onSelectSide} />
      
      <FlipButton onClick={onFlip} disabled={isFlipping || !selectedSide} />
    </div>
  );
});

export default GameControls; 
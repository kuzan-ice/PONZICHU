import React, { useEffect, memo } from 'react';
import useCoinAnimation from './hooks/useCoinAnimation';
import useAudio from './hooks/useAudio';

/**
 * Coin component that handles the animation and sound for coin flips
 */
const CoinCanvas = memo(({ isFlipping, result, selectedSide }) => {
  const { canvasRef } = useCoinAnimation({ isFlipping, result });
  const { 
    playSuccessSound, 
    playFailureSound, 
    resetSoundPlayed, 
    setSoundPlayed, 
    hasSoundPlayed
  } = useAudio({});
  
  // Play appropriate sound when flip ends
  useEffect(() => {
    // If we have a result and we're not flipping
    if (result !== null && !isFlipping && !hasSoundPlayed()) {
      // Mark sound as played for this flip
      setSoundPlayed();
      
      // Determine if the user won
      const selectedSideValue = selectedSide === 'heads' ? 0 : 1;
      const userWon = selectedSideValue === result;
      
      console.log(`User selected: ${selectedSide}, Result: ${result === 0 ? 'heads' : 'tails'}, User won: ${userWon}`);
      
      // Play appropriate sound
      if (userWon) {
        playSuccessSound();
      } else {
        playFailureSound();
      }
    }
    
    // Reset sound played flag when starting a new flip
    if (isFlipping) {
      resetSoundPlayed();
    }
  }, [isFlipping, result, selectedSide, hasSoundPlayed, setSoundPlayed, resetSoundPlayed, playSuccessSound, playFailureSound]);
  
  return (
    <canvas
      ref={canvasRef}
      width={265}
      height={265}
      className="w-[120px] h-[120px] min-[450px]:w-[150px] min-[450px]:h-[150px] md:w-[265px] md:h-[265px] min-[1440px]:w-full min-[1440px]:h-full"
    />
  );
});

export default CoinCanvas; 
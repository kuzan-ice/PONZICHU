import { useState, useCallback } from 'react';

/**
 * Custom hook for coin flip game logic
 * @returns {Object} - Game state and functions
 */
const useGameLogic = () => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipResult, setFlipResult] = useState(null);
  const [selectedSide, setSelectedSide] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [resultMessage, setResultMessage] = useState('');

  // Handle bet button click
  const handleBetButtonClick = useCallback((label) => {
    // Add your logic here
    console.log('Bet button clicked:', label);
  }, []);

  // Handle coin flip
  const handleFlip = useCallback(() => {
    if (!selectedSide) {
      setToastMessage('Please select your choice (Heads or Tails) first!');
      setShowToast(true);
      return;
    }

    // Reset result message
    setShowResult(false);

    // Determine the result immediately (0=heads, 1=tails)
    const randomResult = Math.random() > 0.5 ? 1 : 0;
    console.log("Flip result:", randomResult === 0 ? "HEADS" : "TAILS");
    
    // Set the result but keep isFlipping true to start animation
    setFlipResult(randomResult);
    setIsFlipping(true);

    // Set a timer to end the flipping state after animation completes
    setTimeout(() => {
      setIsFlipping(false);
      
      // Show win/lose message
      const selectedSideValue = selectedSide === 'heads' ? 0 : 1;
      const userWon = selectedSideValue === randomResult;
      
      setResultMessage(userWon ? 
        `You Win! ${randomResult === 0 ? 'HEADS' : 'TAILS'} was correct!` : 
        `You Lose! ${randomResult === 0 ? 'HEADS' : 'TAILS'} came up.`);
      setShowResult(true);
    }, 2000);
  }, [selectedSide]);

  // Handle side selection
  const handleSelectSide = useCallback((side) => {
    setSelectedSide(side);
  }, []);

  // Close toast message
  const handleCloseToast = useCallback(() => {
    setShowToast(false);
  }, []);

  return {
    // Game state
    isFlipping,
    flipResult,
    selectedSide,
    showToast,
    toastMessage,
    showResult,
    resultMessage,
    
    // Game actions
    handleBetButtonClick,
    handleFlip,
    handleSelectSide,
    handleCloseToast
  };
};

export default useGameLogic; 
import React, { memo, useState, useRef, useEffect } from 'react';
import AnimatedButton from './AnimatedButton';

/**
 * Component for betting options panel
 */
const BetPanel = memo(({ onBetSelect }) => {
  const [inputValue, setInputValue] = useState('1');
  const [dollarValue, setDollarValue] = useState('3.8');
  const inputRef = useRef(null);
  
  // Mock wallet balance - in a real app, this would come from a wallet connection
  const walletBalance = 1; // Example: 10 SUI
  const suiPrice = 3.8; // Example: $3.8 per SUI
  
  // Update dollar value when input changes
  useEffect(() => {
    const suiAmount = parseFloat(inputValue) || 0;
    const calculatedDollarValue = (suiAmount * suiPrice).toFixed(2);
    setDollarValue(calculatedDollarValue);
  }, [inputValue]);
  
  // Handle custom amount input
  const handleInputChange = (e) => {
    const value = e.target.value;
    // Only allow numbers and decimal point
    if (/^\d*\.?\d*$/.test(value)) {
      setInputValue(value);
    }
  };
  
  // Handle betting half of balance
  const handleHalfBalance = () => {
    const halfBalance = (walletBalance / 2).toFixed(2);
    setInputValue(halfBalance);
    onBetSelect(halfBalance);
  };
  
  // Handle betting max balance
  const handleMaxBalance = () => {
    const maxBalance = walletBalance.toFixed(2);
    setInputValue(maxBalance);
    onBetSelect(maxBalance);
  };

  return (
    <div className='flex flex-row py-2 pl-[10px] pr-4 border border-[#000000] rounded-[18px] w-full'>
      <div className='flex gap-2 border-r border-[#000000]'>
        <img src="/images/sui.png" alt="sui Logo" className="h-full w-auto pr-[6px]" />
      </div>
      <div className='flex flex-row gap-2 pl-3 w-[90%] justify-between'>
        <AnimatedButton
          key="custom-amount"
          bgColor="bg-[#D55755]"
          onClick={() => onBetSelect(inputValue)}
        >
          <div className='flex flex-row items-center'>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className="bg-transparent text-white text-center w-10 font-['Bowlby_One'] font-normal text-xs"
              placeholder="Amount"
            />
            <span className="text-white font-['Bowlby_One'] font-normal text-xs">
              ({dollarValue}$)
            </span>
          </div>
        </AnimatedButton>
        
        <AnimatedButton
          key="half-balance"
          bgColor="bg-[#F2C521]"
          onClick={handleHalfBalance}
        >
          <span className="text-black font-['Bowlby_One'] font-normal text-xs leading-[100%] tracking-normal align-middle">
            1/2
          </span>
        </AnimatedButton>
        
        <AnimatedButton
          key="max-balance"
          bgColor="bg-[#F2C521]"
          onClick={handleMaxBalance}
        >
          <span className="text-black font-['Bowlby_One'] font-normal text-xs leading-[100%] tracking-normal align-middle">
            MAX
          </span>
        </AnimatedButton>
      </div>
    </div>
  );
});

export default BetPanel; 
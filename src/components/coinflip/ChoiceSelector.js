import React, { memo } from 'react';

/**
 * Component for selecting between heads and tails
 */
const ChoiceSelector = memo(({ selectedSide, onSelectSide }) => {
  return (
    <div className='flex flex-row w-full h-auto gap-3 justify-between items-center'>
      <div
        className={`flex flex-col ${selectedSide === 'heads' ? 'bg-[#4CAF50]' : 'bg-[#A2A2A296]'} rounded-[26px] py-3 px-5 items-center justify-center w-[45%]
        transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer
        group relative overflow-hidden animate-coin-pulse`}
        onClick={() => onSelectSide(selectedSide === 'heads' ? null : 'heads')}
      >
        <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
          translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000' />
        <img
          src="/images/left-coin-2.png"
          alt="Heads"
          className="w-full h-auto transition-transform duration-300 group-hover:animate-coin-hover"
        />
        <span className="font-['Bowlby_One'] font-normal text-sm md:text-[20px] whitespace-nowrap leading-[100%] tracking-normal text-center align-middle
          transition-all duration-300 group-hover:text-white">HEAD (x0)</span>
      </div>
      <div
        className={`flex flex-col ${selectedSide === 'tails' ? 'bg-[#4CAF50]' : 'bg-[#F2C521]'} rounded-[26px] py-3 px-5 items-center justify-center w-[45%]
        transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer
        group relative overflow-hidden animate-coin-pulse`}
        onClick={() => onSelectSide(selectedSide === 'tails' ? null : 'tails')}
      >
        <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
          translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000' />
        <img
          src="/images/left-coin-1.png"
          alt="Tails"
          className="w-full h-auto transition-transform duration-300 group-hover:animate-coin-hover"
        />
        <span className="font-['Bowlby_One'] font-normal text-sm md:text-[20px] whitespace-nowrap leading-[100%] tracking-normal text-center align-middle
          transition-all duration-300 group-hover:text-black">TAILS (x2)</span>
      </div>
    </div>
  );
});

export default ChoiceSelector; 
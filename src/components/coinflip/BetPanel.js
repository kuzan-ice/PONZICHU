import React, { memo } from 'react';
import AnimatedButton from './AnimatedButton';

/**
 * Component for betting options panel
 */
const BetPanel = memo(({ onBetSelect }) => {
  return (
    <div className='flex flex-row py-2 pl-[10px] pr-4 border border-[#000000] rounded-[18px]'>
      <div className='flex gap-2 border-r border-[#000000]'>
        <img src="/images/sui.png" alt="sui Logo" className="h-full w-auto pr-[6px]" />
      </div>
      <div className='flex flex-row gap-2 pl-3'>
        {[
          { label: '1 SUI (3.8$)', bgColor: 'bg-[#D55755]', textColor: 'text-white' },
          { label: '1/2', bgColor: 'bg-[#F2C521]', textColor: 'text-black' },
          { label: 'MAX', bgColor: 'bg-[#F2C521]', textColor: 'text-black' }
        ].map((bet, idx) => (
          <AnimatedButton
            key={bet.label}
            bgColor={bet.bgColor}
            onClick={() => onBetSelect(bet.label)}
          >
            <span className={`
              ${bet.textColor}
              font-['Bowlby_One'] font-normal text-xs leading-[100%] tracking-normal align-middle
            `}>
              {bet.label}
            </span>
          </AnimatedButton>
        ))}
      </div>
    </div>
  );
});

export default BetPanel; 
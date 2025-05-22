import React, { memo } from 'react';

/**
 * Component to display coin flip history
 */
const CoinHistory = memo(({ historyData }) => {
  return (
    <div className='flex flex-col w-full h-auto bg-[#F1F3F496] py-4 px-5 rounded-[26px] shadow-[4px_4px_4px_0px_#00000040] overflow-x-auto md:overflow-x-hidden'>
      <div className="flex flex-col w-full h-auto gap-5 min-w-[600px]">
        {historyData.map((item, idx) => (
          <div
            key={idx}
            style={{ animationDelay: `${idx * 0.1}s` }}
            className="flex flex-row items-center justify-between rounded-[20px] border border-black px-3 py-2 shadow-md border border-black"
          >
            <div className='flex flex-row items-center justify-center gap-5'>
              <div className={`flex items-center border border-black gap-2 px-3 py-1 rounded-[18px] min-w-[130px] font-bold ${item.color}`}>
                <img src="/images/user.png" alt="icon" className="" />
                <span
                  className={`font-['Bowlby_One'] font-normal text-[16px] md:text-[20px] leading-[100%] tracking-normal align-middle`}
                >
                  {item.result}
                </span>
              </div>
              {/* Address */}
              <span className="font-bold text-black text-[16px] md:text-lg font-['Bowlby_One'] font-normal tracking-normal leading-[100%] align-middle truncate">
                {item.address.length > 12
                  ? `${item.address.slice(0, 6)}...${item.address.slice(-4)}`
                  : item.address}
              </span>
            </div>

            {/* Amount */}
            <span
              className={`font-['Bowlby_One'] font-normal text-[16px] md:text-[20px] leading-[100%] tracking-normal align-middle text-black`}
            >
              {item.amount}
              <img src='/images/sui.png' alt="sui" className="inline" />
            </span>
            {/* Coefficient */}
            <span className="font-['Bowlby_One'] font-normal text-[16px] md:text-[20px] leading-[100%] tracking-normal align-middle text-black">
              {item.coeff}
            </span>
            {/* Time */}
            <span className="font-['Bowlby_One'] font-normal text-[16px] md:text-[20px] leading-[100%] tracking-normal align-middle text-black">
              {item.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
});

export default CoinHistory; 
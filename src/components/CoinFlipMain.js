import React, { useState } from 'react';

function CoinFlipMain() {
  const coinImages = [
    '/images/left-coin-1.png',
    '/images/left-coin-2.png',
    '/images/left-coin-1.png',
    '/images/left-coin-2.png',
    '',
    ''
  ];

  const historyData = [
    {
      result: 'WIN',
      address: '0x707Ba6d5ccA06B66C568e2CF985EA5e1Ef8d822a',
      amount: '+ 1.00 SUI',
      coeff: 'X2',
      time: '2 HOURS AGO',
      color: 'bg-[#F2C521]',
    },
    {
      result: 'LOSE',
      address: '0x707Ba6d5ccA06B66C568e2CF985EA5e1Ef8d822a',
      amount: '- 1.00 SUI',
      coeff: 'X0',
      time: '3 HOURS AGO',
      color: 'bg-[#D55755]',
    },
    {
      result: 'WIN',
      address: '0x707Ba6d5ccA06B66C568e2CF985EA5e1Ef8d822a',
      amount: '+ 5.00 SUI',
      coeff: 'X2',
      time: '4 HOURS AGO',
      color: 'bg-[#F2C521]',
    },
  ];

  return (
    <main className="flex flex-col gap-[50px] container mx-auto p-4 w-full h-full pb-[30px]">
      <div className='flex flex-row w-full h-auto justify-between'>
        <div className='flex flex-col w-auto h-auto p-[33px] gap-8 bg-[#F1F3F496] rounded-[26px] shadow-[4px_4px_4px_0px_#00000040] min-w-[360px]'>
          <div className='flex border-b border-[#A2A2A296] pb-5'>
            <span className='text-black text-2xl font-["Bowlby_One"] font-normal tracking-normal leading-[100%] text-center align-middle'>COINFLIP GAME</span>
          </div>
          <div className='flex flex-col gap-4 w-auto h-auto items-start justify-start'>
            <span className="font-['Bowlby_One'] font-normal text-xl text-[#000000CC] leading-[100%] tracking-normal align-middle">BET AMOUNT</span>
            <div className='flex flex-row py-2 pl-[10px] pr-4 border border-[#000000] rounded-[18px]'>
              <div className='flex gap-2 border-r border-[#000000]'>
                <img src="/images/sui.png" alt="sui Logo" className="h-full w-auto pr-[6px]" />
              </div>
              <div className='flex flex-row gap-2 pl-3'>
                <div className='flex border border-[#000000] rounded-full bg-[#D55755] justify-center items-center py-[10px] px-3 cursor-pointer'>
                  <span className="text-white font-['Bowlby_One'] font-normal text-xs leading-[100%] tracking-normal align-middle">1 SUI (3.8$)</span>
                </div>
                <div className='flex border border-[#000000] rounded-full bg-[#F2C521] justify-center items-center py-[10px] px-3 cursor-pointer'>
                  <span className="text-black font-['Bowlby_One'] font-normal text-xs leading-[100%] tracking-normal align-middle">1/2</span>
                </div>
                <div className='flex border border-[#000000] rounded-full bg-[#F2C521] justify-center items-center py-[10px] px-3 cursor-pointer'>
                  <span className="text-black font-['Bowlby_One'] font-normal text-xs leading-[100%] tracking-normal align-middle">MAX</span>
                </div>
              </div>
            </div>
            <span className="font-['Bowlby_One'] font-normal text-xl text-[#000000CC] leading-[100%] tracking-normal align-middle">YOUR CHOICE</span>
            <div className='flex flex-row w-full h-auto gap-3 justify-between items-center'>
              <div className='flex flex-col bg-[#A2A2A296] rounded-[26px] py-3 px-5 items-center justify-center'>
                <img src="/images/left-coin-2.png" alt="coin Logo" className="h-full w-auto" />
                <span className="font-['Bowlby_One'] font-normal text-xl leading-[100%] tracking-normal text-center align-middle">HEAD (x0)</span>
              </div>
              <div className='flex flex-col bg-[#F2C521] rounded-[26px] py-3 px-5 items-center justify-center'>
                <img src="/images/left-coin-1.png" alt="coin Logo" className="h-full w-auto" />
                <span className="font-['Bowlby_One'] font-normal text-xl leading-[100%] tracking-normal text-center align-middle">TAILS (x2)</span>
              </div>
            </div>
            <div className='flex justify-center items-center w-full h-auto relative cursor-pointer'>
              <img src="/images/left-button.png" alt="coin Logo" className="h-full w-auto" />
              <span className="absolute font-['Bowlby_One'] font-normal text-5xl leading-[100%] tracking-normal align-middle">FLIP</span>
            </div>
          </div>
        </div>
        <div className='flex flex-col w-full max-w-[1000px] h-auto bg-[#F1F3F496] justify-between rounded-[26px] shadow-[4px_4px_4px_0px_#00000040] px-[25px] pb-[25px] pt-[96px]'>
          <div className='flex flex-row w-full h-auto justify-center items-center gap-[120px]'>
            <div className='flex flex-col w-auto h-auto'>
              <span className="font-['Bowlby_One'] font-normal text-5xl leading-[100%] tracking-normal text-center align-middle">4</span>
              <span className="font-['Bowlby_One'] font-normal text-2xl leading-[100%] tracking-normal text-center align-middle">SERIES</span>
            </div>
            <img src='/images/right-coin.png' alt='sui Logo' className='h-full w-auto' />
            <div className='flex flex-col w-auto h-auto'>
              <span className="font-['Bowlby_One'] font-normal text-5xl leading-[100%] tracking-normal text-center align-middle">X2</span>
              <span className="font-['Bowlby_One'] font-normal text-2xl leading-[100%] tracking-normal text-center align-middle">COEFFICENT</span>
            </div>
          </div>
          <div className='flex flex-row w-full h-auto gap-2 justify-between items-center'>
            {coinImages.map((imageSrc, index) => (
              <div key={index} className='flex justify-center items-center min-w-[105px] min-h-[105px] bg-[#A2A2A296] p-4 rounded-[26px]'>
                {imageSrc ? (
                  <img src={imageSrc} alt='coin Logo' className='h-full w-auto max-w-[105px] max-h-[105px]' />
                ) : (
                  <div className='h-full w-full bg-transparent min-w-[105px] min-h-[105px]'></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='flex flex-col w-full h-auto bg-[#F1F3F496] py-4 px-5 rounded-[26px] shadow-[4px_4px_4px_0px_#00000040]'>
        <div className="flex flex-col w-full h-auto gap-5">
          {historyData.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-row items-center justify-between rounded-[20px] border border-black px-3 py-2 shadow-md border border-black"
            >
              <div className='flex flex-row items-center justify-center gap-5'>
                <div className={`flex items-center border border-black gap-2 px-3 py-1 rounded-[18px] min-w-[130px] font-bold ${item.color}`}>
                  <img src="/images/user.png" alt="icon" className="" />
                  <span
                    className={` font-['Bowlby_One'] font-normal text-[20px] leading-[100%] tracking-normal align-middle `}
                  >
                    {item.result}
                  </span>
                </div>
                {/* Address */}
                <span className="font-bold text-black text-lg font-['Bowlby_One'] font-normal tracking-normal leading-[100%] align-middle truncate">
                  {item.address.length > 12
                    ? `${item.address.slice(0, 6)}...${item.address.slice(-4)}`
                    : item.address}
                </span>
              </div>

              {/* Amount */}
              <span
                className={`
                ${item.amount.startsWith('+')} font-['Bowlby_One'] font-normal text-[20px] leading-[100%] tracking-normal align-middle text-black
              `}
              >
                {item.amount}
                <img src='/images/sui.png' alt="sui" className="inline" />
              </span>
              {/* Coefficient */}
              <span className="font-['Bowlby_One'] font-normal text-[20px] leading-[100%] tracking-normal align-middle text-black">
                {item.coeff}
              </span>
              {/* Time */}
              <span className="font-['Bowlby_One'] font-normal text-[20px] leading-[100%] tracking-normal align-middle text-black">
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default CoinFlipMain; 
import React, { useState, useEffect, useCallback, useRef } from 'react';

// Reusable AnimatedButton component
const AnimatedButton = ({
  children,
  bgColor,
  className = '',
  onClick,
  animated = true,
}) => {
  const [pressed, setPressed] = useState(false);
  const [ripples, setRipples] = useState([]);
  const btnRef = useRef(null);

  const createRipple = (event) => {
    const button = btnRef.current;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    const newRipple = { x, y, size, key: Date.now() };
    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.slice(1));
    }, 500);
  };

  return (
    <div
      ref={btnRef}
      className={`
        relative overflow-hidden
        flex border border-[#000000] rounded-full
        ${bgColor}
        justify-center items-center py-[10px] px-3 cursor-pointer
        transition duration-150 ease-in-out
        ${animated && pressed ? 'scale-95 shadow-lg' : 'scale-100 shadow-[2px_2px_0px_0px_#000000]'}
        hover:brightness-105 active:brightness-95
        ${className}
      `}
      onMouseDown={e => {
        if (animated) setPressed(true);
        createRipple(e);
      }}
      onMouseUp={animated ? () => setPressed(false) : undefined}
      onMouseLeave={animated ? () => setPressed(false) : undefined}
      onClick={onClick}
      style={{ userSelect: 'none' }}
    >
      {ripples.map(ripple => (
        <span
          key={ripple.key}
          className="absolute bg-white/40 rounded-full pointer-events-none animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}
      {children}
    </div>
  );
};

// Add these keyframes at the top of the file, after the imports
const keyframes = `
@keyframes float3D {
  0% {
    transform: translateY(0px) rotateY(0deg);
  }
  25% {
    transform: translateY(-10px) rotateY(5deg);
  }
  50% {
    transform: translateY(0px) rotateY(0deg);
  }
  75% {
    transform: translateY(-10px) rotateY(-5deg);
  }
  100% {
    transform: translateY(0px) rotateY(0deg);
  }
}

@keyframes glowPulse {
  0% {
    text-shadow: 0 0 5px rgba(242, 197, 33, 0.5);
  }
  50% {
    text-shadow: 0 0 20px rgba(242, 197, 33, 0.8);
  }
  100% {
    text-shadow: 0 0 5px rgba(242, 197, 33, 0.5);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
`;

// Add this style tag right after the keyframes
const style = document.createElement('style');
style.textContent = keyframes;
document.head.appendChild(style);

// Add these classes to your global CSS or Tailwind config
const customClasses = `
.animate-float3d {
  animation: float3D 4s ease-in-out infinite;
  transform-style: preserve-3d;
  perspective: 1000px;
}

.animate-glow {
  animation: glowPulse 2s ease-in-out infinite;
}

.animate-slide-left {
  animation: slideInLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.animate-slide-right {
  animation: slideInRight 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.animate-scale-in {
  animation: scaleIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
`;

// Add the custom classes to the document
const customStyle = document.createElement('style');
customStyle.textContent = customClasses;
document.head.appendChild(customStyle);

function CoinFlipMain() {
  const coinImages = [
    '/images/left-coin-1.png',
    '/images/left-coin-2.png',
    '/images/left-coin-1.png',
    '/images/left-coin-2.png',
    '',
    '',
    '',
    '',
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

  const betButtons = [
    { label: '1 SUI (3.8$)', bgColor: 'bg-[#d55755]' },
    { label: '1/2', bgColor: 'bg-[#F2C521]' },
    { label: 'MAX', bgColor: 'bg-[#F2C521]' },
  ];

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [pressedIdx, setPressedIdx] = useState(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipResult, setFlipResult] = useState(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  let visibleCoins = coinImages;
  if (windowWidth < 450) {
    visibleCoins = coinImages.slice(0, 2);
  }
  else if (windowWidth < 678) {
    visibleCoins = coinImages.slice(0, 3);
  }
  else if (windowWidth < 1440) {
    visibleCoins = coinImages.slice(0, 4);
  } else {
    visibleCoins = coinImages.slice(0, 7);
  }

  // Example click handler for bet buttons
  const handleBetButtonClick = useCallback((label) => {
    // Add your logic here
    console.log('Bet button clicked:', label);
  }, []);

  const handleFlip = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setIsFlipping(false);
      // Simulate result: 0 for heads, 1 for tails
      setFlipResult(Math.random() > 0.5 ? 1 : 0);
    }, 1000);
  };

  return (
    <main className="animate-page-fade-in flex flex-col gap-[50px] container mx-auto p-4 w-full h-full pb-[30px] max-w-[1440px]">
      <div className='flex flex-row w-full h-auto justify-between gap-5 xl:gap-[50px]'>
        <div className='hidden lg:flex flex-col w-auto h-auto p-[33px] gap-8 bg-[#F1F3F496] rounded-[26px] shadow-[4px_4px_4px_0px_#00000040] min-w-[360px]'>
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
                {['1 SUI (3.8$)', '1/2', 'MAX'].map((label, idx) => (
                  <AnimatedButton
                    key={label}
                    bgColor={idx === 0 ? 'bg-[#D55755]' : 'bg-[#F2C521]'}
                    onClick={() => handleBetButtonClick(label)}
                  >
                    <span className={`
                      ${idx === 0 ? 'text-white' : 'text-black'}
                      font-['Bowlby_One'] font-normal text-xs leading-[100%] tracking-normal align-middle
                    `}>
                      {label}
                    </span>
                  </AnimatedButton>
                ))}
              </div>
            </div>
            <span className="font-['Bowlby_One'] font-normal text-xl text-[#000000CC] leading-[100%] tracking-normal align-middle">YOUR CHOICE</span>
            <div className='flex flex-row w-full h-auto gap-3 justify-between items-center'>
              <div 
                className='flex flex-col bg-[#A2A2A296] rounded-[26px] py-3 px-5 items-center justify-center w-[45%]
                transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer
                group relative overflow-hidden animate-coin-pulse'
              >
                <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                  translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000' />
                <img 
                  src="/images/left-coin-2.png" 
                  alt="coin Logo" 
                  className="w-full h-auto transition-transform duration-300 group-hover:animate-coin-hover" 
                />
                <span className="font-['Bowlby_One'] font-normal text-sm md:text-[20px] whitespace-nowrap leading-[100%] tracking-normal text-center align-middle
                  transition-all duration-300 group-hover:text-white">HEAD (x0)</span>
              </div>
              <div 
                className='flex flex-col bg-[#F2C521] rounded-[26px] py-3 px-5 items-center justify-center w-[45%]
                transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer
                group relative overflow-hidden animate-coin-pulse'
              >
                <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                  translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 animate-coin-pulse' />
                <img 
                  src="/images/left-coin-1.png" 
                  alt="coin Logo" 
                  className="w-full h-auto transition-transform duration-300 group-hover:animate-coin-hover" 
                />
                <span className="font-['Bowlby_One'] font-normal text-sm md:text-[20px] whitespace-nowrap leading-[100%] tracking-normal text-center align-middle
                  transition-all duration-300 group-hover:text-black">TAILS (x2)</span>
              </div>
            </div>
            <div
              className='flex justify-center items-center w-full h-auto relative cursor-pointer transition hover:scale-105 active:scale-95'
              onClick={handleFlip}
            >
              <img src="/images/left-button.png" alt="coin Logo" className="h-full w-auto" />
              <span className="absolute font-['Bowlby_One'] font-normal text-5xl leading-[100%] tracking-normal align-middle">
                FLIP
              </span>
            </div>
          </div>
        </div>
        <div className='flex flex-col w-full gap-5 lg:w-2/3 items-center min-[1440px]:w-2/3 max-w-[1000px] h-auto bg-[#F1F3F496] justify-between rounded-[26px] shadow-[4px_4px_4px_0px_#00000040] px-[25px] pb-[25px] pt-5 md:pt-10 lg:pt-[96px]'>
          <div className='flex flex-col min-[450px]:flex-row w-full h-auto justify-center items-center gap-5 md:gap-[50px] min-[1440px]:gap-[120px]'>
            <div className='flex flex-col w-auto h-auto min-w-0 md:min-w-[130px] animate-slide-left' style={{ animationDelay: '0.2s' }}>
              <span className="font-['Bowlby_One'] font-normal text-xl md:text-3xl xl:text-5xl leading-[100%] tracking-normal text-center align-middle animate-glow">4</span>
              <span className="font-['Bowlby_One'] font-normal text-sm md:text-xl xl:text-2xl leading-[100%] tracking-normal text-center align-middle animate-scale-in" style={{ animationDelay: '0.4s' }}>SERIES</span>
            </div>
            <img 
              src='/images/right-coin.png' 
              alt='sui Logo' 
              className='h-[120px] min-[450px]:h-[150px] md:h-[265px] min-[1440px]:h-full min-[1440px]:w-auto animate-float3d transform-gpu' 
              style={{ animationDelay: '0.6s' }}
            />
            <div className='flex flex-col w-auto h-auto animate-slide-right' style={{ animationDelay: '0.8s' }}>
              <span className="font-['Bowlby_One'] font-normal text-xl md:text-3xl xl:text-5xl leading-[100%] tracking-normal text-center align-middle animate-glow">X2</span>
              <span className="font-['Bowlby_One'] font-normal text-sm md:text-xl xl:text-2xl leading-[100%] tracking-normal text-center align-middle animate-scale-in" style={{ animationDelay: '1s' }}>COEFFICENT</span>
            </div>
          </div>
          <div className='flex flex-row w-full h-auto gap-2 justify-between items-center'>
            {visibleCoins.map((imageSrc, index) => (
              <div key={index} className='flex justify-center items-center min-w-[95px] min-h-[95px] min-[1440px]:min-w-[100px] min-[1440px]:min-h-[100px] bg-[#A2A2A296] p-4 rounded-[26px]'>
                {imageSrc ? (
                  <img src={imageSrc} alt='coin Logo' className='h-full w-auto max-w-[95px] max-h-[95px] min-[1440px]:max-w-[100px] min-[1440px]:max-h-[100px]' />
                ) : (
                  <div className='h-full w-full bg-transparent min-w-[95px] min-h-[95px] min-[1440px]:min-w-[100px] min-[1440px]:min-h-[100px]'></div>
                )}
              </div>
            ))}
          </div>
          <div className='flex lg:hidden flex-col w-full h-auto gap-5'>
            <span className="font-['Bowlby_One'] font-normal text-xl text-[#000000CC] leading-[100%] tracking-normal align-middle text-start">YOUR CHOICE</span>
            <div className='flex flex-row w-full h-auto gap-3 justify-between items-center'>
              <div 
                className='flex flex-col bg-[#A2A2A296] rounded-[26px] py-3 px-5 items-center justify-center w-[45%] min-[500px]:w-1/3 min-[1440px]:w-1/2
                transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer
                group relative overflow-hidden animate-coin-pulse'
              >
                <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                  translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000' />
                <img 
                  src="/images/left-coin-2.png" 
                  alt="coin Logo" 
                  className="w-full h-auto transition-transform duration-300 group-hover:animate-coin-hover" 
                />
                <span className="font-['Bowlby_One'] font-normal text-sm md:text-xl leading-[100%] tracking-normal text-center align-middle
                  transition-all duration-300 group-hover:text-white">HEAD (x0)</span>
              </div>
              <div 
                className='flex flex-col bg-[#F2C521] rounded-[26px] py-3 px-5 items-center justify-center w-[45%] min-[500px]:w-1/3
                transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer
                group relative overflow-hidden animate-coin-pulse'
              >
                <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                  translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000' />
                <img 
                  src="/images/left-coin-1.png" 
                  alt="coin Logo" 
                  className="w-full h-auto transition-transform duration-300 group-hover:animate-coin-hover" 
                />
                <span className="font-['Bowlby_One'] font-normal text-sm md:text-xl leading-[100%] tracking-normal text-center align-middle
                  transition-all duration-300 group-hover:text-black">TAILS (x2)</span>
              </div>
            </div>
          </div>
          <div className='flex lg:hidden flex-col w-full h-auto gap-5'>
            <span className="font-['Bowlby_One'] font-normal text-xl text-[#000000CC] leading-[100%] text-start tracking-normal align-middle">BET AMOUNT</span>
            <div className='flex flex-row w-full py-2 pl-[10px] pr-4 border border-[#000000] rounded-[18px]'>
              <div className='flex gap-2 border-r border-[#000000]'>
                <img src="/images/sui.png" alt="sui Logo" className="h-full w-auto pr-[6px]" />
              </div>
              <div className='flex flex-row gap-2 pl-3 w-[90%] justify-between'>
                {['1 SUI (3.8$)', '1/2', 'MAX'].map((label) => (
                  <AnimatedButton
                    key={label}
                    bgColor="bg-[#F2C521]"
                    onClick={() => handleBetButtonClick(label)}
                  >
                    <span className="text-black font-['Bowlby_One'] font-normal text-xs leading-[100%] tracking-normal align-middle">
                      {label}
                    </span>
                  </AnimatedButton>
                ))}
              </div>
            </div>
          </div>
          <div
            className='flex lg:hidden justify-center items-center w-full h-auto relative cursor-pointer transition hover:scale-105 active:scale-95'
            onClick={handleFlip}
          >
            <img src="/images/left-button.png" alt="coin Logo" className="h-full w-auto" />
            <span className="absolute font-['Bowlby_One'] font-normal text-5xl leading-[100%] tracking-normal align-middle">
              FLIP
            </span>
          </div>
        </div>
      </div>
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
                    className={` font-['Bowlby_One'] font-normal text-[16px] md:text-[20px] leading-[100%] tracking-normal align-middle `}
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
                className={`
                ${item.amount.startsWith('+')} font-['Bowlby_One'] font-normal text-[16px] md:text-[20px] leading-[100%] tracking-normal align-middle text-black
              `}
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
    </main>
  );
}

export default CoinFlipMain; 
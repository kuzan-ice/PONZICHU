import React, { memo } from 'react';
import CoinCanvas from './CoinCanvas';
import GameControls from './GameControls';
import CoinHistory from './CoinHistory';
import Toast from './Toast';
import ChoiceSelector from './ChoiceSelector';
import BetPanel from './BetPanel';
import FlipButton from './FlipButton';
import useGameLogic from './hooks/useGameLogic';
import useWindowSize from './hooks/useWindowSize';

// Animation keyframes - will be added to document when component mounts
const setupAnimationStyles = () => {
  if (typeof document === 'undefined') return;

  // Only add styles if they don't already exist
  if (!document.getElementById('coin-flip-styles')) {
    const keyframes = `
      @keyframes float3D {
        0% { transform: translateY(0px) rotateY(0deg); }
        25% { transform: translateY(-10px) rotateY(5deg); }
        50% { transform: translateY(0px) rotateY(0deg); }
        75% { transform: translateY(-10px) rotateY(-5deg); }
        100% { transform: translateY(0px) rotateY(0deg); }
      }

      @keyframes glowPulse {
        0% { text-shadow: 0 0 5px rgba(242, 197, 33, 0.5); }
        50% { text-shadow: 0 0 20px rgba(242, 197, 33, 0.8); }
        100% { text-shadow: 0 0 5px rgba(242, 197, 33, 0.5); }
      }

      @keyframes slideInLeft {
        from { opacity: 0; transform: translateX(-50px) scale(0.8); }
        to { opacity: 1; transform: translateX(0) scale(1); }
      }

      @keyframes slideInRight {
        from { opacity: 0; transform: translateX(50px) scale(0.8); }
        to { opacity: 1; transform: translateX(0) scale(1); }
      }

      @keyframes scaleIn {
        from { opacity: 0; transform: scale(0.5); }
        to { opacity: 1; transform: scale(1); }
      }

      @keyframes slide-in {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }

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

      .animate-slide-in {
        animation: slide-in 0.3s ease-out forwards;
      }
    `;

    const style = document.createElement('style');
    style.id = 'coin-flip-styles';
    style.textContent = keyframes;
    document.head.appendChild(style);
  }
};

/**
 * Mock data for coin flip history
 */
const mockHistoryData = [
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

/**
 * Main coin flip game component
 */
const CoinFlipGame = memo(() => {
  // Set up animation styles
  if (typeof window !== 'undefined') {
    setupAnimationStyles();
  }

  // Get window size for responsive design
  const { width: windowWidth } = useWindowSize();

  // Game logic
  const {
    isFlipping,
    flipResult,
    selectedSide,
    showToast,
    toastMessage,
    showResult,
    resultMessage,
    handleBetButtonClick,
    handleFlip,
    handleSelectSide,
    handleCloseToast
  } = useGameLogic();

  // Calculate visible coins based on window width
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

  let visibleCoins = coinImages;
  if (windowWidth < 678) {
    visibleCoins = coinImages.slice(0, 3);
  }
  else if (windowWidth < 1440) {
    visibleCoins = coinImages.slice(0, 4);
  } else {
    visibleCoins = coinImages.slice(0, 7);
  }

  return (
    <main className="animate-page-fade-in flex flex-col gap-[50px] container mx-auto p-4 w-full h-full pb-[30px] max-w-[1440px]">
      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={handleCloseToast}
      />

      <div className='flex flex-row w-full h-auto justify-between gap-5 xl:gap-[50px]'>
        {/* Left panel - Game controls */}
        <div className='hidden lg:flex flex-col w-auto h-auto p-[33px] gap-8 bg-[#F1F3F496] rounded-[26px] shadow-[4px_4px_4px_0px_#00000040] min-w-[360px]'>
          <div className='flex border-b border-[#A2A2A296] pb-5'>
            <span className='text-black text-2xl font-["Bowlby_One"] font-normal tracking-normal leading-[100%] text-center align-middle'>
              COINFLIP GAME
            </span>
          </div>

          <GameControls
            selectedSide={selectedSide}
            onSelectSide={handleSelectSide}
            onBetSelect={handleBetButtonClick}
            onFlip={handleFlip}
            isFlipping={isFlipping}
          />
        </div>

        {/* Right panel - Coin and animation */}
        <div className='flex flex-col w-full gap-5 lg:w-2/3 items-center min-[1440px]:w-2/3 max-w-[1000px] h-auto bg-[#F1F3F496] justify-between rounded-[26px] shadow-[4px_4px_4px_0px_#00000040] px-[15px] md:px-[25px] pb-[25px] pt-5 md:pt-10 lg:pt-[96px]'>
          <div className='flex flex-col min-[450px]:flex-row w-full h-full justify-center items-center gap-5 md:gap-[50px] min-[1440px]:gap-[120px]'>
            {/* Left stats */}
            <div className='flex flex-col w-auto h-auto min-w-0 md:min-w-[130px] animate-slide-left' style={{ animationDelay: '0.2s' }}>
              <span className="font-['Bowlby_One'] font-normal text-xl md:text-3xl xl:text-5xl leading-[100%] tracking-normal text-center align-middle animate-glow">
                4
              </span>
              <span className="font-['Bowlby_One'] font-normal text-sm md:text-xl xl:text-2xl leading-[100%] tracking-normal text-center align-middle animate-scale-in" style={{ animationDelay: '0.4s' }}>
                SERIES
              </span>
            </div>

            {/* Coin */}
            <div className="flex flex-col items-center">
              <CoinCanvas
                isFlipping={isFlipping}
                result={flipResult}
                selectedSide={selectedSide}
              />
              {/*               
              {showResult && (
                <div className={`mt-4 text-center text-xl font-bold ${resultMessage.includes('Win') ? 'text-green-600' : 'text-red-600'} 
                animate-bounce transition-all duration-300 min-h-[28px]`}>
                  {resultMessage}
                </div>
              )} */}
            </div>

            {/* Right stats */}
            <div className='flex flex-col w-auto h-auto animate-slide-right' style={{ animationDelay: '0.8s' }}>
              <span className="font-['Bowlby_One'] font-normal text-xl md:text-3xl xl:text-5xl leading-[100%] tracking-normal text-center align-middle animate-glow">
                X2
              </span>
              <span className="font-['Bowlby_One'] font-normal text-sm md:text-xl xl:text-2xl leading-[100%] tracking-normal text-center align-middle animate-scale-in" style={{ animationDelay: '1s' }}>
                COEFFICENT
              </span>
            </div>
          </div>

          {/* Coin history thumbnails */}
          <div className='flex flex-row w-full h-auto gap-2 justify-between items-center'>
            {visibleCoins.map((imageSrc, index) => (
              <div key={index} className='flex justify-center items-center min-w-[60px] min-h-[60px] md:min-w-[85px] md:min-h-[85px] min-[1440px]:min-w-[100px] min-[1440px]:min-h-[100px] bg-[#A2A2A296] p-4 rounded-[26px]'>
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt={`Coin ${index}`}
                    className='h-full w-auto max-w-[60px] max-h-[60px] md:max-w-[85px] md:max-h-[85px] min-[1440px]:max-w-[100px] min-[1440px]:max-h-[100px]'
                  />
                ) : (
                  <div className='h-full w-full bg-transparent min-w-[60px] min-h-[60px] md:min-w-[85px] md:min-h-[85px] min-[1440px]:min-w-[100px] min-[1440px]:min-h-[100px]'></div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile game controls */}
          <div className='flex lg:hidden flex-col w-full h-auto gap-5'>
            <span className="font-['Bowlby_One'] font-normal text-xl text-[#000000CC] leading-[100%] text-start tracking-normal align-middle">
              YOUR CHOICE
            </span>
            <ChoiceSelector
              selectedSide={selectedSide}
              onSelectSide={handleSelectSide}
            />
          </div>

          <div className='flex lg:hidden flex-col w-full h-auto gap-5'>
            <span className="font-['Bowlby_One'] font-normal text-xl text-[#000000CC] leading-[100%] text-start tracking-normal align-middle">
              BET AMOUNT
            </span>
            <BetPanel onBetSelect={handleBetButtonClick} />
          </div>

          <div className='flex lg:hidden justify-center items-center w-full h-auto'>
            <FlipButton onClick={handleFlip} disabled={isFlipping || !selectedSide} />
          </div>
        </div>
      </div>

      {/* History section */}
      <CoinHistory historyData={mockHistoryData} />
    </main>
  );
});

export default CoinFlipGame; 
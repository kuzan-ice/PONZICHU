import React from 'react';

function Header() {
    return (
        <header className="flex container mx-auto flex-row w-full h-auto p-7 justify-between items-center">
            <div className='flex'>
                <img src="/images/logo.png" alt="Ponzichu Logo" className="" />
            </div>
            <div className='flex flex-row gap-3 w-auto h-full'>
                <div className='flex flex-row gap-2 justify-center items-center bg-[#F2C521] px-3 py-1 rounded-full h-full shadow-[4px_4px_0px_0px_#000000] cursor-pointer'>
                    <img src="/images/PCHU_LOGO_FINAL_CENTER.png" alt="Ponzichu Logo" className="h-full w-auto" />
                    <span className='text-white text-2xl font-["Bowlby_One"] font-normal tracking-normal leading-[100%] align-middle'>12.5K $PCHU</span>
                </div>
                <div className='flex flex-row gap-2 justify-center items-center bg-[#D55755] px-5 py-1 rounded-full h-auto shadow-[4px_4px_0px_0px_#000000] cursor-pointer'>
                    <span className='text-white text-2xl font-["Bowlby_One"] font-normal tracking-normal leading-[100%] align-middle'>Deposit</span>
                    <img src="/images/swapicon.png" alt="Ponzichu Logo" className="h-9 w-auto" />
                </div>
                <div className='flex flex-row gap-2 justify-center items-center bg-[#F2C521] px-3 py-1 rounded-full h-auto shadow-[4px_4px_0px_0px_#000000] cursor-pointer max-w-[270px]'>
                    <span className='text-white text-2xl font-["Bowlby_One"] font-normal tracking-normal leading-[100%] align-middle truncate'>
                        {(() => {
                            const fullAddress = '0x707Ba6d5ccA06B66C568e2CF985EA5e1Ef8d822a';
                            return fullAddress.length > 12 
                                ? `${fullAddress.slice(0, 6)}...${fullAddress.slice(-4)}` 
                                : fullAddress;
                        })()}
                    </span>
                </div>
            </div>
        </header>
    );
}

export default Header;
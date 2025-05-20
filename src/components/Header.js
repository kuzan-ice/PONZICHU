import React, { useState, useRef } from 'react';

// Helper to truncate address
const truncateAddress = (address) =>
    address.length > 12
        ? `${address.slice(0, 6)}...${address.slice(-4)}`
        : address;

// Reusable header button with ripple and animation
const HeaderButton = ({
    children,
    bgColor,
    className = '',
    onClick,
    animated = false,
}) => {
    const [pressed, setPressed] = useState(false);
    const [ripples, setRipples] = useState([]);
    const btnRef = useRef(null);

    // Ripple effect handler
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
                flex flex-row gap-2 justify-center items-center
                ${bgColor}
                px-3 py-1 rounded-full h-auto shadow-[4px_4px_0px_0px_#000000]
                cursor-pointer
                transition duration-150 ease-in-out
                ${animated && pressed ? 'scale-95 shadow-lg' : 'scale-100'}
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
            {/* Ripple effect */}
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

function Header() {
    const fullAddress = '0x707Ba6d5ccA06B66C568e2CF985EA5e1Ef8d822a';

    return (
        <header className="flex container mx-auto flex-row w-full h-auto p-3 md:p-7 justify-between items-center max-w-[1440px]">
            <div className="hidden lg:flex">
                <img src="/images/logo.png" alt="Ponzichu Logo" />
            </div>
            <div className="flex flex-row gap-3 justify-between lg:justify-center w-full lg:w-auto h-full">
                <HeaderButton bgColor="bg-[#F2C521]" animated>
                    <img
                        src="/images/PCHU_LOGO_FINAL_CENTER.png"
                        alt="Ponzichu Logo"
                        className="h-full w-auto hidden min-[450px]:flex"
                    />
                    <span className="text-white text-sm md:text-xl xl:text-2xl font-['Bowlby_One'] font-normal tracking-normal leading-[100%] align-middle">
                        12.5K $PCHU
                    </span>
                </HeaderButton>
                <HeaderButton
                    bgColor="bg-[#D55755]"
                    className="px-5"
                    animated
                    onClick={() => {
                        // Deposit logic here
                    }}
                >
                    <span className="text-white text-sm md:text-xl xl:text-2xl font-['Bowlby_One'] font-normal tracking-normal leading-[100%] align-middle">
                        Deposit
                    </span>
                    <img src="/images/swapicon.png" alt="Deposit" className="h-9 w-auto" />
                </HeaderButton>
                <HeaderButton
                    bgColor="bg-[#F2C521]"
                    className="max-w-[270px]"
                    animated
                >
                    <span className="text-white text-sm md:text-xl xl:text-2xl font-['Bowlby_One'] font-normal tracking-normal leading-[100%] align-middle truncate">
                        {truncateAddress(fullAddress)}
                    </span>
                </HeaderButton>
            </div>
        </header>
    );
}

export default Header;  
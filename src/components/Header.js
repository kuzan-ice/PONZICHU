import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useWalletKit } from '@mysten/wallet-kit';

// Helper to truncate address
const truncateAddress = (address) =>
    address && address.length > 12
        ? `${address.slice(0, 6)}...${address.slice(-4)}`
        : address;

// Reusable header button with ripple and animation
const HeaderButton = React.memo(({
    children,
    bgColor,
    className = '',
    onClick,
    animated = false,
}) => {
    const [pressed, setPressed] = useState(false);
    const [ripples, setRipples] = useState([]);
    const btnRef = useRef(null);

    // Optimize ripple effect handler
    const createRipple = useCallback((event) => {
        const button = btnRef.current;
        if (!button) return;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        const newRipple = { x, y, size, key: Date.now() };
        setRipples((prev) => [...prev, newRipple]);
        setTimeout(() => {
            setRipples((prev) => prev.filter(r => r.key !== newRipple.key));
        }, 500);
    }, []);

    const handleMouseDown = useCallback((e) => {
        if (animated) setPressed(true);
        createRipple(e);
    }, [animated, createRipple]);

    const handleMouseUp = useCallback(() => {
        if (animated) setPressed(false);
    }, [animated]);

    const buttonClasses = useMemo(() => `
        relative overflow-hidden
        flex flex-row gap-2 justify-center items-center
        ${bgColor}
        px-3 py-1 rounded-full h-auto shadow-[4px_4px_0px_0px_#000000]
        cursor-pointer
        transition duration-150 ease-in-out
        ${animated && pressed ? 'scale-95 shadow-lg' : 'scale-100'}
        hover:brightness-105 active:brightness-95
        ${className}
    `, [bgColor, className, animated, pressed]);

    return (
        <div
            ref={btnRef}
            className={buttonClasses}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
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
});

// Extract wallet modal component
const WalletModal = React.memo(({ isOpen, onClose, wallets, onWalletSelect }) => {
    if (!isOpen) return null;
    
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-5 max-w-md w-full shadow-xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-['Bowlby_One']">Connect Wallet</h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800"
                    >
                        ✕
                    </button>
                </div>
                <div className="space-y-3">
                    {wallets.map((wallet) => (
                        <button
                            key={wallet.name}
                            onClick={() => onWalletSelect(wallet.name)}
                            className="flex items-center w-full p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <img 
                                src={wallet.icon} 
                                alt={wallet.name} 
                                className="w-8 h-8 mr-3"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M12 8v8M8 12h8"/></svg>';
                                }}
                            />
                            <span className="font-['Bowlby_One']">{wallet.name}</span>
                        </button>
                    ))}
                </div>
                <div className="mt-4 text-center text-sm text-gray-500">
                    Install the wallet extension if you don't have it already.
                </div>
            </div>
        </div>
    );
});

// Extract balance display component
const BalanceDisplay = React.memo(({ isConnected, pchuBalance }) => (
    <HeaderButton bgColor="bg-[#F2C521]" animated>
        <img
            src="/images/PCHU_LOGO_FINAL_CENTER.png"
            alt="Ponzichu Logo"
            className="h-full w-auto hidden min-[450px]:flex"
        />
        <span className="text-white text-sm md:text-xl xl:text-2xl font-['Bowlby_One'] font-normal tracking-normal leading-[100%] align-middle">
            {isConnected ? `${(pchuBalance / 1000).toFixed(1)}K` : '0'} $PCHU
        </span>
    </HeaderButton>
));

// Extract deposit button component
const DepositButton = React.memo(() => (
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
));

// Extract wallet connection button component
const WalletButton = React.memo(({ isConnecting, isConnected, currentAccount, onClick }) => (
    <HeaderButton
        bgColor="bg-[#F2C521]"
        className="max-w-[270px]"
        animated
        onClick={onClick}
    >
        {isConnecting ? (
            <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                <span className="text-white text-sm md:text-xl xl:text-2xl font-['Bowlby_One'] font-normal tracking-normal leading-[100%] align-middle">
                    Connecting...
                </span>
            </div>
        ) : isConnected && currentAccount ? (
            <div className="flex flex-row items-center">
                <span className="text-white text-sm md:text-xl xl:text-2xl font-['Bowlby_One'] font-normal tracking-normal leading-[100%] align-middle truncate">
                    {truncateAddress(currentAccount.address)}
                </span>
            </div>
        ) : (
            <span className="text-white text-sm md:text-xl xl:text-2xl font-['Bowlby_One'] font-normal tracking-normal leading-[100%] align-middle">
                Connect Wallet
            </span>
        )}
    </HeaderButton>
));

function Header() {
    // Use the wallet kit hook
    const { 
        currentAccount, 
        connect, 
        disconnect, 
        isConnected,
        isConnecting,
        wallets 
    } = useWalletKit();
    
    // Show wallet selection modal state
    const [showWalletModal, setShowWalletModal] = useState(false);
    
    // State for PCHU balance
    const [pchuBalance, setPchuBalance] = useState(0);
    
    // Optimized fetch PCHU balance function
    const fetchPchuBalance = useCallback(async (address) => {
        try {
            // Replace this mock with actual blockchain call
            // Example: const balance = await suiClient.getBalance({ owner: address, coinType: 'PCHU_COIN_TYPE' });
            
            // For now using mock data
            const mockBalance = 1000; // This should be replaced with actual balance
            setPchuBalance(mockBalance);
        } catch (error) {
            console.error("Failed to fetch PCHU balance:", error);
            setPchuBalance(0);
        }
    }, []);
    
    // Fetch PCHU balance when wallet is connected
    useEffect(() => {
        if (isConnected && currentAccount) {
            fetchPchuBalance(currentAccount.address);
        } else {
            setPchuBalance(0);
        }
    }, [isConnected, currentAccount, fetchPchuBalance]);
    
    // Handle wallet button click
    const handleWalletButtonClick = useCallback(() => {
        if (isConnected) {
            disconnect();
        } else {
            setShowWalletModal(true);
        }
    }, [isConnected, disconnect]);
    
    // Handle wallet selection
    const handleWalletSelect = useCallback(async (walletName) => {
        try {
            await connect(walletName);
            setShowWalletModal(false);
        } catch (error) {
            console.error("Failed to connect wallet:", error);
            alert(`Failed to connect: ${error.message}`);
        }
    }, [connect]);

    return (
        <header className="flex container mx-auto flex-row w-full h-auto p-3 md:p-7 justify-between items-center max-w-[1440px]">
            <div className="hidden lg:flex">
                <img src="/images/logo.png" alt="Ponzichu Logo" />
            </div>
            <div className="flex flex-row gap-3 justify-between lg:justify-center w-full lg:w-auto h-full">
                <BalanceDisplay isConnected={isConnected} pchuBalance={pchuBalance} />
                <DepositButton />
                <WalletButton 
                    isConnecting={isConnecting}
                    isConnected={isConnected}
                    currentAccount={currentAccount}
                    onClick={handleWalletButtonClick}
                />
            </div>
            
            {/* Wallet Selection Modal */}
            <WalletModal 
                isOpen={showWalletModal}
                onClose={() => setShowWalletModal(false)}
                wallets={wallets}
                onWalletSelect={handleWalletSelect}
            />
        </header>
    );
}

export default Header;  
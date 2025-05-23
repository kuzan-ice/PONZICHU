import React from 'react';
import './App.css';
import Header from './components/Header';
import CoinFlipMain from './components/CoinFlipMain';
import { WalletKitProvider } from '@mysten/wallet-kit';

function App() {
  return (
    <WalletKitProvider
      features={['sui:signTransactionBlock']}
      walletKitUi={{
        theme: 'dark',
      }}
    >
      <div className="App min-h-screen gap-[50px]" style={{ backgroundImage: `url(${`./images/background.png`})`, backgroundSize: '100% 100%', backgroundPosition: 'center' }} >
        <Header />
        <CoinFlipMain />
      </div>
    </WalletKitProvider>
  );
}

export default App;

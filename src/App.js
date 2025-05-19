import React from 'react';
import './App.css';
import Header from './components/Header';
import CoinFlipMain from './components/CoinFlipMain';

function App() {
  return (
    <div className="App min-h-screen gap-[50px]" style={{ backgroundImage: `url(${`./images/background.png`})`, backgroundSize: 'fit-cover', backgroundPosition: 'center' }}>
      <Header />
      <CoinFlipMain />
    </div>
  );
}

export default App;

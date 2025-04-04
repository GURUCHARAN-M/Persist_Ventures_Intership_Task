import React, { useState } from 'react';
import WalletConnect from './WalletConnect';
import WalletInfo from './WalletInfo';
import TokenActions from './TokenActions';

function App() {
  const [wallet, setWallet] = useState(1);

  return (
    <div className="container">
      <h1>Solana Token App</h1>
      <WalletConnect setWallet={setWallet} wallet={wallet} />
      {wallet && (
        <>
          <WalletInfo wallet={wallet} />
          <TokenActions wallet={wallet} />
        </>
      )}
    </div>
  );
}

export default App;
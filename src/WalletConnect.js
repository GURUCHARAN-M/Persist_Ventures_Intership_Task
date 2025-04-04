import React from 'react';

function WalletConnect({ wallet, setWallet }) {
  const connectWallet = async () => {
    if (window.solana && window.solana.isPhantom) {
      try {
        const response = await window.solana.connect();
        setWallet(response.publicKey.toString());
      } catch (err) {
        alert('Connection failed');
      }
    } else {
      alert('Phantom wallet not found');
    }
  };

  const disconnectWallet = () => {
    setWallet(null);
  };

  return (
    <div className="wallet-buttons">
      {wallet ? (
        <button onClick={disconnectWallet}>Disconnect Wallet</button>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
}

export default WalletConnect;
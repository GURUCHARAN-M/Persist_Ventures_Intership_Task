import React, { useEffect, useState } from 'react';
import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';

function WalletInfo({ wallet }) {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      const connection = new Connection(clusterApiUrl('devnet'));
      const publicKey = new PublicKey(wallet);
      const balance = await connection.getBalance(publicKey);
      setBalance(balance / 1e9);
    };
    fetchBalance();
  }, [wallet]);

  return (
    <div className="wallet-info">
      <p><strong>Wallet Address:</strong> {wallet}</p>
      <p><strong>SOL Balance:</strong> {balance.toFixed(2)} SOL</p>
    </div>
  );
}

export default WalletInfo;
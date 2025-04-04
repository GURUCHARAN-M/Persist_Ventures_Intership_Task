import React, { useState, useEffect } from 'react';
import {
  Connection,
  PublicKey,
  clusterApiUrl,
} from '@solana/web3.js';
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  transfer,
} from '@solana/spl-token';

function TokenActions({ wallet }) {
  const [mintAddress, setMintAddress] = useState('');
  const [receiver, setReceiver] = useState('');
  const [amount, setAmount] = useState('');
  const [txHistory, setTxHistory] = useState([]);

  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

  const createToken = async () => {
    const provider = window.solana;
    await provider.connect();
    const payer = provider.publicKey;

    const mint = await createMint(
      connection,
      provider,
      payer,
      null,
      9
    );
    setMintAddress(mint.toBase58());
    alert('Token Created: ' + mint.toBase58());
  };

  const mintToken = async () => {
    const provider = window.solana;
    await provider.connect();
    const user = provider.publicKey;
    const mint = new PublicKey(mintAddress);

    const tokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      provider,
      mint,
      user
    );

    const signature = await mintTo(
      connection,
      provider,
      mint,
      tokenAccount.address,
      user,
      1000_000_000
    );
    alert('Minted tokens: ' + signature);
    setTxHistory(prev => [signature, ...prev]);
  };

  const sendToken = async () => {
    const provider = window.solana;
    await provider.connect();
    const sender = provider.publicKey;
    const mint = new PublicKey(mintAddress);
    const to = new PublicKey(receiver);

    const senderTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      provider,
      mint,
      sender
    );

    const receiverTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      provider,
      mint,
      to
    );

    const signature = await transfer(
      connection,
      provider,
      senderTokenAccount.address,
      receiverTokenAccount.address,
      sender,
      Number(amount) * 1e9
    );
    alert('Sent tokens: ' + signature);
    setTxHistory(prev => [signature, ...prev]);
  };

  return (
    <div className="token-actions">
      <button onClick={createToken}>Create Token</button>
      {mintAddress && (
        <>
          <p><strong>Mint Address:</strong> {mintAddress}</p>
          <button onClick={mintToken}>Mint Tokens</button>

          <div className="transfer-section">
            <input
              type="text"
              placeholder="Receiver Address"
              value={receiver}
              onChange={e => setReceiver(e.target.value)}
            />
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />
            <button onClick={sendToken}>Send Tokens</button>
          </div>

          <div className="history">
            <h4>Transaction History</h4>
            <ul>
              {txHistory.map((sig, i) => (
                <li key={i}>
                  <a
                    href={`https://explorer.solana.com/tx/${sig}?cluster=devnet`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {sig.substring(0, 30)}...
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default TokenActions;
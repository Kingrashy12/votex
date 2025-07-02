"use client";
import { useWallet } from "@/providers/wallet";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";

const WalletHeader = () => {
  const { provider, address, isConnected, chain } = useWallet();
  const [balance, setBalance] = useState("0");

  useEffect(() => {
    const fetchBalance = async () => {
      if (isConnected && provider?.getBalance(address)) {
        const balance = await provider.getBalance(address);
        setBalance(ethers.formatEther(balance));
      }
    };
    fetchBalance();
  }, [provider, address, isConnected]);

  return (
    <div className="font-sans font-medium">
      {isConnected ? (
        <div className="flex flex-col gap-2">
          <p>Balance: {balance} ETH</p>
          <p>Chain: {chain.name}</p>
          <p>ChainId: {chain.chainId}</p>
        </div>
      ) : (
        <p>Connect your wallet to see balance</p>
      )}
    </div>
  );
};

export default WalletHeader;

"use client";
import { createContext, useContext } from "react";

type Chain = {
  chainId: string;
  name: string;
};

interface AccountContextProps {
  address: string;
  isConnected: boolean;
  balance: number;
  currentChain: Chain;
  isPendingConnection: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
}

export const AccountContext = createContext<AccountContextProps | undefined>(
  undefined
);

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (context === undefined) {
    throw new Error(
      "Missing 'AccountProvider' ensure your root layout is wrapped with <AccountProvider>"
    );
  }
  return context;
};

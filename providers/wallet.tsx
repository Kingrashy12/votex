"use client";

import { Chain, WalletContextType } from "@/types/wallet";
import { closeModal } from "auera-ui";
import { ethers, Signer } from "ethers";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within WalletProvider");
  }
  return context;
};

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [provider, setProvider] = useState<ethers.Provider | null>(null);
  const [signer, setSigner] = useState<Signer | null>(null);
  const [address, setAddress] = useState("");
  const [chain, setChain] = useState<Chain>({ chainId: "", name: "" });
  const [isConnected, setIsConnected] = useState(false);

  // @ts-expect-error type mismatch
  const ETH_OBJ = typeof window !== "undefined" ? window.ethereum : undefined;

  // JSON-RPC fallback provider (always available for reads)
  const fallbackProvider = useMemo(() => {
    return new ethers.JsonRpcProvider(
      `https://sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`
    );
  }, []);

  // Listen to account + chain changes if MetaMask exists
  useEffect(() => {
    if (!ETH_OBJ) return;

    const handleAccountsChange = (accounts: string[]) => {
      if (accounts.length === 0) {
        internalDiscount();
      } else {
        setAddress(accounts[0]);
      }
    };

    const handleChainChanged = async () => {
      await setupProviderAndSigner();
    };

    ETH_OBJ.on("accountsChanged", handleAccountsChange);
    ETH_OBJ.on("chainChanged", handleChainChanged);

    return () => {
      ETH_OBJ.removeListener("accountsChanged", handleAccountsChange);
      ETH_OBJ.removeListener("chainChanged", handleChainChanged);
    };
  }, []);

  const checkIfWalletIsConnected = useCallback(async () => {
    try {
      const accounts = await ETH_OBJ?.request?.({ method: "eth_accounts" });
      if (accounts && accounts.length > 0) {
        await setupProviderAndSigner();
        setAddress(accounts[0]);
        setIsConnected(true);
      } else {
        // fallback for read-only
        setProvider(fallbackProvider);
        setSigner(null);
        setIsConnected(false);
      }
    } catch (error) {
      console.log("Check Error:", error);
    }
  }, [fallbackProvider]);

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [checkIfWalletIsConnected]);

  const connectWallet = useCallback(async () => {
    try {
      if (!ETH_OBJ) {
        alert("Please install MetaMask!");
        return;
      }

      await ETH_OBJ.request({ method: "eth_requestAccounts" });
      await setupProviderAndSigner();

      const accounts = await ETH_OBJ.request({ method: "eth_accounts" });
      setAddress(accounts[0]);
      setIsConnected(true);
      closeModal();
    } catch (error) {
      console.log("Connect Error:", error);
    }
  }, []);

  const setupProviderAndSigner = async () => {
    const metamaskProvider = new ethers.BrowserProvider(ETH_OBJ);
    const metamaskSigner = await metamaskProvider.getSigner();
    const { chainId, name } = await metamaskProvider.getNetwork();
    setProvider(metamaskProvider);
    setSigner(metamaskSigner);
    setChain({ chainId: String(chainId), name });
  };

  const internalDiscount = () => {
    setProvider(fallbackProvider);
    setSigner(null);
    setAddress("");
    setIsConnected(false);
    setChain({ chainId: "", name: "" });
    ETH_OBJ?.removeAllListeners();
  };

  const discountWallet = useCallback(() => {
    internalDiscount();
  }, [fallbackProvider]);

  const contextValue = useMemo(
    () => ({
      provider,
      address,
      signer,
      connectWallet,
      discountWallet,
      isConnected,
      chain,
    }),
    [
      address,
      connectWallet,
      isConnected,
      provider,
      signer,
      discountWallet,
      chain,
    ]
  );

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
};

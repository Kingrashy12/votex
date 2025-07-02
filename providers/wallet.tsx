"use client";

import { Chain, WalletContextType } from "@/types/wallet";
import { closeModal } from "auera-ui";
import { ethers, Signer } from "ethers";
import { BrowserProvider } from "ethers";
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
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [signer, setSigner] = useState<Signer | null>(null);
  const [address, setAddress] = useState("");
  const [chain, setChain] = useState<Chain>({ chainId: "", name: "" });
  const [isConnected, setIsConnected] = useState(false);

  // @ts-expect-error invalid type
  const ETH_OBJ = typeof window !== "undefined" ? window.ethereum : undefined;

  // TODO: For MetaMask based provider use window.ethereum.providers.find((provider) => provider.isMetaMask)

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
      const newProvider = new ethers.BrowserProvider(ETH_OBJ);
      const newSigner = await newProvider.getSigner();
      const network = await newProvider.getNetwork();

      setProvider(newProvider);
      setSigner(newSigner);
      setChain({ chainId: network.chainId.toString(), name: network.name });
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
      const accounts = await ETH_OBJ.request({ method: "eth_accounts" });
      if (accounts.length > 0) {
        await setupProviderAndSigner();
        setAddress(accounts[0]);
        setIsConnected(true);
      }
    } catch (error) {
      console.log("Check Error:", error);
    }
  }, []);

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const connectWallet = useCallback(async () => {
    try {
      if (typeof ETH_OBJ === "undefined") {
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
    const provider = new ethers.BrowserProvider(ETH_OBJ);
    const signer = await provider.getSigner();
    setProvider(provider);
    setSigner(signer);
    const { chainId, name } = await provider.getNetwork();
    setChain({ chainId: String(chainId), name });
  };

  const internalDiscount = () => {
    setProvider(null);
    setSigner(null);
    setAddress("");
    setIsConnected(false);
    setChain({ chainId: "", name: "" });
    ETH_OBJ.removeAllListeners();
  };

  const discountWallet = useCallback(async () => {
    try {
      // window.location.reload();
      // ETH_OBJ._handleDisconnect();
      // localStorage.clear();
      internalDiscount();
    } catch (error) {
      console.log("Failed to disconnect:", error);
      internalDiscount();
    }
  }, []);

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

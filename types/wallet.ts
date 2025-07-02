import { Signer } from "ethers";
import { BrowserProvider } from "ethers";

export interface Chain {
  chainId: string;
  name: string;
}

export interface WalletContextType {
  provider: BrowserProvider | null;
  signer: Signer | null;
  address: string;
  isConnected: boolean;
  chain: Chain;
  connectWallet: () => Promise<void>;
  discountWallet: () => Promise<void>;
}

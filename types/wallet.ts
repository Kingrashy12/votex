import { Provider } from "ethers";
import { Signer } from "ethers";

export interface Chain {
  chainId: string;
  name: string;
}

export interface WalletContextType {
  provider: Provider | null;
  signer: Signer | null;
  address: string;
  isConnected: boolean;
  chain: Chain;
  connectWallet: () => Promise<void>;
  discountWallet: () => void;
}

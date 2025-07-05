import { useWallet } from "@/providers/wallet";
import { connectWithContract } from "@/utils/wallet";

export const useContract = () => {
  const { signer, provider } = useWallet();
  const contractCaller = async () =>
    await connectWithContract(signer ?? provider);
  return contractCaller;
};

export const useContractWithAddress = () => {
  const { signer, address, provider } = useWallet();
  const contractCaller = async () =>
    await connectWithContract(signer ?? provider);
  return { contractCaller, address };
};

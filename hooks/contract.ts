import { useWallet } from "@/providers/wallet";
import { connectWithContract } from "@/utils/wallet";

export const useContract = () => {
  const { signer } = useWallet();
  const contractCaller = async () => await connectWithContract(signer);
  return contractCaller;
};

export const useContractWithAddress = (
  sendWithoutConnection: boolean = false
) => {
  const { signer, address, provider } = useWallet();
  const contractCaller = async () =>
    await connectWithContract(sendWithoutConnection ? provider : signer);
  return { contractCaller, address };
};

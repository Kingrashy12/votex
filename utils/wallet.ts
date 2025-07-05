/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ethers } from "ethers";
import votexAbi from "../data/votex.json";

export const fetchContract = (signer: any) =>
  new ethers.Contract(
    "0xCd7e0aAe0576EcB304B0B85E5eEba40d003bc9cF",
    votexAbi,
    signer
  );

export const connectWithContract = async (signer: any) => {
  try {
    const contract = fetchContract(signer);
    return contract;
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message);
  }
};

export const connectToRemixVm = () => {
  const provider = new ethers.JsonRpcProvider("http://127.0.0.01:8545");
  const contract = fetchContract(provider);
  return contract;
};

export const contractWithSigner = async () => {
  const provider = new ethers.JsonRpcProvider("http://127.0.0.01:8545");
  const signer = new ethers.Wallet(
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
    provider
  );
  const contract = fetchContract(provider);
  const contractWithSigner = contract.connect(signer);
  return contractWithSigner;
};

// @ts-expect-error invalid type
const ETH_OBJ = typeof window !== "undefined" ? window.ethereum : undefined;
// @ts-expect-error invalid type
const SOL_OBJ = typeof window !== "undefined" ? window.phantom : undefined;

export const isMetaMaskInstalled = () => {
  return typeof ETH_OBJ !== "undefined" && ETH_OBJ.isMetaMask;
};

export const isPhantomInstalled = () => {
  return typeof SOL_OBJ !== "undefined" && SOL_OBJ.solana;
};

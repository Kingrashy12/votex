"use client";
// import { useAccount } from "@/context/account";
import { useWallet } from "@/providers/wallet";
import React from "react";
// import Button from "./ui/Button/Button";
import { shortenAddress } from "@/utils/global";
import { Button, openModal } from "auera-ui";

const ConnectButton = () => {
  const { isConnected, address } = useWallet();

  const message = isConnected
    ? `Disconnect (${shortenAddress(address)})`
    : "Connect wallet";

  // const glassClass="bg-neutral-300/20 dark:bg-neutral-400/20 text-neutral-600 dark:text-neutral-300 backdrop-blur-[1px] border border-neutral-400/20 hover:bg-neutral-300/30 dark:hover:bg-neutral-400/30"

  return (
    <>
      <Button onClick={() => openModal("connect-wallet")} radius="xl" size="lg">
        {message}
      </Button>
    </>
  );
};

export default ConnectButton;

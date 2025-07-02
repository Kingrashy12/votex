"use client";

import { providers } from "@/data/wallet-connect";
import { useWallet } from "@/providers/wallet";
import {
  For,
  IconButton,
  Modal,
  ModalContent,
  ModalHeader,
  ModalPanel,
  Image,
  closeModal,
} from "auera-ui";
import React from "react";
import { IoClose } from "react-icons/io5";
import { LuBadgeInfo } from "react-icons/lu";

const ConnectWalletModal = () => {
  const { connectWallet } = useWallet();
  return (
    <Modal value="connect-wallet">
      <ModalPanel size="sm" radius="xl" transition="dropIn">
        <ModalHeader>
          <IconButton size="xs" radius="lg" variant="ghost">
            <LuBadgeInfo size={20} />
          </IconButton>
          <span className="font-inter font-semibold text-black theme-dark:text-white">
            Connect Wallet
          </span>
          <IconButton
            size="xs"
            radius="xl"
            variant="outline"
            onClick={closeModal}
          >
            <IoClose size={22} />
          </IconButton>
        </ModalHeader>
        <ModalContent>
          <For
            each={providers}
            //   direction="column"
            //   className="gap-4"
            render={(wallet, index) => (
              <IconButton
                className="gap-3 !justify-start"
                as="div"
                radius="2xl"
                key={index}
                onClick={
                  wallet.name.startsWith("Meta") ? connectWallet : () => {}
                }
              >
                <Image alt={wallet.name} width={40} src={wallet.img} />
                <p className="font-inter font-medium">{wallet.name}</p>
                {wallet.isInstalled && (
                  <p
                    className="font-poppins font-medium bg-blue-100 p-1 rounded-md
                     theme-dark:bgblue-800/30 text-xs text-blue-500 ml-auto"
                  >
                    Detected
                  </p>
                )}
                {wallet.hint && (
                  <p
                    className="font-poppins font-medium bg-blue-100 p-1 rounded-md
                     theme-dark:bgblue-800/30 text-xs text-blue-500 ml-auto"
                  >
                    {wallet.hint}
                  </p>
                )}
              </IconButton>
            )}
          />
        </ModalContent>
      </ModalPanel>
    </Modal>
  );
};

export default ConnectWalletModal;

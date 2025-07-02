"use client";

import {
  Button,
  closeModal,
  formatNumber,
  IconButton,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalPanel,
  Skeleton,
} from "auera-ui";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import InputWithLabel from "../form/InputWithLabel";
import { useStoreMethods, useTopDispatch, useVotexStore } from "@/hooks/app";
import { useContract } from "@/hooks/contract";
import { buyVTX, fetchRate } from "@/store/action";
import { tw } from "stywind";

const BuyVTX = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const [amount, setAmount] = useState("");
  const { buyRate } = useVotexStore();
  const { setState } = useStoreMethods();
  const { dispatch } = useTopDispatch();
  const contractCaller = useContract();

  useEffect(() => {
    if (amount) {
      dispatch({ contractCaller, amount, setIsLoading }, fetchRate);
    }
  }, [amount]);

  const submit = () =>
    dispatch(
      {
        contractCaller,
        amount,
        setIsLoading: setIsBuying,
        onSuccess: () => {
          setAmount("");
          setState({ buyRate: 0 });
        },
      },
      buyVTX
    );

  return (
    <Modal value="buy-vtx">
      <ModalPanel size="sm" radius="xl" transition="dropIn">
        <ModalHeader>
          <span
            className={tw(
              "font-inter font-semibold text-black theme-dark:text-white",
              isLoading && "animate-dots"
            )}
          >
            {isLoading ? "Fetching rate" : "Buy VTX"}
          </span>
          <IconButton
            size="xs"
            radius="xl"
            variant="outline"
            disabled={isBuying || isLoading}
            onClick={closeModal}
          >
            <IoClose size={22} />
          </IconButton>
        </ModalHeader>
        <ModalContent>
          <InputWithLabel
            label="ETH Amount"
            placeholder="Enter ETH amount"
            value={amount}
            disabled={isBuying}
            onChange={(e) => setAmount(e.target.value)}
          />
          {/* Covartion rates */}
          {isLoading ? (
            <Skeleton width={`70%`} height={20} />
          ) : (
            <p>You&apos;ll get {formatNumber(buyRate, 2)} VTX</p>
          )}
        </ModalContent>

        <ModalFooter>
          <Button
            fullWidth
            size="md"
            radius="xl"
            isLoading={isBuying}
            disabled={!amount || isBuying || isLoading}
            onClick={submit}
          >
            Buy
          </Button>
        </ModalFooter>
      </ModalPanel>
    </Modal>
  );
};

export default BuyVTX;

"use client";

import React, { useState } from "react";
import {
  Button,
  closeModal,
  IconButton,
  MapItems,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalPanel,
} from "auera-ui";
import { useTopDispatch, useVotexStore } from "@/hooks/app";
import { IoClose } from "react-icons/io5";
import { useContractWithAddress } from "@/hooks/contract";
import { fetchCampaigns, vote } from "@/store/action";

const VoteModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [option, setOption] = useState("");
  const { currentCampaign } = useVotexStore();
  const { dispatch } = useTopDispatch();
  const { contractCaller, address } = useContractWithAddress();

  if (!currentCampaign) {
    return;
  }

  const submit = () => {
    dispatch(
      {
        contractCaller,
        campaignId: currentCampaign.id,
        setIsLoading,
        option,
        address,
        onSuccess: () => {
          dispatch({ contractCaller, address }, fetchCampaigns);
          setOption("");
        },
      },
      vote
    );
  };

  return (
    <Modal value="vote-modal" preventClose={isLoading}>
      <ModalPanel size="sm" radius="xl" transition="dropIn">
        <ModalHeader>
          <h1 className="font-inter font-semibold text-black theme-dark:text-white">
            Cast Your Vote
          </h1>
          <IconButton
            size="xs"
            radius="xl"
            variant="outline"
            onClick={closeModal}
            disabled={isLoading}
          >
            <IoClose size={22} />
          </IconButton>
        </ModalHeader>
        <ModalContent>
          <span className="font-inter text-neutral-400 font-medium">
            Please pick an option below:
          </span>
          <MapItems
            direction="column"
            data={currentCampaign.options}
            renderItem={(item) => (
              <Button
                fullWidth
                size="md"
                radius="xl"
                disabled={option === item}
                onClick={() => setOption(item)}
              >
                {item}
              </Button>
            )}
          />
        </ModalContent>
        <ModalFooter>
          <Button
            fullWidth
            onClick={submit}
            disabled={!option}
            isLoading={isLoading}
            radius="xl"
            size="md"
          >
            Submit Vote
          </Button>
        </ModalFooter>
      </ModalPanel>
    </Modal>
  );
};

export default VoteModal;

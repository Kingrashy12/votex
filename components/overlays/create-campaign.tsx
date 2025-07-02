"use client";

import {
  Box,
  Button,
  closeModal,
  disableOnEmptyValues,
  IconButton,
  Label,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalPanel,
} from "auera-ui";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import InputWithLabel from "../form/InputWithLabel";
import Options from "../form/Options";
import { useTopDispatch } from "@/hooks/app";
import { createCampaign } from "@/store/action";
import { useContractWithAddress } from "@/hooks/contract";
import DatePicker from "../ui/DatePicker";

const CreateCampaignModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    startDate: 0,
    endDate: 0,
  });

  const { dispatch } = useTopDispatch();
  const { contractCaller, address } = useContractWithAddress();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const submit = () =>
    dispatch(
      {
        ...form,
        options,
        contractCaller,
        address,
        setIsLoading,
        onSuccess: () => {
          setOptions([]);
          setForm({
            name: "",
            description: "",
            startDate: 0,
            endDate: 0,
          });
        },
      },
      createCampaign
    );

  return (
    <Modal value="create-campaign" preventClose={isLoading}>
      <ModalPanel size="sm" radius="xl" transition="dropIn">
        <ModalHeader>
          <h1 className="font-inter font-semibold text-black theme-dark:text-white">
            Create Campaign
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
          <InputWithLabel
            value={form.name}
            label="Name"
            onChange={handleChange}
            name="name"
            placeholder="Enter campaign name"
          />
          <InputWithLabel
            label="Description"
            onChange={handleChange}
            value={form.description}
            name="description"
            placeholder="Enter a brief description of the campaign"
          />

          <Box fullWidth className="gap-3 items-center">
            <Box className="flex-col gap-3" fullWidth>
              <Label
                value="Start Date"
                className="font-inter text-sm text-white"
              />
              <DatePicker
                onHandlePick={(day) =>
                  setForm({ ...form, startDate: day.getTime() })
                }
              />
            </Box>
            <Box className="flex-col gap-3" fullWidth>
              <Label
                value="End Date"
                className="font-inter text-sm text-white"
              />
              <DatePicker
                onHandlePick={(day) =>
                  setForm({ ...form, endDate: day.getTime() })
                }
                disablePrev={true}
              />
            </Box>
          </Box>
          <Options setLists={setOptions} lists={options} />
        </ModalContent>
        <ModalFooter>
          <Button
            fullWidth
            size="md"
            radius="xl"
            isLoading={isLoading}
            disabled={
              disableOnEmptyValues(form, [
                "description",
                "endDate",
                "name",
                "startDate",
              ]) || options.length === 0
            }
            onClick={submit}
          >
            Create
          </Button>
        </ModalFooter>
      </ModalPanel>
    </Modal>
  );
};

export default CreateCampaignModal;

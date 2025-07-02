"use client";
import {
  Button,
  closeModal,
  FileUpload,
  FileUploadDropzone,
  FileUploadList,
  handleFileUpload,
  IconButton,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalPanel,
} from "auera-ui";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { alert } from "../Alert/Alert";
import { useContract } from "@/hooks/contract";
import { useStoreMethods } from "@/hooks/app";
import { updateUserProfile } from "@/store/action";
import { parseError } from "@/utils/global";

const ProfileUpdateModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const contractCaller = useContract();
  const { dispatch } = useStoreMethods();

  const handleUpload = handleFileUpload((file) => {
    const fileString = !Array.isArray(file) ? file.base64 : null;
    setImage(fileString);
  });

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const contract = await contractCaller();
      const tx = await contract.updateProfile(image?.toString());
      tx.wait();
      setImage(null);
      //   console.log("tx:", tx);
      alert.success("Transaction completed successfully!", tx.hash);
      dispatch(updateUserProfile(String(image)));
      closeModal();
    } catch (error) {
      const err = parseError(error);
      console.log("Err:", error);
      alert.error(err, "");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal value="update-profile" preventClose={isLoading}>
      <ModalPanel size="sm" radius="xl" transition="dropIn">
        <ModalHeader>
          <h1 className="font-inter font-semibold text-black theme-dark:text-white">
            Update Profile
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
          <FileUpload onFileUpload={handleUpload}>
            <FileUploadDropzone
              maxSize={5}
              disabled={isLoading}
              accept={["image/jpeg", "image/jpg", "image/png"]}
              label="Drag & Drop or Click to upload"
              description="image (.jpeg, .png, .jpg) up to 5MB"
            />
            <FileUploadList showSize />
          </FileUpload>
        </ModalContent>
        <ModalFooter>
          <Button
            fullWidth
            radius="xl"
            size="md"
            isLoading={isLoading}
            onClick={handleSubmit}
            disabled={image === null}
          >
            Update
          </Button>
        </ModalFooter>
      </ModalPanel>
    </Modal>
  );
};

export default ProfileUpdateModal;

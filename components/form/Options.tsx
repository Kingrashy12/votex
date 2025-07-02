"use client";
import {
  Box,
  IconButton,
  MapItems,
  StrFun,
  TextInput,
  toast,
  Tooltip,
} from "auera-ui";
import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { FiPlus } from "react-icons/fi";
import { HiOutlineInformationCircle } from "react-icons/hi";

interface OptionsProps {
  setLists: React.Dispatch<React.SetStateAction<string[]>>;
  lists: string[];
}

const Options: React.FC<OptionsProps> = ({ setLists, lists }) => {
  const [value, setValue] = useState("");

  const handlePush = () => {
    const inList = lists.includes(value);
    if (value) {
      if (inList) {
        toast.info("You can't add same value twice", { transition: "slideIn" });
      } else {
        setLists((prevLists) => [value, ...prevLists]);
        setValue("");
      }
    } else toast.info("Please enter a value", { transition: "slideIn" });
  };

  const removeItem = (index: number) => {
    setLists((lists) => {
      const updatedList = lists.filter((_, idx) => idx !== index);
      return updatedList;
    });
  };

  return (
    <Box className="flex-col gap-4">
      <Box className="gap-1 items-center">
        <p className="font-poppins font-normal ml-1 text-sm">
          What options are availabe for voters?
        </p>

        {/* TODO: Change this */}
        <Tooltip label="Whar are you giving out" containerClass="!w-fit">
          <HiOutlineInformationCircle />
        </Tooltip>
      </Box>
      {lists.length >= 1 && (
        <MapItems
          data={lists}
          wrap
          renderItem={(list, index) => (
            <Box key={index} className="rounded-full gap-2" centered>
              <p className="text-white font-montserrat font-medium text-sm tracking-tighter">
                {StrFun.truncate(list, 10)}
              </p>
              <CgClose
                onClick={() => removeItem(index)}
                className="cursor-pointer active:scale-75 transition-transform bg-neutral-700 hover:bg-neutral-800 p-1 rounded-full"
                size={20}
              />
            </Box>
          )}
        />
      )}
      <Box centered className="gap-3">
        <TextInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter a single list item"
          radius="md"
          variant="ghost"
          onKeyDown={(e) => (e.key === "Enter" ? handlePush() : null)}
        />
        <IconButton disabled={!value} onClick={handlePush} variant="outline">
          <FiPlus />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Options;

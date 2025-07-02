import { Box, Label, TextInput } from "auera-ui";
import React from "react";
import { InputProps } from "stywind";

interface InputWLProps extends InputProps {
  label: string;
}

const InputWithLabel: React.FC<InputWLProps> = ({ label, ...props }) => {
  return (
    <Box className="flex-col gap-1.5 ml-1">
      <Label value={label} className="font-inter text-sm text-white" />
      <TextInput {...props} variant="ghost" />
    </Box>
  );
};

export default InputWithLabel;

import { Box, TextField } from "@material-ui/core";
import React from "react";

type Props = {
  control: string;
  maxLength?: number;
  rows?: number;
  label: string;
  placeholder?: string;
  onUpdate: React.Dispatch<string>;
};

export const LongTextInput: React.FC<Props> = ({
  control,
  rows = 4,
  label,
  placeholder,
  onUpdate,
}) => {
  return (
    <Box my={2} width="100%">
      <TextField
        label={label}
        value={control}
        type="text"
        placeholder={placeholder}
        variant="outlined"
        fullWidth
        multiline
        minRows={rows}
        InputProps={{
          onChange: (e) => {
            onUpdate(e.target.value);
          },
        }}
      />
    </Box>
  );
};

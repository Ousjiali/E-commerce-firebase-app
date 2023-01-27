import { Box, TextField } from "@material-ui/core";
import * as React from "react";

type Props = {
  comment: string;
  onUpdate: React.Dispatch<string>;
};

export const EnterComment: React.FC<Props> = ({ comment, onUpdate }) => {
  return (
    <Box>
      <TextField
        value={comment}
        onChange={(e) => onUpdate(e.target.value)}
        variant="outlined"
        fullWidth
        multiline
        minRows={4}
      />
    </Box>
  );
};

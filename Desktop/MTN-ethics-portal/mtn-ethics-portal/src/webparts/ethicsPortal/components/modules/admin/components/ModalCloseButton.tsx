import { DialogTitle, Typography, colors, IconButton } from "@material-ui/core";
import React from "react";
import { FaTimesCircle } from "react-icons/fa";

type Props = {
  onClose: () => void;
  title?: string;
};

export const ModalCloseButton: React.FC<Props> = ({ onClose, title = "" }) => {
  return (
    <DialogTitle>
      <Typography variant="body2" style={{ fontWeight: "bold" }}>
        {title}
      </Typography>
      <IconButton
        aria-label="close"
        onClick={() => onClose()}
        style={{
          position: "absolute",
          right: 8,
          top: 8,
          color: colors.grey[500],
        }}
      >
        <FaTimesCircle />
      </IconButton>
    </DialogTitle>
  );
};

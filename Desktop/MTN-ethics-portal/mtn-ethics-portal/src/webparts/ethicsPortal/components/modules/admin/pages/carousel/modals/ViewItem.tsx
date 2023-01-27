import { Box, Dialog, DialogContent } from "@material-ui/core";
import React from "react";
import { ModalCloseButton } from "../../../components/ModalCloseButton";

type Props = {
  open: boolean;
  onClose: () => void;
  url: string;
};

export const ViewItem: React.FC<Props> = ({ onClose, open, url }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <ModalCloseButton onClose={onClose} />
      <DialogContent>
        <img
          src={url}
          width="100%"
          height="100%"
          style={{
            objectFit: "cover",
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

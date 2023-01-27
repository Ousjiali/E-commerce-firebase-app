import {
  colors,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@material-ui/core";
import { sp } from "@pnp/sp";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import { useToasts } from "react-toast-notifications";
import { errorAlert, successAlert } from "../../../../../utils/toast-messages";
import { QuickLinkData, QuickLinkForm } from "../forms/QuickLinkForm";

type Props = {
  open: boolean;
  onClose: () => void;
};

export const AddQuickLinkItemModal: React.FC<Props> = ({ open, onClose }) => {
  const [formData, setFormData] = React.useState<QuickLinkData>();
  const toast = useToasts().addToast;
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    async () => {
      return await sp.web.lists.getByTitle("QuickLinks").items.add(formData);
    },
    {
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries(["quickLinks"]);
        onClose();
        successAlert(toast, "Item Added Successfully");
      },
      onError(error: Error, variables, context) {
        errorAlert(toast, error.message);
      },
    }
  );
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="body2" style={{ fontWeight: "bold" }}>
          Add New Quick Link
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
      <DialogContent>
        <QuickLinkForm
          formData={formData}
          isLoading={isLoading}
          onUpdate={(values) => setFormData(values)}
          onSubmit={(e) => {
            e.preventDefault();
            mutate();
          }}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};

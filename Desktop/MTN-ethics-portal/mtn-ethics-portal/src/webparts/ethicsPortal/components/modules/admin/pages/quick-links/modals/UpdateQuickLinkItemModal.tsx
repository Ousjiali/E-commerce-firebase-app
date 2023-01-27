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
  formData: QuickLinkData;
};

export const UpdateQuickLinkItemModal: React.FC<Props> = ({
  open,
  onClose,
  formData: itemToUpdate,
}) => {
  const [formData, setFormData] = React.useState<QuickLinkData>(itemToUpdate);
  const toast = useToasts().addToast;
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    () => {
      return sp.web.lists
        .getByTitle("QuickLinks")
        .items.getById(itemToUpdate?.Id)
        .update({
          QuickLinkTitle: formData?.QuickLinkTitle,
          LinkTo: formData?.LinkTo,
        } as QuickLinkData);
    },
    {
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries(["quickLinks"]);
        onClose();
        successAlert(toast, "Item Updated Successfully");
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
          Update Quick Link
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
          buttonLabel="Update"
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};

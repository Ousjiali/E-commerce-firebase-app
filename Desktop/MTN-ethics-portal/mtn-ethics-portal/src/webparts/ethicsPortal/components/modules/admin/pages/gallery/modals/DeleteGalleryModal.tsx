import {
  Typography,
  DialogActions,
  CircularProgress,
  Dialog,
  DialogContent,
  Button,
  colors,
  DialogTitle,
  IconButton,
} from "@material-ui/core";
import { sp } from "@pnp/sp";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import * as React from "react";
import { FaTimesCircle } from "react-icons/fa";
import { useToasts } from "react-toast-notifications";
import { successAlert, errorAlert } from "../../../../../utils/toast-messages";

type Props = {
  uploadTitle: string;
  uploadId: number;
  onClose: (res?: boolean) => void;
  open: boolean;
};

export const DeleteGalleryModal: React.FC<Props> = ({
  uploadTitle,
  uploadId,
  onClose,
  open,
}) => {
  const queryClient = useQueryClient();
  const toast = useToasts().addToast;
  const mutation = useMutation(
    async (id: number) => {
      return await sp.web.lists
        .getByTitle("Gallery")
        .items.getById(id)
        .delete();
    },
    {
      onSuccess: () => {
        onClose(true);
        queryClient.invalidateQueries(["gallery"]).then(() => {
          successAlert(toast, "Item Deleted Successfully");
        });
      },
      onError: () => {
        errorAlert(toast);
      },
    }
  );
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="body2" style={{ fontWeight: "bold" }}>
          Delete Gallery Item
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
        <Typography style={{ boxSizing: "border-box", padding: "3rem" }}>
          Are you sure you want to remove <strong>{uploadTitle}</strong> ?
          <br></br>
          This action is irreversible. Click <strong>Proceed</strong> to
          continue.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={() => onClose()} variant="contained">
          Cancel
        </Button>
        <Button
          onClick={() => {
            mutation.mutate(uploadId);
          }}
          endIcon={
            mutation?.isLoading ? (
              <CircularProgress size={20} color="secondary" />
            ) : (
              <></>
            )
          }
          variant="contained"
          color="primary"
        >
          Proceed
        </Button>
      </DialogActions>
    </Dialog>
  );
};

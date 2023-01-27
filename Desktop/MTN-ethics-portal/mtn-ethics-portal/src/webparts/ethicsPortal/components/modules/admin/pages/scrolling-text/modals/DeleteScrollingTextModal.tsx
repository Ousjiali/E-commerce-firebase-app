import {
  Typography,
  DialogActions,
  CircularProgress,
  Dialog,
  DialogContent,
  Button,
} from "@material-ui/core";
import { sp } from "@pnp/sp";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import * as React from "react";
import { useToasts } from "react-toast-notifications";
import { successAlert, errorAlert } from "../../../../../utils/toast-messages";
import { ModalCloseButton } from "../../../components/ModalCloseButton";

type Props = {
  text: string;
  Id: number;
  onClose: (res?: boolean) => void;
  open: boolean;
};

export const DeleteScrollingTextModal: React.FC<Props> = ({
  text,
  Id,
  onClose,
  open,
}) => {
  const queryClient = useQueryClient();
  const toast = useToasts().addToast;
  const mutation = useMutation(
    async (id: number) => {
      try {
        await sp.web.lists
          .getByTitle("ScrollingText")
          .items.getById(id)
          .delete();
        return true;
      } catch (err) {
        return err;
      }
    },
    {
      onSuccess: () => {
        successAlert(toast, "Text Deleted Successfully");
        onClose(true);
        queryClient.invalidateQueries(["getScrollTexts"]);
      },
      onError: () => {
        errorAlert(toast);
      },
    }
  );
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <ModalCloseButton onClose={onClose} />
      <DialogContent>
        <Typography style={{ boxSizing: "border-box", padding: "3rem" }}>
          Are you sure you want to remove <strong>{text}</strong> ?<br></br>
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
            mutation.mutate(Id);
          }}
          endIcon={mutation?.isLoading ? <CircularProgress size={20} /> : <></>}
          variant="contained"
          color="primary"
        >
          Proceed
        </Button>
      </DialogActions>
    </Dialog>
  );
};

import {
  Button,
  CircularProgress,
  DialogActions,
  Typography,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as React from "react";
import { useToasts } from "react-toast-notifications";
import {
  errorAlert,
  successAlert,
} from "../../../../../../utils/toast-messages";
import { ModalCloseButton } from "../../../../components/ModalCloseButton";
import { DeleteDefaulters } from "../../apis/DeleteDefaulters";

type Props = {
  open: boolean;
  onClose: (item?: any) => void;
  defaulters: any;
  id: number;
};

export const RemoveDefaulterModal: React.FC<Props> = ({
  open,
  onClose,
  defaulters,
  id,
}) => {
  const queryClient = useQueryClient();
  const toast = useToasts().addToast;
  const mutation = useMutation(
    (id: number) => {
      return DeleteDefaulters(id);
    },
    {
      onSuccess: () => {
        onClose();
        queryClient.invalidateQueries(["getAllDefaulters"]);
        successAlert(toast, "Defaulter Deleted Successfully");
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
          Are you sure you want to remove <strong>{defaulters?.Title}</strong>?
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
            mutation.mutate(id);
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

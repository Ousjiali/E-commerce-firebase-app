import {
  DialogActions,
  CircularProgress,
  Dialog,
  DialogContent,
  Button,
  Typography,
} from "@material-ui/core";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import * as React from "react";
import { useToasts } from "react-toast-notifications";
import { successAlert, errorAlert } from "../../../../../utils/toast-messages";
import { ModalCloseButton } from "../../../components/ModalCloseButton";
import { deletePolicy } from "../apis/deletePolicy";

type Props = {
  open: boolean;
  onClose: (item?: any) => void;
  policy: any;
  id: number;
};

export const RemovePolicyModal: React.FC<Props> = ({
  open,
  onClose,
  policy,
  id,
}) => {
  const queryClient = useQueryClient();
  const toast = useToasts().addToast;
  const mutation = useMutation(
    (id: number) => {
      return deletePolicy(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getAllPolicies"]);
        onClose();
        successAlert(toast, "Policy Content Deleted Successfully");
      },
      onError: () => {
        errorAlert(toast);
      },
    }
  );
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <ModalCloseButton title="Remove Policy Content" onClose={onClose} />
      <DialogContent>
        <Typography style={{ boxSizing: "border-box", padding: "3rem" }}>
          Are you sure you want to remove <strong>{policy?.PolicyTitle}</strong>
          ?<br></br>
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

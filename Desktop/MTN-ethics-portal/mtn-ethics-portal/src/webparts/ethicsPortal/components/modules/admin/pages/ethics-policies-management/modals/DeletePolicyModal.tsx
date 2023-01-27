import {
  DialogActions,
  CircularProgress,
  Dialog,
  DialogContent,
  Button,
  Typography,
  DialogTitle,
  IconButton,
  colors,
} from "@material-ui/core";
import { sp } from "@pnp/sp";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import * as React from "react";
import { FaTimesCircle } from "react-icons/fa";
import { useToasts } from "react-toast-notifications";
import { successAlert, errorAlert } from "../../../../../utils/toast-messages";
import { Policy } from "../../../../employee/components/PolicyLandingComponent";

type Props = {
  open: boolean;
  onClose: (item?: any) => void;
  policy: Policy;
};

export const DeletePolicyModal: React.FC<Props> = ({
  open,
  onClose,
  policy,
}) => {
  const queryClient = useQueryClient();
  const toast = useToasts().addToast;
  const mutation = useMutation(
    async (id: number) => {
      return await sp.web.lists
        .getByTitle("PolicyConfiguration")
        .items.getById(id)
        .delete();
    },
    {
      onSuccess: () => {
        successAlert(toast, "Policy Deleted Successfully");
        queryClient.invalidateQueries(["adminPolicies"]);
        onClose();
      },
      onError: (err: Error) => {
        errorAlert(toast, err.message);
      },
    }
  );
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
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
          Are you sure you want to remove
          <strong>{policy?.PolicyTitle} </strong>?<br></br>
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
            mutation.mutate(policy?.Id);
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

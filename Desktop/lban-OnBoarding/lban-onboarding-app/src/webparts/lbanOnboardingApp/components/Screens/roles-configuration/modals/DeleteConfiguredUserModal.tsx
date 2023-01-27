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
import { successAlert, errorAlert } from "../../../utils/toast-messages";
import {
  AssignRoleApiRequest,
  RolesConfiguartion,
} from "../types/Configuration";

type Props = {
  open: boolean;
  onClose: (item?: any) => void;
  staff: AssignRoleApiRequest;
  id: number;
};

export const DeleteConfiguredUserModal: React.FC<Props> = ({
  open,
  onClose,
  staff,
  id,
}) => {
  const queryClient = useQueryClient();
  const { deleteUserRole } = new RolesConfiguartion();
  const toast = useToasts().addToast;
  const mutation = useMutation(
    async (id: number) => {
      return deleteUserRole(id);
    },
    {
      onSuccess: () => {
        successAlert(toast, "Delete successful");
        queryClient.invalidateQueries(["userRoles"]);
        onClose(true);
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
          Are you sure you want to <strong>remove</strong> {staff?.StaffName}?
          <br></br>
          This action is irreversible. Click <strong>Proceed</strong> to
          continue.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={() => onClose()}
          variant="outlined"
          disabled={mutation?.isLoading}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            mutation.mutate(id);
          }}
          disabled={mutation?.isLoading}
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

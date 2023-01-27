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
import { deleteAdmin } from "../apis/deleteAdmin";
import { StaffData } from "../components/PeoplePicker";
import { User } from "../forms/UserForm";

type Props = {
  open: boolean;
  onClose: (item?: StaffData) => void;
  user: StaffData;
  id: string;
};

export const RemoveAdminModal: React.FC<Props> = ({
  open,
  onClose,
  user,
  id,
}) => {
  const queryClient = useQueryClient();
  const toast = useToasts().addToast;
  const mutation = useMutation(
    (id: string) => {
      return deleteAdmin(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getAdmins"]);
        onClose();
        successAlert(toast, "Admin Deleted Successfully");
      },
      onError: () => {
        errorAlert(toast);
      },
    }
  );
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent>
        <ModalCloseButton onClose={onClose} />
        <Typography style={{ boxSizing: "border-box", padding: "3rem" }}>
          Are you sure you want to remove <strong>{user?.DisplayName}</strong> ?
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

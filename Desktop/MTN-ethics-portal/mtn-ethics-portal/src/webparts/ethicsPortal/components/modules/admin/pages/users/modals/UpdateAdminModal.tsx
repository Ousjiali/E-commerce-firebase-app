import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as React from "react";
import { useToasts } from "react-toast-notifications";
import { errorAlert, successAlert } from "../../../../../utils/toast-messages";
import { ModalCloseButton } from "../../../components/ModalCloseButton";
import { updateAdmin } from "../apis/updateAdmin";
import { StaffData } from "../components/PeoplePicker";
import { UserForm } from "../forms/UserForm";

type Props = {
  open: boolean;
  onClose: (item?: StaffData) => void;
  user: StaffData;
  id: string;
};

export const UpdateAdminModal: React.FC<Props> = ({
  user,
  onClose,
  open,
  id,
}) => {
  const queryClient = useQueryClient();
  const toast = useToasts().addToast;
  const [admin, setAdmin] = React.useState<StaffData>({
    Email: user.Email ?? "",
    DisplayName: user?.DisplayName ?? "",
  });
  const mutation = useMutation(
    () => {
      return updateAdmin(id, admin);
    },
    {
      onSuccess: (data) => {
        onClose();
        queryClient.invalidateQueries(["getAdmins"]);
        successAlert(toast, "Admin Updated Successfully");
      },
      onError: (error) => {
        console.log(error);
        errorAlert(toast);
      },
    }
  );
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <ModalCloseButton onClose={onClose} />
      <DialogContent>
        <Box style={{ boxSizing: "border-box", padding: "2rem" }}>
          <UserForm user={admin} onUpdate={(item) => setAdmin(item)} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()} variant="contained" color="secondary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            mutation.mutate();
          }}
          endIcon={mutation?.isLoading ? <CircularProgress size={20} /> : <></>}
          variant="contained"
          color="primary"
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

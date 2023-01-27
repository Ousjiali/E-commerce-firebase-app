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
import { useParams, useLocation } from "react-router-dom";
import * as React from "react";
import { useToasts } from "react-toast-notifications";
import { successAlert, errorAlert } from "../../../../../utils/toast-messages";
import { ModalCloseButton } from "../../../components/ModalCloseButton";
import { ReadOnlyURLSearchParams } from "../../policies/ManagePoliciesPage";

type Props = {
  title: string;
  id: number;
  onClose: (res?: boolean) => void;
  open: boolean;
};

export const DeleteTrainingVideoModal: React.FC<Props> = ({
  id,
  onClose,
  open,
  title,
}) => {
  const queryClient = useQueryClient();
  const { policyId } = useParams();
  const { search } = useLocation();
  const searchParams = React.useMemo(
    () => new URLSearchParams(search) as ReadOnlyURLSearchParams,
    [search]
  );
  const toast = useToasts().addToast;
  const mutation = useMutation(
    async (id: number) => {
      return await sp.web.lists
        .getByTitle("Training")
        .items.getById(id)
        .delete();
    },
    {
      onSuccess: () => {
        onClose(true);
        queryClient.invalidateQueries({
          queryKey: ["trainings-policies"],
        });
        queryClient.invalidateQueries({
          queryKey: ["getVideoCourses"],
        });

        successAlert(toast, "Training Deleted Successfully");
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
          Are you sure you want to remove <strong>{title}</strong>?<br></br>
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

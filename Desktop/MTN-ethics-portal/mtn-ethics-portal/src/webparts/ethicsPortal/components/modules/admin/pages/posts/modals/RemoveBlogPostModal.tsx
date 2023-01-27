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
import { ReadOnlyURLSearchParams } from "../../policies/ManagePoliciesPage";
import { deletePost } from "../apis/deletePost";
import { useParams, useLocation } from "react-router-dom";

type Props = {
  open: boolean;
  onClose: (item?: any) => void;
  post: any;
  id: number;
};

export const RemoveBlogPostModal: React.FC<Props> = ({
  open,
  onClose,
  post,
  id,
}) => {
  const queryClient = useQueryClient();
  const toast = useToasts().addToast;
  const { search } = useLocation();
  const searchParams = React.useMemo(
    () => new URLSearchParams(search) as ReadOnlyURLSearchParams,
    [search]
  );
  const { policyId } = useParams();
  const mutation = useMutation(
    (id: number) => {
      return deletePost(id);
    },
    {
      onSuccess: () => {
        onClose();
        queryClient.invalidateQueries({
          queryKey: ["getPosts"],
        });
        queryClient.invalidateQueries({
          queryKey: ["policyWriteUps"],
        });

        successAlert(toast, "Article Deleted Successfully");
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
          Are you sure you want to remove <strong>{post?.PostTitle}</strong> ?
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

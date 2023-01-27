import {
  Button,
  CircularProgress,
  colors,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@material-ui/core";
import { sp } from "@pnp/sp";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import { useToasts } from "react-toast-notifications";
import { errorAlert, successAlert } from "../../../../../utils/toast-messages";
import { CarouselData, CarouselItemForm } from "../forms/CarouselItemForm";

type Props = {
  open: boolean;
  onClose: () => void;
  item: CarouselData;
};

export const DeleteCarouselItemModal: React.FC<Props> = ({
  open,
  onClose,
  item,
}) => {
  const toast = useToasts().addToast;
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    () => {
      return sp.web.lists
        .getByTitle("CarouselItems")
        .items.getById(item?.Id)
        .delete();
    },
    {
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries(["carouselItems"]);
        onClose();
        successAlert(toast, "Item Deleted Successfully");
      },
      onError(error: Error, variables, context) {
        errorAlert(toast, error.message);
      },
    }
  );
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="body2" style={{ fontWeight: "bold" }}>
          Delete Carousel Item
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
          Are you sure you want to remove <strong>{item?.CarouselTitle}</strong>
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
            mutate();
          }}
          endIcon={
            isLoading ? <CircularProgress size={20} color="secondary" /> : <></>
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

import { colors, Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@material-ui/core";
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
  formData: CarouselData;
};

export const UpdateCarouselItemModal: React.FC<Props> = ({
  open,
  onClose,
  formData: itemToUpdate,
}) => {
  const [formData, setFormData] = React.useState<CarouselData>(itemToUpdate);
  const toast = useToasts().addToast;
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    () => {
      return sp.web.lists
        .getByTitle("CarouselItems")
        .items.getById(itemToUpdate?.Id)
        .update({
          CarouselImage: formData?.CarouselImage,
          CarouselTitle: formData?.CarouselTitle,
          LinkTo: formData?.LinkTo,
        } as CarouselData);
    },
    {
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries(["carouselItems"]);
        onClose();
        successAlert(toast, "Item Updated Successfully");
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
          Update Carousel Item
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
        <CarouselItemForm
          formData={formData}
          isLoading={isLoading}
          onUpdate={(values) => setFormData(values)}
          onSubmit={(e) => {
            e.preventDefault();
            mutate();
          }}
          buttonLabel="Update"
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};

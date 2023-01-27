import { sp } from "@pnp/sp";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import * as React from "react";
import { useToasts } from "react-toast-notifications";
import { successAlert, errorAlert } from "../../../../../utils/toast-messages";
import { Box, Dialog, DialogContent } from "@material-ui/core";
import { TrainingCategoryEnum } from "../enums/TrainingCategoryEnum";
import { TrainingType } from "../types/TrainingTypes";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { VideoCourseForm } from "../forms/VideoCourseForm";
import { ModalCloseButton } from "../../../components/ModalCloseButton";

type Props = {
  open: boolean;
  onClose: (item?: TrainingType) => void;
  id: number;
  training: TrainingType;
  context: WebPartContext;
};

export const UpdateCourseVideoModal: React.FC<Props> = ({
  id,
  onClose,
  open,
  training,
  context,
}) => {
  const queryClient = useQueryClient();
  const toast = useToasts().addToast;
  const [itemToUpdate, setItemToUpdate] = React.useState<TrainingType>({
    Category: training?.Category as TrainingCategoryEnum,
    TrainingTitle: training?.TrainingTitle,
    Video: training?.Video,
    ThumbNail: training?.ThumbNail,
    FileType: training?.FileType,
  });

  const mutation = useMutation(
    async () => {
      return await sp.web.lists
        .getByTitle("Training")
        .items.getById(id)
        .update(itemToUpdate);
    },
    {
      onSuccess: (data) => {
        onClose();

        queryClient.invalidateQueries({
          queryKey: ["getVideoCourses"],
        });
        successAlert(toast, "Training Updated Successfully");
      },
      onError: (error) => {
        errorAlert(toast);
      },
    }
  );
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <ModalCloseButton onClose={onClose} />
      <DialogContent>
        <Box style={{ boxSizing: "border-box", padding: "2rem" }}>
          <VideoCourseForm
            context={context}
            isLoading={mutation?.isLoading}
            onSubmit={(e) => {
              e.preventDefault();
              mutation.mutate();
            }}
            onUpdate={(newValue) => {
              setItemToUpdate(newValue);
            }}
            training={itemToUpdate}
            label="Update"
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
import { sp } from "@pnp/sp";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as React from "react";
import { useToasts } from "react-toast-notifications";
import { errorAlert, successAlert } from "../../../../../utils/toast-messages";
import { ModalCloseButton } from "../../../components/ModalCloseButton";
import { ScrollingTextForm } from "../forms/ScrollingTextForm";

export interface ScrollingTextInterface {
  scrollingText: string;
  isEnabled: boolean;
}

type Props = {
  open: boolean;
  onClose: (item?: ScrollingTextInterface) => void;
  id: number;
  scrollText: ScrollingTextInterface;
  canEnable: boolean;
};

export const UpdateScrollingTextModal: React.FC<Props> = ({
  scrollText,
  onClose,
  open,
  id,
  canEnable,
}) => {
  const queryClient = useQueryClient();
  const toast = useToasts().addToast;
  const [scrollTextToUpdate, setScrollTextToUpate] =
    React.useState<ScrollingTextInterface>({
      isEnabled: scrollText?.isEnabled ? true : false,
      scrollingText: scrollText?.scrollingText ?? "",
    });

  const mutation = useMutation(
    async () => {
      console.log();

      try {
        const res = await sp.web.lists
          .getByTitle("ScrollingText")
          .items.getById(id)
          .update({
            scrollingText: scrollTextToUpdate?.scrollingText,
            isEnabled: scrollTextToUpdate?.isEnabled,
          });
        return res;
      } catch (e) {
        return e;
      }
    },
    {
      onSuccess: (data) => {
        successAlert(toast, "Text Updated successfully");
        onClose();
        queryClient.invalidateQueries(["getScrollTexts"]);
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
          <ScrollingTextForm
            canEnable={canEnable}
            onSubmit={(e) => {
              e.preventDefault();
              mutation.mutate();
            }}
            onUpdate={(newValue) => {
              setScrollTextToUpate(newValue);
            }}
            scrollText={scrollTextToUpdate}
            isLoading={mutation?.isLoading}
            label="Update"
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

import { Box, Dialog, DialogContent } from "@material-ui/core";
import { sp } from "@pnp/sp";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as React from "react";
import { useToasts } from "react-toast-notifications";
import { errorAlert, successAlert } from "../../../../../utils/toast-messages";
import { Policy } from "../../../../employee/components/PolicyLandingComponent";
import { LandingPageForm } from "../forms/LandingPageForm";

type Props = {
  open?: boolean;
  onClose?: () => void;
  policy: Policy;
  content?: any;
  setContent?: React.Dispatch<React.SetStateAction<any>>;
};

export const LandingPageModal: React.FC<Props> = ({
  open,
  onClose,
  policy,
  content,
  setContent,
}) => {
  const [policyToUpdate, setPolicy] = React.useState<Policy>(policy);
  const toast = useToasts().addToast;
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation(
    ["getIt"],
    async () =>
      await sp.web.lists
        .getByTitle("PolicyConfiguration")
        .items.getById(policy?.Id)
        .update({
          Content: JSON.stringify(content),
          ImageUrl: policyToUpdate?.ImageUrl,
        } as Policy),
    {
      onSuccess(data, variables, context) {
        successAlert(toast, "Updated Successfully");
        queryClient.invalidateQueries(["getIt"]);
        onClose();
      },

      onError(error, variables, context) {
        errorAlert(toast);
      },
    }
  );
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogContent>
        <Box height="auto">
          <LandingPageForm
            isLoading={isLoading}
            policy={policyToUpdate}
            onUpdate={(update) => setPolicy(update)}
            onSubmit={(e) => {
              e.preventDefault();
              mutate();
            }}
            content={content}
            setContent={setContent}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export const LandingPage: React.FC<Props> = ({
  policy,
  content,
  setContent,
}) => {
  const [policyToUpdate, setPolicy] = React.useState<Policy>(policy);
  const toast = useToasts().addToast;
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation(
    ["getIt"],
    async () =>
      await sp.web.lists
        .getByTitle("PolicyConfiguration")
        .items.getById(policy?.Id)
        .update({
          Content: JSON.stringify(content),
          ImageUrl: policyToUpdate?.ImageUrl,
        } as Policy),
    {
      onSuccess(data, variables, context) {
        successAlert(toast, "Update successful");
        queryClient.invalidateQueries(["getIt"]);
      },

      onError(error, variables, context) {
        errorAlert(toast);
      },
    }
  );
  return (
    <Box height="auto">
      <LandingPageForm
        isLoading={isLoading}
        policy={policyToUpdate}
        onUpdate={(update) => setPolicy(update)}
        onSubmit={(e) => {
          e.preventDefault();
          mutate();
        }}
        content={content}
        setContent={setContent}
      />
    </Box>
  );
};

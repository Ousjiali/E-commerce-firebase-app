import {
  Button,
  colors,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@material-ui/core";
import { sp } from "@pnp/sp";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as React from "react";
import { FaTimesCircle } from "react-icons/fa";
import { useToasts } from "react-toast-notifications";
import { errorAlert, successAlert } from "../../../../../utils/toast-messages";
import { Policy } from "../../../../employee/components/PolicyLandingComponent";
import { CreatePolicyForm } from "../forms/CreatePolicyForm";

type Props = {
  open: boolean;
  onClose: () => void;
};

export const AddPolicyModal: React.FC<Props> = ({ onClose, open }) => {
  const [policyTitle, setPolicyTitle] = React.useState<Policy>();
  const queryClient = useQueryClient();
  const toast = useToasts().addToast;
  const mutation = useMutation(
    async () => {
      return await sp.web.lists
        .getByTitle("PolicyConfiguration")
        .items.add(policyTitle);
    },
    {
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries(["adminPolicies"]);
        successAlert(toast, "Policy Created Successfully");
        onClose();
      },
      onError(error: Error, variables, context) {
        errorAlert(toast, error.message);
      },
    }
  );
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Add New Policy
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
        <CreatePolicyForm
          isLoading={mutation.isLoading}
          policy={policyTitle}
          onUpdate={(policy) => setPolicyTitle(policy)}
          onClose={onClose}
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate();
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

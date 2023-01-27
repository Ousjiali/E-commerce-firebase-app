import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  DialogContentText,
  CircularProgress,
} from "@material-ui/core";
import { sp } from "@pnp/sp";
import { useMutation } from "@tanstack/react-query";
import * as React from "react";
import { useToasts } from "react-toast-notifications";
import { PeoplePicker, StaffData } from "../../../Container/PeoplePicker";
import { WebContext } from "../../../LbanOnboardingApp";
import { sendEmail } from "../../../utils/sendEmail";
import { errorAlert, successAlert } from "../../../utils/toast-messages";

type Props = {
  open: boolean;
  onClose: (status?: boolean) => void;
  staff: StaffProfileResponse;
};

export const AssignTrainerModal: React.FC<Props> = ({
  open,
  onClose,
  staff,
}) => {
  const [trainer, setTrainer] = React.useState<StaffData>();
  const { context } = React.useContext(WebContext);
  const toast = useToasts().addToast;
  const { isLoading, mutate } = useMutation(
    () =>
      sp.web.lists
        .getByTitle("StaffProfile")
        .items.getById(staff?.ID)
        .update({
          IsAssignedTrainer: true,
          AssignedTrainer: trainer?.Email,
          AssigneTrainerName: trainer?.DisplayName,
        }),
    {
      onSuccess(data, variables) {
        sendEmail(
          {
            Body: `Hello ${trainer?.DisplayName}!<br><br> You have been assigned to train ${staff?.StaffName}.
            <br><br>
                <a href="${context.pageContext.web.absoluteUrl}/#/trainer-list">See your List</a>`,
            Subject: "New Staff Assigned",
            To: [trainer?.Email],
            CC: [staff?.HOD, trainer?.Email],
          },
          toast
        ).then(() => {
          onClose(true);
          successAlert(toast, "Trainer Assigned Successfully");
        });
      },

      onError(data, variables, context) {
        errorAlert(toast);
      },
    }
  );
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent>
        <DialogContentText>
          Assign trainer to {staff?.StaffName}
        </DialogContentText>
        <PeoplePicker
          label="Choose Trainer"
          staff={trainer}
          onUpdate={(staff) => setTrainer(staff)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => onClose()}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={isLoading}
          endIcon={isLoading ? <CircularProgress size={25} /> : <></>}
          onClick={() => mutate()}
        >
          Assign
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export interface StaffProfileResponse {
  ID: number;
  Biodata: any;
  StaffName: string;
  StaffEmail: string;
  Emergency: any;
  Bank: any;
  Guarantor: string;
  Id: string;
  HOD: string;
  Department: string;
  IsAssignedTrainer: boolean;
  AssignedTrainer: string;
  HRDeclineReason: string;
  ProfileStatus: "Accepted" | "Rejected";
  AssignedTrainerName: string;
}

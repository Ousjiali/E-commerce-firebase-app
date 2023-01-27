import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import * as React from "react";
import { ModalCloseButton } from "../../../components/ModalCloseButton";

type Props = {
  onClose: (response?: boolean) => void;
  open: boolean;
  type: QuizStatus;
};

export const EnableQuizPromptModal: React.FC<Props> = ({
  onClose,
  open,
  type,
}) => {
  return (
    <Dialog open={open} onClose={() => onClose(false)} maxWidth="sm" fullWidth>
      <ModalCloseButton onClose={() => onClose(false)} />
      <DialogContent
        style={{
          height: "160px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {type === QuizStatus.Is_Enabled ? (
          <Typography>
            Are you sure you want to enable this Quiz? <br></br>
            <br></br> Click proceed to continue.
          </Typography>
        ) : (
          <Typography>
            Are you sure you want to disable this Quiz? <br></br>
            <br></br> Click proceed to continue.
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => onClose(false)}
        >
          Cancel
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => onClose(true)}
        >
          Proceed
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export enum QuizStatus {
  Is_Enabled = "enable",
  Is_Disabled = "disable",
}

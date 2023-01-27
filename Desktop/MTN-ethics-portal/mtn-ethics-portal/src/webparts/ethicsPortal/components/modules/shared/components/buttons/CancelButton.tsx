import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";

type Props = {
  isLoading?: boolean;
  onClose?: () => void;
};

export const CancelButton: React.FC<Props> = ({ isLoading, onClose }) => {
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        disabled={isLoading}
        onClick={() => setOpen(true)}
      >
        Cancel
      </Button>
      {open && (
        <CancelModal
          open={true}
          onClose={(status) => {
            setOpen(false);
            if (status) {
              history.push("/admin/dashboard");
            }
          }}
        />
      )}
    </>
  );
};

const CancelModal: React.FC<{
  open: boolean;
  onClose: (response: boolean) => void;
}> = ({ onClose, open }) => {
  return (
    <Dialog open={open} onClose={() => onClose(false)} maxWidth="sm" fullWidth>
      <DialogContent
        style={{
          height: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: "16px",
        }}
      >
        Are you sure you want to cancel this operation?
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => onClose(false)}
          variant="contained"
          color="secondary"
        >
          No
        </Button>
        <Button
          onClick={() => onClose(true)}
          variant="contained"
          color="primary"
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

import {
  Typography,
  Box,
  CircularProgress,
  TextField,
  Button,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import * as React from "react";
import { Policy } from "../../../../employee/components/PolicyLandingComponent";

type Props = {
  policy: Policy;
  onUpdate: React.Dispatch<Policy>;
  isLoading: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  label?: string;
};

export const CreatePolicyForm: React.FC<Props> = ({
  policy,
  onUpdate,
  isLoading,
  onClose,
  onSubmit,
  label = "Create",
}) => {
  return (
    <form
      onSubmit={(e) => {
        onSubmit(e);
      }}
      style={{
        width: "100%",
        margin: "auto",
        boxSizing: "border-box",
        padding: "1.5rem 1rem",
      }}
    >
      <TextField
        variant="outlined"
        value={policy?.PolicyTitle ?? ""}
        onChange={(e) =>
          onUpdate({
            ...policy,
            PolicyTitle: e.target.value,
          })
        }
        label="Policy Title"
        fullWidth
        required
        style={{ margin: "1rem 0" }}
      />

      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          size="large"
          disabled={isLoading}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          endIcon={
            isLoading ? (
              <CircularProgress size={20} color="secondary" />
            ) : (
              <Add />
            )
          }
          disabled={isLoading}
        >
          {label}
        </Button>
      </Box>
    </form>
  );
};

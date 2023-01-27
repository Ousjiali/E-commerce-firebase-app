import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import * as React from "react";
import { CancelButton } from "../../../../shared/components/buttons/CancelButton";
import { ScrollingTextInterface } from "../modals/UpdateScrollingTextModal";

type Props = {
  scrollText: ScrollingTextInterface;
  onUpdate: React.Dispatch<ScrollingTextInterface>;
  onSubmit: (e: React.FormEvent) => void;
  canEnable: boolean;
  isLoading: boolean;
  label?: string;
  isCreating?: boolean;
};

export const ScrollingTextForm: React.FC<Props> = ({
  onSubmit,
  onUpdate,
  scrollText,
  canEnable,
  isLoading,
  label,
  isCreating,
}) => {
  return (
    <form
      onSubmit={(e) => onSubmit(e)}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
      }}
    >
      <TextField
        value={scrollText?.scrollingText ?? ""}
        onChange={(e) => {
          onUpdate({
            ...scrollText,
            scrollingText: e.target.value,
          });
        }}
        fullWidth
        variant="outlined"
        label="Scrolling Text"
        multiline
        minRows={4}
      />
      {!isCreating && (
        <Select
          value={scrollText?.isEnabled ? 1 : 0}
          onChange={(e) => {
            onUpdate({
              ...scrollText,
              isEnabled: e.target.value == 1 ? true : false,
            });
          }}
          fullWidth
          variant="outlined"
          label="Select Status"
        >
          <MenuItem value={0}>Select Status</MenuItem>
          {!canEnable && <MenuItem value={1}>Enable</MenuItem>}
          <MenuItem value={0}>Stop</MenuItem>
        </Select>
      )}

      <Box
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CancelButton />
        <Button
          endIcon={isLoading ? <CircularProgress size={20} /> : <></>}
          variant="contained"
          color="primary"
          type="submit"
        >
          {label || "Create"}
        </Button>
      </Box>
    </form>
  );
};

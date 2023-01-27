import { Box, Button, CircularProgress, TextField } from "@material-ui/core";
import * as React from "react";

type Props = {
  formData: QuickLinkData;
  onUpdate: React.Dispatch<QuickLinkData>;
  buttonLabel?: string;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
};

export const QuickLinkForm: React.FC<Props> = ({
  formData,
  onUpdate,
  buttonLabel = "Create",
  isLoading,
  onSubmit,
  onClose,
}) => {
  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <Box>
        <TextField
          label="Quick Link Title"
          value={formData?.QuickLinkTitle ?? ""}
          onChange={(e) =>
            onUpdate({
              ...formData,
              QuickLinkTitle: e.target.value,
            })
          }
          style={{ margin: "1rem 0" }}
          fullWidth
          variant="outlined"
        />
      </Box>

      <Box>
        <TextField
          label="URL"
          value={formData?.LinkTo ?? ""}
          onChange={(e) =>
            onUpdate({
              ...formData,
              LinkTo: e.target.value,
            })
          }
          style={{ margin: "1rem 0" }}
          fullWidth
          variant="outlined"
        />
      </Box>

      <Box
        width="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        style={{ gap: "2rem" }}
      >
        <Button
          variant="contained"
          color="secondary"
          disabled={isLoading}
          onClick={() => onClose()}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          endIcon={
            isLoading ? <CircularProgress size={20} color="secondary" /> : <></>
          }
        >
          {buttonLabel}
        </Button>
      </Box>
    </form>
  );
};

export interface QuickLinkData {
  QuickLinkTitle: string;
  LinkTo: string;
  Id?: number;
}

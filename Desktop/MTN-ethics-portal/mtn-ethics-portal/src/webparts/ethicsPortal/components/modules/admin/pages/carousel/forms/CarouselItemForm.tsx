import { Box, Button, CircularProgress, TextField } from "@material-ui/core";
import * as React from "react";
import { WebContext } from "../../../../../EthicsPortal";
import { FileUpload } from "../../../../shared/components/input-fields/FileUpload";

type Props = {
  formData: CarouselData;
  onUpdate: React.Dispatch<CarouselData>;
  buttonLabel?: string;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
};

export const CarouselItemForm: React.FC<Props> = ({
  formData,
  onUpdate,
  buttonLabel = "Create",
  isLoading,
  onSubmit,
  onClose,
}) => {
  const { context } = React.useContext(WebContext);
  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <Box>
        <TextField
          label="Carousel Title"
          value={formData?.CarouselTitle ?? ""}
          onChange={(e) =>
            onUpdate({
              ...formData,
              CarouselTitle: e.target.value,
            })
          }
          style={{ margin: "1rem 0" }}
          fullWidth
          variant="outlined"
        />
      </Box>

      <Box>
        <TextField
          label="Carousel Link To"
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

      <Box my={2}>
        <FileUpload
          context={context}
          fileControl={formData?.CarouselImage ?? ""}
          onUpdate={(file) =>
            onUpdate({
              ...formData,
              CarouselImage: file,
            })
          }
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

export interface CarouselData {
  CarouselTitle: string;
  CarouselImage: string;
  LinkTo: string;
  Id?: number;
}

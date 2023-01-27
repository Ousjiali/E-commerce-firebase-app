import { Box, Button, CircularProgress, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { sp } from "@pnp/sp";
import * as React from "react";
import { CancelButton } from "../../../../shared/components/buttons/CancelButton";
import { FileUpload } from "../../../../shared/components/input-fields/FileUpload";
import { TrainingCategoryEnum } from "../enums/TrainingCategoryEnum";
import { TrainingType } from "../types/TrainingTypes";

type Props = {
  training: TrainingType;
  onUpdate: React.Dispatch<TrainingType>;
  onSubmit: (e: React.FormEvent) => void;
  context: WebPartContext;
  label?: string;
  isLoading: boolean;
};

export const VideoCourseForm: React.FC<Props> = ({
  training,
  onUpdate,
  onSubmit,
  context,
  label,
  isLoading,
}) => {
  const [FileType, setFileType] = React.useState("");

  React.useMemo(() => {
    onUpdate({
      ...training,
      FileType,
    });
  }, [FileType]);

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
        label="Training Title"
        value={training?.TrainingTitle ?? ""}
        variant="outlined"
        fullWidth
        onChange={(e) =>
          onUpdate({ ...training, TrainingTitle: e.target.value })
        }
      />
      <Autocomplete
        id="type"
        freeSolo={false}
        options={courseCategories?.map((option) => option)}
        fullWidth
        value={training?.Category ?? ""}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Training Category"
            margin="normal"
            variant="outlined"
          />
        )}
        onChange={(e, newValue) =>
          onUpdate({
            ...training,
            Category: newValue as TrainingCategoryEnum,
          })
        }
      />
      <Box my={2}>
        <p>Video Thumbnail</p>
        <FileUpload
          context={context}
          fileControl={training?.ThumbNail ?? ""}
          onUpdate={(newValue) => {
            onUpdate({
              ...training,
              ThumbNail: newValue,
            });
          }}
          accept={{
            "image/*": [".jpg", ".jpeg"],
          }}
        />
      </Box>
      <Box></Box>
      <FileUpload
        context={context}
        fileControl={training?.Video}
        onUpdate={(newValue) =>
          onUpdate({
            ...training,
            Video: newValue,
          })
        }
        accept={{
          "video/mp4": [".mp4"],
        }}
        setType={setFileType}
      />
      <Box display="flex" width="100%" justifyContent="space-between">
        <CancelButton />
        <Button
          type="submit"
          endIcon={isLoading ? <CircularProgress size={20} /> : <></>}
          variant="contained"
          color="primary"
        >
          {label || "Create"}
        </Button>
      </Box>
    </form>
  );
};

export const courseCategories = [
  TrainingCategoryEnum.Business_Ethics,
  TrainingCategoryEnum.Mtn_Ethics,
  TrainingCategoryEnum.Organisation_Ethics,
];

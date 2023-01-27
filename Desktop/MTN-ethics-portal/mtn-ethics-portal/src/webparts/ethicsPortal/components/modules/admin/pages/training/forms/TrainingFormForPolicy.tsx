import { Box, Button, CircularProgress, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { sp } from "@pnp/sp";
import * as React from "react";
import { WebContext } from "../../../../../EthicsPortal";
import { CancelButton } from "../../../../shared/components/buttons/CancelButton";
import { FileUpload } from "../../../../shared/components/input-fields/FileUpload";
import { ReadOnlyURLSearchParams } from "../../policies/ManagePoliciesPage";
import { TrainingCategoryEnum } from "../enums/TrainingCategoryEnum";
import { TrainingType } from "../types/TrainingTypes";
import { useLocation } from "react-router-dom";

type Props = {
  training: TrainingType;
  onUpdate: React.Dispatch<TrainingType>;
  onSubmit: (e: React.FormEvent) => void;
  label?: string;
  isLoading: boolean;
};

export const TrainingFormForPolicy: React.FC<Props> = ({
  training,
  onUpdate,
  onSubmit,
  label,
  isLoading,
}) => {
  const { context } = React.useContext(WebContext);
  const [FileType, setFileType] = React.useState("");
  const { search } = useLocation();
  const searchParams = React.useMemo(
    () => new URLSearchParams(search) as ReadOnlyURLSearchParams,
    [search]
  );

  if (!searchParams.get("filter")) return <></>;

  React.useEffect(() => {
    (async () => {
      onUpdate({
        ...training,
        Category: searchParams.get("filter") as TrainingCategoryEnum,
      });
    })();
  }, []);
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
        label="Course Title"
        value={training?.TrainingTitle ?? ""}
        variant="outlined"
        fullWidth
        onChange={(e) =>
          onUpdate({ ...training, TrainingTitle: e.target.value })
        }
        required
      />
      <Box my={2}>
        <p>Resource Thumbnail</p>
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

      <Box my={2}>
        <p>Upload Resource</p>
        <FileUpload
          context={context}
          fileControl={training?.Video}
          onUpdate={(newValue) =>
            onUpdate({
              ...training,
              Video: newValue,
              FileType: training?.FileType,
            })
          }
          accept={{
            "video/mp4": [".mp4"],
            "application/vnd.ms-powerpoint": [".pptx"],
            "application/pdf": [".pdf"],
          }}
          setType={setFileType}
        />
      </Box>

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

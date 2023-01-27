import {
  Box,
  Typography,
  Button,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { WebPartContext } from "@microsoft/sp-webpart-base";

import * as React from "react";
import { Accept } from "react-dropzone";
import { CancelButton } from "../../../../shared/components/buttons/CancelButton";
import { FileUpload } from "../../../../shared/components/input-fields/FileUpload";
import { ButtonContainerStyles } from "../../../../shared/components/TableCompHelpers";

export interface GalleryData {
  file: string;
  location: string;
  imageLabel: string;
}

type Props = {
  galleryData: GalleryData;
  onUpdate: React.Dispatch<GalleryData>;
  context: WebPartContext;
  buttonLabel: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  uploadLabel?: string;
  accept?: Accept;
};

export const GalleryForm: React.FC<Props> = ({
  galleryData,
  onUpdate,
  context,
  buttonLabel,
  onSubmit,
  isLoading,
  uploadLabel = "Select Image To Upload",
  accept,
}) => {
  return (
    <form
      onSubmit={(e) => {
        onSubmit(e);
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        marginTop: "1rem",
      }}
    >
      <TextField
        label="Enter a Title for this Upload"
        value={galleryData?.imageLabel ?? ""}
        fullWidth
        required
        variant="outlined"
        onChange={(e) =>
          onUpdate({
            ...galleryData,
            imageLabel: e.target.value,
          })
        }
      />
      <Autocomplete
        id="type"
        freeSolo={false}
        options={locations?.map((option) => option)}
        fullWidth
        value={galleryData?.location ?? ""}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Choose Location"
            margin="normal"
            variant="outlined"
            required
          />
        )}
        onChange={(e, newvalue) =>
          onUpdate({
            ...galleryData,
            location: newvalue,
          })
        }
      />
      <Box>
        <Typography>{uploadLabel}</Typography>
        <FileUpload
          context={context}
          fileControl={galleryData?.file}
          onUpdate={(newFile) =>
            onUpdate({
              ...galleryData,
              file: newFile,
            })
          }
          accept={accept}
        />
      </Box>
      <Box
        style={{
          ...ButtonContainerStyles,
        }}
        mt={3}
      >
        <CancelButton />
        <Button
          color="primary"
          variant="contained"
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

export enum Locations {
  Lagos_South_West = "Lagos/South West",
  North = "North",
  East = "East",
}

export const locations = [
  Locations.Lagos_South_West,
  Locations.North,
  Locations.East,
];

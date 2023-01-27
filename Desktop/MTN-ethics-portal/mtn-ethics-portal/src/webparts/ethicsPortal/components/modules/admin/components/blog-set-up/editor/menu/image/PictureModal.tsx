import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Slider,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import ImageRoundedIcon from "@material-ui/icons/ImageRounded";

import * as React from "react";
import AvatarEditor from "react-avatar-editor";
import { Accept, DropzoneOptions, useDropzone } from "react-dropzone";
import { useToasts } from "react-toast-notifications";
import { errorAlert } from "../../../../../../../utils/toast-messages";

export const PictureModal: React.FC<{
  file?: File;
  openModal: boolean;
  close: (result?: { file: File; blob: Blob }) => void;
}> = (props) => {
  const [file, setFile] = React.useState<File>(props.file);
  const [uploading, setUploading] = React.useState<boolean>();
  const [scale, setScale] = React.useState<number>(1);

  const handleImageScale = (e, scaleVal) => {
    setScale(scaleVal);
  };

  const editor: any = React.useRef(null);

  const toast = useToasts().addToast;

  const onDrop = (acceptedFiles, error) => {
    if (error.length) return;
    setFile(acceptedFiles[0]);
  };
  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    noClick: true,
    onDrop,
    accept: { "image/*": [".jpg", ".jpeg"] },
    maxSize: 1000000,
    onDropRejected: () => {
      alert("file format not supported or file is greater than 10mb");
    },
  });

  const handleClose = async () => {
    if (uploading) return;
    if (!file) {
      props.close();
      return;
    }
    try {
      setUploading(true);
      const dataUrl = editor?.current?.getImage().toDataURL();
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      props.close({
        file,
        blob,
      });
    } catch (error) {
      errorAlert(toast);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog
      open={props.openModal}
      onClose={() => props.close()}
      scroll={"paper"}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
      maxWidth={"sm"}
      fullWidth={true}
    >
      <DialogTitle>
        Choose Picture
        <IconButton
          aria-label="close"
          onClick={() => props.close()}
          style={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent style={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: file && "300",
          }}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {!file ? (
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                border: "0.8px #666 dashed",
                alignItems: "center",
                justifyContent: "center",
                opacity: isDragActive ? 0.8 : 1,
                padding: "1rem",
                borderRadius: "0.4rem",
                textAlign: "center",
                width: "400px",
                height: "350px",
              }}
            >
              <p>
                Drag and drop file <br></br> -or-{" "}
              </p>
              <Button
                size="large"
                style={{ margin: 0, textTransform: "none" }}
                onClick={open}
                startIcon={<ImageRoundedIcon style={{ color: "#92278F" }} />}
                variant="contained"
                color="secondary"
              >
                Browse Computer Files
              </Button>
            </Box>
          ) : (
            <Box>
              <AvatarEditor
                ref={editor}
                borderRadius={300}
                width={300}
                height={300}
                image={file}
                scale={scale}
              />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2" style={{ opacity: 0.8 }}>
                  Scale:
                </Typography>
                <Typography variant="body1">{scale}</Typography>
              </Box>
              <Slider
                aria-label="Scale"
                value={scale}
                onChange={handleImageScale}
                step={0.1}
                marks
                min={1}
                max={2}
                valueLabelDisplay="auto"
                style={{
                  color: "#92278f",
                }}
              />

              <Box
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 0.4,
                }}
              >
                <IconButton onClick={open}>
                  <ImageRoundedIcon />
                </IconButton>
                <IconButton onClick={() => setFile(null)}>
                  <DeleteRoundedIcon />
                </IconButton>
              </Box>
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions style={{ maxHeight: "100px" }}>
        <Button
          onClick={() => {
            if (editor) {
              handleClose();
            }
          }}
        >
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  LinearProgress,
} from "@material-ui/core";
import * as React from "react";
import Dropzone, { Accept } from "react-dropzone";
import { fileUploadErrorDisplay } from "../../utils/fileUploadErrorFeedback";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { useToasts } from "react-toast-notifications";
import { sp } from "@pnp/sp";
import { errorAlert } from "../../utils/toast-messages";
import uuid from "react-uuid";

type Props = {
  fileControl: FileInterface;
  onUpdate: React.Dispatch<FileInterface>;
  context: WebPartContext;
  accept?: Accept;
};

export interface FileInterface {
  type: string;
  url: string;
}

export const FileInput: React.FC<Props> = ({
  fileControl,
  onUpdate,
  context,
  accept = {
    "image/*": [".jpg", ".jpeg"],
    "application/pdf": [".pdf"],
    "video/mp4": [".mp4"],
  },
}) => {
  const [preview, setPreview] = React.useState("");
  const [fileType, setFileType] = React.useState("");
  const toast = useToasts().addToast;

  const [upload, setUpload] = React.useState(false);
  const [appendUUid, setUUid] = React.useState("");

  React.useEffect(() => {
    setUUid(uuid());
  }, []);

  const fileHandler = (file: File) => {
    setUpload(true);
    sp.web
      .getFolderByServerRelativeUrl("assets")
      .files.add(`${appendUUid}${file.name}`, file, true)
      .then((result) => {
        result.file.listItemAllFields.get().then((listItemAllFields) => {
          onUpdate({
            url: `${context.pageContext.web.absoluteUrl}/assets/${appendUUid}${file.name}`,
            type: file.type,
          });
          setUpload(false);
        });
      })
      .catch((e) => {
        setUpload(false);
        errorAlert(toast);
        console.log(e.response);
      });
  };

  return (
    <Box>
      {upload && <LinearProgress />}
      {!!fileControl && (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          {/image\/.+/i.test(fileControl?.type) ? (
            <>
              <img
                src={fileControl?.url}
                alt=""
                style={{
                  width: "500px",
                  height: "400px",
                  objectFit: "cover",
                }}
              />
            </>
          ) : (
            <iframe
              src={fileControl?.url}
              height="400px"
              width="500px"
              title="image"
              style={{
                objectFit: "cover",
              }}
            ></iframe>
          )}

          <Box style={{ width: "40px", height: "40px" }}>
            <IconButton
              onClick={() => {
                setPreview(null);
                URL.revokeObjectURL(preview);
                onUpdate(null);
              }}
            >
              <ClearRoundedIcon />
            </IconButton>
          </Box>
        </Box>
      )}

      {!fileControl && (
        <Dropzone
          onDrop={(acceptedFiles, error) => {
            if (error.length) return;
            fileHandler(acceptedFiles[0]);
            setFileType(acceptedFiles[0].type);
            setPreview(URL.createObjectURL(acceptedFiles[0]));
          }}
          accept={accept}
          multiple={false}
          maxSize={1000000000}
          onDropRejected={(error) => {
            fileUploadErrorDisplay(toast, error);
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <Box
                {...getRootProps()}
                sx={{
                  border: "1px dashed #707070",
                  borderRadius: "6px",
                  padding: "1.5rem 3rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <input {...getInputProps()} />

                <Button
                  size="large"
                  style={{ margin: 0, textTransform: "none" }}
                  color="primary"
                  variant="contained"
                  disabled={upload}
                  endIcon={upload ? <CircularProgress size={20} /> : <></>}
                >
                  Browse Files
                </Button>
              </Box>
            </section>
          )}
        </Dropzone>
      )}
    </Box>
  );
};
export const FileInputImage: React.FC<{
  file: string;
  onUpdate: React.Dispatch<string>;
  context: WebPartContext;
}> = ({ file, onUpdate, context }) => {
  const [preview, setPreview] = React.useState("");
  const [fileType, setFileType] = React.useState("");
  const toast = useToasts().addToast;

  const [upload, setUpload] = React.useState(false);
  const [appendUUid, setUUid] = React.useState("");

  React.useEffect(() => {
    setUUid(uuid());
  }, []);

  const fileHandler = (file: File) => {
    setUpload(true);
    sp.web
      .getFolderByServerRelativeUrl("assets")
      .files.add(`${appendUUid}${file.name}`, file, true)
      .then((result) => {
        result.file.listItemAllFields.get().then((listItemAllFields) => {
          onUpdate(
            `${context.pageContext.web.absoluteUrl}/assets/${appendUUid}${file.name}`
          );
          setUpload(false);
        });
      })
      .catch((e) => {
        setUpload(false);
        errorAlert(toast);
        console.log(e.response);
      });
  };

  return (
    <Box>
      {!!file && (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <img
            src={file}
            alt=""
            style={{
              width: "500px",
              height: "400px",
              objectFit: "cover",
            }}
          />

          <Box style={{ width: "40px", height: "40px" }}>
            <IconButton
              onClick={() => {
                setPreview(null);
                URL.revokeObjectURL(preview);
                onUpdate(null);
              }}
            >
              <ClearRoundedIcon />
            </IconButton>
          </Box>
        </Box>
      )}

      {!file && (
        <Dropzone
          onDrop={(acceptedFiles, error) => {
            if (error.length) return;
            fileHandler(acceptedFiles[0]);
            setFileType(acceptedFiles[0].type);
            setPreview(URL.createObjectURL(acceptedFiles[0]));
          }}
          accept={{
            "image/*": [".jpg", ".png"],
          }}
          multiple={false}
          maxSize={10000000000}
          onDropRejected={(error) => {
            fileUploadErrorDisplay(toast, error);
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <Box
                {...getRootProps()}
                sx={{
                  border: "1px dashed #707070",
                  borderRadius: "6px",
                  padding: "1.5rem 3rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <input {...getInputProps()} />

                <Button
                  size="large"
                  style={{ margin: 0, textTransform: "none" }}
                  color="primary"
                  variant="contained"
                  endIcon={upload ? <CircularProgress size={20} /> : <></>}
                  disabled={upload}
                >
                  Browse Files
                </Button>
              </Box>
            </section>
          )}
        </Dropzone>
      )}
    </Box>
  );
};

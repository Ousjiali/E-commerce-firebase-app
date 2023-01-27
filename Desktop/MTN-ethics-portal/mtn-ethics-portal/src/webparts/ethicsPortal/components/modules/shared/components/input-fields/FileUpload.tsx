import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Typography,
} from "@material-ui/core";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { sp } from "@pnp/sp";
import * as React from "react";
import Dropzone, { Accept } from "react-dropzone";
import { useToasts } from "react-toast-notifications";
import uuid from "react-uuid";
import { fileUploadErrorDisplay } from "../../../../utils/fileUploadErrorFeedback";
import { errorAlert } from "../../../../utils/toast-messages";

type Props = {
  fileControl: string;
  onUpdate: React.Dispatch<string>;
  context: WebPartContext;
  accept?: Accept;
  setType?: React.Dispatch<React.SetStateAction<string>>;
};

export const FileUpload: React.FC<Props> = ({
  fileControl,
  onUpdate,
  context,
  accept = { "image/*": [".jpg", ".jpeg"] },
  setType,
}) => {
  const toast = useToasts().addToast;

  const [upload, setUpload] = React.useState(false);
  const [appendUUid, setUUid] = React.useState("");

  React.useEffect(() => {
    setUUid(uuid());
  }, []);

  const fileHandler = (file: File) => {
    const pix = file;
    setUpload(true);
    sp.web
      .getFolderByServerRelativeUrl("assets")
      .files.add(`${appendUUid}${pix.name}`, pix, true)
      .then((result) => {
        result.file.listItemAllFields.get().then((listItemAllFields) => {
          if (listItemAllFields?.ServerRedirectedEmbedUri) {
            onUpdate(`${listItemAllFields?.ServerRedirectedEmbedUri}`);
          } else {
            onUpdate(
              `${context.pageContext.web.absoluteUrl}/assets/${appendUUid}${pix.name}`
            );
          }
          setUpload(false);
          setType(file?.type);
        });
      })
      .catch((e) => {
        setUpload(false);
        errorAlert(toast);
        console.log(e.response);
      });
  };

  return (
    <>
      {!!fileControl && (
        <Box
          style={{
            padding: "1rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            borderRadius: "0.5rem",
            justifyContent: "space-between",
            boxSizing: "border-box",
          }}
        >
          {(() => {
            if (
              /([A-Z])\.jpeg/i.test(fileControl) ||
              /([A-Z])\.png/i.test(fileControl) ||
              /([A-Z])\.jpg/i.test(fileControl)
            ) {
              // return (
              //   <BsFilePpt
              //     style={{
              //       fontSize: "3rem",
              //     }}
              //   />
              // );
              return (
                <img
                  src={fileControl}
                  width="200px"
                  height="150px"
                  style={{
                    objectFit: "cover",
                  }}
                />
              );
            }
            return (
              <iframe
                src={fileControl}
                width="300px"
                height="250px"
                style={{
                  objectFit: "cover",
                }}
                title="file"
              ></iframe>
            );

            // return (
            //   <img
            //     src={fileControl}
            //     width="200px"
            //     height="150px"
            //     style={{
            //       objectFit: "cover",
            //     }}
            //   />
            // );
          })()}

          <IconButton onClick={() => onUpdate(null)}>
            <ClearRoundedIcon />
          </IconButton>
        </Box>
      )}
      {!fileControl && (
        <Dropzone
          onDrop={(acceptedFiles, error) => {
            if (error?.length) return;
            fileHandler(acceptedFiles[0]);
          }}
          accept={accept}
          multiple={false}
          maxSize={20000000}
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
                <p>
                  Drag and drop file <br></br> -or-{" "}
                </p>
                <Button
                  style={{ margin: 0, textTransform: "none" }}
                  variant="contained"
                  color="primary"
                  endIcon={
                    upload ? (
                      <CircularProgress size={20} color="secondary" />
                    ) : (
                      <></>
                    )
                  }
                  size="large"
                >
                  Browse Computer Files
                </Button>
              </Box>
            </section>
          )}
        </Dropzone>
      )}
    </>
  );
};

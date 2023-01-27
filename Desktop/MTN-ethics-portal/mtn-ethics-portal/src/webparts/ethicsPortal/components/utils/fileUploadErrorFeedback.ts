import { FileRejection } from "react-dropzone";
import { AddToast } from "react-toast-notifications";

export const fileUploadErrorDisplay = (
  toast: AddToast,
  error: FileRejection[]
) => {
  if (error[0].errors.filter((err) => err.code === "file-invalid-type")[0]) {
    toast(`${error[0].file.type.split("/")[1]} is not a valid file type`, {
      appearance: "error",
      autoDismiss: true,
    });
  } else if (
    error[0].errors.filter((err) => err.code === "file-too-large")[0]
  ) {
    toast("Selected file is larger than 20MB", {
      appearance: "error",
      autoDismiss: true,
    });
  } else {
    toast("An error occurred....", {
      appearance: "error",
      autoDismiss: true,
    });
  }
};

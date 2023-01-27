import { AddToast } from "react-toast-notifications";

export const errorAlert = (toast: AddToast, message?: string) => {
  toast(message || "An error occured", {
    appearance: "error",
    autoDismiss: true,
  });
};
export const successAlert = (toast: AddToast, message?: string) => {
  toast(message || "Action Successful", {
    appearance: "success",
    autoDismiss: true,
  });
};

import { Box, Typography } from "@material-ui/core";
import { AddToast } from "react-toast-notifications";
import React from "react";
import swal from "sweetalert";

export const errorAlert = (toast?: AddToast, message?: string) => {
  return swal({
    text: message || "An error has occurred",
    icon: "error",
    buttons: {
      confirm: {
        text: "Done",
      },
    },
  });
};
export const successAlert = (toast?: AddToast, message?: string) => {
  return swal({
    text: message || "Action Successful",
    icon: "success",
    buttons: {
      confirm: {
        text: "Done",
      },
    },
  });
};

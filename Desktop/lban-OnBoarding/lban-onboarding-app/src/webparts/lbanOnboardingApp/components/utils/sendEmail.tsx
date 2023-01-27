import { sp } from "@pnp/sp";
import { IEmailProperties } from "@pnp/sp/sputilities";
import { AddToast } from "react-toast-notifications";
import { errorAlert, successAlert } from "./toast-messages";

export const sendEmail = async (
  emailParams: IEmailProperties,
  toast: AddToast
) => {
  try {
    await sp.utility.sendEmail(emailParams);
  } catch (err) {
    console.log(err);
  }
};

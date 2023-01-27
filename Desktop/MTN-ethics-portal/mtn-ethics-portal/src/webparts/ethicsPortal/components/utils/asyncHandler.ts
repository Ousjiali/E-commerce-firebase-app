import { errorAlert } from "./toast-messages";

export const asyncHandler = (fn) => () =>
  Promise.resolve(fn()).catch((err) => {
    console.log(err);
    errorAlert();
  });

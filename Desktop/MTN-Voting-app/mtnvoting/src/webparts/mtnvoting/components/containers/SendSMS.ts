import {
  HttpClient,
  IHttpClientOptions,
  HttpClientResponse,
} from "@microsoft/sp-http";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import { BEARER_CODE, SMS_SENDER, SMS_URL } from "../config";

export const sendSMS = (
  mobileNumber,
  EmployeeName,
  context,
  id,
  message,
  route,
  sms
) => {
  const history = useHistory();
  const postURL = SMS_URL;
  const httpClientOptions: IHttpClientOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${BEARER_CODE}`,
    },
    body: JSON.stringify({
      id: `3310232323${id}`,
      message: `Yello ${EmployeeName}, ${sms}`,
      mobile: [mobileNumber],
      sender: SMS_SENDER,
    }),
    method: "POST",
    // mode: "no-cors",
  };
  return context.httpClient
    .post(postURL, HttpClient.configurations.v1, httpClientOptions)
    .then((response: Response): Promise<HttpClientResponse> => {
      swal("Success", message ?? "Success", "success");
      history.push(route ?? "/");
      return response.json();
    });
};
export const sendSMSError = (
  mobileNumber,
  EmployeeName,
  context,
  id,
  message,
  route,
  sms
) => {
  const history = useHistory();
  const postURL = SMS_URL;
  const httpClientOptions: IHttpClientOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${BEARER_CODE}`,
    },
    body: JSON.stringify({
      id: `3310232323${id}`,
      message: `Yello ${EmployeeName}, ${sms}`,
      mobile: [mobileNumber],
      sender: SMS_SENDER,
    }),
    method: "POST",
    // mode: "no-cors",
  };
  return context.httpClient
    .post(postURL, HttpClient.configurations.v1, httpClientOptions)
    .then((response: Response): Promise<HttpClientResponse> => {
      swal("Error", message ?? "Success", "error");
      history.push(route ?? "/");
      return response.json();
    });
};

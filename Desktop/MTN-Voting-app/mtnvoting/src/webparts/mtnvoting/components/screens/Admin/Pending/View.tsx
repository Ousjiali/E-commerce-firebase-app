import * as React from "react";
import {
  AdminNavigation,
  Text,
  AdminHeader,
  Spinner,
  Modal,
  Textarea,
  Select,
} from "../../../containers";
import { useHistory, useParams } from "react-router-dom";
import { sp } from "@pnp/sp";
import swal from "sweetalert";
import {
  HttpClient,
  IHttpClientOptions,
  HttpClientResponse,
} from "@microsoft/sp-http";
import axios from "axios";
import { BEARER_CODE, SMS_SENDER, SMS_URL } from "../../../config";

const AdminViewPending = ({ context }) => {
  const { id } = useParams();
  const history = useHistory();

  const [datas, setDatas] = React.useState([]);
  const [data, setData] = React.useState({} as any);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [comments, setComments] = React.useState("");
  const [reason, setReason] = React.useState("");
  React.useEffect(() => {
    setLoading(true);
    sp.web.lists
      .getByTitle(`Nominees`)
      .items.filter(`ID eq '${id}'`)
      .get()
      .then((res) => {
        setData(res[0]);
        setLoading(false);
      });
    sp.web.lists
      .getByTitle(`Reason`)
      .items.get()
      .then((resp) => {
        setDatas(resp);
      });
  }, []);

  const info = data && data.Agenda ? data.Agenda : '["...loading"]';
  const resp = JSON.parse(info);

  function approveHandler(e): Promise<HttpClientResponse> {
    setLoading(true);
    e.preventDefault();
    sp.web.lists
      .getByTitle("Nominees")
      .items.getById(id)
      .update({
        Status: "Approved",
      })
      .then((res) => {})
      .catch((e) => {
        swal("Warning!", "An Error Occured, Try Again!", "error");
        console.error(e);
      });
    const postURL = SMS_URL;
    const httpClientOptions: IHttpClientOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BEARER_CODE}`,
      },
      body: JSON.stringify({
        id: `3310232323${id}`,
        message: `Yello ${data.EmployeeName}, Thank you! Your application was successful`,
        mobile: [data.Mobile],
        sender: SMS_SENDER,
      }),
      method: "POST",
      // mode: "no-cors",
    };
    return context.httpClient
      .post(postURL, HttpClient.configurations.v1, httpClientOptions)
      .then((response: Response): Promise<HttpClientResponse> => {
        setLoading(false);
        swal("Success", "Nominee Approved Successfully", "success");
        history.push("/admin/pending");
        return response.json();
      });
  }

  function revokeHandler(e): Promise<HttpClientResponse> {
    e.preventDefault();
    setLoading(true);
    sp.web.lists
      .getByTitle("Nominees")
      .items.getById(id)
      .update({
        Status: "Declined",
        Comments: comments,
        Reason: reason,
      })
      .then((res) => {})
      .catch((e) => {
        swal("Warning!", "An Error Occured, Try Again!", "error");
        console.error(e);
      });
    const postURL = SMS_URL;
    const httpClientOptions: IHttpClientOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BEARER_CODE}`,
      },
      body: JSON.stringify({
        id: `3310232323${id}`,
        message: `Yello ${data.EmployeeName}, Sorry your application was declined. Please contact the I&ER Advisor`,
        mobile: [data.Mobile],
        sender: SMS_SENDER,
      }),
      method: "POST",
      // mode: "no-cors",
    };
    return context.httpClient
      .post(postURL, HttpClient.configurations.v1, httpClientOptions)
      .then((response: Response): Promise<HttpClientResponse> => {
        setLoading(false);
        swal("Success", "Nominee Declined Successfully", "success");
        history.push("/admin/pending");
        return response.json();
      });
  }

  return (
    <div className="appContainer">
      <AdminNavigation pending={`active`} />
      <div className="contentsRight">
        <AdminHeader title="Pending Request" />
        <div className="textContainer">
          <div className="viewFlex">
            <div className="photo">
              {data.PassportPhotograph && (
                <div>
                  <img src={data.PassportPhotograph} alt={data.EmployeeName} />
                </div>
              )}
            </div>
            {loading ? (
              <Spinner />
            ) : (
              <div className="textContainerFlex">
                <Text title="Employee Name" value={data.EmployeeName} />
                <Text title="Employee Email" value={data.EmployeeEmail} />
                <Text title="Date employed" value={data.DateEmployed} />
                <Text title="Job Level" value={data.JobLevel} />
                <Text title="Region" value={data.Region} />
                <Text title="Location" value={data.Location} />
                <Text
                  title="Have you served on the council before "
                  value={data.ServedOnTheCouncil}
                />
                {data?.ServedOnTheCouncil === "Yes" && (
                  <>
                    <Text
                      title="Duration"
                      value={`${data?.StartDate} - ${data?.EndDate}`}
                    />
                  </>
                )}
                <Text
                  title="If yes, state the period you served "
                  value={data.PeriodServed}
                />

                <Text
                  title="Do you have any disciplinary sanction"
                  value={data.DisciplinarySanction}
                />

                <ul>
                  <p>State your five point agenda</p>
                  {resp && resp.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
                <div className="minimizeBtn">
                  <button
                    className="mtn__btn mtn__yellow"
                    onClick={approveHandler}
                  >
                    Approve
                  </button>
                  <button
                    className="mtn__btn mtn__black"
                    onClick={() => setOpen(true)}
                  >
                    Decline
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* Modal */}
          <Modal
            isVisible={open}
            title="Decline Nominee"
            size="md"
            content={
              <form onSubmit={revokeHandler}>
                <div className="mtn__InputFlex">
                  <Select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required={true}
                    title="Reason"
                    options={datas}
                    filter={true}
                    filterOption="Title"
                    size="mtn__adult"
                  />

                  <Textarea
                    title="Reason"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    required={true}
                  />
                  <div className="minimizeBtn padding">
                    <button type="submit" className="mtn__btn mtn__yellow">
                      Decline
                    </button>
                  </div>
                </div>
              </form>
            }
            onClose={() => setOpen(false)}
            footer=""
          />
        </div>
      </div>
    </div>
  );
};

export default AdminViewPending;

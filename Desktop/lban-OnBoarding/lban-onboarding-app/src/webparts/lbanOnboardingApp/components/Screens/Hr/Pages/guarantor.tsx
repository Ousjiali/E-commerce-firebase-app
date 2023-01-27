import * as React from "react";

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import "../profile.css";
import { useHistory } from "react-router-dom";
import { sp } from "@pnp/sp";
import swal from "sweetalert";
import { Spinner } from "@microsoft/office-ui-fabric-react-bundle";
import { AppWrapper } from "../../../Container/AppWrapper";

import { Menu } from "../../../Container/AppNavigation";
import HRMenuBar from "../../../Container/Profile MenuBar/HRNavBar";
import { Autocomplete } from "@material-ui/lab";
import Modal from "../../../Container/Modal";
import TextArea from "../../../Container/Form/TextArea";
import { PeoplePicker, StaffData } from "../../../Container/PeoplePicker";
import { Box, Button, CircularProgress } from "@material-ui/core";
import { HRMenu } from "../hr-menu";
import { DocumentViewer } from "../../../Container/document-viewer/DocumentViewer";
type Props = {};

export const HRGuarantor = ({ match }) => {
  const history = useHistory();
  const [documentUrl, setDocumentUrl] = React.useState("");
  const [ID, setID] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [reason, setReason] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [documentToView, setDocumentToView] = React.useState(false);
  const [openRejection, setOpenRejection] = React.useState(false);
  const [selectHod, setSelectHod] = React.useState<StaffData>({
    DisplayName: "",
    Email: "",
    Department: "",
  });
  let itemID = match.params.id;

  React.useEffect(() => {
    setLoading(true);
    sp.web.lists
      .getByTitle("StaffProfile")
      .items.filter(`ID eq '${itemID}'`)
      .get()
      .then((response) => {
        setID(response[0].ID);

        setDocumentUrl(response[0].Guarantor);
        setLoading(false);
      });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    sp.web.lists
      .getByTitle("StaffProfile")
      .items.getById(Number(itemID))
      .update({
        Department: selectHod.Department,
        HOD: selectHod.Email,
        ProfileStatus: "Approved",
      })
      .then((res) => {
        setLoading(false);
        swal("Success", "Successfully Approved", "success");
        setTimeout(function () {
          history.push(`/hr/request`);
        }, 2000);
      })
      .catch((e) => {
        setLoading(false);
        swal("Warning!", "An Error Occured, Try Again!", "error");
        console.error(e);
      });
  };

  const rejectHandler = (e) => {
    e.preventDefault();
    sp.web.lists
      .getByTitle("StaffProfile")
      .items.getById(Number(itemID))
      .update({
        HRDeclineReason: reason,
        ProfileStatus: "Rejected",
      })
      .then((res) => {
        setLoading(false);
        swal("Success", "Request Rejected", "success");
        setTimeout(function () {
          history.push(`/hr/request`);
        }, 2000);
      })
      .catch((e) => {
        setLoading(false);
        swal("Warning!", "An Error Occured, Try Again!", "error");
        console.error(e);
      });
  };

  const nextHandler = () => {
    history.push(`/hr/profile-biodata/${itemID}`);
  };

  const backHandler = () => {
    history.goBack();
  };

  return (
    <AppWrapper menu={HRMenu} showBackButton={true}>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <CircularProgress
            size={40}
            style={{
              color: "purple",
            }}
          />
        </div>
      ) : (
        <div className="Displayflex">
          <HRMenuBar guarantor={"remote"} />
          <h3>Employee Guarantee Form </h3>
          <p>
            Our employment process requires that a person seeking employment in
            our establishment should produce a credible, responsible and
            acceptable person as Guarantor subject to employment confirmation.
            If you are willing to stand as a guarantor for the said applicant,
            kindly complete this form.
          </p>
          <h4>
            Please note that it is dangerous to stand as a guarantor for someone
            whom you do not know. Guarantors are warned that any false
            declaration on this form will attract severe consequences, which may
            include prosecution.
          </h4>

          <div className="btn_container">
            {documentUrl ? (
              <div
                className="guarantor_container"
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <a href={documentUrl} download>
                  Click this form to download guarantor form
                </a>
                <Button onClick={() => setDocumentToView(true)}>
                  View Form
                </Button>
              </div>
            ) : (
              "No Attachment"
            )}
          </div>

          <div className="btn_container ">
            <button className="btns white" type="button" onClick={backHandler}>
              <span
                style={{
                  marginRight: "20px",
                  display: "flex",
                  fontWeight: "600",
                }}
              >
                <AiOutlineArrowLeft />
              </span>
              Back
            </button>
            <div className="btn_container" style={{ width: "30%" }}>
              <button
                className="btns purple"
                type="button"
                onClick={() => setOpen(true)}
              >
                Approve
              </button>
              <button
                className="btns white"
                type="button"
                onClick={() => setOpenRejection(true)}
              >
                Reject
              </button>
            </div>
            <Modal
              isVisible={open}
              title="Assign Head of Department"
              size="md"
              content={
                loading ? (
                  <Spinner />
                ) : (
                  <form onSubmit={submitHandler}>
                    <PeoplePicker
                      staff={selectHod}
                      label="Select Head of Department"
                      onUpdate={(staff) => {
                        setSelectHod(staff);
                      }}
                    />

                    <button type="submit" className="btns purple">
                      Submit
                    </button>
                  </form>
                )
              }
              onClose={() => setOpen(false)}
              footer=""
            />
            <Modal
              isVisible={openRejection}
              title={""}
              size="md"
              content={
                <div>
                  <div style={{ marginBottom: "2rem", display: "flex" }}>
                    <TextArea
                      value={reason}
                      title={"Reason for Rejection"}
                      onChange={(e: any) => {
                        setReason(e.target.value);
                      }}
                      required={true}
                    />
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={rejectHandler}
                      className="btns purple"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              }
              onClose={() => setOpenRejection(false)}
              footer=""
            />
          </div>
        </div>
      )}
      {documentToView && (
        <DocumentViewer
          open={true}
          onClose={() => setDocumentToView(false)}
          url={documentUrl}
        />
      )}
    </AppWrapper>
  );
};

const menu: Menu[] = [
  { title: "Pending", link: "/hr/viewrequest" },
  { title: "Approved", link: "/hr/approved" },
  { title: "Roles", link: "/manage-roles" },
];

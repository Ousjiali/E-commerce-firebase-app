import * as React from "react";
import { Menu } from "../../../../Container/AppNavigation";
import { AiOutlineArrowLeft } from "react-icons/ai";
import "../profile.css";
import { useHistory } from "react-router-dom";
import { sp } from "@pnp/sp";
import swal from "sweetalert";
import { WebContext } from "../../../../LbanOnboardingApp";
import { RiAttachment2 } from "react-icons/ri";
import ImageUpload from "../../../../Container/Form/ImageInput";
import { CircularProgress } from "@material-ui/core";
import { useFormContextData } from "../../../../Context";
import { getUserProfileData } from "../../../../hooks/useUserProfileData";
import uuid from "react-uuid";

export const Guarantor = () => {
  const history = useHistory();
  const {
    guarantorData,
    setGuarantorData,
    bioData,
    bankData,
    emergencyData,
    confidentialityData,
    profilePhoto,
    prevPage,
  } = useFormContextData();

  const stringifyBiodata = String(JSON.stringify(bioData));
  const stringifyEmergency = JSON.stringify(emergencyData);
  const stringifyBank = JSON.stringify(bankData);
  const { context } = React.useContext(WebContext);
  const { data } = getUserProfileData();
  const [upload, setUpload] = React.useState(false);
  const [ID, setID] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [staffData, setStaffData] = React.useState([]);
  const [appendUUid, setAppendUid] = React.useState("");
  const [disableEdit, setDisableEdit] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    sp.profiles.myProperties.get().then((res) => {
      sp.web.lists
        .getByTitle("StaffProfile")
        .items.filter(`StaffEmail eq '${res?.Email}'`)
        .get()
        .then((response) => {
          setLoading(false);
          if (response?.length > 0) {
            const profileStatus = response[0].ProfileStatus;
            if (profileStatus === "Approved") {
              setDisableEdit(true);
            }
            setID(response[0].ID);
            console.log(ID);
            setStaffData(response);
            setGuarantorData(response[0].Guarantor);
          }
        });
    });

    setAppendUid(uuid());
  }, []);

  const documentHandler = (e) => {
    const document = e.target.files[0];
    setUpload(true);
    sp.web
      .getFolderByServerRelativeUrl("GuarantorDocument")
      .files.add(`${appendUUid}${document.name}`, document, true)
      .then((result) => {
        result.file.listItemAllFields.get().then((listItemAllFields) => {
          setGuarantorData(
            `${context.pageContext.web.absoluteUrl}/GuarantorDocument/${appendUUid}${document.name}`
          );
          setUpload(false);
        });
      })
      .catch((e) => {
        setUpload(false);
        swal("Warning!", "File Upload Failed", "error");
        console.log(e.response);
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!guarantorData) {
      swal("Warning!", "Kindly upload an image!", "error");
    } else {
      setLoading(true);
      if (staffData.length > 0) {
        sp.web.lists
          .getByTitle("StaffProfile")
          .items.getById(Number(ID))
          .update({
            ProfilePhoto: profilePhoto,
            Biodata: stringifyBiodata,
            StaffName: data?.DisplayName,
            StaffEmail: data?.Email,
            Bank: stringifyBank,
            Confidentiality: confidentialityData,
            Emergency: stringifyEmergency,
            Guarantor: guarantorData,
          })
          .then((res) => {
            setLoading(false);
            swal(
              "Success",
              "Your request has been forwarded to the HR",
              "success"
            ).then(() => {
              history.push(`/employee/profile`);
            });
          })
          .catch((e) => {
            setLoading(false);
            swal("Error!", "An Error Occured, Try Again!", "error");
            console.error(e);
          });
      } else {
        sp.web.lists
          .getByTitle("StaffProfile")
          .items.add({
            ProfilePhoto: profilePhoto,
            Biodata: stringifyBiodata,
            StaffName: data?.DisplayName,
            StaffEmail: data?.Email,
            Bank: stringifyBank,
            Confidentiality: confidentialityData,
            Emergency: stringifyEmergency,
            Guarantor: guarantorData,
          })
          .then((res) => {
            setLoading(false);
            swal(
              "Success",
              "Your request has been forwarded to the HR",
              "success"
            ).then(() => {
              history.push(`/employee/profile`);
            });
          })
          .catch((e) => {
            setLoading(false);
            swal("Error!", "An Error Occured, Try Again!", "error");
            console.error(e);
          });
      }
    }
  };

  return (
    <div>
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
            <div className="guarantor_container" style={{ cursor: "pointer" }}>
              <a
                href="https://lotusbetaanalytics.sharepoint.com/sites/lban-Onboarding-Portal/Shared%20Documents/Guarantor%20Forms.pdf"
                download
                target="_Blank"
              >
                <img
                  style={{
                    display: "flex",
                    width: "300px",
                    height: "120px",
                  }}
                  src="https://www.computerhope.com/jargon/t/text-file.png"
                />
              </a>
              <div
                style={{
                  display: "flex",
                  fontWeight: "bolder",
                  marginTop: "15px",
                }}
              >
                Click this form to download guarantor form
              </div>
            </div>

            <div className="guarantor_container" style={{ cursor: "pointer" }}>
              {guarantorData ? (
                <a href={guarantorData}>
                  <img
                    style={{
                      display: "flex",
                      width: "300px",
                      height: "150px",
                      marginTop: "20px",
                    }}
                    src="https://previews.123rf.com/images/dxinerz/dxinerz1509/dxinerz150901425/45612322-doc-file-icon.jpg"
                  />
                </a>
              ) : (
                <img src="https://mydocsonline.com/wp-content/uploads/2019/10/upload-file_My7gK8Id_L.png" />
              )}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    marginLeft: "30px",
                    fontWeight: "bolder",
                  }}
                >
                  Upload filled guarantor form{" "}
                </div>
                {!disableEdit && (
                  <ImageUpload
                    title={<RiAttachment2 />}
                    onChange={documentHandler}
                    loading={upload}
                    value={""}
                    accept={".docx,.txt,.pdf"}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="btn_container ">
            <button
              className="btns white"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                prevPage();
              }}
            >
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

            <button
              className="btns purple"
              type="button"
              onClick={submitHandler}
              disabled={disableEdit}
            >
              Submit to HR
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const menu: Menu[] = [
  { title: "Profile Update", link: "/employee/profile-biodata" },
  { title: "Training", link: "/employee/training" },
];

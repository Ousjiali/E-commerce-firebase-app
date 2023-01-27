import { Box, styled, TextField, Typography } from "@material-ui/core";
import * as React from "react";
import { Header, Modal, Select } from "../../../../Containers";
import TextArea, { TextAreaSmall } from "../../../../Containers/TextArea";
import { sp } from "@pnp/sp";
import styles from "../../Supervisory/Supervisory Section 2/section2.module.scss";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import { EmployeeContext } from "../../../../Context/EmployeeContext";

type Props = {};

const ConfirmationSummary = ({ context }) => {
  const history = useHistory();

  const selectOptions = [{ value: "Yes" }, { value: "No" }];

  const backHandler = () => {
    history.goBack();
  };

  const approveHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    sp.web.lists
      .getByTitle("Confirmation")
      .items.getById(Number(itemId))
      .update({
        ConfirmationStatus: "Completed",
      })
      .then((res) => {
        swal("successful", {
          buttons: { cancel: false, confirm: false },
          timer: 2000,
        });
        history.push("/admin/completed");
        setLoading(false);
      })
      .catch((e) => {
        swal("Warning!", "An Error Occured, Try Again!", "error");
        setLoading(false);
        console.error(e);
      });
  };
  const [sMESComment, setSMESComment] = React.useState("");
  const { id, itemId } = React.useContext(EmployeeContext);
  const [jobSummary, setJobSummary] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [photoUrl, setPhotoUrl] = React.useState("");

  const [upload, setUpload] = React.useState(false);

  const [employeeCredentialsUrl, setEmployeeCredentialsUrl] =
    React.useState("");

  const [referenceUrl, setReferenceUrl] = React.useState("");
  const [CHROName, setCHROName] = React.useState("");
  const [CHRODate, setCHRODate] = React.useState("");
  const [hirsUrl, setHirsUrl] = React.useState("");

  const [nyscUrl, setNyscUrl] = React.useState("");

  const [hrbpSignoffUrl, setHrbpSignoffUrl] = React.useState("");

  const [lmSignoffUrl, setLmSignoffUrl] = React.useState("");
  const [hrComment, setHrComment] = React.useState("");

  const [query, setQuery] = React.useState("");
  const [firstWrittenWarning, setFirstWrittenWarning] = React.useState("");
  const [finalWrittenWarning, setFinalWrittenWarning] = React.useState("");
  const [investigation, setInvestigation] = React.useState("");
  const [verbalWarning, setVerbalWarning] = React.useState("");

  const [open, setOpen] = React.useState(false);

  const [chiefHrOfficerComment, setChiefHrOfficerComment] = React.useState("");
  const [approval, setApproval] = React.useState("");

  // const submitFeedbackHandler = (e) => {
  //   setLoading(true);
  //   e.preventDefault();
  //   const data = {
  //     EmployeeID: id,
  //     SMESComment: sMESComment,
  //     RejectCommentLineManager: lineManagerFeedback,
  //     // LineManagerDevelopmentRequiremen : developmentalRequirement,
  //   };
  //   sp.web.lists
  //     .getByTitle("EvaluationComments")
  //     .items.filter(`EmployeeID eq '${id}'`)
  //     .get()
  //     .then((item) => {
  //       if (item.length > 0) {
  //         const SubmissionID = item && item[0].Id;
  //         sp.web.lists
  //           .getByTitle("EvaluationComments")
  //           .items.getById(SubmissionID)
  //           .update(data)
  //           .then(() => {
  //             setLoading(false);
  //             setSMESComment("");

  //             sp.web.lists
  //               .getByTitle("Confirmation")
  //               .items.getById(Number(itemId))
  //               .update({
  //                 Approvals: sendBackperson,
  //                 RejectedBy: "HCM HR Administrator",
  //               })
  //               .then(() => {
  //                 swal({
  //                   title: "Success",
  //                   text: "Evaluation Comment Submitted Successfully",
  //                   icon: "success",
  //                 }).then((ok) => {
  //                   if (ok) {
  //                     history.push("/pending/requests/gmhroperations");
  //                   }
  //                 });
  //               });
  //           })
  //           .catch((error) => {
  //             setLoading(false);
  //             swal(
  //               "Error Occured",
  //               "An error occured while submitting your data!",
  //               "error"
  //             );
  //             console.log(error);
  //           });
  //       }
  //     });
  // };

  // const submitHandler = (e) => {
  //   setLoading(true);
  //   e.preventDefault();
  //   const data = {
  //     EmployeeID: id,
  //     GMHRComment: GMHRComment,
  //   };

  //   sp.web.lists
  //     .getByTitle("EvaluationComments")
  //     .items.filter(`EmployeeID eq '${id}'`)
  //     .get()
  //     .then((item) => {
  //       if (item.length > 0) {
  //         const submissionID = item && item[0].Id;

  //         sp.web.lists
  //           .getByTitle("EvaluationComments")
  //           .items.getById(submissionID)
  //           .update(data)
  //           .then(() => {
  //             sp.web.lists
  //               .getByTitle("Confirmation")
  //               .items.getById(Number(itemId))
  //               .update({
  //                 Approvals: "HR Close Out Request",
  //                 ConfirmationStatus: "Pending",
  //               })
  //               .then(() => {
  //                 setLoading(false);
  //                 setHrComment("");
  //                 swal({
  //                   title: "Success",
  //                   text: "Evaluation Comment Submitted Successfully",
  //                   icon: "success",
  //                 }).then((ok) => {
  //                   if (ok) {
  //                     history.push("/pending/requests/gmhroperations");
  //                   }
  //                 });
  //               });
  //           });
  //       } else {
  //         history.push("/pending/requests/gmhroperations");
  //       }
  //     })
  //     .catch((error) => {
  //       setLoading(false);
  //       swal(
  //         "Error Occured",
  //         "An error occured while submitting your data!",
  //         "error"
  //       );
  //       console.log(error);
  //     });
  // };

  React.useEffect(() => {
    if (!id) {
      history.push("/view/hr-closeout");
      return;
    }

    Promise.all([
      sp.web.lists
        .getByTitle("EvaluationComments")
        .items.filter(`EmployeeID eq '${id}'`)
        .get()
        .then((response) => {
          if (response.length > 0) {
            // setCommentFieldReadOnly(true);
            // setLineManagerComment(response[0].RaterLineManagerComment);
            // setMhrbpComment(response[0].HRBPComment);
            // setSMESComment(response[0].SMESComment);
            setHrComment(response[0].HRComment);
            setJobSummary(response[0].JobResponsibilities);
            setEmployeeCredentialsUrl(response[0].EmployeeCredentials);
            setPhotoUrl(response[0].Passport);
            setReferenceUrl(response[0].Reference);
            setHirsUrl(response[0].HRIS);
            setNyscUrl(response[0].NYSC);
            setLmSignoffUrl(response[0].LMSignoff);
            setHrbpSignoffUrl(response[0].HRBPSignoff);
            setFirstWrittenWarning(response[0].FirstWrittenWarning);
            setFinalWrittenWarning(response[0].FinalWrittenWarning);
            setVerbalWarning(response[0].VerbalWarning);
            setInvestigation(response[0].Investigation);
            setQuery(response[0].Query);
            setChiefHrOfficerComment(response[0].ChiefHROfficerComment);
            setCHRODate(response[0].CHRODate);
            setCHROName(response[0].CHROName);
          }
        }),
      sp.web.lists
        .getByTitle("Confirmation")
        .items.filter(`EmployeeID eq '${id}'`)
        .get()
        .then((response) => {
          setApproval(response[0].ConfirmationStatus);
        }),
    ]);
  }, []);

  const goHome = () => {
    history.push(`/admin/completed`);
  };

  return (
    <Box>
      <Header title="Confirmation Summary" />
      <form onSubmit={approveHandler}>
        <Box sx={{ padding: "30px" }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              mt: 4,
            }}
            style={{ gap: "20px" }}
          >
            <Box sx={labelStyles}>Job Responsibilities (Summary)</Box>
            <Box
              style={{
                display: "flex",
                gap: "2px",
                flexDirection: "column",
                maxWidth: "85%",
              }}
            >
              <Typography>Comment</Typography>
              <TextAreaSmall
                value={jobSummary}
                rows={8}
                onChange={(e): void => {
                  setJobSummary(e.target.value);
                }}
              />
            </Box>
          </Box>
          <FormSectionHeader variant="subtitle2">
            Documentation
          </FormSectionHeader>
          <Box
            style={{ display: "flex", flexDirection: "column", gap: "30px" }}
          >
            <Box
              sx={{
                display: "grid",
                alignItems: "center",
                gridTemplateColumns: "1fr 1fr 1fr",
              }}
              style={{ gap: "20px" }}
            >
              <Box sx={labelStyles}>Copies of Credentials</Box>
              <Box
                style={{
                  display: "flex",
                  gap: "2px",
                  flexDirection: "column",
                }}
              >
                <Select
                  value={employeeCredentialsUrl}
                  title={""}
                  size={"sm"}
                  options={selectOptions}
                  onChange={(e): void => {
                    setEmployeeCredentialsUrl(e.target.value);
                  }}
                  required={true}
                />
              </Box>
              <Box
                style={{
                  display: "flex",
                  gap: "2px",
                  flexDirection: "column",
                }}
              >
                {/* {employeeCredentialsUrl && (
                  <a href={employeeCredentialsUrl}>
                    <img
                      src={require("../../../../../assets/Files-PNG-File.png")}
                      height="100px"
                      width="100px"
                    />
                  </a>
                )} */}
              </Box>
            </Box>
            <Box
              sx={{
                display: "grid",
                alignItems: "center",
                gridTemplateColumns: "1fr 1fr 1fr",
              }}
              style={{ gap: "20px" }}
            >
              <Box sx={labelStyles}>Passport Photograph</Box>
              <Box
                style={{
                  display: "flex",
                  gap: "2px",
                  flexDirection: "column",
                }}
              >
                <Select
                  value={photoUrl}
                  title={""}
                  size={"sm"}
                  options={selectOptions}
                  onChange={(e): void => {
                    setPhotoUrl(e.target.value);
                  }}
                  required={true}
                />
                {/* <input type="file" 
               /> */}
              </Box>
              <Box
                style={{
                  display: "flex",
                  gap: "2px",
                  flexDirection: "column",
                }}
              >
                {/* {photoUrl && (
                  <div className={styles.imageContainer}>
                    <img src={photoUrl} alt={"logo"} />
                  </div>
                )} */}
              </Box>
            </Box>
            <Box
              sx={{
                display: "grid",
                alignItems: "center",
                gridTemplateColumns: "1fr 1fr 1fr",
              }}
              style={{ gap: "20px" }}
            >
              <Box sx={labelStyles}>Satisfactory reference of ex employer</Box>
              <Box
                style={{
                  display: "flex",
                  gap: "2px",
                  flexDirection: "column",
                }}
              >
                <Select
                  value={referenceUrl}
                  title={""}
                  size={"sm"}
                  options={selectOptions}
                  onChange={(e): void => {
                    setReferenceUrl(e.target.value);
                  }}
                  required={true}
                />
              </Box>
              <Box
                style={{
                  display: "flex",
                  gap: "2px",
                  flexDirection: "column",
                }}
              >
                {/* {referenceUrl && (
                  <a href={referenceUrl}>
                    <img
                      src={require("../../../../../assets/Files-PNG-File.png")}
                      height="100px"
                      width="100px"
                    />
                  </a>
                )} */}
              </Box>
            </Box>
            <Box
              sx={{
                display: "grid",
                alignItems: "center",
                gridTemplateColumns: "1fr 1fr 1fr",
              }}
              style={{ gap: "20px" }}
            >
              <Box sx={labelStyles}>HRIS Bio Data</Box>
              <Box
                style={{
                  display: "flex",
                  gap: "2px",
                  flexDirection: "column",
                }}
              >
                <Select
                  value={hirsUrl}
                  title={""}
                  size={"sm"}
                  options={selectOptions}
                  onChange={(e): void => {
                    setHirsUrl(e.target.value);
                  }}
                  required={true}
                />
              </Box>
              <Box
                style={{
                  display: "flex",
                  gap: "2px",
                  flexDirection: "column",
                }}
              >
                {/* {hirsUrl && (
                  <a href={hirsUrl}>
                    <img
                      src={require("../../../../../assets/Files-PNG-File.png")}
                      height="100px"
                      width="100px"
                    />
                  </a>
                )} */}
              </Box>
            </Box>
            <Box
              sx={{
                display: "grid",
                alignItems: "center",
                gridTemplateColumns: "1fr 1fr 1fr",
              }}
              style={{ gap: "20px" }}
            >
              <Box sx={labelStyles}>NYSC Discharge/Exemption Certificate</Box>
              <Box
                style={{
                  display: "flex",
                  gap: "2px",
                  flexDirection: "column",
                }}
              >
                <Select
                  value={nyscUrl}
                  title={""}
                  size={"sm"}
                  options={selectOptions}
                  onChange={(e): void => {
                    setNyscUrl(e.target.value);
                  }}
                  required={true}
                />
              </Box>
              <Box
                style={{
                  display: "flex",
                  gap: "2px",
                  flexDirection: "column",
                }}
              >
                {/* {nyscUrl && (
                  <a href={nyscUrl}>
                    <img
                      src={require("../../../../../assets/Files-PNG-File.png")}
                      height="100px"
                      width="100px"
                    />
                  </a>
                )} */}
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              mt: 4,
            }}
            style={{ gap: "20px" }}
          >
            <FormSectionHeader variant="subtitle2">
              STAFF CONDUCT
            </FormSectionHeader>
            <Box
              sx={{
                display: "grid",
                alignItems: "center",
                gridTemplateColumns: "1fr 1fr 1fr",
              }}
              style={{ gap: "20px" }}
            ></Box>
            <Box sx={labelStyles}>-Pending/Ongoing Investigation</Box>
            <Box
              style={{
                display: "flex",
                gap: "2px",
                flexDirection: "column",
                maxWidth: "85%",
              }}
            >
              <Select
                value={investigation}
                title={""}
                size={"sm"}
                options={selectOptions}
                onChange={(e): void => {
                  setInvestigation(e.target.value);
                }}
                required={true}
              />
            </Box>
            <Box sx={labelStyles}>Query</Box>
            <Box
              style={{
                display: "flex",
                gap: "2px",
                flexDirection: "column",
                maxWidth: "85%",
              }}
            >
              <Select
                value={query}
                title={""}
                size={"sm"}
                options={selectOptions}
                onChange={(e): void => {
                  setQuery(e.target.value);
                }}
                required={true}
              />
            </Box>
            <Box sx={labelStyles}>Documented Verbal Warning</Box>
            <Box
              style={{
                display: "flex",
                gap: "2px",
                flexDirection: "column",
                maxWidth: "85%",
              }}
            >
              <Select
                value={verbalWarning}
                title={""}
                size={"sm"}
                options={selectOptions}
                onChange={(e): void => {
                  setVerbalWarning(e.target.value);
                }}
                required={true}
              />
            </Box>
            <Box sx={labelStyles}>First Written Warning</Box>
            <Box
              style={{
                display: "flex",
                gap: "2px",
                flexDirection: "column",
                maxWidth: "85%",
              }}
            >
              <Select
                value={firstWrittenWarning}
                title={""}
                size={"sm"}
                options={selectOptions}
                onChange={(e): void => {
                  setFirstWrittenWarning(e.target.value);
                }}
                required={true}
              />
            </Box>
            <Box sx={labelStyles}>Final Written Warning</Box>
            <Box
              style={{
                display: "flex",
                gap: "2px",
                flexDirection: "column",
                maxWidth: "85%",
              }}
            >
              <Select
                value={finalWrittenWarning}
                title={""}
                size={"sm"}
                options={selectOptions}
                onChange={(e): void => {
                  setFinalWrittenWarning(e.target.value);
                }}
                required={true}
              />
            </Box>
          </Box>
          <FormSectionHeader variant="subtitle2">
            Confirmation Approvals
          </FormSectionHeader>
          <Box
            style={{ display: "flex", flexDirection: "column", gap: "30px" }}
          >
            <Box
              sx={{
                display: "grid",
                alignItems: "center",
                gridTemplateColumns: "1fr 1fr 1fr",
              }}
              style={{ gap: "20px" }}
            >
              <Box sx={labelStyles}>Line Manager's Signoff</Box>
              <Box
                style={{
                  display: "flex",
                  gap: "2px",
                  flexDirection: "column",
                }}
              >
                <Select
                  value={lmSignoffUrl}
                  title={""}
                  size={"sm"}
                  options={selectOptions}
                  onChange={(e): void => {
                    setLmSignoffUrl(e.target.value);
                  }}
                  required={true}
                />
              </Box>
              <Box
                style={{
                  display: "flex",
                  gap: "2px",
                  flexDirection: "column",
                }}
              ></Box>
            </Box>
            <Box
              sx={{
                display: "grid",
                alignItems: "center",
                gridTemplateColumns: "1fr 1fr 1fr",
              }}
              style={{ gap: "20px" }}
            >
              <Box sx={labelStyles}>HR Business Partners Signoff Included</Box>
              <Box
                style={{
                  display: "flex",
                  gap: "2px",
                  flexDirection: "column",
                }}
              >
                <Select
                  value={hrbpSignoffUrl}
                  title={""}
                  size={"sm"}
                  options={selectOptions}
                  onChange={(e): void => {
                    setHrbpSignoffUrl(e.target.value);
                  }}
                  required={true}
                />
              </Box>
              <Box
                style={{
                  display: "flex",
                  gap: "2px",
                  flexDirection: "column",
                }}
              ></Box>
            </Box>
          </Box>
        </Box>
        <div className={styles.evaluation__section2__container}>
          <div className={`${styles.evaluation__section} `}>
            <div></div>
            <div></div>
            <div className={styles.section1__comments}>
              <h2>Chief HR Office's Comment</h2>
              <TextAreaSmall
                value={chiefHrOfficerComment}
                rows={5}
                onChange={(e: any) => {
                  setChiefHrOfficerComment(e.target.value);
                }}
                required={true}
              />
              <span>CHRO Email: {CHROName}</span>
              <br />
              <span>Action Date: {CHRODate}</span>
            </div>
          </div>
        </div>
        <div className={`${styles.evaluation__section__button} `}>
          <div className="mtn__btnContaainer">
            <div>
              <button
                type="button"
                className="mtn__btn mtn__blackOutline"
                onClick={backHandler}
              >
                Previous
              </button>
            </div>
            <div>
              <button
                className={
                  approval === "Completed" ? "hidden" : "mtn__btn mtn__black"
                }
                type="submit"
                disabled={loading}
              >
                {loading ? "Loading..." : "Close Out"}
              </button>
              <button
                className={
                  approval === "Completed" ? "mtn__btn mtn__black" : "hidden"
                }
                type="button"
                onClick={goHome}
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      </form>
    </Box>
  );
};

export default ConfirmationSummary;

const FormSectionHeader = styled(Typography)({
  color: "rgba(0, 0, 0, 1)",
  marginTop: "2rem",
  fontWeight: "bold",
  mb: 0,
});

const labelStyles = {
  display: "flex",
  alignItems: "center",
  height: "80px",
  backgroundColor: "#FFC423",
  borderRadius: "10px",
  color: "rgba(0, 0, 0, 1)",
  maxWidth: "100%",
  paddingLeft: "20px",
  boxSizing: "border-box",
};

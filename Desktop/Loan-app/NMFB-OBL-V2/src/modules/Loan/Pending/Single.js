import React, { useContext, useState } from "react";
import { Comment, Modal, ViewCard } from "../../../components";
import Layout from "../../../layout";
import { useApproveLoan, usePendingLoan } from "./hooks";
import { useIsFetching } from "@tanstack/react-query";
import { InfinitySpin } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { Button, Input, Textarea } from "mtforms";
import { useChecklist } from "../../Config/Checklist/hooks";
import swal from "sweetalert";
import { toast } from "react-toastify";
import { toastOptions } from "../../../utils";
import { AuthContext } from "../../../context";

const SinglePendingLoan = () => {
  const data = usePendingLoan();
  const loading = useIsFetching();
  const [open, setOpen] = useState(false);
  const [documentId, setDocumentId] = useState([]);
  const { id } = useParams();

  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const validationHandler = (name, error) => {
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  //   check if user is Team Lead

  var teamLead = false;
  for (var i = 0; i < user?.role?.length; i++) {
    if (user?.role[i].name === "Team Lead") {
      teamLead = true;
      break;
    }
  }
  const singleRequest = data.find((x) => x.code === id);
  const checklist = useChecklist();
  //   get checklist by loan Name
  const requiredCheckList = checklist?.filter(
    (x) => x.loanTypeName === singleRequest?.loanType
  );
  //   required checklist for this loan
  const checklistItems =
    singleRequest?.loanType === "SALAD"
      ? requiredCheckList
      : requiredCheckList.find(
          (x) =>
            x.maximumLoanAmount >= singleRequest.loanAmount &&
            singleRequest.loanAmount >= x.minimunLoanAmount
        );

  const checkHandler = (e) => {
    setDocumentId([...documentId, e.target.value]);
  };

  const { mutate } = useApproveLoan();

  const approveLoan = () => {
    if (!formData["recommendedAmount"] && teamLead) {
      return toast.error("Enter Recommended Amount", toastOptions);
    }
    if (documentId.length === 0 && teamLead) {
      return toast.error("Select Check List Items", toastOptions);
    }
    if (!formData["comment"]) {
      return toast.error("Enter Comment", toastOptions);
    }

    swal({
      title: "Are you sure ",
      text: "you want to approve this loan",
      icon: "success",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const data = {
          ...formData,
          status: "Approved",
          code: singleRequest?.code,
          documentId: teamLead ? documentId : undefined,
        };
        mutate(data);
      }
    });
  };

  const rejectLoan = () => {
    if (!formData["comment"]) {
      return toast.error("Enter Comment", toastOptions);
    }
    if (!formData["recommendedAmount"] && teamLead) {
      return toast.error("Enter Recommended Amount", toastOptions);
    }
    if (documentId.length === 0 && teamLead) {
      return toast.error("Select Check List Items", toastOptions);
    }
    swal({
      title: "Are you sure ",
      text: "you want to decline this loan",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const data = {
          ...formData,
          status: "Declined",
          code: singleRequest?.code,
          documentId: teamLead ? documentId : undefined,
        };
        mutate(data);
      }
    });
  };

  //   check if team lead has approved

  var teamLeadApproved = false;
  for (var x = 0; x < singleRequest?.approvals?.length; x++) {
    if (
      singleRequest?.approvals[x].role === "Team Lead" &&
      singleRequest?.approvals[x].action !== null
    ) {
      teamLeadApproved = true;
      break;
    }
  }

  return (
    <Layout name="Loan Request" pageTitle="Pending Loan">
      <div className="pageContents">
        {loading ? (
          <div className="center">
            <InfinitySpin width="200" color="#5cb85c" />
          </div>
        ) : (
          <>
            <div className="inputFlex">
              <ViewCard
                title="First Name"
                value={singleRequest?.userDetails?.firstName}
              />
              <ViewCard
                title="Middle Name"
                value={singleRequest?.userDetails?.middleName}
              />
              <ViewCard
                title="Last Name"
                value={singleRequest?.userDetails?.lastName}
              />
              <ViewCard
                title="Date of Birth"
                value={singleRequest?.userDetails?.dob}
              />
              <ViewCard
                title="Gender"
                value={singleRequest?.userDetails?.gender}
              />
              <ViewCard
                title="Email"
                value={singleRequest?.userDetails?.email}
              />
              <ViewCard
                title="Phone Number"
                value={singleRequest?.userDetails?.phoneNumber}
              />
              <ViewCard
                title="Bank Verification Number [BVN]"
                value={singleRequest?.userDetails?.bvn}
              />
              <ViewCard
                title="Bank Name"
                value={singleRequest?.userDetails?.bankName}
              />
              <ViewCard
                title="Account Number"
                value={singleRequest?.userDetails?.accountName}
              />
              <ViewCard
                title="Educational Level"
                value={singleRequest?.userDetails?.educationalLevel}
              />
              <ViewCard
                title="GEO PoliticaL Zone"
                value={singleRequest?.userDetails?.geopoliticaZone}
              />
              <ViewCard
                title="State Of Origin"
                value={singleRequest?.userDetails?.stateOfOrigin}
              />
              <ViewCard
                title="Local Government Area [LGA]"
                value={singleRequest?.userDetails?.lga}
              />
              <ViewCard
                title="Residential Address"
                value={singleRequest?.userDetails?.residentialAddress}
              />
              <ViewCard
                title="Residential LGA"
                value={singleRequest?.userDetails?.residentialLga}
              />
              <ViewCard
                title="NMFB Account Number"
                value={singleRequest?.nmfbaccountNumber}
              />
              <ViewCard title="branchName" value={singleRequest?.branchName} />
              <ViewCard title="Loan Type" value={singleRequest?.loanType} />
              <ViewCard title="Loan Amount" value={singleRequest?.loanAmount} />
              <ViewCard
                title="Loan Tenor"
                value={`${singleRequest?.loanTenor} Months`}
              />
              <ViewCard
                title="Eligible Amount"
                value={singleRequest?.eligibleAmount}
              />
              <ViewCard
                title="No Of Non Performing Loans"
                value={singleRequest?.noOfNonPerformingLoans}
              />
              <ViewCard
                title="Bad Loan Bank"
                value={singleRequest?.badLoanBank}
              />
              <ViewCard
                title="Bad Loan Bank"
                value={singleRequest?.badLoanBank}
              />
              <ViewCard
                title="Bad Loan Bank Code"
                value={singleRequest?.badLoanBankCodes}
              />
            </div>
            <div className="btnContainer">
              <div className="modalTitle">
                <button
                  type="button"
                  onClick={() => setOpen(!open)}
                  className="btn green"
                >
                  View Comments
                </button>
              </div>
            </div>

            <div className="inputFlex">
              {teamLeadApproved ? (
                <div className="checklistContainer">
                  <div className="modalTitle">Submitted Checklist Item</div>
                  <div className="modalTitle">
                    <ul>
                      {singleRequest?.documents?.map((item, i) => (
                        <li key={i}>{item?.documentType}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <>
                  <div className="checklistContainer">
                    <div className="modalTitle">Checklist Item</div>
                    <div className="checklist">
                      {teamLead &&
                        checklistItems?.documentDetails?.map((item, i) => (
                          <div key={i}>
                            <span>
                              <input
                                type="checkbox"
                                value={item.id}
                                onChange={checkHandler}
                              />
                              &nbsp;
                              {item.documentType}
                              &nbsp; &nbsp; &nbsp;
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                  <Input
                    name="recommendedAmount"
                    label="Recommended Amount"
                    type="text"
                    value={formData["recommendedAmount"]}
                    onChange={handleChange}
                    className="whiteBorder"
                    validationHandler={validationHandler}
                    error={errors.recommendedAmount}
                  />
                </>
              )}

              <Textarea
                name="comment"
                label="Comment"
                type="text"
                value={formData["comment"]}
                onChange={handleChange}
                className="whiteBorder"
                validationHandler={validationHandler}
                error={errors.comment}
              />
              <Button
                type="button"
                title={"Approve"}
                loading={loading === 1}
                className="green"
                onClick={approveLoan}
              />
              <Button
                type="button"
                title={"Reject"}
                loading={loading === 1}
                className="btnRed"
                onClick={rejectLoan}
              />
            </div>
          </>
        )}

        <Modal
          isVisible={open}
          size="lg"
          onClose={() => setOpen(!open)}
          content={
            <>
              <div className="modalTitle">Comments</div>
              {singleRequest?.approvals?.map((item, i) => (
                <Comment
                  key={i}
                  role={item.role}
                  comments={item.comment}
                  action={item.action}
                />
              ))}
            </>
          }
        />
      </div>
    </Layout>
  );
};

export default SinglePendingLoan;

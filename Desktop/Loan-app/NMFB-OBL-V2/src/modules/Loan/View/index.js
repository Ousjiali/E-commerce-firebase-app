import React, { useState } from "react";
import { Comment, Modal, ViewCard } from "../../../components";
import Layout from "../../../layout";
import { useIsFetching } from "@tanstack/react-query";
import { InfinitySpin } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { useSinglePendingLoan } from "../Pending/hooks";

const ViewLoan = () => {
  const loading = useIsFetching();
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const singleRequest = useSinglePendingLoan(id);

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

export default ViewLoan;

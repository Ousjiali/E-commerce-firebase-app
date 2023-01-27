import * as React from "react";
import { Menu } from "../../../../Container/AppNavigation";
import { AppWrapper } from "../../../../Container/AppWrapper";
import MenuBar from "../../../../Container/Profile MenuBar";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import "../profile.css";
import { getUserProfileData } from "../../../../hooks/useUserProfileData";
import { useHistory } from "react-router-dom";
import { sp } from "@pnp/sp";
import swal from "sweetalert";
import Spinner from "../../../../Container/Spinner";
import { CircularProgress } from "@material-ui/core";
import { useFormContextData } from "../../../../Context";
type Props = {};

export const Confidentiality = (props: Props) => {
  const history = useHistory();
  const { confidentialityData, setConfidentialityData, nextPage, prevPage } =
    useFormContextData();

  const { data } = getUserProfileData();

  const [ID, setID] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [disableEdit, setDisableEdit] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    sp.profiles.myProperties.get().then((res) => {
      sp.web.lists
        .getByTitle("StaffProfile")
        .items.filter(`StaffEmail eq '${res?.Email}'`)
        .get()
        .then((response) => {
          if (response.length > 0) {
            const profileStatus = response[0].ProfileStatus;
            if (profileStatus === "Approved") {
              setDisableEdit(true);
            }
            setID(response[0].ID);
            setConfidentialityData(response[0].Confidentiality);
          }

          setLoading(false);
        });
    });
  }, []);

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
          <h3>Confidentiality and Non Disclosure Agreement </h3>
          <p>
            This information will be kept confidential. Please read and complete
            the following Non Disclosure Agreement
          </p>
          <p>
            1. I agree to hold confidential or proprietary information or trade
            secrets ("confidential information") in trust and confidence and
            agrees that it shall be used only for the contemplated purposes,
            shall not be used for any other purpose, or disclosed to any third
            party.
          </p>
          <p>
            2. That information provided on the business by Lotus Beta Analytics
            Nigeria Ltd and its affiliates (“LBAN”) is sensitive and
            confidential and that its disclosure to others would be damaging to
            the business.
          </p>
          <p>
            3. No copies will make or retained of any written information or or
            prototypes supplied without the permission of Lotus Beta Analytics
            Nigeria Ltd.
          </p>
          <p>
            4. At the conclusion of any discussions, or upon demand by Lotus
            Beta Analytics Nigeria Ltd, all confidential information, including
            prototypes, written notes, photographs, sketches, models, memoranda
            or notes taken shall be returned to Lotus Beta Analytics Nigeria
            Ltd.{" "}
          </p>
          <p>
            5. Confidential information shall not be disclosed to any employee,
            consultant or third party unless they agree to execute and be bound
            by the terms of this Agreement, and have been approved by Lotus Beta
            Analytics Nigeria Ltd.
          </p>
          <p>
            6. That you will not contact LBAN’suppliers or customers except in a
            previously agreed manner.{" "}
          </p>
          <p>
            7. This Agreement and its validity, construction and effect shall be
            governed by the laws of Nigeria.{" "}
          </p>
          <h4>1. Definitions </h4>
          <p>
            1.1 “Agreement” means the agreement embodied in the Proposal, other
            relevant document and in these Standard Terms and Conditions unless
            amended expressly by agreement between the Parties;
          </p>
          <p>
            {" "}
            1.2 “Client” is the Party to whom the Contractor provides the
            Services;
          </p>
          <p>1.3 “Contractor” is Lotus Beta Analytics Nigeria Ltd ; </p>
          <p>
            1.4 “Contract Price” is the price for the Services as detailed in
            the Proposal or other relevant document;{" "}
          </p>
          <p>
            1.5 “Date of Delivery” means the date on which the Contractor has to
            deliver the Services in terms of the Agreement.
          </p>
          <p>
            1.6 “Day” shall mean a calendar day, excluding a Saturday, Sunday or
            official public holiday
          </p>
          <p>
            1.7 “Item” shall mean any object required for the delivery or
            implementation of the Services, that is deliverable by the
            Contractor to the Client
          </p>
          <p>
            1.8 “Maintenance and Support Services Fee” is the fee payable to the
            Contractor for providing ancillary services in respect of the
            Services, in terms of the Proposal or other relevant document,
          </p>
          <p>1.9 “Parties” means the Contractor and the Client; </p>
          <p>
            1.10 “Party” means the Contractor or the Client depending on the
            circumstances;
          </p>
          <p>
            1.11 “Proposal” is the document to which these Standard Terms and
            Conditions are attached or referred to;{" "}
          </p>
          <p>
            1.12 “Services” are the services as described in the Proposal or
            other relevant document;{" "}
          </p>
          <h4>2. Applicable Law </h4>
          <p>
            2.1 This Agreement shall be governed and construed according to the
            laws of Nigeria.
          </p>
          <h4>3. Variation </h4>
          <p>
            3.1 This Agreement constitutes the entire agreement between the
            Parties, and supersedes all previous written or oral agreements.
          </p>
          <p>
            3.2 No change to the Agreement, including this clause, will be
            accepted unless reduced to writing and signed by the Parties.{" "}
          </p>
          <h4>4. Settlement of Disputes </h4>
          <p>
            4.1 In the event of a dispute arising between the Parties in respect
            of any matter contained in this Agreement the aggrieved Party shall
            notify the other Party in writing about the existence and nature of
            the dispute within 7 (seven) days of the dispute arising.{" "}
          </p>
          <p>
            4.2 Should the Parties be unsuccessful in settling such dispute
            within the aforesaid period or such longer period as the Parties may
            agree to, the dispute shall be solved through a process of
            arbitration.{" "}
          </p>
          <p>
            4.3 The dispute will be finally resolved in accordance with the
            Rules of the Arbitration Foundation of Nigeria.{" "}
          </p>
          <p>
            4.4 The arbitrator’s decision may, on application to a court of
            competent jurisdiction by a Party, after due notice to the other
            Party, be made an order of court. A determination that has been made
            an order of court may be enforced in the same manner as any judgment
            or order of the same effect.{" "}
          </p>
          <p>
            4.5 This clause is severable from the rest of this Agreement and
            shall remain in effect even if this Agreement is terminated or
            cancelled for any reason.{" "}
          </p>
          <h4>5. Cancellation</h4>
          <p>
            5.1 The Agreement may be cancelled immediately by a Party if the
            other Party commits a breach of this Agreement and fails to remedy
            the breach within 30(thirty) days of written notice of the breach.
            This is without prejudice to any other right or remedy available to
            the Parties in law.
          </p>
          <h4>6. Waiver </h4>
          <p>
            6.1 No relaxation or indulgence that either Party may afford the
            other of failure by a Party to enforce its rights consequent to any
            breach of this Agreement shall in any way prejudice the rights of
            the first-mentioned Party nor shall the first-mentioned Party be
            stopped from exercising such rights by reason thereof.
          </p>
          <h4>7. Confidentiality </h4>
          <p>
            7.1 Each Party shall treat all information obtained from the other
            pursuant to this Agreement as confidential, and shall not divulge
            such information to any person, except to such Party's own employees
            and persons professionally engaged by the Parties to this Agreement
            in each case on a need-to-know basis, without the other Party's
            written consent.{" "}
          </p>
          <p>
            7.2 The aforementioned restrictions shall not extend to information
            which was rightfully in the possession of a Party prior to the
            commencement of the negotiations leading to this Agreement, or which
            is already public knowledge or becomes so at a future date,
            otherwise than as a result of breach of this clause, or which is
            obtained from a third Party free of restriction, such third Party
            having the right so to disclose as far as the disclosing Party is
            aware, or which is trivial or obvious.
          </p>
          <p>
            7.3 The foregoing obligations as to confidentiality shall continue
            to apply for a period of 10 (ten) years notwithstanding the
            termination of this Agreement.{" "}
          </p>
          <p>
            7.4 Neither Party will be in default of the foregoing obligations
            for supplying information required to be supplied by prevailing law.{" "}
          </p>
          <h4>8. Copyright</h4>
          <p>
            8.1 These Standard Terms and Conditions and the Proposal contains
            confidential information that is proprietary to the Contractor.
          </p>
          <p>
            8.2 No part of its contents may be use, copied, disclosed or
            conveyed to any Party in any manner whatsoever without the prior
            written permission of the Contractor.
          </p>
          {loading ? (
            Spinner
          ) : (
            <form>
              <div
                className={
                  confidentialityData === "completed"
                    ? "checkBackground"
                    : "uncheckBackground"
                }
              >
                <input
                  onChange={(e) => setConfidentialityData(e.target.value)}
                  value={"completed"}
                  type={"checkbox"}
                  title={"I agree to the above confidentiality"}
                  required={true}
                  checked={confidentialityData === "completed"}
                />

                <span style={{ marginLeft: "20px" }}>
                  {" "}
                  I {data?.DisplayName} agrees to hold confidential or
                  proprietary information or trade secrets ("confidential
                  information") in trust and confidence and agrees that it shall
                  be used only for the contemplated purposes, shall not be used
                  for any other purpose, or disclosed to any third party.
                </span>
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
                  className="btns white"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    nextPage();
                  }}
                >
                  Next
                  <span
                    style={{
                      marginLeft: "20px",
                      display: "flex",
                      fontWeight: "600",
                    }}
                  >
                    <AiOutlineArrowRight />
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

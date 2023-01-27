import * as React from "react";

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import "../profile.css";

import { sp } from "@pnp/sp";
import swal from "sweetalert";
import { Spinner } from "@microsoft/office-ui-fabric-react-bundle";
import { getUserProfileData } from "../../../hooks/useUserProfileData";
import { AppWrapper } from "../../../Container/AppWrapper";
import MenuBar from "../../../Container/Profile MenuBar";
import { Menu } from "../../../Container/AppNavigation";
import HRMenuBar from "../../../Container/Profile MenuBar/HRNavBar";
import Text from "../../../Container/Text";
import { CircularProgress } from "@material-ui/core";
import { HRMenu } from "../hr-menu";

type Props = {};

export const HRBankDetails = ({ match }) => {
  const history = useHistory();
  const { isLoading, data } = getUserProfileData();
  let itemID = match.params.id;

  const [bankName, setbankName] = React.useState("");
  const [accountName, setaccountName] = React.useState("");
  const [bankPrimaryAddress, setbankPrimaryAddress] = React.useState("");
  const [BVN, setBVN] = React.useState("");
  const [accountType, setAccountType] = React.useState("");
  const [accountNumber, setAccountNumber] = React.useState("");

  React.useEffect(() => {
    setLoading(true);
    sp.profiles.myProperties.get().then((res) => {
      sp.web.lists
        .getByTitle("StaffProfile")
        .items.filter(`ID eq '${itemID}'`)
        .get()
        .then((response) => {
          setID(response[0].ID);
          const staffData = JSON.parse(response[0].Bank);
          setbankName(staffData?.bankName);
          setaccountName(staffData?.accountName);
          setbankPrimaryAddress(staffData?.bankPrimaryAddress);
          setStaffData(response);
          setBVN(staffData?.BVN);
          setAccountType(staffData?.accountType);
          setAccountNumber(staffData?.accountNumber);
          setLoading(false);
        });
    });
  }, []);

  const [staffData, setStaffData] = React.useState([]);
  const [ID, setID] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const stringifyBank = JSON.stringify({
    bankName: bankName,
    accountName: accountName,
    bankPrimaryAddress: bankPrimaryAddress,
    BVN: BVN,
    accountType: accountType,
    accountNumber: accountNumber,
    bank_status: "completed",
  });

  const nextHandler = () => {
    history.push(`/hr/profile-confidentiality/${itemID}`);
  };

  const backHandler = () => {
    history.goBack();
  };

  return (
    <AppWrapper menu={HRMenu} showBackButton={true}>
      <div className="Displayflex">
        <HRMenuBar bank={"remote"} />
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
          <div>
            <div className="formContainer">
              <div>
                <Text size="midi" title={"Bank Name"} value={bankName} />
                <Text size="midi" title={"BVN"} value={BVN} />
              </div>
              <div>
                <Text size="midi" title={"Account Name"} value={accountName} />

                <Text
                  size="midi"
                  title={"Account Number"}
                  value={accountNumber}
                />
              </div>
              <div>
                <Text
                  size="midi"
                  title={"Bank Primary Address"}
                  value={bankPrimaryAddress}
                />

                <Text size="midi" title={"Account Type"} value={accountType} />
              </div>
            </div>
            <div className="btn_container ">
              <button
                className="btns white"
                type="button"
                onClick={backHandler}
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
                onClick={nextHandler}
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
          </div>
        )}
      </div>
    </AppWrapper>
  );
};

const menu: Menu[] = [
  { title: "Pending", link: "/hr/viewrequest" },
  { title: "Approved", link: "/hr/approved" },
  { title: "Roles", link: "/manage-roles" },
];

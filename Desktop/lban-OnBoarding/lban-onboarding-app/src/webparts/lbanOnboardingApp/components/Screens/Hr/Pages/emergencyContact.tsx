import * as React from "react";

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useHistory } from "react-router-dom";

import "../profile.css";
import { sp } from "@pnp/sp";

import swal from "sweetalert";
import { Spinner } from "@microsoft/office-ui-fabric-react-bundle";
import { getUserProfileData } from "../../../hooks/useUserProfileData";
import { AppWrapper } from "../../../Container/AppWrapper";
import { Menu } from "../../../Container/AppNavigation";
import Text from "../../../Container/Text";
import HRMenuBar from "../../../Container/Profile MenuBar/HRNavBar";
import { CircularProgress } from "@material-ui/core";
import { HRMenu } from "../hr-menu";

type Props = {};

export const HREmergencyContact = ({ match }) => {
  const history = useHistory();
  const { isLoading, data } = getUserProfileData();

  let itemID = match.params.id;
  const [emergencyName, setEmergencyName] = React.useState("");
  const [emergencyRelationship, setEmergencyRelationship] = React.useState("");
  const [emerencyPhone, setEmerencyPhone] = React.useState("");
  const [emerencyPhone2, setEmerencyPhone2] = React.useState("");
  const [emergencyAddress, setEmergencyAddress] = React.useState("");
  const [emergencyCity, setEmergencyCity] = React.useState("");
  const [emergencyState, setEmergencyState] = React.useState("");
  const [emergencyCountry, setemergencyCountry] = React.useState("");

  React.useEffect(() => {
    setLoading(true);
    sp.profiles.myProperties.get().then((res) => {
      sp.web.lists
        .getByTitle("StaffProfile")
        .items.filter(`ID eq '${itemID}'`)
        .get()
        .then((response) => {
          setID(response[0].ID);
          const staffData = JSON.parse(response[0].Emergency);
          setEmergencyName(staffData?.emergencyName);
          setEmergencyRelationship(staffData?.emergencyRelationship);
          setEmerencyPhone(staffData?.emerencyPhone);
          setStaffData(response);
          setEmerencyPhone2(staffData?.emerencyPhone2);
          setEmergencyAddress(staffData?.emergencyAddress);
          setEmergencyCity(staffData?.emergencyCity);
          setEmergencyState(staffData?.emergencyState);
          setemergencyCountry(staffData?.emergencyCountry);
          setLoading(false);
        });
    });
  }, []);

  const [staffData, setStaffData] = React.useState([]);
  const [ID, setID] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const stringifyEmergency = JSON.stringify({
    employeeFullName: data?.DisplayName,
    emergencyName: emergencyName,
    emergencyRelationship: emergencyRelationship,
    emerencyPhone: emerencyPhone,
    emerencyPhone2: emerencyPhone2,
    emergencyAddress: emergencyAddress,
    emergencyCity: emergencyCity,
    emergencyState: emergencyState,
    emergencyCountry: emergencyCountry,
    emergency_status: "completed",
  });

  const nextHandler = () => {
    history.push(`/hr/profile-bankdetails/${itemID}`);
  };

  const backHandler = () => {
    history.goBack();
  };

  return (
    <AppWrapper menu={HRMenu} showBackButton={true}>
      <div className="Displayflex">
        <HRMenuBar emergency={"remote"} />
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
                <Text size="midi" title={"Name"} value={emergencyName} />
                <Text size="midi" title={"City"} value={emergencyCity} />
                <Text
                  size="midi"
                  title={"Emergency Phone 2"}
                  value={emerencyPhone2}
                />
              </div>
              <div>
                <Text size="midi" title={"Address"} value={emergencyAddress} />
                <Text
                  size="midi"
                  title={"Relationship"}
                  value={emergencyRelationship}
                />
              </div>
              <div>
                <div className="divided">
                  <Text
                    size="midi"
                    title={"Country"}
                    value={emergencyCountry}
                  />
                  <Text size="midi" title={"State"} value={emergencyState} />
                </div>
                <Text size="midi" title={"Phone"} value={emerencyPhone} />
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

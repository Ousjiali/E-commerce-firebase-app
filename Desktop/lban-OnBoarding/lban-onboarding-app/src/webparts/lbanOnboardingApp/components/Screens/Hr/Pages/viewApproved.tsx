import { sp } from "@pnp/sp";
import * as React from "react";
import "@pnp/sp/site-users/web";
import { AiOutlineArrowRight } from "react-icons/ai";
import "../profile.css";
import { useHistory } from "react-router-dom";
import { getUserProfileData } from "../../../hooks/useUserProfileData";
import { AppWrapper } from "../../../Container/AppWrapper";
import { Menu } from "../../../Container/AppNavigation";
import Text from "../../../Container/Text";
import HRMenuBar from "../../../Container/Profile MenuBar/HRNavBar";
import { CircularProgress } from "@material-ui/core";

export const HRViewApprovedStaff = ({ match }) => {
  const history = useHistory();

  let itemID = match.params.id;

  React.useEffect(() => {
    setLoading(true);
    sp.profiles.myProperties.get().then((res) => {
      sp.web.lists
        .getByTitle("StaffProfile")
        .items.filter(`ID eq '${itemID}'`)
        .get()
        .then((response) => {
          setDepartment(response[0].Department);
          setHOD(response[0].HOD);
          console.log(response);
          setID(response[0].ID);
          setEmail(response[0].StaffEmail);
          setEmployeeFullName(response[0].StaffName);

          const staffData = JSON.parse(response[0].Biodata);
          setState(staffData?.state);
          setCountry(staffData?.country);
          setZipcode(staffData?.zipcode);
          setPhotoUrl(response[0].ProfilePhoto);
          setPreferredName(staffData?.preferredName);
          setDOB(staffData?.DOB);
          setGender(staffData?.gender);
          setCity(staffData?.city);
          setMaritalStatus(staffData?.maritalStatus);
          setPrimaryAddress(staffData?.primaryAddress);
          setPhone(staffData?.phone);
          setSupplementaryAddress(staffData?.supplementaryAddress);

          const emergencyData = JSON.parse(response[0].Emergency);
          setEmergencyName(emergencyData?.emergencyName);
          setEmergencyRelationship(emergencyData?.emergencyRelationship);
          setEmerencyPhone(emergencyData?.emerencyPhone);
          setEmerencyPhone2(emergencyData?.emerencyPhone2);
          setEmergencyAddress(emergencyData?.emergencyAddress);
          setEmergencyCity(emergencyData?.emergencyCity);
          setEmergencyState(emergencyData?.emergencyState);
          setemergencyCountry(emergencyData?.emergencyCountry);

          const bankData = JSON.parse(response[0].Bank);
          setbankName(bankData?.bankName);
          setaccountName(bankData?.accountName);
          setbankPrimaryAddress(bankData?.bankPrimaryAddress);
          setBVN(bankData?.BVN);
          setAccountType(bankData?.accountType);
          setAccountNumber(bankData?.accountNumber);
          setLoading(false);
        });
    });
  }, []);

  const [ID, setID] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [preferredName, setPreferredName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [employeeFullName, setEmployeeFullName] = React.useState("");
  const [DOB, setDOB] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [maritalStatus, setMaritalStatus] = React.useState("");
  const [primaryAddress, setPrimaryAddress] = React.useState("");
  const [supplementaryAddress, setSupplementaryAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [zipcode, setZipcode] = React.useState();
  const [photoUrl, setPhotoUrl] = React.useState("");
  const [emergencyName, setEmergencyName] = React.useState("");
  const [emergencyRelationship, setEmergencyRelationship] = React.useState("");
  const [emerencyPhone, setEmerencyPhone] = React.useState("");
  const [emerencyPhone2, setEmerencyPhone2] = React.useState("");
  const [emergencyAddress, setEmergencyAddress] = React.useState("");
  const [emergencyCity, setEmergencyCity] = React.useState("");
  const [emergencyState, setEmergencyState] = React.useState("");
  const [emergencyCountry, setemergencyCountry] = React.useState("");
  const [bankName, setbankName] = React.useState("");
  const [accountName, setaccountName] = React.useState("");
  const [bankPrimaryAddress, setbankPrimaryAddress] = React.useState("");
  const [BVN, setBVN] = React.useState("");
  const [accountType, setAccountType] = React.useState("");
  const [accountNumber, setAccountNumber] = React.useState("");
  const [department, setDepartment] = React.useState("");
  const [HOD, setHOD] = React.useState("");

  const nextHandler = () => {
    history.goBack();
  };

  return (
    <AppWrapper menu={menu} showBackButton={true}>
      <div className="Displayflex">
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
            <div>
              <h3 style={{ marginBottom: "20px" }}>Biodata Information</h3>
              <div className="formContainer" style={{ marginTop: "4%" }}>
                <div>
                  <Text
                    size="midi"
                    title={"Employee Full Name"}
                    value={employeeFullName}
                  />
                  <Text size="midi" title={"Department"} value={department} />
                  <Text size="midi" title={"Phone Number"} value={phone} />
                </div>
                <div>
                  <Text size="midi" title={"Email Address"} value={email} />
                  <Text size="midi" title={"Head of Department"} value={HOD} />
                  <div className="divided">
                    <Text size="midi" title={"Gender"} value={gender} />
                    <Text
                      size="midi"
                      title={"Marital Status"}
                      value={maritalStatus}
                    />
                  </div>
                </div>
                <div className="image_div">
                  <div className="image_container">
                    {photoUrl && <img src={photoUrl} alt={employeeFullName} />}
                  </div>
                </div>
              </div>
              <div className="formContainer">
                <div>
                  <Text
                    size="midi"
                    title={"Primary Address"}
                    value={primaryAddress}
                  />
                  <Text
                    size="midi"
                    title={"Supplementary Address"}
                    value={supplementaryAddress}
                  />
                </div>
                <div>
                  <div className="divided">
                    <Text size="midi" title={"Zip Code"} value={zipcode} />
                    <Text size="midi" title={"City"} value={city} />
                  </div>
                  <Text size="midi" title={"Date of Birth"} value={DOB} />
                </div>
                <div>
                  <div className="divided">
                    <Text size="midi" title={"Country"} value={country} />
                    <Text size="midi" title={"State"} value={state} />
                  </div>
                  <Text
                    size="midi"
                    title={"Preffered Name"}
                    value={preferredName}
                  />
                </div>
              </div>
              <h3 style={{ marginBottom: "20px" }}>Emergency Information</h3>
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
                  <Text
                    size="midi"
                    title={"Address"}
                    value={emergencyAddress}
                  />
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
              <h3 style={{ marginBottom: "20px" }}>Bank Details</h3>
              <div className="formContainer">
                <div>
                  <Text size="midi" title={"Bank Name"} value={bankName} />
                  <Text size="midi" title={"BVN"} value={BVN} />
                </div>
                <div>
                  <Text
                    size="midi"
                    title={"Account Name"}
                    value={accountName}
                  />

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

                  <Text
                    size="midi"
                    title={"Account Type"}
                    value={accountType}
                  />
                </div>
              </div>
            </div>
            <div className="btn_container">
              <div></div>
              <button
                className="btns white"
                type="button"
                onClick={nextHandler}
              >
                Back
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

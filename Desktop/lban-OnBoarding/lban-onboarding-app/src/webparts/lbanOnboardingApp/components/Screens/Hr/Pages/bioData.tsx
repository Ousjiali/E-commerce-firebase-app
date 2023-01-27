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
import { HRMenu } from "../hr-menu";

export const HRBioData = ({ match }) => {
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

  const nextHandler = () => {
    history.push(`/hr/profile-emergency/${itemID}`);
  };

  return (
    <AppWrapper menu={HRMenu} showBackButton={true}>
      <div className="Displayflex">
        <HRMenuBar biodata={"remote"} />
        <h3>Employees Personal Information Form </h3>
        <p>
          Our employment process requires that a person employed in this
          establishment should complete an employee information form.
        </p>
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
              <div className="formContainer" style={{ marginTop: "4%" }}>
                <div>
                  <Text
                    size="midi"
                    title={"Employee Full Name"}
                    value={employeeFullName}
                  />
                  <Text
                    size="midi"
                    title={"Preffered Name"}
                    value={preferredName}
                  />
                  <Text size="midi" title={"Phone Number"} value={phone} />
                </div>
                <div>
                  <Text size="midi" title={"Email Address"} value={email} />
                  <Text size="midi" title={"Date of Birth"} value={DOB} />
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
                </div>
                <div>
                  <div className="divided">
                    <Text size="midi" title={"Country"} value={country} />
                    <Text size="midi" title={"State"} value={state} />
                  </div>
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

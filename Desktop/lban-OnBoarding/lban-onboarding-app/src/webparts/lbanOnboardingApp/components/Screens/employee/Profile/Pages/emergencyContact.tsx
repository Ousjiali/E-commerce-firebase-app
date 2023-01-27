import * as React from "react";
import { Menu } from "../../../../Container/AppNavigation";
import Input from "../../../../Container/Form";
import Select from "../../../../Container/Form/select";
import TextArea from "../../../../Container/Form/TextArea";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import { countries, states } from "../../../../Container/Helpers";
import "../profile.css";
import { sp } from "@pnp/sp";
import { getUserProfileData } from "../../../../hooks/useUserProfileData";
import swal from "sweetalert";
import { CircularProgress } from "@material-ui/core";
import { useFormContextData } from "../../../../Context";

type Props = {};

export const EmergencyContact = (props: Props) => {
  const [disableEdit, setDisableEdit] = React.useState(false);
  const { emergencyData, setEmergencyData, nextPage, prevPage } =
    useFormContextData();

  console.log(emergencyData);

  React.useEffect(() => {
    setLoading(true);
    sp.profiles.myProperties.get().then((res) => {
      sp.web.lists
        .getByTitle("StaffProfile")
        .items.filter(`StaffEmail eq '${res?.Email}'`)
        .get()
        .then((response) => {
          if (response.length) {
            const profileStatus = response[0].ProfileStatus;
            if (profileStatus === "Approved") {
              setDisableEdit(true);
            }
            setID(response[0].ID);
            const staffData = JSON.parse(response[0].Emergency);
            setEmergencyData(staffData);
          }

          setLoading(false);
        });
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmergencyData({ ...emergencyData, [name]: value });
  };

  const [staffData, setStaffData] = React.useState([]);
  const [ID, setID] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  return (
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
        <form>
          <div className="formContainer" style={{ marginTop: "5%" }}>
            <div>
              <Input
                name={"emergencyName"}
                value={emergencyData ? emergencyData["emergencyName"] : ""}
                onChange={handleChange}
                type={"text"}
                title={"Name"}
                size={"maxi"}
                required={true}
                disabled={disableEdit}
              />
              <Input
                name={"emergencyCity"}
                value={emergencyData ? emergencyData["emergencyCity"] : ""}
                onChange={handleChange}
                type={"text"}
                title={"City"}
                size={"maxi"}
                required={true}
                disabled={disableEdit}
              />
              <Input
                name={"emerencyPhone2"}
                value={emergencyData ? emergencyData["emerencyPhone2"] : ""}
                onChange={handleChange}
                type={"number"}
                title={"Phone Number 2"}
                size={"maxi"}
                disabled={disableEdit}
              />
            </div>
            <div>
              <TextArea
                name={"emergencyAddress"}
                value={emergencyData ? emergencyData["emergencyAddress"] : ""}
                onChange={handleChange}
                required={true}
                disabled={disableEdit}
                title={"Emergency Address"}
              />
              <Input
                name={"emergencyRelationship"}
                value={
                  emergencyData ? emergencyData["emergencyRelationship"] : ""
                }
                onChange={handleChange}
                type={"text"}
                title={"Relationship"}
                size={"maxi"}
                required={true}
                disabled={disableEdit}
              />
            </div>
            <div>
              <div className="divided">
                <Select
                  name={"emergencyCountry"}
                  value={emergencyData ? emergencyData["emergencyCountry"] : ""}
                  onChange={handleChange}
                  options={countries}
                  title={"Country"}
                  size={"midi"}
                  required={true}
                  disabled={disableEdit}
                />
                <Select
                  name={"emergencyState"}
                  value={emergencyData ? emergencyData["emergencyState"] : ""}
                  onChange={handleChange}
                  options={states}
                  title={"State"}
                  size={"midi"}
                  required={true}
                  disabled={disableEdit}
                />
              </div>
              <Input
                name={"emerencyPhone"}
                value={emergencyData ? emergencyData["emerencyPhone"] : ""}
                onChange={handleChange}
                type={"number"}
                title={"Phone Number"}
                size={"maxi"}
                required={true}
                disabled={disableEdit}
              />
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
  );
};

const menu: Menu[] = [
  { title: "Profile Update", link: "/employee/profile-update" },
  { title: "Training", link: "/employee/training" },
];

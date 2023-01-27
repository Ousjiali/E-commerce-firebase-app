import * as React from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import { FcCheckmark } from "react-icons/fc";
import { sp } from "@pnp/sp";

const MenuBar = (props) => {
  React.useEffect(() => {
    sp.profiles.myProperties.get().then((res) => {
      sp.web.lists
        .getByTitle("StaffProfile")
        .items.filter(`StaffEmail eq '${res?.Email}'`)
        .get()
        .then((response) => {
          if (response.length > 0) {
            const staffData = JSON.parse(response[0].Biodata);
            const emergencyData = JSON.parse(response[0].Emergency);
            const bankData = JSON.parse(response[0].Bank);

            response[0].Guarantor
              ? setGuarantor("completed")
              : setGuarantor("not completed");

            response[0].Confidentiality
              ? setConfidentiality("completed")
              : setConfidentiality("not completed");

            setBasic(staffData.bioData_status);
            setEmergency(emergencyData.emergency_status);
            setBank(bankData.bank_status);
          } else {
            setBank("not completed");
            setEmergency("not completed");
            setBasic("not completed");
            setGuarantor("not completed");
            setConfidentiality("not completed");
          }
        });
    });
  }, []);

  const [basic, setBasic] = React.useState(" ");
  const [emergency, setEmergency] = React.useState(" ");
  const [bank, setBank] = React.useState(" ");
  const [confidentiality, setConfidentiality] = React.useState(" ");
  const [guarantor, setGuarantor] = React.useState(" ");

  return (
    <div className="menubar">
      <ul>
        <li className={props.biodata}>
          {basic === "completed" ? (
            <span className="approveIcon">
              <FcCheckmark />
            </span>
          ) : null}
          <Link to="/employee/profile-biodata"> Bio Data</Link>{" "}
        </li>
        <li className={props.emergency}>
          {emergency === "completed" ? (
            <span className="approveIcon">
              <FcCheckmark />
            </span>
          ) : null}
          <Link to="/employee/profile-emergency">Emergency </Link>{" "}
        </li>
        <li className={props.bank}>
          {bank === "completed" ? (
            <span className="approveIcon">
              <FcCheckmark />
            </span>
          ) : null}
          <Link to="/employee/profile-bankdetails">Bank Details</Link>
        </li>
        <li className={props.confidentiality}>
          {confidentiality === "completed" ? (
            <span className="approveIcon">
              <FcCheckmark />
            </span>
          ) : null}
          <Link to="/employee/profile-confidentiality"> Confidentiality </Link>
        </li>
        <li className={props.guarantor}>
          {guarantor === "completed" ? (
            <span className="approveIcon">
              <FcCheckmark />
            </span>
          ) : null}
          <Link to="/employee/profile-guarantor">Guarantor</Link>
        </li>
      </ul>
    </div>
  );
};

export default MenuBar;

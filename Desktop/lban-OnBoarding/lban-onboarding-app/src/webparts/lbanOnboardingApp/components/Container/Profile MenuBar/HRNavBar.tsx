import * as React from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const HRMenuBar = (props) => {
  let { id } = useParams();
  return (
    <div className="menubar">
      <ul>
        <li className={props.biodata}>
          <Link to={`/hr/profile-biodata/${id}`}> Bio Data</Link>{" "}
        </li>
        <li className={props.emergency}>
          <Link to={`/hr/profile-emergency/${id}`}>Emergency </Link>{" "}
        </li>
        <li className={props.bank}>
          <Link to={`/hr/profile-bankdetails/${id}`}>Bank Details</Link>
        </li>
        <li className={props.confidentiality}>
          <Link to={`/hr/profile-confidentiality/${id}`}>
            {" "}
            Confidentiality{" "}
          </Link>
        </li>
        <li className={props.guarantor}>
          <Link to={`/hr/profile-guarantor/${id}`}>Guarantor</Link>
        </li>
      </ul>
    </div>
  );
};

export default HRMenuBar;

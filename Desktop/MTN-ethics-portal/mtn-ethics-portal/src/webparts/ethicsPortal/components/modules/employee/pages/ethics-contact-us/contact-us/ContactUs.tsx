import { Box, Input, TextField } from "@material-ui/core";
import * as React from "react";
import { BsFillTelephoneFill, BsPersonFill } from "react-icons/bs";
import { FaEnvelope } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { EmployeeWrapper } from "../../../../shared/components/app-wrapper/employee/EmployeeWrapper";
import { LandingPageHeaderWithImage } from "../../../../shared/components/LandingPageHeaderWithImage";
// import "@pnp/graph/users";
import { sp } from "@pnp/sp";
import "./styles.css";
import swal from "sweetalert";
import Malito from "./Malito";

export const ContactUs = () => {
  const [employeeName, setEmployeeName] = React.useState("");
  const [employeeEmail, setEmployeeEmail] = React.useState("");
  const [message, setMessage] = React.useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    sp.web.lists
      .getByTitle(`ContactUs`)
      .items.add({
        EmployeeName: employeeName,
        EmployeeEmail: employeeEmail,
        ContactUsMessage: message,
      })
      .then((res) => {
        swal(
          "Success",
          "Thank you, your enquiry has been successfully submited",
          "success"
        );
        setMessage("");
      })
      .catch((e) => {
        swal("Warning!", "An Error Occured, Try Again!", "error");
        console.error(e);
      });
  };

  React.useEffect(() => {
    sp.profiles.myProperties.get().then((response) => {
      setEmployeeName(response.DisplayName);
      setEmployeeEmail(response.Email);
    });
  }, []);

  return (
    <EmployeeWrapper backButton={false}>
      <LandingPageHeaderWithImage
        bg="https://mtncloud.sharepoint.com/sites/MTNAppDevelopment/ethicsportal/assets/contact-us-pic.png"
        text="Contact Us"
      />
      <Box>
        <div className="contact__us">
          <div className="contact__header">
            <h3>Contact Us</h3>
            <span>
              <FaEnvelope />
              {/* <Malito
                email="https://outlook.live.com/mail/0/deeplink/compose?to= ComplianceEthicsHelpDesk@mtn.com"
                subject=""
                body=""
              >
                ComplianceEthicsHelpDesk@mtn.com
              </Malito> */}
              <a href="mailto:ComplianceEthicsHelpDesk@mtn.com">
                ComplianceEthicsHelpDesk@mtn.com
              </a>
            </span>
            <span>
              <BsFillTelephoneFill />
              252
            </span>
          </div>
          {/* form */}
          <div className="contactUs__form">
            <form onSubmit={submitHandler}>
              <div className="contactUs__container">
                <div className="contactUs__Inputcontainer">
                  <div className="contactUs__Input">
                    <label>
                      <BsPersonFill />
                      Employee Name
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setEmployeeName(e.target.value)}
                      value={employeeName}
                    />
                  </div>

                  <div className="contactUs__Input">
                    <label>
                      <FaEnvelope />
                      Employee Email
                    </label>
                    <input
                      type="email"
                      onChange={(e) => setEmployeeEmail(e.target.value)}
                      value={employeeEmail}
                    />
                  </div>
                </div>

                <div className="contactUs__InputMessage">
                  <label>
                    <MdMessage />
                    Message
                  </label>
                  <textarea
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    required={true}
                  />
                </div>
                <div className="contactUs_btn">
                  <button type="submit">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Box>
    </EmployeeWrapper>
  );
};

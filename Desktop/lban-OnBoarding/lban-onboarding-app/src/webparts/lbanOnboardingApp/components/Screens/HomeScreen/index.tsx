import * as React from "react";
import { sp } from "@pnp/sp";
import { useHistory } from "react-router-dom";

export const HomeScreen: React.FC<{
  isHr: boolean;
  isHod: boolean;
  isTrainer: boolean;
}> = ({ isHr, isHod, isTrainer }) => {
  const history = useHistory();

  const pushHandler = () => {
    if (isHr) {
      history.push("/hr/viewrequest");
      return;
    }
    if (isTrainer) {
      history.push("/trainer-list");
      return;
    }
    if (isHod) {
      history.push("/assign/trainer/hod");
      return;
    }
    history.push("/employee/profile");
  };

  return (
    <div className="image__Overlay">
      <div className="homePage">
        <div className="homeContainer">
          <img
            src="https://lotusbetaanalytics.sharepoint.com/sites/lban-Onboarding-Portal/assets/lban-logo.png"
            alt="logo"
          />
          <div className="homeText">
            <h4>Welcome to</h4>
            <h5>
              Onboarding <b>Training</b> Portal.
            </h5>
          </div>
          <div className="homeBtn">
            <button className="homeButton" onClick={pushHandler}>
              Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

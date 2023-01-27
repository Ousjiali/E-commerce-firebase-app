import * as React from "react";
import { AdminHeader, AdminNavigation } from "../../../containers";

const Guideline = () => {
  return (
    <div className="appContainer">
      <AdminNavigation guideline={`active`} />
      <div className="contentsRight">
        <AdminHeader title="Guideline" />
      </div>
    </div>
  );
};

export default Guideline;

import React from "react";
import { Navigation, Header } from "../components";

const Layout = ({ name = "", children, pageTitle }) => {
  return (
    <div className="appContainer">
      <Navigation name={name} />
      <div className="contentsRight">
        <Header name={pageTitle} />
        {children}
      </div>
    </div>
  );
};

export default Layout;

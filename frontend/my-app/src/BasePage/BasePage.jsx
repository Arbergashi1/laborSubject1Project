import React from "react";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import "./BasePage.scss";

const BasePage = ({ preNavName, children }) => {
  return (
    <div className="baseBage">
      <Sidebar />
      <div className="basePageContainer">
        <Navbar />
        <div className="basePageTabs">
          <h2 className="basePageTab">{preNavName}</h2>
        </div>
        <div className="basePageContent">{children}</div>
      </div>
    </div>
  );
};

export default BasePage;

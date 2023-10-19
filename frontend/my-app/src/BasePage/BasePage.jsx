import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import "./BasePage.scss";
import { H1 } from "../reusable/hTags/HTags";

const BasePage = ({ preNavName, children }) => {
  return (
    <div className="baseBage">
      <Sidebar />
      <div className="basePageContainer">
        <Navbar />
        <div className="basePageTabs">
          <H1 className="basePageTab">{preNavName}</H1>
        </div>
        <div className="basePageContent">{children}</div>
      </div>
    </div>
  );
};

export default BasePage;

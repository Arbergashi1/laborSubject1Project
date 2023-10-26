import React, { useContext } from "react";
import BasePage from "../../BasePage/BasePage";
import { AppContext } from "../../context/appcontext";
import ReportsCards from "./ReportsCards";

const ReportsManagement = () => {
  const { reportsList, setReportsList } = useContext(AppContext);

  return (
    <BasePage preNavName={"Reports Management"}>
      <div className="grid grid-cols-3 gap-3">
        {reportsList.map((report, index) => (
          <ReportsCards
            key={report.reportId}
            report={report}
            index={index}
            {...{ setReportsList, reportsList }}
          />
        ))}
      </div>
    </BasePage>
  );
};

export default ReportsManagement;

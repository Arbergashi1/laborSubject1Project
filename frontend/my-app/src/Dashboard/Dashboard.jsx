import { defaultColDef, gridOptions } from "../AGGRIDEXPORT/utils";
import BasePage from "../BasePage/BasePage";
import { AgGridReact } from "ag-grid-react";

const Dashboard = () => {
  return (
    <BasePage {...{ preNavName: "Dashboard" }}>
      <div className="ag-theme-alpine" style={{ width: "100%", height: 530 }}>
        <AgGridReact defaultColDef={defaultColDef} gridOptions={gridOptions} />
      </div>
    </BasePage>
  );
};

export default Dashboard;

import { Switch, Table } from "antd";
import BasePage from "../../BasePage/BasePage";
import { useContext, useState } from "react";
import { AppContext } from "../../context/appcontext";
import getColumnDefs from "./getColumnDefs";
import Card from "../../reusable/Card/Card";
import { H1 } from "../../reusable/hTags/HTags";
import { useDocumentTile } from "../../hooks/useDocumentTile";

const LogsList = () => {
  useDocumentTile({ title: "Logs | ADMINISTRATE | KSD" });

  const { editLogs, setEditLogs } = useContext(AppContext);
  const paginationOptions = {
    pageSize: 6,
  };
  const [schitchPeriod, setSchitchPeriod] = useState(false);

  return (
    <BasePage preNavName={"Logs List"}>
      <div
        style={{
          display: "grid",
          gap: "15px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 20px 0",
            borderRadius: "20px",
            boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
            backgroundColor: "white",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <H1>{schitchPeriod ? "All Time Stats" : "Today Stats"}</H1>
            <span>
              <Switch
                onClick={() => setSchitchPeriod(!schitchPeriod)}
                unCheckedChildren="Click to change cards to all time stats"
                checkedChildren="Click to change cards to Today stats"
              />
            </span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: "15px",
            padding: "10px",
            borderRadius: "20px",
            boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
            backgroundColor: "white",
          }}
        >
          <Card
            background={"orange"}
            string={"All Logs"}
            number={editLogs}
            timeFiltering={schitchPeriod}
          />
          <Card
            background={"#0dff00"}
            string={"Create Logs"}
            number={editLogs.filter(
              ({ actionType }) => actionType === "Create"
            )}
            timeFiltering={schitchPeriod}
          />
          <Card
            background={"#de0d0d"}
            string={"Delete Logs"}
            number={editLogs.filter(
              ({ actionType }) => actionType === "Delete"
            )}
            timeFiltering={schitchPeriod}
          />
          <Card
            background={"#efe770"}
            string={"Edit Logs"}
            number={editLogs.filter(({ actionType }) => actionType === "Edit")}
            timeFiltering={schitchPeriod}
          />
          <Card
            background={"#004cff"}
            string={"Print Logs"}
            number={editLogs.filter(({ actionType }) => actionType === "Print")}
            timeFiltering={schitchPeriod}
          />
          <Card
            background={"#00ff80"}
            string={"Login Logs"}
            number={editLogs.filter(({ actionType }) => actionType === "Login")}
            timeFiltering={schitchPeriod}
          />
          <Card
            background={"#ff0000"}
            string={"Logout Logs"}
            number={editLogs.filter(
              ({ actionType }) => actionType === "Logout"
            )}
            timeFiltering={schitchPeriod}
          />
        </div>
        <Table
          dataSource={editLogs}
          pagination={paginationOptions}
          columns={getColumnDefs({ setEditLogs })}
        />
      </div>
    </BasePage>
  );
};

export default LogsList;

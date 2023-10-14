import React, { useContext, useState } from "react";
import BasePage from "../../BasePage/BasePage";
import { AppContext } from "../../context/appcontext";
import { Drawer, Table } from "antd";
import { columnDefs } from "./utils/columnDefs";
import EditEmployeeModal from "./EditEmployeeModal";
import Card from "../../reusable/Card/Card";

const EmployeeList = () => {
  const [idToEdit, setIdToEdit] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const { employeeList, setEmployeeList } = useContext(AppContext);
  const details = employeeList.find(
    ({ employeeId }) => employeeId === openDrawer
  );
  const paginationOptions = {
    pageSize: 6,
  };

  return (
    <BasePage preNavName={"Employee List"}>
      <div style={{ display: "grid", gap: "20px" }}>
        <div
          style={{
            display: "flex",
            gap: "15px",
            padding: "10px",
            borderRadius: "20px",
            boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Card
            background={"blue"}
            string={"All Employees"}
            number={employeeList.length}
          />
          <Card
            background={"#0dff00"}
            string={"Active Employees"}
            number={
              employeeList.filter(
                ({ employeeStatus }) => employeeStatus === "ACTIVE"
              ).length
            }
          />
          <Card
            background={"#de0d0d"}
            string={"Inactive Employees"}
            number={
              employeeList.filter(
                ({ employeeStatus }) => employeeStatus === "INACTIVE"
              ).length
            }
          />
          <Card
            background={"#b348ff"}
            string={"Administrate Employees"}
            number={
              employeeList.filter(
                ({ employeeType }) => employeeType === "Administrate"
              ).length
            }
          />
          <Card
            background={"#795548"}
            string={"Employees (employee)"}
            number={
              employeeList.filter(
                ({ employeeType }) => employeeType === "Employee"
              ).length
            }
          />
        </div>

        <div
          style={{
            borderRadius: "10px",
            boxShadow:
              "0 4px 8px 0 rgba(160, 160, 160, 0.2), 0 6px 20px 0 rgba(174, 174, 174, 0.19)",
          }}
        >
          <Table
            columns={columnDefs({
              employeeList,
              setEmployeeList,
              idToEdit,
              setIdToEdit,
              openDrawer,
              setOpenDrawer,
            })}
            dataSource={employeeList}
            pagination={paginationOptions}
          />
        </div>
        {idToEdit && (
          <EditEmployeeModal
            {...{ idToEdit, setIdToEdit, employeeList, setEmployeeList }}
          />
        )}
        <Drawer
          open={openDrawer}
          placement="right"
          onClose={() => setOpenDrawer(false)}
          title={`Deatils for - ${openDrawer}`}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              background: "lightgray",
              padding: "10px",
              borderRadius: "10px",
              marginBottom: "10px",
            }}
          >
            <div>Created At</div>
            <div>{details?.createdAt}</div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              background: "lightgray",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <div>Updated At</div>
            <div>{details?.updatedAt}</div>
          </div>
        </Drawer>
      </div>
    </BasePage>
  );
};

export default EmployeeList;

import React, { useContext, useState } from "react";
import BasePage from "../../BasePage/BasePage";
import { AppContext } from "../../context/appcontext";
import { Table } from "antd";
import { columnDefs } from "./utils/columnDefs";
import EditEmployeeModal from "./EditEmployeeModal";

const EmployeeList = () => {
  const [idToEdit, setIdToEdit] = useState(false);
  const { employeeList, setEmployeeList } = useContext(AppContext);
  const paginationOptions = {
    pageSize: 6,
  };

  return (
    <BasePage preNavName={"Employee List"}>
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
    </BasePage>
  );
};

export default EmployeeList;

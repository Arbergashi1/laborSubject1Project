import { Divider, Input, Modal, Select, message } from "antd";
import { useState } from "react";
import { UseDateReader } from "../../hooks/UseDateReader";
import axios from "axios";

const EditEmployeeModal = ({
  idToEdit,
  setIdToEdit,
  employeeList,
  setEmployeeList,
}) => {
  const employeStatusArr = [
    { value: "ACTIVE", label: "ACTIVE" },
    { value: "INACTIVE", label: "INACTIVE" },
  ];
  const dataOfClickedEmployee = employeeList.find(
    ({ employeeId }) => employeeId === idToEdit
  );

  const [editedData, setEditedData] = useState({
    employeeId: dataOfClickedEmployee.employeeId,
    fullName: dataOfClickedEmployee.fullName,
    email: dataOfClickedEmployee.email,
    phoneNumber: dataOfClickedEmployee.phoneNumber,
    state: dataOfClickedEmployee.state,
    address: dataOfClickedEmployee.address,
    employeeType: "Employee",
    employeeStatus: dataOfClickedEmployee.employeeStatus,
    employeePassword: dataOfClickedEmployee.employeePassword,
    // createdAt: dataOfClickedEmployee.createdAt,
    updatedAt: UseDateReader(Date.now()),
  });

  const handleEdit = () => {
    const apiUrl =
      "https://localhost:44312/api/EmployeeManagement/EditEmployee/2dc76e15-86fe-4ae0-a9d1-18971860c2b0";

    axios.put(apiUrl, editedData).then((res) => {
      if (res.data.statusCode === 200) {
        message.success(res.data.statusMessage);
        setEmployeeList((prev) =>
          prev.map((employee) =>
            employee.employeeId === idToEdit
              ? { ...employee, ...editedData }
              : employee
          )
        );
        setIdToEdit(false);
      } else {
        message.success(res.data.statusMessage);
      }
    });
  };

  return (
    <Modal
      open={idToEdit}
      centered
      onCancel={() => setIdToEdit(false)}
      title={`Edit Data for - ${idToEdit}`}
      footer={
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button onClick={() => setIdToEdit(false)}>Cancel</button>
          <button onClick={handleEdit}>Edit</button>
        </div>
      }
    >
      <div style={{ marginBottom: "10px" }}>
        <Divider />
      </div>
      <>
        <div className="toinputsDiv">
          <div>
            <span>Full Name</span>
            <Input
              value={editedData.fullName}
              onChange={(e) =>
                setEditedData({ ...editedData, fullName: e.target.value })
              }
            />
          </div>
          <div>
            <span>Email</span>
            <Input
              value={editedData.email}
              onChange={(e) =>
                setEditedData({ ...editedData, email: e.target.value })
              }
            />
          </div>
        </div>
        <div className="oneInputDiv">
          <div>
            <span>Phone Number</span>
            <Input
              value={editedData.phoneNumber}
              onChange={(e) =>
                setEditedData({ ...editedData, phoneNumber: e.target.value })
              }
              style={{ width: "100%" }}
            />
          </div>
        </div>
        <div className="toinputsDiv">
          <div>
            <span>State</span>
            <Input
              value={editedData.state}
              onChange={(e) =>
                setEditedData({ ...editedData, state: e.target.value })
              }
            />
          </div>
          <div>
            <span>Password</span>
            <Input
              value={editedData.employeePassword}
              onChange={(e) =>
                setEditedData({
                  ...editedData,
                  employeePassword: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="oneInputDiv">
          <div>
            <span>Address</span>
            <Input
              value={editedData.address}
              onChange={(e) =>
                setEditedData({ ...editedData, address: e.target.value })
              }
            />
          </div>
        </div>
        <div>
          <div className="toinputsDiv">
            <div>
              <span>Employee Status</span>
              <Select
                style={{ width: "100%" }}
                options={employeStatusArr}
                value={editedData.employeeStatus}
                onChange={(e) =>
                  setEditedData({ ...editedData, employeeStatus: e })
                }
              />
            </div>
          </div>
        </div>
      </>
    </Modal>
  );
};

export default EditEmployeeModal;

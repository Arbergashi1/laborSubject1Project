import React, { useContext, useState } from "react";
import BasePage from "../../BasePage/BasePage";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { AppContext } from "../../context/appcontext";
import { Input, message } from "antd";
import { UseDateReader } from "../../hooks/UseDateReader";
import axios from "axios";

const NewEmployee = () => {
  const navigate = useNavigate();
  const { employeeList, setEmployeeList } = useContext(AppContext);

  const [emplyeeObject, setEmplyeeObject] = useState({
    employeeId: uuidv4(),
    fullName: "",
    email: "",
    phoneNumber: "",
    state: "",
    address: "",
    employeeType: "Employee",
    employeeStatus: "ACTIVE",
    employeePassword: "",
    createdAt: UseDateReader(Date.now()),
    updatedAt: UseDateReader(Date.now()),
  });
  console.log({ emplyeeObject });

  const resetFields = () => {
    setEmplyeeObject({
      employeeId: uuidv4(),
      fullName: "",
      email: "",
      phoneNumber: "",
      state: "",
      address: "",
      employeeType: "Employee",
      employeeStatus: "ACTIVE",
      employeePassword: "",
    });
  };

  const handleSubmit = () => {
    const apiUrl =
      "https://localhost:44312/api/EmployeeManagement/CreateNewEmployee";
    axios
      .post(apiUrl, emplyeeObject)
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success(res.data.statusMessage);
          setEmployeeList((prev) => [emplyeeObject, ...prev]);
          navigate("/employeeList");
          resetFields();
        } else {
          message.success(res.data.statusMessage);
        }
      })
      .catch((err) => console.log({ err }));
  };

  return (
    <BasePage preNavName={"Add New Employee"}>
      <div className="addNewClient">
        <div className="addNewClientCard">
          <div style={{ display: "grid" }}>
            <span>Employee Full Name</span>
            <Input
              value={emplyeeObject.fullName}
              onChange={(e) =>
                setEmplyeeObject({ ...emplyeeObject, fullName: e.target.value })
              }
              placeholder="Type Employee Name here..."
              style={{ width: "" }}
            />
          </div>
          <div style={{ display: "grid" }}>
            <span>Employee Email</span>
            <Input
              value={emplyeeObject.email}
              onChange={(e) =>
                setEmplyeeObject({ ...emplyeeObject, email: e.target.value })
              }
              placeholder="Type Employee Email here..."
              style={{ width: "" }}
            />
          </div>
          <div style={{ display: "grid" }}>
            <span>Employee Phone Number</span>
            <Input
              value={emplyeeObject.phoneNumber}
              onChange={(e) =>
                setEmplyeeObject({
                  ...emplyeeObject,
                  phoneNumber: e.target.value,
                })
              }
              placeholder="Type Employee phone no here..."
              style={{ width: "" }}
            />
          </div>

          <div style={{ display: "grid" }}>
            <span>Employee's State Name</span>
            <Input
              value={emplyeeObject.state}
              onChange={(e) =>
                setEmplyeeObject({ ...emplyeeObject, state: e.target.value })
              }
              placeholder="Type Employee State here..."
              style={{ width: "" }}
            />
          </div>
          <div style={{ display: "grid" }}>
            <span>Employee's Address</span>
            <Input
              value={emplyeeObject.address}
              onChange={(e) =>
                setEmplyeeObject({ ...emplyeeObject, address: e.target.value })
              }
              placeholder="Type Employee Address here..."
              style={{ width: "" }}
            />
          </div>
          <div style={{ display: "grid" }}>
            <span>Employee Password</span>
            <Input
              value={emplyeeObject.employeePassword}
              onChange={(e) =>
                setEmplyeeObject({
                  ...emplyeeObject,
                  employeePassword: e.target.value,
                })
              }
              placeholder="Type Employee Password here..."
              style={{ width: "" }}
            />
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            style={{ width: "50%", padding: "10px" }}
            onClick={handleSubmit}
          >
            submit
          </button>
        </div>
      </div>
    </BasePage>
  );
};

export default NewEmployee;

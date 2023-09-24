import { Input, message } from "antd";
import "./NewClient.scss";
import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { AppContext } from "../../../context/appcontext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BasePage from "../../../BasePage/BasePage";

const NewClient = () => {
  const { setClinetsList } = useContext(AppContext);
  const navigate = useNavigate();

  const [clientObject, setClientObject] = useState({
    clientId: uuidv4(),
    fullName: "",
    email: "",
    phoneNumber: "",
    firmName: "",
    state: "",
    address: "",
    userType: "Client",
    userStatus: "ACTIVE",
    clientPassword: "",
  });
  console.log({ clientObject });

  const resetFields = () => {
    setClientObject({
      clientId: "",
      fullName: "",
      email: "",
      phoneNumber: "",
      firmName: "",
      state: "",
      address: "",
      userType: "Client",
      userStatus: "Active",
    });
  };

  const handleSubmit = () => {
    const apiUrl =
      "https://localhost:44312/api/ClientManagement/CreateNewClient";
    axios.post(apiUrl, clientObject).then((res) => {
      console.log({ res });
      if (res.data.statusCode === 200) {
        message.success(res.data.statusMessage);
        setClinetsList((prev) => [clientObject, ...prev]);
        resetFields();
        navigate("/clientsList");
      } else {
        message.success(res.data.statusMessage);
      }
    });
  };

  return (
    <BasePage preNavName={"Add New Client"}>
      <div className="addNewClient">
        <div className="addNewClientCard">
          <div style={{ display: "grid" }}>
            <span>Client Full Name</span>
            <Input
              value={clientObject.fullName}
              onChange={(e) =>
                setClientObject({ ...clientObject, fullName: e.target.value })
              }
              placeholder="Type Client Name here..."
              style={{ width: "" }}
            />
          </div>
          <div style={{ display: "grid" }}>
            <span>Client Email</span>
            <Input
              value={clientObject.email}
              onChange={(e) =>
                setClientObject({ ...clientObject, email: e.target.value })
              }
              placeholder="Type Client Email here..."
              style={{ width: "" }}
            />
          </div>
          <div style={{ display: "grid" }}>
            <span>Client Phone Number</span>
            <Input
              value={clientObject.phoneNumber}
              onChange={(e) =>
                setClientObject({
                  ...clientObject,
                  phoneNumber: e.target.value,
                })
              }
              placeholder="Type here..."
              style={{ width: "" }}
            />
          </div>
          <div style={{ display: "grid" }}>
            <span>Client's Firm Name</span>
            <Input
              value={clientObject.firmName}
              onChange={(e) =>
                setClientObject({ ...clientObject, firmName: e.target.value })
              }
              placeholder="Type Client Firm Name here..."
              style={{ width: "" }}
            />
          </div>
          <div style={{ display: "grid" }}>
            <span>Client's State Name</span>
            <Input
              value={clientObject.state}
              onChange={(e) =>
                setClientObject({ ...clientObject, state: e.target.value })
              }
              placeholder="Type Client State here..."
              style={{ width: "" }}
            />
          </div>
          <div style={{ display: "grid" }}>
            <span>Client's Address</span>
            <Input
              value={clientObject.address}
              onChange={(e) =>
                setClientObject({ ...clientObject, address: e.target.value })
              }
              placeholder="Type Client Address here..."
              style={{ width: "" }}
            />
          </div>
          <div style={{ display: "grid" }}>
            <span>Client Password</span>
            <Input
              value={clientObject.clientPassword}
              onChange={(e) =>
                setClientObject({
                  ...clientObject,
                  clientPassword: e.target.value,
                })
              }
              placeholder="Type Client Password here..."
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

export default NewClient;

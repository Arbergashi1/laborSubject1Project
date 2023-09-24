import { Divider } from "@mui/material";
import { Input, Modal, Select, message } from "antd";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const EditClientModal = ({
  idToEdit,
  setIdToEdit,
  clinetsList,
  setClinetsList,
}) => {
  const clientStatusArr = [
    {
      value: "ACTIVE",
      label: "ACTIVE",
    },
    {
      value: "INACTIVE",
      label: "INACTIVE",
    },
  ];

  const dataOfClickedClient = clinetsList.find(
    ({ clientId }) => clientId === idToEdit
  );

  const [editedData, setEditedData] = useState({
    clientId: dataOfClickedClient.clientId,
    fullName: dataOfClickedClient.fullName,
    email: dataOfClickedClient.email,
    phoneNumber: dataOfClickedClient.phoneNumber,
    firmName: dataOfClickedClient.firmName,
    state: dataOfClickedClient.state,
    address: dataOfClickedClient.address,
    userType: "Client",
    userStatus: dataOfClickedClient.userStatus,
    clientPassword: dataOfClickedClient.clientPassword,
  });

  const handleEdit = () => {
    const apiUrl = `https://localhost:44312/api/ClientManagement/EditClientInfo/${idToEdit}`;

    axios
      .put(apiUrl, editedData)
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success(res.data.statusMessage);
          setClinetsList((prev) =>
            prev.map((client) =>
              client.clientId === idToEdit
                ? { ...client, ...editedData }
                : client
            )
          );
          setIdToEdit(false);
        } else {
          message.success(res.data.statusMessage);
        }
        console.log({ res });
      })
      .catch((err) => console.log(err));
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
            <span>Firm Name</span>
            <Input
              value={editedData.firmName}
              onChange={(e) =>
                setEditedData({ ...editedData, firmName: e.target.value })
              }
            />
          </div>
          <div>
            <span>State</span>
            <Input
              value={editedData.state}
              onChange={(e) =>
                setEditedData({ ...editedData, state: e.target.value })
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
              <span>Password</span>
              <Input
                value={editedData.clientPassword}
                onChange={(e) =>
                  setEditedData({
                    ...editedData,
                    clientPassword: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <span>User Status</span>
              <Select
                style={{ width: "100%" }}
                options={clientStatusArr}
                value={editedData.userStatus}
                onChange={(e) =>
                  setEditedData({ ...editedData, userStatus: e })
                }
              />
            </div>
          </div>
        </div>
      </>
    </Modal>
  );
};

export default EditClientModal;

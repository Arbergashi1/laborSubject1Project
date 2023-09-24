import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Tooltip, message, notification } from "antd";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import axios from "axios";

export const columnDefs = ({
  clinetsList,
  setClinetsList,
  idToEdit,
  setIdToEdit,
}) => [
  {
    title: "Client ID",
    dataIndex: "clientId",
    key: "clientId",
    align: "center",
    render: (text) => {
      const substringedId = text.substring(0, 8);
      console.log({ substringedId });
      return (
        <div>
          <Tooltip title={text}>{substringedId}..</Tooltip>.
        </div>
      );
    },
  },
  {
    title: "Full Name",
    dataIndex: "fullName",
    key: "clientId",
    align: "center",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    align: "center",
  },
  {
    title: "Phone No",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
    align: "center",
  },
  {
    title: "Firm Name",
    dataIndex: "firmName",
    key: "firmName",
    align: "center",
  },
  {
    title: "State",
    dataIndex: "state",
    key: "state",
    align: "center",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    align: "center",
  },
  {
    title: "Client Password",
    dataIndex: "clientPassword",
    key: "clientPassword",
    align: "center",
  },
  {
    title: "User Status",
    dataIndex: "userStatus",
    key: "userStatus",
    align: "center",

    render: (text) => {
      return (
        <div
          style={{
            padding: "5px",
            borderRadius: "5px",
            fontWeight: "600",
            color: "white",
            background:
              text.toLowerCase() === "active"
                ? "#2EEC1A"
                : text === "inactive"
                ? "#e60023"
                : "",
          }}
        >
          {text}
        </div>
      );
    },
  },
  {
    title: "User Type",
    dataIndex: "userType",
    key: "userType",
    align: "center",
  },
  {
    title: "Actions",
    key: "clientId",
    align: "center",
    render: (_, record) => {
      const showDetailsNotification = (id) => {
        notification.open({
          message: "Client Details",
          duration: 30,
          placement: "bottomRight",
          description: [
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                background: "lightgray",
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              <div>Created At</div>
              <div>mm/yy/dd</div>
            </div>,
          ],
        });
      };
      const handleIdToEdit = (id) => {
        setIdToEdit(id);
      };

      const handleDelete = (id) => {
        const updatedClientList = clinetsList.filter(
          ({ clientId }) => clientId !== id
        );
        const apiUrl = `https://localhost:44312/api/ClientManagement/DeleteClient/${id}`;
        console.log({ apiUrl });
        axios
          .delete(apiUrl)
          .then((res) => {
            if (res.data.statusCode == 200) {
              message.success(res.data.statusMessage);
              setClinetsList(updatedClientList);
            } else {
              message.error(res.data.statusMessage);
            }
          })
          .catch((err) => console.log({ err }));
      };

      return (
        <>
          <div style={{ display: "flex", gap: "10px" }}>
            <a>
              <Tooltip title="Delete">
                <DeleteIcon
                  color="error"
                  onClick={() => handleDelete(record.clientId)}
                />
              </Tooltip>
            </a>
            <a>
              <Tooltip title="Edit">
                <EditIcon
                  color="primary"
                  onClick={() => handleIdToEdit(record.clientId)}
                />
              </Tooltip>
            </a>
            <a>
              <Tooltip title="View Details">
                <RemoveRedEyeIcon
                  color="secondary"
                  onClick={() => showDetailsNotification(record.clientId)}
                />
              </Tooltip>
            </a>
          </div>
        </>
      );
    },
  },
];

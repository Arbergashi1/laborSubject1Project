import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Popover, Tooltip, message, notification } from "antd";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import axios from "axios";

export const columnDefs = ({
  clinetsList,
  setClinetsList,
  setIdToEdit,
  viewHandler,
}) => [
  {
    title: "Client ID",
    dataIndex: "clientId",
    key: "clientId",
    align: "center",
    render: (_, record) => {
      const substringedId = record.clientId.substring(0, 8);
      return (
        <div>
          <Popover title={record.clientId}>
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => viewHandler(record)}
            >
              {substringedId}...
            </span>
          </Popover>
          .
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
      const handleIdToEdit = (id) => {
        setIdToEdit(id);
      };

      const handleDelete = (id) => {
        const updatedClientList = clinetsList.filter(
          ({ clientId }) => clientId !== id
        );
        const apiUrl = `https://localhost:44312/api/ClientManagement/DeleteClient/${id}`;
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
                  onClick={() => viewHandler(record)}
                />
              </Tooltip>
            </a>
          </div>
        </>
      );
    },
  },
];

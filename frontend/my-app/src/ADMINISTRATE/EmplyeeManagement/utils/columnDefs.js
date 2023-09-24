import { Tooltip, message, notification } from "antd";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

export const columnDefs = ({
  employeeList,
  setEmployeeList,
  idToEdit,
  setIdToEdit,
}) => [
  {
    title: "Employee ID",
    dataIndex: "employeeId",
    key: "employeeId",
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
    title: "Employee Password",
    dataIndex: "employeePassword",
    key: "employeePassword",
    align: "center",
  },
  {
    title: "Employee Status",
    dataIndex: "employeeStatus",
    key: "employeeStatus",
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
                : text.toLowerCase() === "inactive"
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
    title: "Employee Type",
    dataIndex: "employeeType",
    key: "employeeType",
    align: "center",
  },
  {
    title: "Actions",
    key: "clientId",
    align: "center",
    render: (_, record) => {
      const details = employeeList.find(
        ({ employeeId }) => employeeId === record.employeeId
      );
      const showDetailsNotification = (id) => {
        notification.open({
          message: "Employee Details",
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
                marginBottom: "10px",
              }}
            >
              <div>Created At</div>
              <div>{details.createdAt}</div>
            </div>,
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
              <div>{details.updatedAt}</div>
            </div>,
          ],
        });
      };
      const handleIdToEdit = (id) => {
        setIdToEdit(id);
      };

      const handleDelete = (id) => {
        const apiUrl = `https://localhost:44312/api/EmployeeManagement/DeleteEmployee/${id}`;
        const updatedEmployeeList = employeeList.filter(
          ({ employeeId }) => employeeId !== id
        );
        axios
          .delete(apiUrl)
          .then((res) => {
            if (res.data.statusCode === 200) {
              message.success(res.data.statusMessage);
              setEmployeeList(updatedEmployeeList);
            } else {
              message.success(res.data.statusMessage);
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
                  onClick={() => handleDelete(record.employeeId)}
                />
              </Tooltip>
            </a>
            <a>
              <Tooltip title="Edit">
                <EditIcon
                  color="primary"
                  onClick={() => handleIdToEdit(record.employeeId)}
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

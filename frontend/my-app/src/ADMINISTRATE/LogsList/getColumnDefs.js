import { Popover, Tooltip, message } from "antd";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

const getColumnDefs = ({ setEditLogs }) => [
  {
    title: "Created at",
    dataIndex: "createdAt",
    key: "createdAt",
    align: "center",
  },
  {
    title: "Log Id",
    dataIndex: "logId",
    key: "logId",
    align: "center",
    render: (id) => {
      const substringedId = id.substring(0, 8);
      return (
        <Popover
          trigger={"hover"}
          title={id}
          overlayInnerStyle={{ color: "black" }}
        >
          <span style={{ color: "blue", cursor: "pointer" }}>
            {substringedId}
          </span>
        </Popover>
      );
    },
  },
  {
    title: "Action Type",
    dataIndex: "actionType",
    key: "actionType",
    align: "center",
    render: (action) => {
      return (
        <div
          style={{
            padding: "10px",
            borderRadius: "10px",
            fontWeight: "600",
            color: "white",
            backgroundColor:
              action === "Create"
                ? "#0dff00"
                : action === "Edit"
                ? "#efe770"
                : action === "Delete"
                ? "#de0d0d"
                : action === "Print"
                ? "#004cff"
                : "",
          }}
        >
          {action}
        </div>
      );
    },
  },
  {
    title: "Previous Data",
    dataIndex: "previousData",
    key: "previousData",
    align: "center",
  },
  {
    title: "Create ByUser",
    dataIndex: "createByUser",
    key: "createByUser",
    align: "center",
  },

  {
    title: "Create ByUserId",
    dataIndex: "createByUserId",
    key: "createByUserId",
    align: "center",
    render: (id) => {
      const substringedId = id.substring(0, 8);
      return (
        <Popover
          trigger={"hover"}
          title={id}
          overlayInnerStyle={{ color: "black" }}
        >
          <span style={{ color: "blue", cursor: "pointer" }}>
            {substringedId}
          </span>
        </Popover>
      );
    },
  },
  {
    title: "Updated Data",
    dataIndex: "updatedData",
    key: "updatedData",
    align: "center",
    render: (id) => {
      const substringedId = id.substring(0, 8);
      return (
        <Popover
          trigger={"hover"}
          title={id}
          overlayInnerStyle={{ color: "black" }}
        >
          <span style={{ color: "blue", cursor: "pointer" }}>
            {/* {substringedId} */}
            click for more info
          </span>
        </Popover>
      );
    },
  },

  {
    title: "Option",
    key: "logId",
    align: "center",
    render: (_, record) => {
      const handleDelete = (id) => {
        const apiUrl = `https://localhost:44312/api/LogsManagement/DeleteLog/${id}`;
        // message.loading("Deleting log...", 1);
        axios.delete(apiUrl).then((res) => {
          if (res.data.statusCode === 200) {
            message.success(res.data.statusMessage);
            setEditLogs((prev) => prev.filter((el) => el.logId !== id));
          } else {
            message.error(res.data.statusMessage);
          }
        });
      };
      return (
        <div style={{ display: "flex", gap: "10px" }}>
          <a>
            <Tooltip title="Delete">
              <DeleteIcon
                color="error"
                onClick={() => handleDelete(record.logId)}
              />
            </Tooltip>
          </a>
          <a>
            <Tooltip title="Edit">
              <EditIcon
                color="primary"
                //  onClick={() => editHanlder(record)}
              />
            </Tooltip>
          </a>
        </div>
      );
    },
  },
];
export default getColumnDefs;

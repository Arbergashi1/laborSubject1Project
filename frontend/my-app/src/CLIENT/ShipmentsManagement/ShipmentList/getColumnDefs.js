import { Popover, Tooltip, message } from "antd";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PrintIcon from "@mui/icons-material/Print";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import axios from "axios";

const getColumnDefs = ({
  setShipmentsList,
  editHanlder,
  printHandler,
  saveLogs,
  viewShipmentById,
}) => [
  {
    title: "Created at",
    dataIndex: "createdAt",
    key: "createdAt",
    align: "center",
  },
  {
    title: "Tracking Id",
    dataIndex: "shipmentId",
    key: "shipmentId",
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
    title: "Reciver name",
    dataIndex: "name",
    key: "name",
    align: "center",
  },
  {
    title: "City",
    dataIndex: "city",
    key: "city",
    align: "center",
  },
  {
    title: "Cod",
    dataIndex: "reference",
    key: "reference",
    align: "reference",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    align: "center",
    // render: (status) => {
    //   return (
    //     <span
    //       style={{
    //         padding: "4px",
    //         borderRadius: "10px",
    //         fontWeight: "600",
    //         color: "white",
    //         backgroundColor:
    //           status === "Awaiting Pickup"
    //             ? "#004cff"
    //             : status === "In Delivry"
    //             ? "#efe770"
    //             : status === "Deliverd"
    //             ? "#0dff00"
    //             : status === "Refuzed"
    //             ? "#de0d0d"
    //             : "",
    //         display: "flex",
    //         // width: "110%",
    //         justifyContent: "center",
    //       }}
    //     >
    //       {status}
    //     </span>
    //   );
    // },
    render: (status) => {
      return (
        <span
          style={{
            fontWeight: "600",
            color: "white",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {status}
        </span>
      );
    },
  },
  {
    title: "Updated At",
    dataIndex: "updatedAt",
    key: "updatedAt",
    align: "center",
  },
  {
    title: "Notes",
    dataIndex: "notes",
    key: "notes",
    align: "center",
  },
  {
    title: "In Delivry With",
    dataIndex: "inWith",
    key: "inWith",
    align: "center",
    render: (_, record) => {
      console.log({ record });
      return (
        <div className="grid justify-center">
          <div className="flex text-xs gap-1">
            {record.status === "Deliverd" || record.status === "Refuzed" ? (
              <>Shipment updated by</>
            ) : <>
                {" "}
                <span>In Delivry with</span>
              </> ? (
              record.status === "Awaiting Pickup"
            ) : (
              <></>
            )}
            <span className="font-bold text-violet-500">
              {record.inWith || "-||-"}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    title: "Option",
    key: "shipmentId",
    align: "center",
    render: (_, record) => {
      const handleDelete = (id) => {
        const apiUrl = `https://localhost:44312/api/ShipmentsManagement/DeleteShipment/${id}`;
        axios.delete(apiUrl).then((res) => {
          if (res.data.statusCode === 200) {
            message.success(res.data.statusMessage);
            setShipmentsList((prev) =>
              prev.filter((el) => el.shipmentId !== id)
            );
            saveLogs({
              actionType: "Delete",
              previousData: record.shipmentId,
              updatedData: "Does not exists",
            });
          } else {
            message.error(res.data.statusMessage);
          }
        });
      };
      return (
        <div style={{ display: "flex", gap: "10px" }}>
          {record.status === "Awaiting Pickup" && (
            <>
              {" "}
              <a>
                <Tooltip title="Delete">
                  <DeleteIcon
                    color=""
                    onClick={() => handleDelete(record.shipmentId)}
                  />
                </Tooltip>
              </a>
              <a>
                <Tooltip title="Edit">
                  <EditIcon color="" onClick={() => editHanlder(record)} />
                </Tooltip>
              </a>
            </>
          )}

          <a>
            <Tooltip title="View Details">
              <RemoveRedEyeIcon
                color=""
                onClick={() => viewShipmentById(record)}
              />
            </Tooltip>
          </a>
          <a>
            <Tooltip title="Print Shipment">
              <PrintIcon onClick={() => printHandler(record)} />
            </Tooltip>
          </a>
          <a>
            <Tooltip title="Add Note">
              <NoteAltIcon color="" />
            </Tooltip>
          </a>
        </div>
      );
    },
  },
];
export default getColumnDefs;

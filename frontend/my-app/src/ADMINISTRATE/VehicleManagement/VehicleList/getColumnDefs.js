import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Tooltip, message } from "antd";
import axios from "axios";

const getColumnDefs = ({ setVehicleList, setIdToEdit, setEditedData }) => [
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    align: "center",
  },
  {
    title: "Vehicle Model",
    dataIndex: "vehicleModel",
    key: "vehicleModel",
    align: "center",
  },

  {
    title: "Vehicle Year",
    dataIndex: "vehicleYear",
    key: "vehicleYear",
    align: "center",
  },
  {
    title: "Vehicle Make",
    dataIndex: "vehicleMake",
    key: "vehicleMake",
    align: "center",
  },
  {
    title: "Vehicle Mileage",
    dataIndex: "vehicleMileage",
    key: "vehicleMileage",
    align: "center",
  },
  {
    title: "Vehicle DriverName",
    dataIndex: "vehicleDriverName",
    key: "vehicleDriverName",
    align: "center",
  },
  {
    title: "Vehicle DriverId",
    dataIndex: "vehicleDriverId",
    key: "vehicleDriverId",
    align: "center",
  },
  {
    title: "Updated At",
    dataIndex: "updatedAt",
    key: "updatedAt",
    align: "center",
  },
  {
    title: "Option",
    key: "vehicleId",
    align: "center",
    render: (_, record) => {
      const handleDelete = (id) => {
        const apiUrl = `https://localhost:44312/api/VehicleManagement/DeleteVehicle/${id}`;
        axios.delete(apiUrl).then((res) => {
          if (res.data.statusCode === 200) {
            message.success(res.data.statusMessage);
            setVehicleList((prev) => prev.filter((el) => el.vehicleId !== id));
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
                onClick={() => handleDelete(record.vehicleId)}
              />
            </Tooltip>
          </a>
          <a>
            <Tooltip title="Edit">
              <EditIcon
                color="primary"
                onClick={() => {
                  setIdToEdit(true);
                  setEditedData(record);
                }}
              />
            </Tooltip>
          </a>
          {/* <a>
            <Tooltip title="View Details">
              <RemoveRedEyeIcon color="secondary" />
            </Tooltip>
          </a> */}
        </div>
      );
    },
  },
];
export default getColumnDefs;

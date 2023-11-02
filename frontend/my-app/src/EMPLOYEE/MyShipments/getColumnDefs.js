import { Popover, Radio, Select, Tag, Tooltip, message } from "antd";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import { UseDateReader } from "../../hooks/UseDateReader";

const getColumnDefs = ({
  selectedStatus,
  setSelectedStatus,
  popoverCloser,
  setPopoverCloser,
  shipmentsList,
  setShipmentsList,
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
    render: (status) => {
      return (
        <span
          style={{
            padding: "4px",
            borderRadius: "10px",
            fontWeight: "600",
            color: "white",
            backgroundColor:
              status === "Awaiting Pickup"
                ? "#004cff"
                : status === "In Delivry"
                ? "#efe770"
                : status === "Deliverd"
                ? "#0dff00"
                : status === "Refuzed"
                ? "#de0d0d"
                : "",
            display: "flex",
            // width: "100%",
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
    render: (text) => {
      return (
        <div className="grid">
          <div className="flex text-xs gap-1">
            In Delivry with{"  "}
            <span className="font-medium text-violet-500">
              {" "}
              {text || "-||-"}
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
      let listOfStatuses = [
        {
          value: "Deliverd",
          label: "Deliverd",
        },
        {
          value: "Refuzed",
          label: "Refuzed",
        },
      ];
      const radioHandler = (value) => {
        console.log({ value });
        setSelectedStatus(value);
      };

      const handleSubmit = () => {
        const apiUrl = `https://localhost:44312/api/ShipmentsManagement/EditShipmentInfo/${record.shipmentId}`;
        const updatedShipmentList = shipmentsList.map((ship) => {
          if (ship.shipmentId === record.shipmentId) {
            return {
              ...ship,
              status: selectedStatus,
              updatedAt: UseDateReader(Date.now()),
            };
          }
          return ship;
        });

        console.log({ updatedShipmentList });
        axios
          .put(
            apiUrl,
            updatedShipmentList.find(
              (shipment) => shipment?.shipmentId === record.shipmentId
            )
          )
          .then((res) => {
            if (res.data.statusCode === 200) {
              message.success(res.data.statusMessage);
              setShipmentsList(updatedShipmentList);
              popoverCloserFunc();
            } else {
              message.error(res.data.statusMessage);
            }
          });
      };
      function popoverCloserFunc() {
        setSelectedStatus("");
        setPopoverCloser(false);
      }
      const updateShipmentContent = (
        <div className="grid w-80 gap-5">
          <div className="font-semibold text-gray-900 border rounded-md p-2 text-center">
            Update Shipment status from{" "}
            <span className="font-black bg-yellow-400">{record.status}</span> to{" "}
            {"->"}
          </div>
          <div className="flex gap-12">
            <Radio.Group onChange={(e) => radioHandler(e.target.value)}>
              {listOfStatuses.map((status) => {
                return (
                  <div
                    className={`grid border rounded-md p-1 mb-1 ${
                      status.value === "Deliverd"
                        ? "bg-green-500"
                        : status.value === "Refuzed"
                        ? "bg-red-500"
                        : ""
                    }`}
                  >
                    <Radio value={status.value}>
                      <span className="text-white font-bold">
                        {status.label}
                      </span>
                    </Radio>
                  </div>
                );
              })}
            </Radio.Group>
            <div
              className={`text-center ${
                selectedStatus === "Deliverd"
                  ? "bg-green-500"
                  : selectedStatus === "Refuzed"
                  ? "bg-red-500"
                  : ""
              }`}
            >
              {selectedStatus !== ""
                ? `Confirm shipments status to ${selectedStatus}`
                : "Select a status to update"}
            </div>
          </div>
          <div className="font-semibold text-gray-900 border rounded-md p-2 flex justify-between">
            <Tag
              icon={<CloseCircleOutlined />}
              className="cursor-pointer"
              color="#f50"
              onClick={popoverCloserFunc}
            >
              Close
            </Tag>
            {selectedStatus !== "" ? (
              <Tag
                icon={<CheckCircleOutlined />}
                className="cursor-pointer"
                color="#87d068"
                onClick={handleSubmit}
              >
                Update
              </Tag>
            ) : (
              <Tag
                icon={<CheckCircleOutlined />}
                className="cursor-not-allowed"
                color=""
              >
                Update
              </Tag>
            )}
          </div>
        </div>
      );
      return (
        <div style={{ display: "flex", gap: "10px" }}>
          <a>
            <Popover
              trigger={"click"}
              content={updateShipmentContent}
              placement="left"
              open={popoverCloser === record.shipmentId}
            >
              <DirectionsRunIcon
                color="primary"
                onClick={() => {
                  setPopoverCloser(record.shipmentId);
                }}
              />
            </Popover>
          </a>
        </div>
      );
    },
  },
];
export default getColumnDefs;

import { Popover, Radio, Select, Tag, Tooltip, message } from "antd";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import CreditCardOffIcon from "@mui/icons-material/CreditCardOff";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import axios from "axios";

const getColumnDefs = ({
  employeeList,
  filteredCouriers,
  setFilteredCouriers,
  selectedTag,
  setSelectedTag,
  setShipmentsList,
  shipmentsList,
  idToEdit,
  setIdToEdit,
  popoverCloser,
  setPopoverCloser,
  sendNotification,
  notesList,
  setNoteModal,
  setViewNotes,
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
    title: "Is paid",
    dataIndex: "",
    key: "",
    align: "center",
    render: (_, record) => {
      return record.isPaid ? (
        <img
          title="View Payment"
          src="https://eds-ks.com/wp-content/themes/kichu/images/paid.png"
        />
      ) : (
        <>
          <CreditCardOffIcon /> not paid
        </>
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
    render: (_, record) => {
      const specificShipmentId = record.shipmentId;

      const findedNotes = notesList?.filter(
        ({ shipmentId: listOfNotesId }) => listOfNotesId === specificShipmentId
      );
      return (
        <div
          className="cursor-pointer"
          onClick={() => setViewNotes(record.shipmentId)}
        >
          {findedNotes?.length}
        </div>
      );
    },
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
      let getEmployeeDetails = employeeList.map(({ address, fullName }) => ({
        address,
        fullName,
      }));
      const radioHandler = (value) => {
        const filterCouriers = employeeList.filter(
          ({ address }) => address === value
        );
        setFilteredCouriers(filterCouriers);
      };

      const handleTagChange = (value) => {
        const { address, phoneNumber, fullName, employeeId } = value;
        setSelectedTag({
          address,
          phoneNumber,
          fullName,
          employeeId,
        });
      };

      const handleSubmit = () => {
        const apiUrl = `https://localhost:44312/api/ShipmentsManagement/EditShipmentInfo/${idToEdit}`;
        const updatedShipmentList = shipmentsList.map((ship) => {
          if (ship.shipmentId === idToEdit) {
            return {
              ...ship,
              status: "In Delivry",
              inWith: `${selectedTag.fullName} ${selectedTag.phoneNumber}`,
              shipAssignedTo: selectedTag.employeeId,
            };
          }
          return ship;
        });

        axios
          .put(
            apiUrl,
            updatedShipmentList.find(
              (shipment) => shipment?.shipmentId === idToEdit
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

        sendNotification({
          notificationToShowIn: "Client",
          notificationDescription: "Shipment is send for delivry...",
          notificationsDeatils: record.shipmentId,
          notificationToSendTo: record.userId,
        });
      };
      function popoverCloserFunc() {
        setPopoverCloser(false);
        setFilteredCouriers([]);
        setIdToEdit(false);
        setSelectedTag({});
        getEmployeeDetails = [];
      }
      const updateShipmentContent = (
        <div className="grid w-80 gap-5">
          <div className="font-semibold text-gray-900 border rounded-md p-2 text-center">
            Assign Shipment to with city {record.city} to {"->"}
          </div>
          <div className="flex justify-between">
            <Radio.Group onChange={(e) => radioHandler(e.target.value)}>
              {getEmployeeDetails.map((emp) => {
                return (
                  <div className="grid border rounded-md p-1 mb-1">
                    <Radio value={emp?.address}>{emp?.address}</Radio>
                  </div>
                );
              })}
            </Radio.Group>
            <div>
              {filteredCouriers.length !== 0 &&
                filteredCouriers.map((emp) => {
                  const isActive =
                    emp.fullName === selectedTag?.fullName ? true : false;
                  return (
                    <Tag
                      color={isActive ? "#108ee9" : ""}
                      className="cursor-pointer"
                      onClick={() => handleTagChange(emp)}
                    >
                      {emp?.fullName}
                    </Tag>
                  );
                })}
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
            {Object.values(selectedTag).length !== 0 ? (
              <Tag
                icon={<CheckCircleOutlined />}
                className="cursor-pointer"
                color="#87d068"
                onClick={handleSubmit}
              >
                Asign
              </Tag>
            ) : (
              <Tag
                icon={<CheckCircleOutlined />}
                className="cursor-not-allowed"
                color=""
              >
                Asign
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
                  setIdToEdit(record?.shipmentId);
                  setPopoverCloser(record.shipmentId);
                }}
              />
            </Popover>
          </a>
          <a>
            <Tooltip title="Add Note">
              <NoteAltIcon
                color="info"
                onClick={() => setNoteModal(record.shipmentId)}
              />
            </Tooltip>
          </a>
        </div>
      );
    },
  },
];
export default getColumnDefs;

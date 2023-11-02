import { Table } from "antd";
import BasePage from "../../BasePage/BasePage";
import { AppContext } from "../../context/appcontext";
import { useContext, useState } from "react";
import getColumnDefs from "./getColumnDefs";
import { useDocumentTile } from "../../hooks/useDocumentTile";

const MyShipments = () => {
  useDocumentTile({ title: "My Shipments | Courier | KSD" });

  const { shipmentsList, setShipmentsList } = useContext(AppContext);
  const { currentUserLoggedIn } = useContext(AppContext);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [popoverCloser, setPopoverCloser] = useState(false);
  const myShipments = shipmentsList.filter(
    ({ shipAssignedTo }) => shipAssignedTo === currentUserLoggedIn?.employeeId
  );
  console.log({ myShipments });
  return (
    <BasePage preNavName={"My Shipments"}>
      <Table
        bordered
        columns={getColumnDefs({
          selectedStatus,
          setSelectedStatus,
          popoverCloser,
          setPopoverCloser,
          shipmentsList,
          setShipmentsList,
        })}
        dataSource={myShipments}
      />
    </BasePage>
  );
};

export default MyShipments;

import { Table } from "antd";
import BasePage from "../../BasePage/BasePage";
import { useContext, useState } from "react";
import { AppContext } from "../../context/appcontext";
import getColumnDefs from "./getColumnDefs";
import { useDocumentTile } from "../../hooks/useDocumentTile";
import useSendNotification from "../../hooks/useSendNotification";

const UpdateShipments = () => {
  useDocumentTile({ title: "Update Shipments | ADMINISTRATE | KSD" });

  const { shipmentsList, setShipmentsList } = useContext(AppContext);
  const { employeeList } = useContext(AppContext);
  const [filteredCouriers, setFilteredCouriers] = useState([]);
  const [selectedTag, setSelectedTag] = useState({});
  const [idToEdit, setIdToEdit] = useState(false);
  const [popoverCloser, setPopoverCloser] = useState(false);
  const sendNotification = useSendNotification();
  return (
    <BasePage preNavName={"Update Shipments"}>
      <Table
        bordered
        dataSource={shipmentsList}
        columns={getColumnDefs({
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
        })}
      />
    </BasePage>
  );
};

export default UpdateShipments;

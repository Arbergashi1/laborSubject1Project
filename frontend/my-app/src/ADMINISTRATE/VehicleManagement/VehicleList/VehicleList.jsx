import { Table, message } from "antd";
import BasePage from "../../../BasePage/BasePage";
import getColumnDefs from "./getColumnDefs";
import { useContext, useState } from "react";
import { AppContext } from "../../../context/appcontext";
import Card from "../../../reusable/Card/Card";
import EditModal from "./EditModal";
import { UseDateReader } from "../../../hooks/UseDateReader";
import axios from "axios";
import { useDocumentTile } from "../../../hooks/useDocumentTile";

const VehicleList = () => {
  useDocumentTile({ title: "Vehicle List | ADMINISTRATE | KSD" });

  const { vehicleList, setVehicleList } = useContext(AppContext);
  const [idToEdit, setIdToEdit] = useState(false);
  const [editedData, setEditedData] = useState({});

  const paginationOptions = {
    pageSize: 6,
  };

  const handleEdit = () => {
    const editObject = {
      ...editedData,
      updatedAt: UseDateReader(Date.now()),
    };

    const apiUrl = `https://localhost:44312/api/VehicleManagement/EditVehicleInfo/${editedData.vehicleId}`;
    axios.put(apiUrl, editObject).then((res) => {
      if (res.data.statusCode === 200) {
        message.success(res.data.statusMessage);
        setEditedData(editObject);
        setVehicleList((prev) =>
          prev.map((vehicle) =>
            vehicle.vehicleId === editedData.vehicleId
              ? { ...vehicle, ...editObject }
              : vehicle
          )
        );
        setIdToEdit(false);
      } else {
        message.error(res.data.statusMessage);
      }
    });
  };

  return (
    <BasePage preNavName="Vehicle List">
      <div style={{ display: "grid", gap: "20px" }}>
        <div
          style={{
            display: "flex",
            gap: "15px",
            padding: "10px",
            borderRadius: "20px",
            boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
            backgroundColor: "white",
          }}
        >
          <Card
            background={"blueViolet"}
            string={"All Vehicles"}
            number={vehicleList.length}
          />
        </div>
        <Table
          columns={getColumnDefs({
            setVehicleList,
            setIdToEdit,
            setEditedData,
          })}
          dataSource={vehicleList}
          pagination={paginationOptions}
          className={`shipmentsListTable`}
        />
      </div>
      <EditModal
        {...{ idToEdit, setIdToEdit, handleEdit, editedData, setEditedData }}
      />
    </BasePage>
  );
};

export default VehicleList;

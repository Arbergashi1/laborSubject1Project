import React, { useContext, useState } from "react";
import BasePage from "../../../BasePage/BasePage";
import Form from "../../../reusable/Form/Form";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import { UseDateReader } from "../../../hooks/UseDateReader";
import { AppContext } from "../../../context/appcontext";
import { useDocumentTile } from "../../../hooks/useDocumentTile";

const NewVehicle = () => {
  const [vehicleObject, setVehicleObject] = useState({});
  const { setVehicleList } = useContext(AppContext);
  useDocumentTile({ title: "New Vehicle | ADMINISTRATE | KSD" });

  const navigate = useNavigate();

  const spanTitleLeftSide = {
    "Vehicle Info": [
      {
        title: "Vehicle Model",
        placeholder: "Vehicle Model...",
        field: "vehicleModel",
      },
      {
        title: "Vehicle Year",
        placeholder: "Vehicle Year...",
        field: "vehicleYear",
      },
      {
        title: "Vehicle Make",
        placeholder: "Vehicle Make...",
        field: "vehicleMake",
      },
      {
        title: "Vehicle Mileage",
        placeholder: "Vehicle Mileage...",
        field: "vehicleMileage",
      },
      {
        title: "Vehicle DriverId",
        placeholder: "Vehicle DriverId...",
        field: "vehicleDriverId",
      },
      {
        title: "Vehicle DriverName",
        placeholder: "Vehicle DriverName...",
        field: "vehicleDriverName",
      },
    ],
  };

  const handleInputChange = (section, field, value) => {
    const updatedVehicleObject = { ...vehicleObject };
    updatedVehicleObject[field] = value;

    setVehicleObject(updatedVehicleObject);
  };

  const handleAddVehicle = () => {
    const bodyObject = {
      ...vehicleObject,
      vehicleId: uuidv4(),
      createdAt: UseDateReader(Date.now()),
      updatedAt: UseDateReader(Date.now()),
    };
    const apiUrl =
      "https://localhost:44312/api/VehicleManagement/CreateNewVehicle";
    axios.post(apiUrl, bodyObject).then((res) => {
      if (res.data.statusCode === 200) {
        message.success(res.data.statusMessage);
        setVehicleList((prev) => [bodyObject, ...prev]);
        navigate("/vehicleList");
      } else {
        message.error(res.data.statusMessage);
      }
    });
  };
  return (
    <BasePage preNavName="New Vehicle">
      <div>
        <Form
          onChange={handleInputChange}
          inputStructure={spanTitleLeftSide}
          clickEvent={handleAddVehicle}
          createButtonText="Add Vehicle"
          goBackButtonClick={() => navigate("/vehicleList")}
        />
      </div>
    </BasePage>
  );
};

export default NewVehicle;

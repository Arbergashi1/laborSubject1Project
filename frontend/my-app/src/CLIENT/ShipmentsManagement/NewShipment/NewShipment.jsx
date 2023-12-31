import BasePage from "../../../BasePage/BasePage";
import "./NewShipment.scss";
import Form from "../../../reusable/Form/Form";
import { useContext, useState } from "react";
import { AppContext } from "../../../context/appcontext";
import { UseDateReader } from "../../../hooks/UseDateReader";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import useSaveLogs from "../../../hooks/UseSaveLogs";
import { kosovo_cities } from "../../../reusable/exportedListOfCities";
import { useDocumentTile } from "../../../hooks/useDocumentTile";

const NewShipment = () => {
  useDocumentTile({ title: "Add New Shipment | KSD" });
  const [validation, setValidation] = useState(false);
  const navigate = useNavigate();
  const { currentUserLoggedIn } = useContext(AppContext);
  const { setShipmentsList } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const saveLogs = useSaveLogs();

  const [newShipmentObject, setNewShipmentObject] = useState({});

  const spanTitleLeftSide = {
    "Sender Info": [
      {
        title: "Name",
        placeholder: "Name here...",
        initialValue: currentUserLoggedIn?.firmName,
      },
      {
        title: "Phone",
        placeholder: "Phone here...",
        initialValue: currentUserLoggedIn?.phoneNumber,
      },
      {
        title: "Address",
        placeholder: "Address here..",
        initialValue: currentUserLoggedIn?.address,
      },
      {
        title: "city",
        placeholder: "City here...",
        initialValue: currentUserLoggedIn?.state,
      },
    ],
    "Reciver Info": [
      { title: "Name", placeholder: "Name here...", field: "name" },
      {
        title: "Country",
        placeholder: "Country here...",
        field: "country",
        type: "select",
        options: [
          { field: "", label: "Select a country" },
          { field: "kosova", label: "Kosova" },
          { field: "albania", label: "Albania" },
          { field: "maqedonia", label: "Maqedonia" },
        ],
      },
      {
        title: "City",
        placeholder: "City here..",
        field: "city",
        type: "select",
        options: kosovo_cities,
      },
      { title: "Address", placeholder: "Address here...", field: "address" },
      { title: "Phone", placeholder: "Phone here...", field: "phone" },
      {
        title: "Reference",
        placeholder: "Reference here...",
        field: "reference",
      },
      {
        title: "A lejohet Hapja",
        placeholder: "",
        field: "doYouLetOpen",
        type: "select",
        options: [
          { field: "selectOption", label: "Select Option" },
          { field: "yes", label: "Yes" },
          { field: "no", label: "No" },
        ],
      },
      {
        title: "Special instructions",
        placeholder: "Special instructions here...",
        field: "specialInstructions",
        type: "area",
      },
    ],
  };

  const handleInputChange = (section, field, value) => {
    const updatedShipmentObject = { ...newShipmentObject };
    updatedShipmentObject[field] = value;
    setNewShipmentObject(updatedShipmentObject);
  };

  const handleAddNewShipment = () => {
    setLoading(true);
    const bodyObject = {
      ...newShipmentObject,
      shipmentId: uuidv4(),
      createdAt: UseDateReader(Date.now()),
      updatedAt: UseDateReader(Date.now()),
      userId: currentUserLoggedIn?.clientId,
      status: "Awaiting Pickup",
      notes: false,
      inWith: "",
      isPaid: false,
    };
    const apiUrl =
      "https://localhost:44312/api/ShipmentsManagement/CreateNewShipment";
    axios.post(apiUrl, bodyObject).then((res) => {
      if (res.data.statusCode === 200) {
        setLoading(false);
        message.success(res.data.statusMessage);
        setShipmentsList((prev) => [bodyObject, ...prev]);
        navigate("/");
        saveLogs({
          actionType: "Create",
          previousData: "",
          updatedData: bodyObject.shipmentId,
        });
      } else {
        setLoading(false);
        setValidation(res.data.statusCode);
      }
    });
  };

  return (
    <BasePage preNavName={"Add New Shipment"}>
      <Form
        inputStructure={spanTitleLeftSide}
        onChange={handleInputChange}
        clickEvent={handleAddNewShipment}
        loading={loading}
        validation={validation}
        setValidation={setValidation}
      />
    </BasePage>
  );
};

export default NewShipment;

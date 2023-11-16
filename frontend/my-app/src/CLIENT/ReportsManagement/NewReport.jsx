import React, { useContext, useState } from "react";
import BasePage from "../../BasePage/BasePage";
import Form from "../../reusable/Form/Form";
import { H1 } from "../../reusable/hTags/HTags";
import { AppContext } from "../../context/appcontext";
import { UseDateReader } from "../../hooks/UseDateReader";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { message } from "antd";
import axios from "axios";
import useSendNotification from "../../hooks/useSendNotification";

const NewReport = () => {
  const navigate = useNavigate();
  const { currentUserLoggedIn } = useContext(AppContext);
  const { setReportsList } = useContext(AppContext);
  const [selectedTypeOfReport, setSelectedTypeOfReport] = useState(null);
  const [fieldsToShow, setFieldsToShow] = useState([]);
  const [reportsObject, setReportsObject] = useState({});
  const [loading, setLoading] = useState(false);
  const sendNotification = useSendNotification();

  const reportTypes = [
    { reportType: "Delays in shipments", reportIcon: "🚚" },
    { reportType: "Courier not answering the phone", reportIcon: "📞" },
    { reportType: "Damaged goods upon delivery", reportIcon: "📦" },
    { reportType: "Missing items in the shipment", reportIcon: "❌" },
  ];

  const spanTitleLeftSide = {
    "Delays in shipments": [
      {
        title: "Period Of Delay",
        placeholder: "Period Of Delay...",
        field: "periodOfDelay",
        type: "select",
        options: [
          { field: "selectOption", label: "Select Option" },
          { field: "1", label: "1 Day" },
          { field: "2", label: "2 Days" },
          { field: "3", label: "3 Day" },
          { field: "4", label: "4 Days" },
          { field: "5", label: "5 Day" },
          { field: "6", label: "6 Days" },
          { field: "7", label: "More than one week" },
        ],
      },
      {
        title: "Shipment Id",
        placeholder: "Shipment Id here...",
        field: "shipmentId",
      },
    ],
    "Courier not answering the phone": [
      {
        title: "Courier Name",
        placeholder: "Courier Name here...",
        field: "courierName",
      },
      {
        title: "Reason of call",
        placeholder: "Reason of call...",
        field: "reasonofcall",
      },
    ],
    "Missing items in the shipment": [
      {
        title: "Type Of Product",
        placeholder: "Type Of Product here...",
        field: "typeOfProduct",
      },
      {
        title: "Shipment Id",
        placeholder: "Shipment id here...",
        field: "shipmentId",
      },
    ],
    "Damaged goods upon delivery": [
      {
        title: "Type Of Product",
        placeholder: "Type Of Product here...",
        field: "typeOfProduct",
      },
      {
        title: "Shipment Id",
        placeholder: "Shipment id here...",
        field: "shipmentId",
      },
    ],
  };

  const onHandleReport = (rep) => {
    setSelectedTypeOfReport(rep.reportType);
    const test = { [rep.reportType]: spanTitleLeftSide[rep.reportType] };
    setFieldsToShow(test);
  };

  const handleInputChange = (section, field, value) => {
    const updatedShipmentObject = { ...reportsObject };
    updatedShipmentObject[field] = value;
    setReportsObject(updatedShipmentObject);
  };

  const handleAddNewReport = () => {
    setLoading(true);
    const apiUrl =
      "https://localhost:44312/api/ReportsManagement/CreateNewReport";
    const bodyObject = {
      ...reportsObject,
      createdAt: UseDateReader(Date.now()),
      updatedAt: UseDateReader(Date.now()),
      userId: currentUserLoggedIn?.clientId,
      statusOfReport: "In Review",
      reportCategory: selectedTypeOfReport,
      reportResponse: "",
      reportId: uuidv4(),
    };
    axios.post(apiUrl, bodyObject).then((res) => {
      if (res.data.statusCode === 200) {
        setLoading(false);
        navigate("/reporstList");
        setReportsList((prev) => [...prev, bodyObject]);
        message.success(res.data.statusMessage);
        sendNotification({
          notificationToShowIn: "Administrate",
          notificationDescription: bodyObject.reportCategory,
          notificationsDeatils: `/reportsManagement`,
          notificationToSendTo: "f5aaa522-d9fa-4d8a-a2b5-1e7f24990350",
        });
      } else {
        message.success(res.data.statusMessage);
      }
    });
  };

  return (
    <BasePage preNavName={"New Report"}>
      {selectedTypeOfReport === null && (
        <div className="flex flex-col items-center justify-center h-5/6 rounded-lg bg-white p-3">
          <h1 className="text-4xl font-bold mb-6 ">
            Please select the type of report to continue
          </h1>
          <div className="flex gap-2 m-10 border ">
            {reportTypes.map((rep, index) => (
              <button
                onClick={() => onHandleReport(rep)}
                key={index}
                className="mondayButtonBlue"
              >
                {rep.reportType} <span>{rep.reportIcon}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedTypeOfReport !== null && (
        <div className="flex justify-around border rounded-lg bg-white p-3">
          <div className="">
            <H1>
              You have selected{" "}
              <span className="text-yellow-600">{selectedTypeOfReport}</span>
            </H1>
            <p className="text-gray-800">
              Please Fill this form for us to check what is the problem
            </p>
          </div>

          <Form
            createButtonText={"Proccess Report"}
            inputStructure={fieldsToShow}
            goBackButtonClick={() => {
              setSelectedTypeOfReport(null);
            }}
            onChange={handleInputChange}
            clickEvent={handleAddNewReport}
            loading={loading}
          />
        </div>
      )}
    </BasePage>
  );
};

export default NewReport;

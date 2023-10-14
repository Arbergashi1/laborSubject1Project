import { useLocation } from "react-router-dom";
import BasePage from "../../../BasePage/BasePage";
import "./ClientDetails.scss";
import AdvancedCard from "../../../reusable/AdvancedCard/AdvancedCard";
import { AppContext } from "../../../context/appcontext";
import { useContext } from "react";
import Card from "../../../reusable/Card/Card";

const ClientDetails = () => {
  const location = useLocation();
  const { record } = location.state;
  const { shipmentsList } = useContext(AppContext);
  console.log({ shipmentsList });
  console.log({ record });

  const shipmentsFilterByStatus = shipmentsList.filter(
    ({ status }) => status === "Deliverd"
  );

  const shipmentFilteredByUser = shipmentsFilterByStatus.filter(
    ({ userId }) => userId === record.clientId
  );
  console.log();

  return (
    <BasePage preNavName={"Client Details"}>
      <div
        style={{
          display: "flex",
          gap: "15px",
          padding: "10px",
          borderRadius: "20px",
          boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Card
          background={"#004cff"}
          string={"Awaiting Pickup"}
          number={
            shipmentsList.filter(
              ({ status, userId }) =>
                status === "Awaiting Pickup" && userId === record.clientId
            ).length
          }
        />
        <Card
          background={"#efe770"}
          string={"In Delivry"}
          number={
            shipmentsList.filter(
              ({ status, userId }) =>
                status === "In Delivry" && userId === record.clientId
            ).length
          }
        />
        <Card
          background={"#0dff00"}
          string={"Deliverd"}
          number={
            shipmentsList.filter(
              ({ status, userId }) =>
                status === "Deliverd" && userId === record.clientId
            ).length
          }
        />
        <Card
          background={"#de0d0d"}
          string={"Refuzed"}
          number={
            shipmentsList.filter(
              ({ status, userId }) =>
                status === "Refuzed" && userId === record.clientId
            ).length
          }
        />
      </div>
      <div
        style={{
          display: "grid",
          gap: "30px",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        <div style={{ width: "100%" }}>
          <span>
            <h3>Details for {record.fullName}</h3>
          </span>
          <div className="clientDetailslWrapper">
            {Object.keys(record).map((detail) => {
              const details = record[detail];
              return (
                <div className="clientDetailsTable">
                  <div>{detail}:</div>
                  <div>{details}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ width: "100%" }}>
          <span>
            <h3>Insights for {record.fullName}</h3>
          </span>
          <AdvancedCard
            welcomeText={`You are watching details for, ${record.fullName}!`}
            tooltip={record.fullName}
            avatar={record.fullName[0]}
            chargeOfDelivry={shipmentFilteredByUser}
            totalEarnings={shipmentFilteredByUser}
          />
        </div>
      </div>
    </BasePage>
  );
};

export default ClientDetails;

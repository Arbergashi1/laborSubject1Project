import { useLocation } from "react-router-dom";
import BasePage from "../../../BasePage/BasePage";
import "./ClientDetails.scss";
import AdvancedCard from "../../../reusable/AdvancedCard/AdvancedCard";
import { AppContext } from "../../../context/appcontext";
import { useContext, useState } from "react";
import Card from "../../../reusable/Card/Card";
import { Switch } from "antd";
import { H1 } from "../../../reusable/hTags/HTags";
import ProcessPayment from "./ProcessPayment";

const ClientDetails = () => {
  const location = useLocation();
  const { record } = location.state;
  const { shipmentsList, setShipmentsList, currentUserLoggedIn } =
    useContext(AppContext);

  const shipmentsFilterByStatus = shipmentsList.filter(
    ({ status }) => status === "Deliverd"
  );

  const shipmentFilteredByUser = shipmentsFilterByStatus.filter(
    ({ userId }) => userId === record.clientId
  );

  const [schitchPeriod, setSchitchPeriod] = useState(false);

  return (
    <BasePage preNavName={"Client Details"}>
      <div
        style={{
          marginBottom: "15px",
        }}
      >
        <ProcessPayment
          {...{
            record,
            shipmentFilteredByUser,
            setShipmentsList,
            shipmentsList,
            currentUserLoggedIn,
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 20px 0",
          borderRadius: "20px",
          boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
          marginBottom: "15px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <H1>{schitchPeriod ? "All Time Stats" : "Today Stats"}</H1>
          <span>
            <Switch
              onClick={() => setSchitchPeriod(!schitchPeriod)}
              eq
              az
              unCheckedChildren="Click to change cards to all time dgrfv az67890-stats"
              checkedChildren="Click to change cards to Today stats"
            />
          </span>
        </div>
      </div>
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
          number={shipmentsList.filter(
            ({ status, userId }) =>
              status === "Awaiting Pickup" && userId === record.clientId
          )}
          timeFiltering={schitchPeriod}
        />
        <Card
          background={"#efe770"}
          string={"In Delivry"}
          number={shipmentsList.filter(
            ({ status, userId }) =>
              status === "In Delivry" && userId === record.clientId
          )}
          timeFiltering={schitchPeriod}
        />
        <Card
          background={"#0dff00"}
          string={"Deliverd"}
          number={shipmentsList.filter(
            ({ status, userId }) =>
              status === "Deliverd" && userId === record.clientId
          )}
          timeFiltering={schitchPeriod}
        />
        <Card
          background={"#de0d0d"}
          string={"Refuzed"}
          number={shipmentsList.filter(
            ({ status, userId }) =>
              status === "Refuzed" && userId === record.clientId
          )}
          timeFiltering={schitchPeriod}
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
            <H1>Details for {record.fullName}</H1>
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
            <H1>TODAY Insights for {record.fullName}</H1>
          </span>
          <AdvancedCard
            welcomeText={`You are watching details for, ${record.fullName}!`}
            tooltip={record.fullName}
            avatar={record.fullName[0]}
            chargeOfDelivry={shipmentFilteredByUser}
            totalEarnings={shipmentFilteredByUser}
            spanText={"Today Earnings"}
          />
        </div>
        <div style={{ width: "100%" }}>
          <span>
            <H1>ALL TIME Insights for {record.fullName}</H1>
          </span>
          <AdvancedCard
            welcomeText={`You are watching details for, ${record.fullName}!`}
            tooltip={record.fullName}
            avatar={record.fullName[0]}
            chargeOfDelivry={shipmentFilteredByUser}
            totalEarnings={shipmentFilteredByUser}
            spanText={"All time earnings"}
          />
        </div>
      </div>
    </BasePage>
  );
};

export default ClientDetails;

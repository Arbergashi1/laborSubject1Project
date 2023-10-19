import { useContext, useState } from "react";
import BasePage from "../../BasePage/BasePage";
import { AppContext } from "../../context/appcontext";
import Card from "../../reusable/Card/Card";
import AdvancedCard from "../../reusable/AdvancedCard/AdvancedCard";
import { Switch } from "antd";
import { H1 } from "../../reusable/hTags/HTags";

const Inisgts = () => {
  const { preferences } = useContext(AppContext);
  const chargeOfDelivry = preferences.filter(
    ({ status }) => status === "Deliverd"
  );
  const [schitchPeriod, setSchitchPeriod] = useState(false);
  console.log({ schitchPeriod });

  return (
    <BasePage preNavName={"Insights"}>
      <div style={{ display: "grid", gap: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 20px 0",
            borderRadius: "20px",
            boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
            background: "white",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <H1>{schitchPeriod ? "All Time Stats" : "Today Stats"}</H1>
            <span>
              <Switch
                onClick={() => setSchitchPeriod(!schitchPeriod)}
                unCheckedChildren="Click to change cards to all time stats"
                checkedChildren="Click to change cards to Today stats"
              />
            </span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: "30px",
            padding: "10px",
            borderRadius: "20px",
            boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
            backgroundColor: "white",
          }}
        >
          <Card
            string="Awaiting Pickup"
            number={preferences.filter(
              ({ status }) => status === "Awaiting Pickup"
            )}
            background={"#004cff"}
            timeFiltering={schitchPeriod}
          />
          <Card
            string="In Delivry"
            number={preferences.filter(({ status }) => status === "In Delivry")}
            background={"#efe770"}
            timeFiltering={schitchPeriod}
          />
          <Card
            string="Deliverd"
            number={preferences.filter(({ status }) => status === "Deliverd")}
            background={"#0dff00"}
            timeFiltering={schitchPeriod}
          />
          <Card
            string="Refuzed"
            number={preferences.filter(({ status }) => status === "Refuzed")}
            background={"#de0d0d"}
            timeFiltering={schitchPeriod}
          />
        </div>

        <div style={{ display: "flex", gap: "20px" }}>
          <div style={{ width: "50%" }}>
            <AdvancedCard
              totalEarnings={preferences}
              chargeOfDelivry={chargeOfDelivry}
              spanText={"Today Earnings"}
            />
          </div>
          <div style={{ width: "50%" }}>
            <AdvancedCard
              totalEarnings={preferences}
              chargeOfDelivry={chargeOfDelivry}
              spanText={"All time earnings"}
            />
          </div>
        </div>
      </div>
    </BasePage>
  );
};

export default Inisgts;

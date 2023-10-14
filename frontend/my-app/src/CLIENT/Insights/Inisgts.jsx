import { useContext } from "react";
import BasePage from "../../BasePage/BasePage";
import { AppContext } from "../../context/appcontext";
import Card from "../../reusable/Card/Card";
import { Progress } from "antd";
import AdvancedCard from "../../reusable/AdvancedCard/AdvancedCard";

const Inisgts = () => {
  const { preferences } = useContext(AppContext);
  const totalSum = preferences
    .filter(({ status }) => status === "Deliverd")
    .reduce((sum, item) => sum + Number(item.reference), 0);
  console.log({ totalSum });

  return (
    <BasePage preNavName={"Insights"}>
      <div style={{ display: "grid", gap: "20px" }}>
        <div
          style={{
            display: "flex",
            gap: "30px",
            padding: "10px",
            borderRadius: "20px",
            boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Card
            string="Awaiting Pickup"
            number={
              preferences.filter(({ status }) => status === "Awaiting Pickup")
                .length
            }
            background={"#004cff"}
          />
          <Card
            string="In Delivry"
            number={
              preferences.filter(({ status }) => status === "In Delivry").length
            }
            background={"#efe770"}
          />
          <Card
            string="Deliverd"
            number={
              preferences.filter(({ status }) => status === "Deliverd").length
            }
            background={"#0dff00"}
          />
          <Card
            string="Refuzed"
            number={
              preferences.filter(({ status }) => status === "Refuzed").length
            }
            background={"#de0d0d"}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 20px 0",
            borderRadius: "20px",
            boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          <h3>Today Earnings</h3>
          {/* <h3>Not paid Earnings</h3> */}
          {/* <h3>All time Earnings</h3> */}
        </div>
        <div style={{ display: "flex", gap: "30px" }}>
          <AdvancedCard number={totalSum} />
          {/* <AdvancedCard loading={true} /> */}
          {/* <AdvancedCard loading={true} /> */}
        </div>
      </div>
    </BasePage>
  );
};

export default Inisgts;

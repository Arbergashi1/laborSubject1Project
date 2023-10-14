import { useContext } from "react";
import { AppContext } from "../../context/appcontext";
import "./AdvancedCard.scss";
import { Avatar, Tooltip } from "antd";
import FadeLoader from "react-spinners/FadeLoader";

const AdvancedCard = ({
  // spanText, welcomeText, avatar, number, loading
  welcomeText,
  tooltip,
  totalEarnings,
  chargeOfDelivry,
  loading,
  avatar,
}) => {
  const { currentUserLoggedIn } = useContext(AppContext);

  const currentDate = new Date();
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  const currentDateString = currentDate.toLocaleString("en-US", options);

  const totalSum = totalEarnings
    .filter(({ status, updatedAt }) => {
      const updatedDate = updatedAt.split(",")[0];
      const currentDatePart = currentDateString.split(",")[0];

      return status === "Deliverd" && updatedDate === currentDatePart;
    })
    .reduce((sum, item) => sum + Number(item.reference), 0);

  const totalChargeForDel = chargeOfDelivry.filter(({ updatedAt, status }) => {
    const updatedDate = updatedAt.split(",")[0];
    const currentDatePart = currentDateString.split(",")[0];
    return status === "Deliverd" && updatedDate === currentDatePart;
  }).length;

  return (
    <>
      <div className="advancedCardWrapper">
        <div className="advancedCardElements">
          <div style={{ display: "grid" }}>
            <span style={{ fontWeight: "600", fontSize: "20px" }}>
              {welcomeText
                ? welcomeText
                : `Hello,${currentUserLoggedIn.fullName}!`}
            </span>
            <span style={{ fontSize: "13px", fontWeight: "400" }}>
              Today Earnings
            </span>
          </div>
          <div>
            <Tooltip title={tooltip ? tooltip : currentUserLoggedIn.fullName}>
              <Avatar
                size={"large"}
                shape="square"
                children={avatar ? avatar : currentUserLoggedIn.fullName[0]}
              />
            </Tooltip>
          </div>
        </div>
        <div className="advancedCardMiddle">
          <div
            style={{
              display: "grid",
              borderRadius: "10px",
              backgroundColor: "#00ff40d3",
            }}
          >
            <span>Total earnings</span>
            <span style={{ fontSize: "25px", fontWeight: "500" }}>
              {totalSum}.00$
            </span>
          </div>
          <div
            style={{
              display: "grid",
              color: "#ffffff",
              backgroundColor: "#d0ff008a",
              borderRadius: "10px",
            }}
          >
            <span>Charge of delivry</span>
            <div>
              <span
                style={{
                  fontSize: "25px",
                  fontWeight: "500",
                }}
              >
                {totalChargeForDel * 2}
                .00$
              </span>{" "}
              <span>for {totalChargeForDel} shipments deliverd</span>
            </div>
          </div>
          <div
            style={{
              display: "grid",
              backgroundColor: "#00ff40d3",
              borderRadius: "10px",
            }}
          >
            <span>Final earnings</span>
            <span style={{ fontSize: "25px", fontWeight: "500" }}>
              {loading ? (
                <FadeLoader color="#000" />
              ) : (
                `${totalSum - totalChargeForDel * 2}.00$`
              )}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvancedCard;

import { useContext } from "react";
import { AppContext } from "../../context/appcontext";
import "./AdvancedCard.scss";
import { Avatar, Tooltip } from "antd";
import FadeLoader from "react-spinners/FadeLoader";

const AdvancedCard = ({ spanText, welcomeText, avatar, number, loading }) => {
  const { currentUserLoggedIn } = useContext(AppContext);
  const { preferences } = useContext(AppContext);
  const lengthOfShipments = preferences.filter(
    ({ status }) => status === "Deliverd"
  ).length;
  return (
    <>
      <div className="advancedCardWrapper">
        <div className="advancedCardElements">
          <div style={{ display: "grid" }}>
            <span style={{ fontWeight: "600", fontSize: "20px" }}>
              Hello, {currentUserLoggedIn.fullName}!
            </span>
            <span style={{ fontSize: "13px", fontWeight: "400" }}>
              Today Earnings
            </span>
          </div>
          <div>
            <Tooltip title={currentUserLoggedIn.fullName}>
              <Avatar
                size={"large"}
                shape="square"
                children={currentUserLoggedIn.fullName[0]}
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
              {number}.00$
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
                {lengthOfShipments * 2}
                .00$
              </span>{" "}
              <span>for {lengthOfShipments} shipments deliverd</span>
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
                `${number - lengthOfShipments * 2}.00$`
              )}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvancedCard;

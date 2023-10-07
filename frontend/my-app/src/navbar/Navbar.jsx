import "./Navbar.scss";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useContext } from "react";
import { AppContext } from "../context/appcontext";
import { Avatar, Tooltip } from "antd";

const Navbar = () => {
  const { currentUserLoggedIn } = useContext(AppContext);

  return (
    <div className="navbar">
      <div style={{ width: "20%" }}>
        <span style={{ color: "white", fontWeight: "600" }}>
          {
            <span
              style={{
                color: "blueviolet",
                fontWeight: "600",
                fontSize: "23px",
              }}
            >
              {currentUserLoggedIn.employeeType || currentUserLoggedIn.userType}
            </span>
          }{" "}
          Dashboard
        </span>
      </div>
      <div className="navbarWrapper">
        <div className="navbarItems">
          <div className="navbarItem">
            <NotificationsNoneIcon />
          </div>
          <div>
            <Tooltip title={currentUserLoggedIn.fullName} placement="left">
              <Avatar
                style={{
                  backgroundColor: "#fde3cf",
                  color: "#f56a00",
                  fontWeight: "600",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
              >
                {currentUserLoggedIn.fullName[0]}
              </Avatar>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import "./Navbar.scss";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useContext, useState } from "react";
import { AppContext } from "../context/appcontext";
import { Avatar, Popover, Tooltip } from "antd";
import NotificationsManagement from "../Notifications/NotificationsManagement";
import Badge from "@mui/material/Badge";
import useSendNotification from "../hooks/useSendNotification";

const Navbar = () => {
  const { notifiactionsList, setNotifiactionsList } = useContext(AppContext);

  const { currentUserLoggedIn } = useContext(AppContext);
  const [openNotifications, setOpenNotifications] = useState(false);

  const notificationsFiltered = notifiactionsList.filter(
    ({ notificationToShowIn, notificationToSendTo }) => {
      return (
        (notificationToShowIn === currentUserLoggedIn?.employeeType &&
          notificationToSendTo === currentUserLoggedIn?.employeeId) ||
        (notificationToShowIn === currentUserLoggedIn?.userType &&
          notificationToSendTo === currentUserLoggedIn?.clientId)
      );
    }
  );

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
              {currentUserLoggedIn?.employeeType ||
                currentUserLoggedIn?.userType}
            </span>
          }{" "}
          Dashboard
        </span>
      </div>
      <div className="navbarWrapper">
        <div className="navbarItems">
          <div className="navbarItem">
            <Badge
              badgeContent={
                notificationsFiltered.filter(({ isRead }) => isRead === false)
                  .length
              }
              color="error"
            >
              <Popover
                overlayInnerStyle={{ backgroundColor: "#fafafa " }}
                open={openNotifications}
                content={
                  <NotificationsManagement
                    {...{
                      notifiactionsList,
                      setNotifiactionsList,
                      notificationsFiltered,
                    }}
                  />
                }
              >
                <NotificationsNoneIcon
                  onClick={() => setOpenNotifications((prev) => !prev)}
                />
              </Popover>
            </Badge>
          </div>
          <div>
            <Tooltip title={currentUserLoggedIn?.fullName} placement="left">
              <Avatar
                style={{
                  backgroundColor: "#fde3cf",
                  color: "#f56a00",
                  fontWeight: "600",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
              >
                {currentUserLoggedIn?.fullName[0]}
              </Avatar>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import { Avatar, Tag, Tooltip, message } from "antd";
import "./NotificationsManagement.scss";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import RemoveDoneIcon from "@mui/icons-material/RemoveDone";
import moment from "moment";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/appcontext";

const NotificationsManagement = ({
  notifiactionsList,
  setNotifiactionsList,
  notificationsFiltered,
}) => {
  const { shipmentsList } = useContext(AppContext);
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);
  const handleDeleteNotification = (notificationObject) => {
    setDeleting(true);
    axios
      .delete(
        `https://localhost:44312/api/NotificationsManagement/DeleteNotification/${notificationObject.notificationId}`
      )
      .then((res) => {
        setDeleting(false);
        const updatedValue = notifiactionsList.filter(
          ({ notificationId }) =>
            notificationId !== notificationObject.notificationId
        );
        setNotifiactionsList(updatedValue);
        message.info(res.data.statusMessage);
      })
      .catch((err) => console.log({ err }));
  };
  const clickNotificationHandler = (notificationObject) => {
    const updatedNotificationObj = notifiactionsList.map((not) => {
      if (not.notificationId === notificationObject.notificationId) {
        return {
          ...not,
          isRead: true,
        };
      }
      return not;
    });

    axios
      .put(
        `https://localhost:44312/api/NotificationsManagement/UpdateNotificationInfo/${notificationObject.notificationId}`,
        {
          isRead: true,
        }
      )
      .then((res) => {
        setNotifiactionsList(updatedNotificationObj);
        console.log(notificationObject.notificationsDeatils);
        // navigate(notificationObject.notificationsDeatils);
        // navigate(`/shipmentDetails/${notificationObject.notificationId}`, {
        //   state: {
        //     record: shipmentsList.find(
        //       ({ shipmentId }) =>
        //         shipmentId === notificationObject.notificationsDeatils
        //     ),
        //   },
        // });
      })
      .catch((err) => console.log({ err }));
  };

  const calculateTimeAgo = (createdAt) => {
    const currentTime = moment();
    const notificationTime = moment(createdAt, "MM/DD/YYYY, h:mm:ss A");
    const duration = moment.duration(currentTime.diff(notificationTime));

    if (duration.asSeconds() < 60) {
      return `${Math.round(duration.asSeconds())} seconds ago`;
    } else if (duration.asMinutes() < 60) {
      return `${Math.round(duration.asMinutes())} minutes ago`;
    } else if (duration.asHours() < 24) {
      return `${Math.round(duration.asHours())} hours ago`;
    } else if (duration.asDays() < 30) {
      return `${Math.round(duration.asDays())} days ago`;
    } else if (duration.asMonths() < 12) {
      return `${Math.round(duration.asMonths())} months ago`;
    } else {
      return `${Math.round(duration.asYears())} years ago`;
    }
  };

  return (
    <div className="notifications">
      <div className="text-center font-semibold text-sm">
        {notificationsFiltered.length !== 0
          ? "Notifications Ceneter"
          : "There are no notifications to show"}
      </div>
      <hr />
      {notificationsFiltered.map((notification) => {
        return (
          <div className="flex items-center">
            <DeleteIcon
              className="cursor-pointer"
              color="error"
              titleAccess="Delete"
              onClick={() => handleDeleteNotification(notification)}
            />
            <div
              onClick={() => clickNotificationHandler(notification)}
              className={`${
                notification.isRead ? "bg-white" : "bg-yellow-100"
              } w-full border p-2 flex gap-2 items-center rounded-md cursor-pointer hover:shadow-md hover:bg-gray-100 transition duration-300 ease-in-out${
                deleting && "cursor-progress bg-slate-400"
              }`}
            >
              <div>
                <Tooltip title={notification.notificaionByUser} color="black">
                  <Avatar
                    size="large"
                    children={notification.notificaionByUser[0]}
                  />
                </Tooltip>
              </div>
              <div className="w-full">
                <div className="font-semibold text-sm">
                  {notification.notificationDescription}
                </div>
                <div className="flex justify-between items-center">
                  <div className="">
                    {calculateTimeAgo(notification.createdAt)}
                  </div>
                  <div>
                    {!notification.isRead ? (
                      <Tag
                        children={"Unread"}
                        color="yellow"
                        icon={<RemoveDoneIcon />}
                      />
                    ) : (
                      <Tag
                        children={"Readed"}
                        color="green"
                        icon={<DoneAllIcon />}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NotificationsManagement;

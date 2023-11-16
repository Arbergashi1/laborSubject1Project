import React, { useContext } from "react";
import { AppContext } from "../context/appcontext";
import { v4 as uuidv4 } from "uuid";
import { UseDateReader } from "./UseDateReader";
import axios from "axios";

const useSendNotification = () => {
  const { setNotifiactionsList, currentUserLoggedIn } = useContext(AppContext);

  const sendNotification = (notification) => {
    const notificationObject = {
      notificationToShowIn: notification.notificationToShowIn,
      notificationId: uuidv4(),
      notificaionByUser: currentUserLoggedIn?.fullName,
      notificationByUserId:
        currentUserLoggedIn?.clientId || currentUserLoggedIn?.employeeId,
      notificationDescription: notification.notificationDescription,
      createdAt: UseDateReader(Date.now()),
      isRead: false,
      notificationsDeatils: notification.notificationsDeatils,
      notificationToSendTo: notification.notificationToSendTo,
    };
    console.log({ notificationObject });

    function notifyUser(notificationText) {
      if (!("Notification" in window)) {
        alert("Brower err");
      } else if (Notification.permission === "granted") {
        const notification = new Notification(notificationText);
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            const notification = new Notification(notificationText);
          }
        });
      }
    }

    axios
      .post(
        "https://localhost:44312/api/NotificationsManagement/CreateNotification",
        notificationObject
      )
      .then((res) => {
        console.log({ res });
        setNotifiactionsList((prev) => [notificationObject, ...prev]);
        notifyUser(notificationObject.notificationDescription);
      })
      .catch((err) => console.log({ err }));
  };
  return sendNotification;
};

export default useSendNotification;

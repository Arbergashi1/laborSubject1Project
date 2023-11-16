import React, { useContext } from "react";
import { H1 } from "../reusable/hTags/HTags";
import { v4 as uuidv4 } from "uuid";
import MondayButton from "../reusable/MondayButton/MondayButton";
import { UseDateReader } from "../hooks/UseDateReader";
import { AppContext } from "../context/appcontext";

const ForgotPasswordView = ({ forgotPassword, userTypeSelected }) => {
  const { notifiactionsList, setNotifiactionsList } = useContext(AppContext);
  const handleSendNotification = () => {
    const bodyOfNotification = {
      notificationId: uuidv4(),
      notificaionByUser: "Arber Gashi",
      notificaionByUserId: "",
      notificationDescription: "requested to change password",
      createdAt: UseDateReader(Date.now()),
      isRead: false,
    };
    setNotifiactionsList((prev) => [...prev, bodyOfNotification]);
  };
  return (
    <>
      {forgotPassword && (
        <>
          <div className="flex flex-col items-center bg-white p-2 border border-gray-primary mb-4 rounded">
            <H1 className="flex justify-center w-full">
              {userTypeSelected} - password issuses
            </H1>
          </div>
          <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
            <div style={{ textAlign: "left" }}>
              By clicking send request button, we will recive a notification and
              will contact you.
            </div>
          </div>
          <div>
            <MondayButton
              className="mondayButtonBlue"
              onClick={handleSendNotification}
            >
              Send Request
            </MondayButton>
          </div>
        </>
      )}
    </>
  );
};

export default ForgotPasswordView;

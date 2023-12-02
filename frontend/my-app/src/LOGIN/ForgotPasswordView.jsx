import useSendNotification from "../hooks/useSendNotification";
import { H1 } from "../reusable/hTags/HTags";
import MondayButton from "../reusable/MondayButton/MondayButton";

const ForgotPasswordView = ({ forgotPassword, userTypeSelected }) => {
  const sendNotification = useSendNotification();

  const handleSendNotification = () => {
    // sendNotification({
    //   notificationToShowIn: "Administrate",
    //   notificationDescription: "Sended Request to change password",
    //   notificationsDeatils: "A",
    //   notificationToSendTo: "Arber",
    // });
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

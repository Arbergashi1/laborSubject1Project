import "./UserTypeLogIn.scss";
import { v4 as uuidv4 } from "uuid";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import BadgeIcon from "@mui/icons-material/Badge";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Alert, Checkbox, Divider, Modal, Steps, message } from "antd";
import { useContext, useState } from "react";
import Login from "../Login";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/appcontext";
import useSaveLogs from "../../hooks/UseSaveLogs";
import MondayButton from "../../reusable/MondayButton/MondayButton";
import { useDocumentTile } from "../../hooks/useDocumentTile";

const UserTypeLogIn = ({}) => {
  useDocumentTile({ title: "Auth | KSD" });

  const { setLoginData } = useContext(AppContext);
  const saveLogs = useSaveLogs();

  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [userTypeSelected, setUserTypeSelected] = useState("");
  const [axiosErr, setAxiosErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginObject, setLoginObject] = useState(
    userTypeSelected === "Client"
      ? {
          email: "",
          clientPassword: "",
        }
      : userTypeSelected === "Administrate" || userTypeSelected === "Employee"
      ? { email: "", employeePassword: "" }
      : ""
  );

  const onHandleUser = (userTypeSelected) => {
    setUserTypeSelected(userTypeSelected.userType);
    setCurrent(1);
  };

  const onHandleLoginObjChange = (e) => {
    setLoginObject({ ...loginObject, [e.target.name]: e.target.value });
  };

  const onHandleLogin = () => {
    setLoading(true);
    const userApiUrl = "https://localhost:44312/api/ClientLogin/ClientLogin";
    const employeeApiUrl =
      "https://localhost:44312/api/EmployeeLogin/EmployeeLogin";

    if (userTypeSelected === "Client") {
      axios
        .post(userApiUrl, loginObject)
        .then((res) => {
          console.log({ res });
          if (res.data.statusCode === 200) {
            setLoading(false);
            message.success(res.data.statusMessage);
            navigate("/");
            setLoginData(res.data.clientManagement);
            sessionStorage.setItem(
              "clientLoggedInId",
              res.data.clientManagement.clientId
            );
          } else {
            message.error(res.data.statusMessage);
            setLoading(false);
          }
        })
        .catch((err) => setAxiosErr(err));
    } else if (
      userTypeSelected === "Employee" ||
      userTypeSelected === "Administrate"
    ) {
      axios
        .post(employeeApiUrl, loginObject)
        .then((res) => {
          if (res.data.statusCode === 200) {
            setLoading(false);
            message.success(res.data.statusMessage);
            if (userTypeSelected === "Employee") {
              navigate("/myShipments");
            } else if (userTypeSelected === "Administrate") {
              navigate("/clientsList");
            }
            setLoginData(res.data.employeeManagement);
            sessionStorage.setItem(
              "empAdmLoggedInId",
              res.data.employeeManagement.employeeId
            );
            saveLogs({
              actionType: "Login",
              previousData: "",
              updatedData: loginObject?.email,
            });
          } else {
            message.error(res.data.statusMessage);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log({ err });
          setAxiosErr(err);
          setLoading(false);
        });
    }
  };

  const stepsHandler = () => [
    {
      title: "Step 1",
      description: "User Type Selection",
    },
    {
      title: "Step 2",
      description: "Fill Your Credetials",
      disabled: current === 0,
    },
  ];

  const usersTypesStrucutre = [
    {
      userTypeId: uuidv4(),
      userType: "Client",
      userTypeIcon: <AssignmentIndIcon fontSize="large" color="info" />,
    },
    {
      userTypeId: uuidv4(),
      userType: "Administrate",
      userTypeIcon: <AdminPanelSettingsIcon fontSize="large" color="info" />,
    },
    {
      userTypeId: uuidv4(),
      userType: "Employee",
      userTypeIcon: <BadgeIcon fontSize="large" color="info" />,
    },
  ];

  return (
    <>
      <div className="loginWrapper">
        <div>
          <Steps
            current={current}
            items={stepsHandler()}
            direction="horizontal"
            onChange={(val) => setCurrent(val)}
          />
        </div>
        <Divider />
        <div className="userTypeLoginWrapper">
          {current === 1 ? (
            <Login
              {...{
                onHandleLoginObjChange,
                userTypeSelected,
                onHandleLogin,
                loginObject,
                loading,
                setLoginData,
              }}
            />
          ) : current === 2 ? (
            <div>
              <span>
                Do you want to remind the user type you chosed and to bring you
                directly to the login page
              </span>
              <span>
                <Checkbox />
              </span>
            </div>
          ) : current === 0 ? (
            <>
              <div className="text">
                Please select the role that you are logged in with
              </div>
              <div className="usersTypesDiv">
                {usersTypesStrucutre.map((user, idx) => {
                  return (
                    <div key={idx} style={{ display: "grid" }}>
                      <span style={{ textAlign: "center" }}>
                        {user.userTypeIcon}
                      </span>
                      <button
                        className="singleUserButton"
                        onClick={() => onHandleUser(user)}
                      >
                        {user.userType}
                      </button>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      {/* error */}
      {axiosErr && (
        <Modal
          open={axiosErr}
          title={
            <div>
              <Alert type="error" showIcon message={axiosErr.message} />
            </div>
          }
          centered
          footer={
            <div>
              <MondayButton
                className="mondayButtonRed"
                onClick={() => setAxiosErr(false)}
              >
                Close
              </MondayButton>
            </div>
          }
          onCancel={() => setAxiosErr(false)}
          maskClosable={true}
        >
          <div className="bg-slate-100">
            <div>
              <Alert
                type="error"
                showIcon
                description={
                  " Sorry, the reason you are seing this is cause we had a network error, try refreshing the page!"
                }
              />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default UserTypeLogIn;

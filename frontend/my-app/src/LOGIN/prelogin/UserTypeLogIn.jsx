import "./UserTypeLogIn.scss";
import { v4 as uuidv4 } from "uuid";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import BadgeIcon from "@mui/icons-material/Badge";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Checkbox, Divider, Steps, message } from "antd";
import { useContext, useState } from "react";
import Login from "../Login";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/appcontext";
const UserTypeLogIn = ({}) => {
  const { setLoginData } = useContext(AppContext);

  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [userTypeSelected, setUserTypeSelected] = useState("");
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
    const userApiUrl = "https://localhost:44312/api/ClientLogin/ClientLogin";
    const employeeApiUrl =
      "https://localhost:44312/api/EmployeeLogin/EmployeeLogin";

    if (userTypeSelected === "Client") {
      axios.post(userApiUrl, loginObject).then((res) => {
        if (res.data.statusCode === 200) {
          message.success(res.data.statusMessage);
          navigate("/");
          setLoginData(res.data.clientManagement);
          sessionStorage.setItem(
            "clientLoggedInId",
            res.data.clientManagement.clientId
          );
        } else {
          message.error(res.data.statusMessage);
        }
      });
    } else if (
      userTypeSelected === "Employee" ||
      userTypeSelected === "Administrate"
    ) {
      axios.post(employeeApiUrl, loginObject).then((res) => {
        console.log({ res });
        console.log({ loginObject });
        console.log({ userTypeSelected });

        if (res.data.statusCode === 200) {
          message.success(res.data.statusMessage);
          navigate("/clientsList");
          setLoginData(res.data.employeeManagement);
          console.log({ res });
          sessionStorage.setItem(
            "empAdmLoggedInId",
            res.data.employeeManagement.employeeId
          );
        } else {
          message.error(res.data.statusMessage);
        }
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
      <div
        style={{
          padding: "20px 20px 96px 20px",
          margin: "10px",
          //   boxShadow: "inset 0 0 10px #a6a6a6",
          boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
          borderRadius: "20px",
        }}
      >
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
    </>
  );
};

export default UserTypeLogIn;

import { Input, message } from "antd";
import { Link } from "react-router-dom";
import { H1 } from "../reusable/hTags/HTags";
import logo from "../reusable/images/iphone-with-profile.jpg";
import MondayButton from "../reusable/MondayButton/MondayButton";
import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import ForgotPasswordView from "./ForgotPasswordView";

const Login = ({
  onHandleLoginObjChange,
  userTypeSelected,
  loading,
  onHandleLogin,
  loginObject,
}) => {
  const [forgotPassword, setForgotPassword] = useState(false);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen justify-center">
      <div className="flex w-2/1">
        <img
          className="h-auto max-w-xs"
          src={logo}
          alt="iPhone with Instagram app"
        />
      </div>
      <div className="flex flex-col w-2/5">
        {forgotPassword && (
          <ForgotPasswordView
            {...{
              forgotPassword,
              userTypeSelected,
            }}
          />
        )}
        {!forgotPassword && (
          <>
            <div className="flex flex-col items-center bg-white p-2 border border-gray-primary mb-4 rounded">
              <H1 className="flex justify-center w-full">
                Login as {userTypeSelected}
              </H1>
            </div>
            {/* <p>Welcome Back</p> */}
            <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
              <div style={{ textAlign: "left" }}>
                <span>Email here</span>
                <Input
                  onChange={(e) => onHandleLoginObjChange(e)}
                  type="email"
                  name="email"
                  placeholder="Type your email here..."
                  className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                />
              </div>
              <div style={{ textAlign: "left", marginBottom: "20px" }}>
                <span>Password</span>
                <Input
                  onChange={(e) => onHandleLoginObjChange(e)}
                  name={
                    userTypeSelected === "Client"
                      ? "clientPassword"
                      : userTypeSelected === "Administrate" ||
                        userTypeSelected === "Employee"
                      ? "employeePassword"
                      : ""
                  }
                  type="password"
                  placeholder="Type your password here..."
                  className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                />
              </div>
              <MondayButton
                className="mondayButtonBlue"
                loading={loading}
                onClick={onHandleLogin}
                disabled={loading || loginObject === ""}
              >
                Login
              </MondayButton>
            </div>
            <div className="flex flex-col items-center bg-white p-2 border border-gray-primary mb-4 rounded">
              <h1 className="flex justify-center w-full">
                {" "}
                <p className="text-sm">
                  Don't remember password?{` `}
                  <Link
                    className="font-bold text-blue-800"
                    onClick={() => setForgotPassword(true)}
                  >
                    Click Here
                  </Link>
                </p>
              </h1>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;

import { Input } from "antd";
import { Link } from "react-router-dom";
import { H1 } from "../reusable/hTags/HTags";

const Login = ({
  onHandleLoginObjChange,
  userTypeSelected,
  onHandleLogin,
  loginObject,
}) => {
  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen justify-center">
      <div className="flex w-2/1">
        <img
          className="h-auto max-w-xs"
          src="/images/iphone-with-profile.jpg"
          alt="iPhone with Instagram app"
        />
      </div>
      <div className="flex flex-col w-2/5">
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
          <button
            style={{ width: "100%", backgroundColor: "#4299e1" }}
            onClick={onHandleLogin}
            disabled={loginObject === ""}
            className={`bg-blue-medium text-white w-full rounded h-8 font-bold cursor-pointer
          ${loginObject === "" && "opacity-50 cursor-not-allowed"}`}
          >
            Login
          </button>
        </div>
        <div className="flex flex-col items-center bg-white p-2 border border-gray-primary mb-4 rounded">
          <h1 className="flex justify-center w-full">
            {" "}
            <p className="text-sm">
              Don't remember password?{` `}
              <Link className="font-bold text-blue-800">Click Here</Link>
            </p>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Login;

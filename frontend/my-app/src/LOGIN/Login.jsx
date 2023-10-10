import { Input } from "antd";
import MondayButton from "../reusable/MondayButton/MondayButton";

const Login = ({
  onHandleLoginObjChange,
  userTypeSelected,
  onHandleLogin,
  loginObject,
  setLoginData,
}) => {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "10px",
        padding: "0 30px 30px",
        boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
      }}
    >
      <h3>Login as {userTypeSelected}</h3>
      <p>Welcome Back</p>
      <div style={{ textAlign: "left" }}>
        <span>Email here</span>
        <Input
          onChange={(e) => onHandleLoginObjChange(e)}
          type="email"
          name="email"
          placeholder="Type your email here..."
          style={{ border: "none", backgroundColor: "#f1f1f1f1" }}
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
          style={{ border: "none", backgroundColor: "#f1f1f1f1" }}
        />
      </div>
      <MondayButton
        style={{ width: "100%" }}
        onClick={onHandleLogin}
        disabled={loginObject === ""}
        className="Blue"
      >
        Login
      </MondayButton>
    </div>
  );
};

export default Login;

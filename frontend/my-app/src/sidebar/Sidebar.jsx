import "./Sidebar.scss";
import {
  administrateSideBarEl,
  employeeSideBarEl,
  sideBarElements,
} from "./utils/sideBarElements";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "./utils/logoOfLab.png";
import { AppContext } from "../context/appcontext";
import { useContext } from "react";
import MondayButton from "../reusable/MondayButton/MondayButton";
import useSaveLogs from "../hooks/UseSaveLogs";

const Sidebar = () => {
  const navigate = useNavigate();
  const saveLogs = useSaveLogs();
  const { currentUserLoggedIn, setCurrentUserLoggedIn } =
    useContext(AppContext);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const logoutHandler = () => {
    navigate("/auth");
    sessionStorage.removeItem("clientLoggedInId");
    sessionStorage.removeItem("empAdmLoggedInId");
    saveLogs({
      actionType: "Logout",
      previousData: "",
      updatedData: currentUserLoggedIn?.email || "",
    });
    if (currentUserLoggedIn !== null) {
      setCurrentUserLoggedIn(null);
    }
  };

  return (
    <div className="sidebar" style={{ position: "fixed", left: 0 }}>
      <div className="top">
        <Link style={{ textDecoration: "none", color: "white" }}>
          <img src={Logo} alt="Logo" className="logo-head" />
        </Link>
      </div>
      {currentUserLoggedIn?.userType === "Client" && (
        <div className="center">
          <ul>
            <p className="title">Shipments Management</p>
            {sideBarElements.slice(0, 2).map((el) => {
              return (
                <>
                  <Link
                    key={el.label}
                    to={el.path}
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                  >
                    <li className={isActive(el.path) ? "active" : ""}>
                      {el.icon}
                      <span
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        {el.label}
                      </span>
                    </li>
                  </Link>
                </>
              );
            })}
          </ul>
          <ul>
            <p className="title">Insights</p>
            {sideBarElements.slice(2, 3).map((el) => {
              return (
                <>
                  <Link
                    key={el.label}
                    to={el.path}
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                  >
                    <li className={isActive(el.path) ? "active" : ""}>
                      {el.icon}
                      <span
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        {el.label}
                      </span>
                    </li>
                  </Link>
                </>
              );
            })}
          </ul>
          <ul>
            <p className="title">Reports Management</p>
            {sideBarElements.slice(3, 5).map((el) => {
              return (
                <>
                  <Link
                    key={el.label}
                    to={el.path}
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                  >
                    <li className={isActive(el.path) ? "active" : ""}>
                      {el.icon}
                      <span
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        {el.label}
                      </span>
                    </li>
                  </Link>
                </>
              );
            })}
          </ul>
          <ul>
            <p className="title">Payments</p>
            {sideBarElements.slice(5).map((el) => {
              return (
                <>
                  <Link
                    key={el.label}
                    to={el.path}
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                  >
                    <li className={isActive(el.path) ? "active" : ""}>
                      {el.icon}
                      <span
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        {el.label}
                      </span>
                    </li>
                  </Link>
                </>
              );
            })}
          </ul>
        </div>
      )}
      {currentUserLoggedIn?.employeeType === "Administrate" && (
        <div className="center">
          <ul>
            <p className="title">Users Management</p>
            {administrateSideBarEl.slice(0, 2).map((el) => {
              return (
                <>
                  <Link
                    key={el.label}
                    to={el.path}
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                  >
                    <li className={isActive(el.path) ? "active" : ""}>
                      {el.icon}
                      <span
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        {el.label}
                      </span>
                    </li>
                  </Link>
                </>
              );
            })}
            <p className="title">Users List</p>
            {administrateSideBarEl.slice(2, 4).map((el) => {
              return (
                <>
                  <Link
                    key={el.label}
                    to={el.path}
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                  >
                    <li className={isActive(el.path) ? "active" : ""}>
                      {el.icon}
                      <span
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        {el.label}
                      </span>
                    </li>
                  </Link>
                </>
              );
            })}
            <p className="title">Vehicle Management</p>
            {administrateSideBarEl.slice(4, 6).map((el) => {
              return (
                <>
                  <Link
                    key={el.label}
                    to={el.path}
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                  >
                    <li className={isActive(el.path) ? "active" : ""}>
                      {el.icon}
                      <span
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        {el.label}
                      </span>
                    </li>
                  </Link>
                </>
              );
            })}
            <p className="title">Logs</p>
            {administrateSideBarEl.slice(6, 7).map((el) => {
              return (
                <>
                  <Link
                    key={el.label}
                    to={el.path}
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                  >
                    <li className={isActive(el.path) ? "active" : ""}>
                      {el.icon}
                      <span
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        {el.label}
                      </span>
                    </li>
                  </Link>
                </>
              );
            })}
            <p className="title">Reports Management</p>
            {administrateSideBarEl.slice(7, 8).map((el) => {
              return (
                <>
                  <Link
                    key={el.label}
                    to={el.path}
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                  >
                    <li className={isActive(el.path) ? "active" : ""}>
                      {el.icon}
                      <span
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        {el.label}
                      </span>
                    </li>
                  </Link>
                </>
              );
            })}
            <p className="title">Shipments Management</p>
            {administrateSideBarEl.slice(8).map((el) => {
              return (
                <>
                  <Link
                    key={el.label}
                    to={el.path}
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                  >
                    <li className={isActive(el.path) ? "active" : ""}>
                      {el.icon}
                      <span
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        {el.label}
                      </span>
                    </li>
                  </Link>
                </>
              );
            })}
          </ul>
        </div>
      )}
      {currentUserLoggedIn?.employeeType === "Employee" && (
        <div className="center">
          <ul>
            <p className="title">Users Management</p>
            {employeeSideBarEl.slice(0, 2).map((el) => {
              return (
                <>
                  <Link
                    key={el.label}
                    to={el.path}
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                  >
                    <li className={isActive(el.path) ? "active" : ""}>
                      {el.icon}
                      <span
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        {el.label}
                      </span>
                    </li>
                  </Link>
                </>
              );
            })}
          </ul>
        </div>
      )}
      <div className="center">
        <ul>
          <p className="title"></p>
          <MondayButton
            style={{ width: "95%", marginBottom: "20px" }}
            onClick={logoutHandler}
            className="mondayButtonRed"
          >
            Logout
          </MondayButton>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

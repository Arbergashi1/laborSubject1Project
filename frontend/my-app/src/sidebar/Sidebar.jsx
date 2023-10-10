import "./Sidebar.scss";
import {
  administrateSideBarEl,
  sideBarElements,
} from "./utils/sideBarElements";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "./utils/logoOfLab.png";
import { AppContext } from "../context/appcontext";
import { useContext } from "react";
import MondayButton from "../reusable/MondayButton/MondayButton";

const Sidebar = () => {
  const navigate = useNavigate();
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
    if (currentUserLoggedIn !== null) {
      setCurrentUserLoggedIn(null);
    }
  };

  return (
    <div className="sidebar" style={{ position: "fixed", left: 0 }}>
      <div className="top">
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
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
          </ul>
        </div>
      )}
      {currentUserLoggedIn?.userType === "Employee" && "h"}
      <div className="center">
        <ul>
          <p className="title"></p>
          <MondayButton
            style={{ width: "95%" }}
            onClick={logoutHandler}
            className="Red"
          >
            Logout
          </MondayButton>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

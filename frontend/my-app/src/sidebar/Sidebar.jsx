import "./Sidebar.scss";
import {
  administrateSideBarEl,
  sideBarElements,
} from "./utils/sideBarElements";
import { Link, useLocation } from "react-router-dom";
import Logo from "./utils/logoOfLab.png";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };
  return (
    <div className="sidebar" style={{ position: "fixed", left: 0 }}>
      <div className="top">
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          <img src={Logo} alt="Logo" className="logo-head" />
        </Link>
      </div>

      {isLoggedIn === "administrate" && (
        <div className="center">
          <ul>
            <p className="title">Users Management</p>
            {administrateSideBarEl.slice(0, 2).map((el) => {
              return (
                <>
                  <Link
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
      {/* <div className="center">
        <ul>
          <p className="title">Main</p>
          {sideBarElements.slice(0, 3).map((item, index) => (
            <a
              key={index}
              to={item.path}
              style={{
                textDecoration: "none",
                color: "white",
              }}
            >
              <li className={isActive(item.path) ? "active" : ""}>
                {item.icon}
                <span
                  style={{
                    cursor: "pointer",
                  }}
                >
                  {item.label}
                </span>
              </li>
            </a>
          ))}
          <p className="title">Logs</p>
          {sideBarElements.slice(3, 6).map((item, index) => (
            <a
              key={index}
              to={item.path}
              style={{ textDecoration: "none", color: "white" }}
            >
              <li className={isActive(item.path) ? "active" : ""}>
                {item.icon}
                <span>{item.label}</span>
              </li>
            </a>
          ))}
          <p className="title">Settings</p>
          {sideBarElements.slice(6, 7).map((item, index) => (
            <a
              key={index}
              to={item.path}
              style={{ textDecoration: "none", color: "white" }}
            >
              <li key={index}>
                {item.icon}
                <span>{item.label}</span>
              </li>
            </a>
          ))}
          <p className="title">Payments</p>
          <li>
            {sideBarElements[7]?.icon}
            <span>{sideBarElements[7]?.label}</span>
          </li>

          <p className="title">Themes</p>
          <div style={{ padding: "7px" }}>
            <div className="bottom">
              <div className="colorOption"></div>
              <div className="colorOption"></div>
            </div>
          </div>
          <Button variant="contained" color="error" style={{ width: "94%" }}>
            Logout
          </Button>
        </ul>
      </div> */}
    </div>
  );
};

export default Sidebar;

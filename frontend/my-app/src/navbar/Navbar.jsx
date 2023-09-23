import "./Navbar.scss";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbarWrapper">
        <div className="navbarItems">
          <div className="navbarItem">
            <NotificationsNoneIcon />
          </div>
          <div className="avatar">
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

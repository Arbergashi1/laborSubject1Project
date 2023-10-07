import "./App.scss";
import Dashboard from "./Dashboard/Dashboard";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import NewEmployee from "./ADMINISTRATE/EmplyeeManagement/NewEmployee";
import NewClient from "./ADMINISTRATE/ClientsManagement/newclient/NewClient";
import ClientsList from "./ADMINISTRATE/ClientsManagement/ListOfClients/ClientsList";
import EmployeeList from "./ADMINISTRATE/EmplyeeManagement/EmployeeList";
import { useContext } from "react";
import { AppContext } from "./context/appcontext";
import UserTypeLogIn from "./LOGIN/prelogin/UserTypeLogIn";

function App() {
  const { currentUserLoggedIn } = useContext(AppContext);
  console.log({ currentUserLoggedIn });

  return (
    <Routes>
      {currentUserLoggedIn === undefined ? (
        <Route path="/auth" element={<UserTypeLogIn />} />
      ) : currentUserLoggedIn?.userType === "Client" ? (
        <Route path="/" element={<Dashboard />} />
      ) : currentUserLoggedIn?.employeeType === "Administrate" ? (
        <>
          <Route path="/newClient" element={<NewClient />} />
          <Route path="/newEmployee" element={<NewEmployee />} />
          <Route path="/clientsList" element={<ClientsList />} />
          <Route path="/employeeList" element={<EmployeeList />} />
        </>
      ) : (
        <></>
      )}
    </Routes>
  );
}

export default App;

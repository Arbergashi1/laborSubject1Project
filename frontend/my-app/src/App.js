import { useSelector } from "react-redux";
import "./App.scss";
import Dashboard from "./Dashboard/Dashboard";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NewEmployee from "./ADMINISTRATE/EmplyeeManagement/NewEmployee";
import AppProvider from "./context/appprovider";
import NewClient from "./ADMINISTRATE/ClientsManagement/newclient/NewClient";
import ClientsList from "./ADMINISTRATE/ClientsManagement/ListOfClients/ClientsList";
import EmployeeList from "./ADMINISTRATE/EmplyeeManagement/EmployeeList";

function App() {
  return (
    <div>
      <BrowserRouter>
        <AppProvider>
          <Routes>
            {/* these are the administrate routes */}
            <Route path="/newClient" element={<NewClient />} />
            <Route path="/newEmployee" element={<NewEmployee />} />
            <Route path="/clientsList" element={<ClientsList />} />
            <Route path="/employeeList" element={<EmployeeList />} />
            {/* these are the client routes */}
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </AppProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

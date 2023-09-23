import { useSelector } from "react-redux";
import "./App.scss";
import Dashboard from "./Dashboard/Dashboard";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NewClient from "./ADMINISTRATE/newclient/NewClient";
import NewEmployee from "./ADMINISTRATE/newemployee/NewEmployee";
import AppProvider from "./context/appprovider";
import ClientsList from "./ADMINISTRATE/ListOfClients/ClientsList";

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
            <Route path="/employeeList" element={<NewEmployee />} />
            {/* these are the client routes */}
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </AppProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

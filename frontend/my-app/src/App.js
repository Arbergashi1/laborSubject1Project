import "./App.scss";
import { Routes, Route } from "react-router-dom";
import NewEmployee from "./ADMINISTRATE/EmplyeeManagement/NewEmployee";
import NewClient from "./ADMINISTRATE/ClientsManagement/newclient/NewClient";
import ClientsList from "./ADMINISTRATE/ClientsManagement/ListOfClients/ClientsList";
import EmployeeList from "./ADMINISTRATE/EmplyeeManagement/EmployeeList";
import { useContext } from "react";
import { AppContext } from "./context/appcontext";
import UserTypeLogIn from "./LOGIN/prelogin/UserTypeLogIn";
import ShipmentsList from "./CLIENT/ShipmentsManagement/ShipmentList/ShipmentsList";
import NewShipment from "./CLIENT/ShipmentsManagement/NewShipment/NewShipment";
import { message } from "antd";
import Inisgts from "./CLIENT/Insights/Inisgts";
import PrintShipment from "./CLIENT/ShipmentsManagement/printShipment/PrintShipment";
import ClientDetails from "./ADMINISTRATE/ClientsManagement/ClientDetails/ClientDetails";
import VehicleList from "./ADMINISTRATE/VehicleManagement/VehicleList/VehicleList";
import NewVehicle from "./ADMINISTRATE/VehicleManagement/NewVehicle/NewVehicle";
import LogsList from "./ADMINISTRATE/LogsList/LogsList";
import NewReport from "./CLIENT/ReportsManagement/NewReport";
import ReportList from "./CLIENT/ReportsManagement/ReportList";
import ReportsManagement from "./ADMINISTRATE/ReportsManagement/ReportsManagement";
import MyShipments from "./EMPLOYEE/MyShipments/MyShipments";
import UpdateShipments from "./ADMINISTRATE/UpdateShipments/UpdateShipments";

function App() {
  const { currentUserLoggedIn } = useContext(AppContext);
  console.log({ currentUserLoggedIn });

  return (
    <Routes>
      {/* public route */}
      <Route path="/auth" element={<UserTypeLogIn />} />
      {/* private routes */}
      {currentUserLoggedIn !== null ? (
        <>
          {currentUserLoggedIn?.userType === "Client" ? (
            <>
              <Route path="/" element={<ShipmentsList />} />
              <Route path="/newShipment" element={<NewShipment />} />
              <Route path="/insights" element={<Inisgts />} />
              <Route
                path="/printShipment/:shipmentId"
                element={<PrintShipment />}
              />
              <Route path="/newReport" element={<NewReport />} />
              <Route path="/reporstList" element={<ReportList />} />
            </>
          ) : currentUserLoggedIn?.employeeType === "Administrate" ? (
            <>
              <Route path="/newClient" element={<NewClient />} />
              <Route path="/newEmployee" element={<NewEmployee />} />
              <Route path="/clientsList" element={<ClientsList />} />
              <Route path="/employeeList" element={<EmployeeList />} />
              <Route path="/clientDetails/:id" element={<ClientDetails />} />
              <Route path="/newVehicle" element={<NewVehicle />} />
              <Route path="/vehicleList" element={<VehicleList />} />
              <Route path="/logs" element={<LogsList />} />
              <Route
                path="/reportsManagement"
                element={<ReportsManagement />}
              />
              <Route path="/updateShipments" element={<UpdateShipments />} />
            </>
          ) : currentUserLoggedIn?.employeeType === "Employee" ? (
            <>
              {/* <Route path="/shipmentsList" element={<ShipmentsList />} /> */}
              <Route path="/myShipments" element={<MyShipments />} />
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          {/* <Route path="*" element={<Navigate to="/auth" />} />*/}
          {currentUserLoggedIn === null ||
            (currentUserLoggedIn === undefined &&
              message.warning("please login to continue"))}
        </>
      )}
    </Routes>
  );
}

export default App;

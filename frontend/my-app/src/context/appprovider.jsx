import React, { useEffect, useState } from "react";
import { AppContext } from "./appcontext";
import axios from "axios";

const AppProvider = ({ children }) => {
  // 1
  const [clinetsList, setClinetsList] = useState([]);
  //
  const [employeeList, setEmployeeList] = useState([]);
  // 3
  const [storedClientId, setStoredClientId] = useState(null);
  const [loginData, setLoginData] = useState(null);
  const userId = sessionStorage.getItem("clientLoggedInId");
  const eUserId = sessionStorage.getItem("empAdmLoggedInId");
  const [currentUserLoggedIn, setCurrentUserLoggedIn] = useState(null);
  // 4
  const [shipmentsList, setShipmentsList] = useState([]);
  //
  const [vehicleList, setVehicleList] = useState([]);

  // 4
  const preferences =
    currentUserLoggedIn !== null &&
    shipmentsList &&
    shipmentsList?.filter(
      ({ userId }) => userId === currentUserLoggedIn?.clientId
    );

  //3
  useEffect(() => {
    async function fetchClientsList() {
      try {
        const clientsListApiUrl =
          "https://localhost:44312/api/ClientManagement/GetListOfClients";

        const response = await axios.get(clientsListApiUrl);
        setClinetsList(response.data.listOfClients);
      } catch (error) {
        console.log("Error occurred while fetching registrations:", error);
      }
    }
    async function fetchEmployeesList() {
      try {
        const employeesListApiUrl =
          "https://localhost:44312/api/EmployeeManagement/GetListOfEmployees";

        const response = await axios.get(employeesListApiUrl);
        setEmployeeList(response.data.listOfEmployees);
      } catch (error) {
        console.log("Error occurred while fetching registrations:", error);
      }
    }
    async function fetchCurrentUser() {
      try {
        const getCurrentUserApiUrl =
          loginData?.clientId || userId
            ? `https://localhost:44312/api/ClientLogin/GetLoggedInClientUser?clientId=${
                loginData?.clientId || userId
              }`
            : loginData?.employeeId || eUserId
            ? `https://localhost:44312/api/EmployeeLogin/GetLoggedInEmployeeUser?employeeId=${
                loginData?.employeeId || eUserId
              }`
            : "";
        const response = await axios.get(getCurrentUserApiUrl);
        setLoginData(response);
      } catch (error) {
        console.log("Error occurred while fetching registrations:", error);
      }
    }
    async function fetchShipments() {
      try {
        const shipmentsListApiUrl =
          "https://localhost:44312/api/ShipmentsManagement/GetListOfShipments";

        const response = await axios.get(shipmentsListApiUrl);
        const sortedData = response.data.listOfShipments.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setShipmentsList(sortedData);
      } catch (error) {
        console.log("Error occurred while fetching registrations:", error);
      }
    }
    async function fetchVehicles() {
      try {
        const vehivleListApiUrl =
          "https://localhost:44312/api/VehicleManagement/GetListOfVehicles";

        const response = await axios.get(vehivleListApiUrl);
        const sortedData = response.data.listOfVehicles.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setVehicleList(sortedData);
      } catch (error) {
        console.log("Error occurred while fetching registrations:", error);
      }
    }
    fetchClientsList();
    fetchEmployeesList();
    fetchCurrentUser();
    fetchShipments();
    fetchVehicles();
  }, []);

  useEffect(() => {
    if (loginData?.clientId || userId) {
      setCurrentUserLoggedIn(
        clinetsList?.find(
          ({ clientId }) =>
            clientId === loginData?.clientId || clientId === userId
        )
      );
    } else if (loginData?.employeeId || eUserId) {
      setCurrentUserLoggedIn(
        employeeList.find(
          ({ employeeId }) =>
            employeeId === loginData?.employeeId || employeeId === eUserId
        )
      );
    }
  }, [loginData]);

  const values = {
    clinetsList,
    setClinetsList,
    employeeList,
    setEmployeeList,
    storedClientId,
    setStoredClientId,
    userId,
    loginData,
    setLoginData,
    setCurrentUserLoggedIn,
    currentUserLoggedIn,
    shipmentsList,
    setShipmentsList,
    preferences,
    vehicleList,
    setVehicleList,
  };
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export default AppProvider;

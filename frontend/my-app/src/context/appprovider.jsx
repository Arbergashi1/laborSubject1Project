import React, { useEffect, useState } from "react";
import { AppContext } from "./appcontext";
import axios from "axios";

const AppProvider = ({ children }) => {
  const [clinetsList, setClinetsList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [storedClientId, setStoredClientId] = useState(null);
  const [loginData, setLoginData] = useState(null);
  const userId = sessionStorage.getItem("clientLoggedInId");
  const eUserId = sessionStorage.getItem("empAdmLoggedInId");
  const [currentUserLoggedIn, setCurrentUserLoggedIn] = useState(undefined);

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
    fetchClientsList();
    fetchEmployeesList();
    fetchCurrentUser();
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
  };
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export default AppProvider;

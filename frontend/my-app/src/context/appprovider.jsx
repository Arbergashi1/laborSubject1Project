import React, { useEffect, useState } from "react";
import { AppContext } from "./appcontext";
import axios from "axios";

const AppProvider = ({ children }) => {
  const [clinetsList, setClinetsList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
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
      } catch (error) {}
    }
    fetchClientsList();
    fetchEmployeesList();
  }, []);
  return (
    <AppContext.Provider
      value={{ clinetsList, setClinetsList, employeeList, setEmployeeList }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

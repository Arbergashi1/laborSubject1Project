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
  // 5
  const [vehicleList, setVehicleList] = useState([]);
  // 5
  const [editLogs, setEditLogs] = useState([]);
  // 6
  const [reportsList, setReportsList] = useState([]);
  // 7
  const [notifiactionsList, setNotifiactionsList] = useState([]);
  // 8
  const [notesList, setNotesList] = useState([]);
  // 9
  const [paymentsList, setPaymentsList] = useState([]);
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
        console.log({ sortedData });
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
    async function fetchLogs() {
      try {
        const logsListApiUrl =
          "https://localhost:44312/api/LogsManagement/GetListOfLogs";

        const response = await axios.get(logsListApiUrl);
        const sortedData = response.data.listOfLogs.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setEditLogs(sortedData);
      } catch (error) {
        console.log("Error occurred while fetching registrations:", error);
      }
    }
    async function fetchReports() {
      try {
        const reportsListApi =
          "https://localhost:44312/api/ReportsManagement/GetListOfReports";
        const response = await axios.get(reportsListApi);
        const sortedData = response.data.listOfReports.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setReportsList(sortedData);
      } catch (error) {
        console.log("Error occurred while fetching registrations:", error);
      }
    }
    async function fetchNotifications() {
      try {
        const responseListApi =
          "https://localhost:44312/api/NotificationsManagement/GetListOfNotifications";
        console.log({ responseListApi });
        const response = await axios.get(responseListApi);
        const sortedData = response.data.listOfNotifications.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setNotifiactionsList(sortedData);
      } catch (error) {
        console.log({ error });
      }
    }
    async function fetchNotes() {
      try {
        const responseListApi =
          "https://localhost:44312/api/NotesManagement/GetListOfNotes";
        const response = await axios.get(responseListApi);
        setNotesList(response.data.listOfNotes);
      } catch (error) {
        console.log({ error });
      }
    }
    async function fetchPayments() {
      try {
        const responseListApi =
          "https://localhost:44312/api/PaymentsList/GetListOfPayments";
        const response = await axios.get(responseListApi);
        setPaymentsList(response.data.listOfPayments);
      } catch (error) {
        console.log({ error });
      }
    }
    fetchPayments();
    fetchClientsList();
    fetchEmployeesList();
    fetchCurrentUser();
    fetchShipments();
    fetchVehicles();
    fetchLogs();
    fetchReports();
    fetchNotifications();
    fetchNotes();
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
    editLogs,
    setEditLogs,
    reportsList,
    setReportsList,
    notifiactionsList,
    setNotifiactionsList,
    notesList,
    setNotesList,
    paymentsList,
    setPaymentsList,
  };
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export default AppProvider;

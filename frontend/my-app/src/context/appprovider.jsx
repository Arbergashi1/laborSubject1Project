import React, { useEffect, useState } from "react";
import { AppContext } from "./appcontext";
import axios from "axios";

const AppProvider = ({ children }) => {
  const [clinetsList, setClinetsList] = useState([]);
  useEffect(() => {
    async function fetchClientsList() {
      try {
        const clientsListApiUrl =
          "https://localhost:44322/api/ClientManagement/GetListOfClients";

        const response = await axios.get(clientsListApiUrl);
        setClinetsList(response.data.listOfClients);
      } catch (error) {
        console.log("Error occurred while fetching registrations:", error);
      }
    }
    fetchClientsList();
  }, []);
  return (
    <AppContext.Provider value={{ clinetsList, setClinetsList }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

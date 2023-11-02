import axios from "axios";
import { UseDateReader } from "./UseDateReader";
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { message } from "antd";
import { AppContext } from "../context/appcontext";

const useSaveLogs = () => {
  const { setEditLogs, currentUserLoggedIn } = useContext(AppContext);

  const saveLogs = (givename) => {
    const newEditLogs = {
      logId: uuidv4(),
      actionType: givename.actionType,
      previousData: givename.previousData,
      createdAt: UseDateReader(Date.now()),
      updatedData: givename.updatedData,
      createByUser: currentUserLoggedIn?.fullName || "",
      createByUserId:
        currentUserLoggedIn?.employeeId || currentUserLoggedIn?.clientId || "",
    };

    const apiUrl = "https://localhost:44312/api/LogsManagement/CreateNewLog";
    axios
      .post(apiUrl, newEditLogs)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setEditLogs((prev) => [newEditLogs, ...prev]);
        } else {
          message.error(res.data.statusMessage);
        }
      })
      .catch((err) => console.log({ err }));
  };

  return saveLogs;
};

export default useSaveLogs;

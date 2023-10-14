import React, { useContext, useState } from "react";
import { AppContext } from "../../../context/appcontext";
import { Table } from "antd";
import { columnDefs } from "./columnDefs";
import "./listOfClients.scss";
import BasePage from "../../../BasePage/BasePage";
import EditClientModal from "../ListOfClients/EditClientModal.jsx";
import Card from "../../../reusable/Card/Card";
import { useNavigate } from "react-router-dom";

const ClientsList = () => {
  const navigate = useNavigate();
  const [idToEdit, setIdToEdit] = useState(false);
  const { clinetsList, setClinetsList } = useContext(AppContext);

  const paginationOptions = {
    pageSize: 6,
  };

  const viewHandler = (record) => {
    navigate(`/clientDetails/${record.clientId}`, {
      state: {
        record,
      },
    });
  };

  return (
    <BasePage preNavName={"Clients List"}>
      <div style={{ display: "grid", gap: "20px" }}>
        <div
          style={{
            display: "flex",
            gap: "15px",
            padding: "10px",
            borderRadius: "20px",
            boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Card
            background={"blue"}
            string={"All Clients"}
            number={clinetsList.length}
          />
          <Card
            background={"#0dff00"}
            string={"Active Clients"}
            number={
              clinetsList.filter(({ userStatus }) => userStatus === "ACTIVE")
                .length
            }
          />
          <Card
            background={"#de0d0d"}
            string={"Inactive Clients"}
            number={
              clinetsList.filter(({ userStatus }) => userStatus === "INACTIVE")
                .length
            }
          />
        </div>
        <div
          style={{
            borderRadius: "10px",
            boxShadow:
              "0 4px 8px 0 rgba(160, 160, 160, 0.2), 0 6px 20px 0 rgba(174, 174, 174, 0.19)",
          }}
        >
          <Table
            columns={columnDefs({
              clinetsList,
              setClinetsList,
              idToEdit,
              setIdToEdit,
              viewHandler,
            })}
            dataSource={clinetsList}
            pagination={paginationOptions}
          />
        </div>
        {idToEdit && (
          <EditClientModal
            {...{ setIdToEdit, clinetsList, setClinetsList, idToEdit }}
          />
        )}
      </div>
    </BasePage>
  );
};

export default ClientsList;

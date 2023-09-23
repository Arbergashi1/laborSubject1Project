import React, { useContext, useState } from "react";
import BasePage from "../../BasePage/BasePage";
import { AppContext } from "../../context/appcontext";
import { Table } from "antd";
import { columnDefs } from "./columnDefs";
import EditClientModal from "./EditClientModal";
import "./listOfClients.scss";

const ClientsList = () => {
  const [idToEdit, setIdToEdit] = useState(false);
  const { clinetsList, setClinetsList } = useContext(AppContext);
  console.log({ clinetsList });
  const paginationOptions = {
    pageSize: 6,
  };

  return (
    <BasePage preNavName={"Clients List"}>
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
          })}
          dataSource={clinetsList}
          pagination={paginationOptions}
        />
      </div>
      {idToEdit && (
        <EditClientModal
          {...{ idToEdit, setIdToEdit, clinetsList, setClinetsList }}
        />
      )}
    </BasePage>
  );
};

export default ClientsList;

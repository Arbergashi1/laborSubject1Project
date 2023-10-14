import React, { useContext } from "react";
import BasePage from "../../../BasePage/BasePage";
import Card from "../../../reusable/Card/Card";
import { AppContext } from "../../../context/appcontext";

const ClientsInsights = () => {
  const { clinetsList } = useContext(AppContext);

  return <BasePage preNavName={"Clients Insights"}></BasePage>;
};

export default ClientsInsights;

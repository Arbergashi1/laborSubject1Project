import React, { useContext } from "react";
import BasePage from "../../BasePage/BasePage";
import { Table } from "antd";
import getColumnDefs from "./getColumnDefs";
import { AppContext } from "../../context/appcontext";

const Payments = () => {
  const { paymentsList, setPaymentsList } = useContext(AppContext);
  console.log({ paymentsList });

  function groupArrayByProperty(array, property) {
    return array.reduce((result, item) => {
      const key = item[property];

      if (!result[key]) {
        result[key] = [];
      }

      result[key].push(item);
      return result;
    }, {});
  }

  // const groupedShipments = Object.entries(
  //   groupArrayByProperty(paymentsList, "paymentId")
  // ).map(([key, values]) => {
  //   return values.map(
  //     ({
  //       paymentDate,
  //       paymentDoneBy,
  //       paymentDoneTo,
  //       paymentPk,
  //       balance,
  //       delivryCost,
  //     }) => {
  //       return {
  //         key: key,
  //         paymentDate: paymentDate,
  //         paymentDoneBy: paymentDoneBy,
  //         paymentDoneTo: paymentDoneTo,
  //         paymentPk: paymentPk,
  //         balance: balance,
  //         delivryCost: delivryCost,
  //       };
  //     }
  //   );
  // });

  // console.log({ groupedShipments });
  const modifed = groupArrayByProperty(paymentsList, "paymentId");
  return (
    <BasePage preNavName={"Payments"}>
      <div className="grid grid-cols-2 gap-4">
        {Object.keys(groupArrayByProperty(paymentsList, "paymentId")).map(
          (el, idx) => {
            console.log({ el });
            return (
              <div
                style={{ background: "#0dff00" }}
                className=" border rounded-md"
              >
                <div className="flex justify-between p-2">
                  <span>#{idx} - Payment id.</span>
                  <span>{el}</span>
                </div>
                <hr />
                <div className="p-2 flex justify-between">
                  <div>Date/time</div>
                  <div>{modifed[el][0].paymentDate}</div>
                </div>
                <div className="p-2 flex justify-between">
                  <div>Shipment Sended</div>
                  <div>{modifed[el].length}</div>
                </div>
                <div className="p-2 flex justify-between">
                  <div>Balance</div>
                  <div>{modifed[el][0].balance}$</div>
                </div>
                <div className="p-2 flex justify-between">
                  <div>Deliverd Cost</div>
                  <div>{modifed[el][0].delivryCost}$</div>
                </div>
              </div>
            );
          }
        )}
      </div>
      {/* <Table dataSource={paymentsList} bordered columns={getColumnDefs({})} /> */}
    </BasePage>
  );
};

export default Payments;

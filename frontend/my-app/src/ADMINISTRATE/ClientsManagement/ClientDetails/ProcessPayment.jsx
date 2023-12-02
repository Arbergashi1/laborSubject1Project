import { Modal, Table } from "antd";
import getColumnDefs from "./getColumnDefs";
import { useContext, useState } from "react";
import MondayButton from "../../../reusable/MondayButton/MondayButton";
import axios from "axios";
import { AppContext } from "../../../context/appcontext";
import { v4 as uuidv4 } from "uuid";
import { UseDateReader } from "../../../hooks/UseDateReader";

const ProcessPayment = ({
  record,
  shipmentFilteredByUser,
  setShipmentsList,
  shipmentsList,
  currentUserLoggedIn,
}) => {
  const { paymentsList, setPaymentsList } = useContext(AppContext);
  const total = shipmentFilteredByUser
    .filter(({ isPaid }) => isPaid === false)
    .filter(({ status }) => status === "Deliverd")
    .reduce((sum, item) => sum + Number(item.reference), 0);

  const chargeForDelivry = shipmentFilteredByUser
    .filter(({ isPaid }) => isPaid === false)
    .filter(({ status }) => status === "Deliverd").length;
  const [processPaymentModal, setProcessPaymentModal] = useState(false);

  const id = uuidv4();

  const handleProcess = () => {
    const updatedShipments = shipmentsList
      // .filter(({ status }) => status === "Deliverd")
      .map((ship) => {
        if (
          ship.userId === record.clientId &&
          ship.status === "Deliverd" &&
          ship.isPaid === false
        ) {
          const apiUrl = `https://localhost:44312/api/ShipmentsManagement/ProcessPayemnt/${ship.shipmentId}`;
          const paymentApiUrl =
            "https://localhost:44312/api/PaymentsList/CreatePayment";

          axios
            .put(apiUrl, { isPaid: true })
            .then((res) => {
              const generatePayment = {
                paymentId: id,
                paymentDate: UseDateReader(Date.now()),
                paymentDoneBy: currentUserLoggedIn?.email,
                paymentDoneTo: `${record.fullName} - ${record.email}`,
                paymentPk: record?.clientId,
                balance: `${total - chargeForDelivry * 2}`,
                delivryCost: `${chargeForDelivry * 2}`,
              };

              console.log({ generatePayment });

              axios
                .post(paymentApiUrl, generatePayment)
                .then((res) => {
                  console.log({ res });
                  setPaymentsList((prev) => [...prev, generatePayment]);
                })
                .catch((err) => console.log({ err }));
              setShipmentsList((prev) =>
                prev.map(() => {
                  if (
                    ship.userId === record.clientId &&
                    ship.status === "Deliverd"
                  ) {
                    return {
                      ...ship,
                      isPaid: true,
                    };
                  }
                  return ship;
                })
              );
              setProcessPaymentModal(false);
              console.log({ updatedShipments });
            })
            .catch((err) => console.log({ err }));
          return {
            ...ship,
            isPaid: true,
          };
        }
        return ship;
      });
  };
  return (
    <div>
      <div className="bg-gray-200 rounded-t-md p-2">
        Procces Payment for {record.fullName}
      </div>
      <Table
        bordered
        columns={getColumnDefs({ setProcessPaymentModal })}
        dataSource={[record]}
      />
      {processPaymentModal && (
        <Modal
          centered
          open={processPaymentModal}
          onCancel={() => setProcessPaymentModal(false)}
          closeIcon={false}
          footer={
            <div className="flex gap-10">
              <MondayButton
                className="mondayButtonRed"
                onClick={() => setProcessPaymentModal(false)}
              >
                Close
              </MondayButton>
              <MondayButton
                className="mondayButtonGreen"
                onClick={handleProcess}
              >
                Confirm Payment
              </MondayButton>
            </div>
          }
        >
          <div className="grid gap-4">
            <div className="bg-slate-100 rounded">
              <div className="text-center font-bold">
                You are Proccesing Payment for {record.fullName}
              </div>
            </div>
            <div className="flex justify-between">
              <div>Total ammount</div>
              <div>{total}$</div>
            </div>
            <div className="flex justify-between">
              <div>Total Shipment Charge</div>
              <div>{chargeForDelivry * 2}$</div>
            </div>
            <div className="flex justify-between">
              <div>Total Shipment sended</div>
              <div>{chargeForDelivry}</div>
            </div>
            <div className="flex justify-between">
              <div>Final ammount</div>
              <div>{total - chargeForDelivry * 2}</div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ProcessPayment;

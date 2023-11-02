import { Divider, Input, Modal, Select, Table, message } from "antd";
import BasePage from "../../../BasePage/BasePage";
import { AppContext } from "../../../context/appcontext";
import { useContext, useState } from "react";
import getColumnDefs from "./getColumnDefs";
import "./ShipmentsList.scss";
import MondayButton from "../../../reusable/MondayButton/MondayButton";
import "../../../ADMINISTRATE/ClientsManagement/ListOfClients/listOfClients.scss";
import { UseDateReader } from "../../../hooks/UseDateReader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useSaveLogs from "../../../hooks/UseSaveLogs";
import { useDocumentTile } from "../../../hooks/useDocumentTile";

const ShipmentsList = () => {
  useDocumentTile({ title: "Shipments | KSD" });

  const navigate = useNavigate();
  const saveLogs = useSaveLogs();

  const { preferences } = useContext(AppContext);
  const { setShipmentsList, currentUserLoggedIn, shipmentsList } =
    useContext(AppContext);
  const [idToEdit, setIdToEdit] = useState(false);
  const [editedData, setEditedData] = useState({});

  const editHanlder = (record) => {
    setIdToEdit(true);
    setEditedData(record);
  };

  const handleEdit = () => {
    const editObject = {
      ...editedData,
      updatedAt: UseDateReader(Date.now()),
    };

    delete editObject.notes;
    delete editObject.createdAt;
    delete editObject.status;

    const apiUrl = `https://localhost:44312/api/ShipmentsManagement/EditShipmentInfo/${editedData.shipmentId}`;
    axios.put(apiUrl, editObject).then((res) => {
      console.log({ res });
      if (res.data.statusCode === 200) {
        message.success(res.data.statusMessage);
        setEditedData(editObject);
        setShipmentsList((prev) =>
          prev.map((shipment) =>
            shipment.shipmentId === editedData.shipmentId
              ? { ...shipment, ...editObject }
              : shipment
          )
        );
        saveLogs({
          actionType: "Edit",
          previousData: editedData.city,
          updatedData: editObject.city,
        });
        setIdToEdit(false);
      } else {
        message.error(res.data.statusMessage);
      }
    });
  };

  const paginationOptions = {
    pageSize: 6,
  };

  const printHandler = (record) => {
    navigate(`/printShipment/${record.shipmentId}`, {
      state: {
        record,
      },
    });
  };

  // const goToTop = () => {
  //   window.scrollTo(0, 0);
  // };
  // useEffect(() => {
  //   goToTop();
  // }, []);

  return (
    <BasePage {...{ preNavName: "Shipments List" }}>
      <Table
        bordered
        loading={
          currentUserLoggedIn === undefined || currentUserLoggedIn === null
        }
        columns={getColumnDefs({
          setShipmentsList,
          idToEdit,
          setIdToEdit,
          editHanlder,
          printHandler,
          saveLogs,
        })}
        dataSource={preferences}
        pagination={paginationOptions}
        className={`shipmentsListTable`}
      />

      {idToEdit && (
        <Modal
          centered
          open={idToEdit}
          onCancel={() => setIdToEdit(false)}
          title={`Edit Shipment / ${editedData.shipmentId}`}
          footer={
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <MondayButton
                className="mondayButtonRed"
                onClick={() => setIdToEdit(false)}
              >
                Cancel
              </MondayButton>
              <MondayButton className="mondayButtonGreen" onClick={handleEdit}>
                Edit
              </MondayButton>
            </div>
          }
        >
          <div style={{ marginBottom: "10px" }}>
            <Divider />
          </div>
          <>
            <div className="toinputsDiv">
              <div>
                <span>Contry</span>
                <Select
                  options={[
                    { value: "kosova", label: "Kosova" },
                    { value: "albania", label: "Albania" },
                    { value: "maqedonia", label: "Maqedonia" },
                  ]}
                  value={editedData.country}
                  style={{ width: "200%" }}
                  onChange={(value) => {
                    setEditedData({ ...editedData, country: value });
                  }}
                />
              </div>
              <div>
                <span>City</span>
                <Input
                  value={editedData.city}
                  onChange={(e) =>
                    setEditedData({ ...editedData, city: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="oneInputDiv">
              <div>
                <span>Address</span>
                <Input
                  value={editedData.address}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      address: e.target.value,
                    })
                  }
                  style={{ width: "100%" }}
                />
              </div>
            </div>
            <div className="toinputsDiv">
              <div>
                <span>Special Instructions</span>
                <Input
                  value={editedData.specialInstructions}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      specialInstructions: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <span>Name</span>
                <Input
                  value={editedData.name}
                  onChange={(e) =>
                    setEditedData({ ...editedData, name: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="oneInputDiv">
              <div>
                <span>Phone</span>
                <Input
                  value={editedData.phone}
                  onChange={(e) =>
                    setEditedData({ ...editedData, phone: e.target.value })
                  }
                />
              </div>
            </div>
            <div>
              <div className="toinputsDiv">
                <div>
                  <span>Reference</span>
                  <Input
                    disabled
                    value={editedData.reference}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        reference: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <span>Do you let open</span>
                  <Select
                    style={{ width: "100%" }}
                    options={[
                      { value: "no", label: "No" },
                      { value: "yes", label: "Yes" },
                    ]}
                    value={editedData.doYouLetOpen}
                    onChange={(value) =>
                      setEditedData({ ...editedData, doYouLetOpen: value })
                    }
                  />
                </div>
              </div>
            </div>
          </>
        </Modal>
      )}
    </BasePage>
  );
};

export default ShipmentsList;

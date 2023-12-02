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
import { v4 as uuidv4 } from "uuid";
import FilterShipments from "./FilterShipments";

const ShipmentsList = () => {
  useDocumentTile({ title: "Shipments | KSD" });
  const [clickedApply, setClickedApply] = useState(false);
  const [idToEdit, setIdToEdit] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [noteModal, setNoteModal] = useState(false);
  const [noteDescription, setNoteDescription] = useState("");
  const [filters, setFilters] = useState({
    searchById: "",
    searchByName: "",
    searchByCity: "",
    searchByStatus: "",
    searchByPayment: "",
  });

  const navigate = useNavigate();
  const saveLogs = useSaveLogs();

  const { preferences } = useContext(AppContext);
  const {
    setShipmentsList,
    currentUserLoggedIn,
    shipmentsList,
    notesList,
    setNotesList,
  } = useContext(AppContext);

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

  const viewShipmentById = (record) => {
    navigate(`/shipmentDetails/${record.shipmentId}`, {
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

  const getStatusRowClassName = (status) => {
    switch (status) {
      case "Awaiting Pickup":
        return "awaiting-pickup-row";
      case "In Delivry":
        return "in-delivery-row";
      case "Deliverd":
        return "delivered-row";
      case "Refuzed":
        return "refused-row";
      default:
        return "";
    }
  };

  const handleAddNote = () => {
    const strucutreToAdd = {
      noteDescription: noteDescription,
      noteId: uuidv4(),
      createdAt: UseDateReader(Date.now()),
      createdBy:
        currentUserLoggedIn.fullName || currentUserLoggedIn.employeeName,
      shipmentId: noteModal,
      noteStatus: "Note added succesfully",
      noteStatusColor: "bg-yellow-300",
    };
    console.log({ strucutreToAdd });
    const apiUrl = "https://localhost:44312/api/NotesManagement/NewNote";

    const updatedFieldOptions = shipmentsList.map((option) => {
      if (option?.shipmentId === noteModal) {
        return {
          ...option,
          notes: option.notes
            ? [...option.notes, strucutreToAdd]
            : [strucutreToAdd],
        };
      } else {
        return option;
      }
    });
    axios
      .post(apiUrl, strucutreToAdd)
      .then((res) => {
        message.success(res.data.statusMessage);
        setNotesList((prev) => [strucutreToAdd, ...prev]);
        // setShipmentsList(updatedFieldOptions);
        setNoteModal(false);
      })
      .catch((err) => {
        console.log({ err });
        // message.error(err);
      });
  };

  const total = preferences
    .filter(({ isPaid }) => isPaid === false)
    .filter(({ status }) => status === "Deliverd")
    .reduce((sum, item) => sum + Number(item.reference), 0);

  const chargeForDelivry = preferences
    .filter(({ isPaid }) => isPaid === false)
    .filter(({ status }) => status === "Deliverd").length;

  return (
    <BasePage {...{ preNavName: "Shipments List" }}>
      <FilterShipments
        {...{
          filters,
          setFilters,
          preferences,
          setShipmentsList,
          clickedApply,
          setClickedApply,
        }}
      />
      <div className="mb-6 border bg-white rounded-md text-center">
        <span className="text-gray-800 font-normal">
          Total shipments found{" "}
          <span className="font-bold">{preferences.length}</span>
        </span>{" "}
        /{" "}
        <span className="text-gray-800 font-normal">
          Total earnings found{" "}
          <span className="font-bold">{total - chargeForDelivry * 2}$</span>
        </span>
      </div>
      <Table
        rowHoverBg={false}
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
          viewShipmentById,
          setNoteModal,
          notesList,
          shipmentsList,
        })}
        dataSource={preferences}
        pagination={paginationOptions}
        className={`shipmentsListTable`}
        rowClassName={(record) => getStatusRowClassName(record.status)}
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

      {noteModal && (
        <Modal
          open={noteModal}
          centered
          onCancel={() => setNoteModal(false)}
          title={`Add new note for - ${noteModal}`}
          footer={
            <div className="flex justify-between gap-32">
              <MondayButton
                className="mondayButtonRed"
                onClick={() => setNoteModal(false)}
              >
                Close
              </MondayButton>
              <MondayButton
                className="mondayButtonBlue"
                disabled={noteDescription === ""}
                onClick={handleAddNote}
              >
                Add
              </MondayButton>
            </div>
          }
        >
          <hr />
          <div className="grid pt-4">
            <div>Note desc.</div>
            <div>
              <Input
                placeholder="note desc..."
                onChange={(e) => setNoteDescription(e.target.value)}
              />
            </div>
          </div>
        </Modal>
      )}
    </BasePage>
  );
};

export default ShipmentsList;

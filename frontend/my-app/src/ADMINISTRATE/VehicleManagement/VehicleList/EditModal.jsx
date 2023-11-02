import { Divider, Input, Modal } from "antd";
import MondayButton from "../../../reusable/MondayButton/MondayButton";

const EditModal = ({
  idToEdit,
  setIdToEdit,
  handleEdit,
  editedData,
  setEditedData,
}) => {
  return (
    <Modal
      centered
      open={idToEdit}
      onCancel={() => setIdToEdit(false)}
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
      title={`Edit Information for Vehicle ${editedData.vehicleId}`}
    >
      <div style={{ marginBottom: "10px" }}>
        <Divider />
      </div>
      <>
        <div className="toinputsDiv">
          <div>
            <span>Vehicle Model</span>
            <Input
              value={editedData.vehicleModel}
              onChange={(e) =>
                setEditedData({ ...editedData, vehicleModel: e.target.value })
              }
            />
          </div>
        </div>
        <div className="oneInputDiv">
          <div>
            <span>Vehicle Year</span>
            <Input
              value={editedData.vehicleYear}
              onChange={(e) =>
                setEditedData({
                  ...editedData,
                  vehicleYear: e.target.value,
                })
              }
              style={{ width: "100%" }}
            />
          </div>
        </div>
        <div className="toinputsDiv">
          <div>
            <span>Vehicle Make</span>
            <Input
              value={editedData.vehicleMake}
              onChange={(e) =>
                setEditedData({
                  ...editedData,
                  vehicleMake: e.target.value,
                })
              }
            />
          </div>
          <div>
            <span>Vehicle Mileage</span>
            <Input
              value={editedData.vehicleMileage}
              onChange={(e) =>
                setEditedData({ ...editedData, vehicleMileage: e.target.value })
              }
            />
          </div>
        </div>
        <div className="oneInputDiv">
          <div>
            <span>Vehicle DriverName</span>
            <Input
              value={editedData.vehicleDriverName}
              onChange={(e) =>
                setEditedData({
                  ...editedData,
                  vehicleDriverName: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div>
          <div className="toinputsDiv">
            <div>
              <span>Vehicle DriverId</span>
              <Input
                disabled
                value={editedData.vehicleDriverId}
                onChange={(e) =>
                  setEditedData({
                    ...editedData,
                    vehicleDriverId: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
      </>
    </Modal>
  );
};

export default EditModal;

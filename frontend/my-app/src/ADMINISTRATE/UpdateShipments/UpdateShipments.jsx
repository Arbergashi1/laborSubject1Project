import { Divider, Input, Modal, Table, Tooltip, message } from "antd";
import BasePage from "../../BasePage/BasePage";
import { useContext, useState } from "react";
import { AppContext } from "../../context/appcontext";
import getColumnDefs from "./getColumnDefs";
import { useDocumentTile } from "../../hooks/useDocumentTile";
import useSendNotification from "../../hooks/useSendNotification";
import MondayButton from "../../reusable/MondayButton/MondayButton";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { UseDateReader } from "../../hooks/UseDateReader";
import DeleteIcon from "@mui/icons-material/Delete";
import { Dialog, IconButton, Toolbar } from "@mui/material";

const UpdateShipments = () => {
  useDocumentTile({ title: "Update Shipments | ADMINISTRATE | KSD" });

  const {
    shipmentsList,
    setShipmentsList,
    notesList,
    setNotesList,
    currentUserLoggedIn,
  } = useContext(AppContext);
  const { employeeList } = useContext(AppContext);
  const [filteredCouriers, setFilteredCouriers] = useState([]);
  const [selectedTag, setSelectedTag] = useState({});
  const [idToEdit, setIdToEdit] = useState(false);
  const [popoverCloser, setPopoverCloser] = useState(false);
  const [noteModal, setNoteModal] = useState(false);
  const [noteDescription, setNoteDescription] = useState("");
  const [viewNotes, setViewNotes] = useState(false);

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
    const apiUrl = "https://localhost:44312/api/NotesManagement/NewNote";

    axios
      .post(apiUrl, strucutreToAdd)
      .then((res) => {
        message.success(res.data.statusMessage);
        setNotesList((prev) => [strucutreToAdd, ...prev]);
        // setShipmentsList(updatedFieldOptions);
        setNoteModal(false);
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const findedNotes = notesList?.filter(
    ({ shipmentId: listOfNotesId }) => listOfNotesId === viewNotes
  );

  const handleDelete = (noteIdArg) => {
    const apiUrl = `https://localhost:44312/api/NotesManagement/EditNote/${noteIdArg}`;
    const updatedNotes = notesList.map((note) => {
      if (note.noteId === noteIdArg) {
        return {
          ...note,
          noteStatus: "Deleted",
          noteStatusColor: "bg-red-400",
          lastUpdatedBy:
            currentUserLoggedIn.fullName || currentUserLoggedIn.employeeName,
        };
      }
      return note;
    });
    axios
      .put(apiUrl, { noteStatus: "Deleted", noteStatusColor: "bg-red-400" })
      .then((res) => {
        message.success(res.data.statusMessage);
        setNotesList(updatedNotes);
      })
      .catch((err) => {
        // message.error(err);
      });
  };

  const sendNotification = useSendNotification();
  return (
    <BasePage preNavName={"Update Shipments"}>
      <Table
        bordered
        dataSource={shipmentsList}
        columns={getColumnDefs({
          employeeList,
          filteredCouriers,
          setFilteredCouriers,
          selectedTag,
          setSelectedTag,
          setShipmentsList,
          shipmentsList,
          idToEdit,
          setIdToEdit,
          popoverCloser,
          setPopoverCloser,
          sendNotification,
          notesList,
          setNoteModal,
          setViewNotes,
        })}
      />
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
          <div className="grid pt-4">
            <div>Note description</div>
            <div>
              <Input
                className="bg-slate-100 border-none"
                placeholder="add new note here..."
                onChange={(e) => setNoteDescription(e.target.value)}
              />
            </div>
          </div>
        </Modal>
      )}

      {viewNotes && (
        <Dialog
          fullScreen
          open={viewNotes}
          onClose={() => setViewNotes(false)}
          // TransitionComponent={Transition}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setViewNotes(false)}
              aria-label="close"
            >
              X
            </IconButton>
          </Toolbar>
          <div className="grid pt-4 ">
            <div className="grid grid-cols-5 gap-4 p-4">
              {findedNotes.map((note, idx) => {
                return (
                  <div
                    className={`p-4 rounded shadow-md ${note.noteStatusColor} text-white`}
                  >
                    <div className="flex justify-between">
                      <div className="font-bold text-lg mb-2">
                        Note {idx + 1}
                      </div>
                      <div className="font-bold text-lg mb-2 cursor-pointer">
                        <Tooltip title="Delete" color="red">
                          <DeleteIcon
                            color="error"
                            onClick={() => handleDelete(note.noteId)}
                          />
                        </Tooltip>
                      </div>
                    </div>

                    <div className=" mb-2">
                      Note description: {note.noteDescription}
                    </div>
                    <div className=" mb-2">Added by: {note.createdBy}</div>
                    <div className=" mb-2">
                      Last updated by: {note?.lastUpdatedBy}
                    </div>
                    <div className="text-sm ">Created at: {note.createdAt}</div>
                    <Divider />
                    <div className="flex justify-between">
                      <div>Status:</div>
                      <div>{note.noteStatus}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Dialog>
        // <Modal

        //   width={"200vh"}
        //   open={viewNotes}
        //   centered
        //   onCancel={() => setViewNotes(false)}
        //   title={`Notes for - ${viewNotes}`}
        //   footer={
        //     <div className="flex justify-between gap-32">
        //       <MondayButton
        //         className="mondayButtonRed"
        //         onClick={() => setViewNotes(false)}
        //       >
        //         Close
        //       </MondayButton>
        //     </div>
        //   }
        // >
        // <div className="grid pt-4 ">
        //   <div className="grid grid-cols-3 gap-4 p-4">
        //     {findedNotes.map((note, idx) => {
        //       console.log({ note });
        //       return (
        //         <div
        //           className={`p-4 rounded shadow-md ${note.noteStatusColor} text-white`}
        //         >
        //           <div className="flex justify-between">
        //             <div className="font-bold text-lg mb-2">
        //               Note {idx + 1}
        //             </div>
        //             <div className="font-bold text-lg mb-2 cursor-pointer">
        //               <Tooltip title="Delete" color="red">
        //                 <DeleteIcon
        //                   color="error"
        //                   // onClick={() => handleDelete(note.noteId)}
        //                 />
        //               </Tooltip>
        //             </div>
        //           </div>

        //           <div className=" mb-2">
        //             Note description: {note.noteDescription}
        //           </div>
        //           <div className=" mb-2">Added by: {note.createdBy}</div>
        //           <div className="text-sm ">Created at: {note.createdAt}</div>
        //           <Divider />
        //           <div className="flex justify-between">
        //             <div>Status:</div>
        //             <div>{note.noteStatus}</div>
        //           </div>
        //         </div>
        //       );
        //     })}
        //   </div>
        // </div>
        // </Modal>
      )}
    </BasePage>
  );
};

export default UpdateShipments;

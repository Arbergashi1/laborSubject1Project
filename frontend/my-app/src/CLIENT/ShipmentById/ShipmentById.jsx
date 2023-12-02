import React, { useContext } from "react";
import BasePage from "../../BasePage/BasePage";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { H1 } from "../../reusable/hTags/HTags";
import WestIcon from "@mui/icons-material/West";
import { AppContext } from "../../context/appcontext";
import DeleteIcon from "@mui/icons-material/Delete";
import { Divider, Tooltip } from "antd";

const ShipmentById = () => {
  const { notesList, setNotesList } = useContext(AppContext);
  const location = useLocation();
  const { record } = location.state;
  const navigate = useNavigate();
  const specificShipmentId = record.shipmentId;

  const findedNotes = notesList?.filter(
    ({ shipmentId: listOfNotesId }) => listOfNotesId === specificShipmentId
  );

  const rows = [
    { label: "Created At", value: record.createdAt },
    { label: "Shipment Id", value: record.shipmentId },
    { label: "Receiver Name", value: record.name },
    { label: "Receiver Phone", value: record.phone },
    { label: "City", value: record.city },
    { label: "CoD", value: record.reference },
    { label: "Country", value: record.country },
    { label: "Updated At", value: record.updatedAt },
  ];

  const handleDelete = (noteIdArg) => {
    const updatedNotes = notesList.map((note) => {
      if (note.noteId === noteIdArg) {
        return {
          ...note,
          noteStatus: "Deleted",
          noteStatusColor: "bg-red-400",
        };
      }
      return note;
    });
    setNotesList(updatedNotes);
  };
  return (
    <BasePage preNavName={"Shipment Deatils"}>
      <div className="grid gap-5">
        <div
          className="w-48 flex items-center shadow-lg rounded-xl border bg-white cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          <span className="  p-2 ">
            <WestIcon />
          </span>
          <span>Go to all shipments</span>
        </div>
        <div className="flex items-center justify-center">
          <H1>Deatils for </H1> <H1>/</H1> <H1>{record.shipmentId}</H1>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className="bg-slate-800">
              <TableRow>
                <TableCell style={{ color: "white" }}>Created At</TableCell>
                <TableCell style={{ color: "white" }}>Shipment Id</TableCell>
                <TableCell style={{ color: "white" }}>Reciver Name</TableCell>
                <TableCell style={{ color: "white" }}>Reciver Phone</TableCell>
                <TableCell style={{ color: "white" }}>City</TableCell>
                <TableCell style={{ color: "white" }}>CoD</TableCell>
                <TableCell style={{ color: "white" }}>Country</TableCell>
                <TableCell style={{ color: "white" }}>Updated At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody
              style={{
                backgroundColor:
                  record.status === "Awaiting Pickup"
                    ? "#004cff"
                    : record.status === "In Delivry"
                    ? "#efe770"
                    : record.status === "Deliverd"
                    ? "#0dff00"
                    : record.status === "Refuzed"
                    ? "#de0d0d"
                    : "",
              }}
            >
              {rows.map((row) => (
                <TableCell key={row.label} style={{ color: "white" }}>
                  {row.value}
                </TableCell>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div>
          <div className="flex items-center justify-center">
            <H1>Notes</H1>
          </div>
          {findedNotes.length !== 0 ? (
            <div className="grid grid-cols-4 gap-4 p-4">
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
          ) : (
            <div className="flex justify-center">
              <H1>No notes found!</H1>
            </div>
          )}
        </div>
      </div>
    </BasePage>
  );
};

export default ShipmentById;

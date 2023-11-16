import React from "react";
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

const ShipmentById = () => {
  const location = useLocation();
  const { record } = location.state;
  const navigate = useNavigate();
  console.log({ record });

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
      </div>
    </BasePage>
  );
};

export default ShipmentById;

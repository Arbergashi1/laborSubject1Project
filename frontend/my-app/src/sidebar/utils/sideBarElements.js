import DashboardIcon from "@mui/icons-material/Dashboard";
import AddBoxIcon from "@mui/icons-material/AddBox";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import InsightsIcon from "@mui/icons-material/Insights";
import PaymentsIcon from "@mui/icons-material/Payments";
import GroupIcon from "@mui/icons-material/Group";
import BadgeIcon from "@mui/icons-material/Badge";
import NoCrashIcon from "@mui/icons-material/NoCrash";
import BugReportIcon from "@mui/icons-material/BugReport";
import ReportIcon from "@mui/icons-material/Report";

export const sideBarElements = [
  {
    label: "Shipments List",
    icon: <DashboardIcon />,
    path: "/",
  },
  {
    label: "New Shipment",
    icon: <AddBoxIcon />,
    path: "/newShipment",
  },
  {
    label: "Insights",
    icon: <InsightsIcon />,
    path: "/insights",
  },
  {
    label: "New Report",
    icon: <BugReportIcon />,
    path: "/newReport",
  },
  {
    label: "Reports List",
    icon: <ReportIcon />,
    path: "/reporstList",
  },
];

export const administrateSideBarEl = [
  {
    label: "New Client",
    icon: <AddBoxIcon />,
    path: "/newClient",
  },
  {
    label: "New Employee",
    icon: <AddBoxIcon />,
    path: "/newEmployee",
  },
  {
    label: "Clients List",
    icon: <GroupIcon />,
    path: "/clientsList",
  },
  {
    label: "Employee's List",
    icon: <BadgeIcon />,
    path: "/employeeList",
  },
  {
    label: "New Vehicle",
    icon: <NoCrashIcon />,
    path: "/newVehicle",
  },
  {
    label: "Vehicle List",
    icon: <LocalShippingIcon />,
    path: "/vehicleList",
  },
  {
    label: "Logs List",
    icon: <WorkHistoryIcon />,
    path: "/logs",
  },
  {
    label: "Reports List",
    icon: <ReportIcon />,
    path: "/reportsManagement",
  },
];

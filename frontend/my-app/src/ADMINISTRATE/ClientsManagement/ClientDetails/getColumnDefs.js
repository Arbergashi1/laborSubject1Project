import MondayButton from "../../../reusable/MondayButton/MondayButton";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
const getColumnDefs = ({ setProcessPaymentModal }) => [
  {
    title: "Full Name",
    key: "fullName",
    dataIndex: "fullName",
    align: "center",
  },
  {
    title: "Firm Name",
    key: "firmName",
    dataIndex: "firmName",
    align: "center",
  },
  {
    title: "Address",
    key: "address",
    dataIndex: "address",
    align: "center",
  },
  {
    title: "Actions",
    key: "",
    dataIndex: "",
    align: "center",
    render: () => {
      return (
        <>
          <MondayButton
            className="mondayButtonGreen"
            icon={<PriceCheckIcon />}
            onClick={() => setProcessPaymentModal(true)}
          >
            Process Payment
          </MondayButton>
        </>
      );
    },
  },
];

export default getColumnDefs;

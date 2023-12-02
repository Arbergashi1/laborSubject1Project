const getColumnDefs = ({}) => [
  {
    title: "Payment Id",
    dataIndex: "paymentId",
    key: "paymentId",
    align: "center",
  },
  {
    title: "Created at",
    dataIndex: "paymentDate",
    key: "paymentDate",
    align: "center",
  },
  {
    title: "Balance",
    dataIndex: "balance",
    key: "balance",
    align: "center",
  },
  {
    title: "Delivry Cost",
    dataIndex: "delivryCost",
    key: "delivryCost",
    align: "center",
  },
  {
    title: "Actions",
    dataIndex: "",
    key: "",
    align: "center",
  },
];

export default getColumnDefs;

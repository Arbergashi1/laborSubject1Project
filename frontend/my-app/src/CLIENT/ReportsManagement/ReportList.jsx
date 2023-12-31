import React, { useContext, useState } from "react";
import BasePage from "../../BasePage/BasePage";
import { AppContext } from "../../context/appcontext";
import { Card as AntdCard, message } from "antd";
import axios from "axios";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Card from "../../reusable/Card/Card";
import { useDocumentTile } from "../../hooks/useDocumentTile";

const ReportList = () => {
  useDocumentTile({ title: "Reports | ADMINISTRATE | KSD" });
  const { reportsList, setReportsList, currentUserLoggedIn } =
    useContext(AppContext);

  const [openedReportId, setOpenedReportId] = useState(null);
  const [loading, setLoading] = useState(false);

  const openResponse = (reportId) => {
    setOpenedReportId(reportId);
  };

  const authenticatedReports = reportsList.filter(
    ({ userId }) => userId === currentUserLoggedIn?.clientId
  );

  return (
    <BasePage preNavName={"Report List"}>
      <div className="grid gap-5">
        <div
          style={{
            display: "flex",
            gap: "15px",
            padding: "10px",
            borderRadius: "20px",
            boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
            backgroundColor: "white",
          }}
        >
          <Card
            background={"#de0d0d"}
            string={"Denied"}
            number={
              authenticatedReports.filter(
                ({ statusOfReport }) => statusOfReport === "Denied"
              ).length
            }
          />
          <Card
            background={"#0dff00"}
            string={"Reviewed"}
            number={
              authenticatedReports.filter(
                ({ statusOfReport }) => statusOfReport === "Reviewed"
              ).length
            }
          />
          <Card
            background={"#efe770"}
            string={"In Review"}
            number={
              authenticatedReports.filter(
                ({ statusOfReport }) => statusOfReport === "In Review"
              ).length
            }
          />
        </div>
        <div
          className={`grid grid-cols-3 gap-3 ${
            openedReportId !== null && "grid-cols-1"
          }`}
        >
          {authenticatedReports.map((report) => {
            const reportsColors =
              report.statusOfReport === "In Review"
                ? "bg-yellow-200"
                : report.statusOfReport === "Reviewed"
                ? "bg-green-400"
                : report.statusOfReport === "Denied"
                ? "bg-red-500"
                : "";

            const excludedKeys = ["userId", "reportId"];

            const finalValues = {};

            Object.keys(report).forEach((key) => {
              if (!excludedKeys.includes(key)) {
                finalValues[key] = report[key];
              }
            });

            const filteredKeys = Object.keys(finalValues).filter((key) => {
              return finalValues[key] !== "";
            });

            const handleDelete = (report) => {
              setLoading(true);
              const apiUrl = `https://localhost:44312/api/ReportsManagement/DeleteReport/${report.reportId}`;

              axios.delete(apiUrl).then((res) => {
                if (res.data.statusCode === 200) {
                  message.success(res.data.statusMessage);
                  setReportsList((prev) =>
                    prev.filter((rep) => rep.reportId !== report.reportId)
                  );
                  setLoading(false);
                } else {
                  message.error(res.data.statusMessage);
                }
              });
            };

            return (
              <>
                {openedReportId === report.reportId && (
                  <AntdCard
                    actions={[
                      <div
                        className="text-blue-600 font-bold"
                        onClick={() => setOpenedReportId(null)}
                      >
                        Go Back
                      </div>,
                    ]}
                  >
                    <div className="grid gap-5 justify-center">
                      <span className="font-medium">
                        This Report has been Reviewed with response -
                      </span>
                      <div
                        className="flex justify-between items-center bg-slate-100 p-1 rounded-md cursor-pointer"
                        onClick={() => openResponse(report.reportId)}
                      >
                        <span className="font-medium">
                          {report.reportResponse}
                        </span>
                      </div>
                    </div>
                  </AntdCard>
                )}
                {openedReportId === null && (
                  <AntdCard
                    loading={loading}
                    key={report.reportId}
                    title={
                      <div className="flex justify-between items-center">
                        <span>{report.reportCategory}</span>
                        <span className={`p-1 rounded-md ${reportsColors}`}>
                          {report.statusOfReport}
                        </span>
                      </div>
                    }
                    actions={[
                      <div
                        className={`text-red-600 font-bold ${
                          report.statusOfReport !== "In Review" &&
                          "cursor-not-allowed text-red-200"
                        }`}
                        onClick={() => {
                          report.statusOfReport === "In Review" &&
                            handleDelete(report);
                        }}
                      >
                        Delete
                      </div>,
                      // <div className="text-blue-800 font-bold">Details</div>,
                    ]}
                  >
                    {report.statusOfReport !== "In Review" ? (
                      <div className="grid gap-5 justify-center mb-9">
                        <span className="font-medium mt-14">
                          This Report has been Reviewed
                        </span>
                        <div
                          className="flex justify-between items-center bg-slate-100 p-1 rounded-md cursor-pointer"
                          onClick={() => openResponse(report.reportId)}
                        >
                          <span className="font-medium">Check Response</span>
                          <span>
                            <OpenInNewIcon />
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between">
                        <div className="grid gap-2">
                          {filteredKeys.map((item) => {
                            return <div key={item}>{item}:</div>;
                          })}
                        </div>
                        <div className="grid gap-2">
                          {Object.values(finalValues)
                            .filter(Boolean)
                            .map((item) => {
                              return <div>{item}</div>;
                            })}
                        </div>
                      </div>
                    )}
                    {openedReportId === report.reportId && (
                      <AntdCard></AntdCard>
                    )}
                  </AntdCard>
                )}
              </>
            );
          })}
        </div>
      </div>
    </BasePage>
  );
};

export default ReportList;

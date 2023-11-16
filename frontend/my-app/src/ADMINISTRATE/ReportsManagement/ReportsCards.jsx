import React, { useContext, useState } from "react";
import BasePage from "../../BasePage/BasePage";
import { Card, Divider, Input, Popover, message } from "antd";
import MondayButton from "../../reusable/MondayButton/MondayButton";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { UseDateReader } from "../../hooks/UseDateReader";
import axios from "axios";
import useSendNotification from "../../hooks/useSendNotification";

const ReportsCards = ({ report, index, setReportsList, reportsList }) => {
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [trackStatusChanger, setTrackStatusChanger] = useState(false);
  const [reportResponse, setReportResponse] = useState("");
  const [finalResponse, setFinalResponse] = useState(false);
  const { TextArea } = Input;
  const sendNotification = useSendNotification();

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

  const handlePopoverOpen = () => {
    setPopoverVisible((prev) => !prev);
  };

  const handlePopoverClose = () => {
    setPopoverVisible(false);
    setFinalResponse(false);
  };

  const handleUpdateStatus = (reportId, fnlRes) => {
    const apiUrl = `https://localhost:44312/api/ReportsManagement/EditReport/${reportId}`;
    const updatedObject = reportsList
      ?.map((report) => {
        if (report.reportId === reportId) {
          return {
            ...report,
            statusOfReport: fnlRes,
            updatedAt: UseDateReader(Date.now()),
            reportResponse: reportResponse,
          };
        }
        return report;
      })
      ?.find((report) => report?.reportId === reportId);
    axios
      .put(apiUrl, updatedObject)
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success(res.data.statusMessage);
          sendNotification({
            notificationToShowIn: "Client",
            notificationDescription: `Report Reviewed with status - ${reportResponse}`,
            notificationsDetails: "",
            notificationToSendTo: report.userId,
          });

          setReportsList((prev) =>
            prev.map((report) => {
              if (report.reportId === reportId) {
                return {
                  ...report,
                  statusOfReport: fnlRes,
                  updatedAt: UseDateReader(Date.now()),
                  reportResponse: reportResponse,
                };
              }
              return report;
            })
          );
        } else {
          message.error(res.data.statusMessage);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Card
      title={
        <div className="flex justify-between items-center">
          <span>{report.reportCategory}</span>
          <span className={`p-1 rounded-md ${reportsColors}`}>
            {report.statusOfReport}
          </span>
        </div>
      }
      actions={[
        <div className="text-orange-500 font-bold">
          <Popover
            color={
              finalResponse === "Reviewed"
                ? "green"
                : finalResponse === "Denied"
                ? "red"
                : "gold"
            }
            trigger="click"
            visible={popoverVisible}
            content={
              <div className="grid gap-5 items-center justify-center">
                {trackStatusChanger ? (
                  <span className="font-bold text-white">
                    Report Reviewed Successfully
                  </span>
                ) : (
                  <span className="font-bold text-white">
                    If you have read the report, you can mark it as Reviewed
                  </span>
                )}
                <hr />

                <div className="flex gap-2 justify-center items-center">
                  <span className="font-medium text-white">
                    Response of Review:
                  </span>
                  <TextArea
                    style={{ width: "50%" }}
                    placeholder="Response here..."
                    onChange={(e) => setReportResponse(e.target.value)}
                    disabled={trackStatusChanger}
                  />
                </div>

                <div className="text-center">
                  {trackStatusChanger ? (
                    <AddTaskIcon color="primary" />
                  ) : (
                    <div className="flex gap-10">
                      <MondayButton
                        disabled={reportResponse === ""}
                        className="mondayButtonBlue"
                        onClick={() => {
                          //   setTimeout(() => {
                          //     handlePopoverClose();
                          //   }, 1000);
                          //   setTrackStatusChanger(true);
                          setFinalResponse(true);
                          //   handleUpdateStatus(report.reportId);
                        }}
                      >
                        Mark Reviewed
                      </MondayButton>

                      <MondayButton
                        className="mondayButtonRed"
                        onClick={handlePopoverClose}
                      >
                        Close
                      </MondayButton>
                    </div>
                  )}
                </div>

                {finalResponse && (
                  <>
                    <hr />
                    <div className="flex gap-10">
                      <MondayButton
                        className="mondayButtonGreen"
                        onClick={() => {
                          setTimeout(() => {
                            handlePopoverClose();
                          }, 1000);
                          setTrackStatusChanger(true);
                          setFinalResponse("Reviewed");
                          handleUpdateStatus(report.reportId, "Reviewed");
                        }}
                      >
                        Reviewed
                      </MondayButton>
                      <MondayButton
                        className="mondayButtonRed"
                        onClick={() => {
                          setTimeout(() => {
                            handlePopoverClose();
                          }, 1000);
                          setTrackStatusChanger(true);
                          setFinalResponse("Denied");
                          handleUpdateStatus(report.reportId, "Denied");
                        }}
                      >
                        Denied
                      </MondayButton>
                    </div>
                  </>
                )}
              </div>
            }
          >
            <span onClick={handlePopoverOpen}>
              {trackStatusChanger ? (
                <span className="bg-green-400 text-white p-1.5 rounded-md">
                  Report Has Been Reviewed
                </span>
              ) : (
                <span className="bg-yellow-200 text-black p-1.5 rounded-md">
                  Update Status
                </span>
              )}
            </span>
          </Popover>
        </div>,
        <div className="text-blue-800 font-bold">Details</div>,
      ]}
    >
      <div className="flex justify-between">
        <div className="grid gap-2">
          {filteredKeys.map((item) => (
            <div key={item}>{item}:</div>
          ))}
        </div>
        <div className="grid gap-2">
          {Object.values(finalValues)
            .filter(Boolean)
            .map((item) => (
              <div key={item}>{item}</div>
            ))}
        </div>
      </div>
    </Card>
  );
};

export default ReportsCards;

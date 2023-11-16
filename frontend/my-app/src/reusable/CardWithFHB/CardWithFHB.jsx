import React from "react";
import MondayButton from "../MondayButton/MondayButton";

const CardWithFHB = ({ title, bgColor, body, footer, status }) => {
  return (
    <div className="border bg-white rounded-md h-64">
      <div
        className={`flex justify-between items-center border-b-2 p-2 ${bgColor}`}
      >
        <span>{title}</span>
        <span
          className={`border ${
            bgColor === "In Review"
              ? "bg-yellow-400"
              : status === "Reviewed"
              ? "bg-green-200"
              : ""
          } text-white rounded-lg p-1`}
        >
          {status}
        </span>
      </div>
      <div className="p-2 grid gap-1">
        {body &&
          body?.map((el) => {
            const excludedKeys = ["userId", "reportId"];
            const finalValues = {};
            Object.keys(el).forEach((key) => {
              if (!excludedKeys.includes(key)) {
                finalValues[key] = el[key];
              }
            });

            return (
              <div className="flex justify-between">
                <div className="grid gap-2">
                  {Object.keys(finalValues).map((item) => {
                    return <div key={item}>{item}:</div>;
                  })}
                </div>
                <div className="grid">
                  {Object.values(finalValues).map((item) => {
                    return <div>{item}</div>;
                  })}
                </div>
              </div>
            );
          })}
      </div>
      <div className="border-t-2">
        <div className="flex justify-between p-2 gap-2">
          <MondayButton className="mondayButtonRed">Delete Report</MondayButton>
          <MondayButton className="mondayButtonBlue" disabled={true}>
            Open Deatils
          </MondayButton>
        </div>
      </div>
    </div>
  );
};

export default CardWithFHB;

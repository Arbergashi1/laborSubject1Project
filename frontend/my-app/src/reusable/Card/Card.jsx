import ScaleLoader from "react-spinners/ScaleLoader";
import "./Card.scss";

const Card = ({ background, number, string, timeFiltering }) => {
  const currentDate = new Date();
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };
  const currentDateString = currentDate.toLocaleString("en-US", options);

  const totalSum = timeFiltering
    ? number.length
    : Array.isArray(number)
    ? number.filter(({ updatedAt, createdAt }) => {
        const updatedDate =
          updatedAt?.split(",")[0] || createdAt?.split(",")[0];
        const currentDatePart = currentDateString?.split(",")[0];
        console.log({ updatedDate });

        return updatedDate === currentDatePart;
      }).length
    : number;

  return (
    <div className="cardWrapper" style={{ backgroundColor: background }}>
      <div className="cardElements">
        <div className="cardElementNumber">
          {Array.isArray(number) ? totalSum : number}

          {/* {!number && number !== 0 ? <ScaleLoader color="#fff" /> : number} */}
        </div>
        <div className="cardElementText">{string}</div>
      </div>
    </div>
  );
};

export default Card;

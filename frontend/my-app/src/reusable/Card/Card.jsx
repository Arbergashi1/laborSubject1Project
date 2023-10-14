import ScaleLoader from "react-spinners/ScaleLoader";
import "./Card.scss";

const Card = ({ background, number, string }) => {
  return (
    <div className="cardWrapper" style={{ backgroundColor: background }}>
      <div className="cardElements">
        <div className="cardElementNumber">
          {!number && number !== 0 ? <ScaleLoader color="#fff" /> : number}
        </div>
        <div className="cardElementText">{string}</div>
      </div>
    </div>
  );
};

export default Card;

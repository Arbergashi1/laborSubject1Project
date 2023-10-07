import "./MondayButton.scss";

const MondayButton = ({ children, className, onClick, disabled, style }) => {
  return (
    <button
      className={`mondayButton${className}`}
      style={style}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default MondayButton;

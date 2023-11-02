import "./MondayButton.scss";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const MondayButton = ({
  children,
  className,
  onClick,
  disabled,
  style,
  loading,
}) => {
  console.log({ children, className, onClick, disabled, style, loading });
  const classNamesToStyles = {
    mondayButtonRed: {
      base: "bg-red-500 text-white w-full rounded h-8 font-bold cursor-pointer",
      disabled: "opacity-50 !cursor-not-allowed",
    },
    mondayButtonBlue: {
      base: "bg-blue-500 text-white w-full rounded h-8 font-bold cursor-pointer",
      disabled: "opacity-50 !cursor-not-allowed",
    },
    mondayButtonGreen: {
      base: "bg-green-500 text-white w-full rounded h-8 font-bold cursor-pointer",
      disabled: "opacity-50 !cursor-not-allowed",
    },
    mondayButtonYellow: {
      base: "bg-yellow-500 text-white w-full rounded h-8 font-bold cursor-pointer",
      disabled: "opacity-50 !cursor-not-allowed",
    },
  };

  const buttonStyle = classNamesToStyles[className];
  return (
    <button
      className={`${buttonStyle?.base} ${
        disabled ? buttonStyle?.disabled : ""
      }`}
      style={style}
      onClick={onClick}
      disabled={disabled}
    >
      {loading ? (
        <div className="flex gap-5 items-center justify-center">
          <LoadingOutlined
            style={{
              fontSize: 24,
            }}
            spin
          />
          {children}
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default MondayButton;

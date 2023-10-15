import { Input } from "antd";
import "./Form.scss";
import MondayButton from "../MondayButton/MondayButton";
import { useNavigate } from "react-router-dom";

const Form = ({
  inputStructure,
  onChange,
  clickEvent,
  goBackButtonClick,
  createButtonText,
}) => {
  const navigate = useNavigate();

  const headingOfInpput = Object.keys(inputStructure);
  const handleInputChange = (section, field, value) => {
    onChange(section, field, value);
  };
  const { TextArea } = Input;

  return (
    <>
      <div className="formWrapper">
        {headingOfInpput.map((el) => {
          return (
            <div>
              <h2>{el}</h2>
              <div className="areaFormInput">
                {Object.values(
                  inputStructure[el].map((field) => {
                    return (
                      <div className="spanInputForm">
                        <span className="spanForm">{field.title}</span>
                        {field.type === "area" ? (
                          <TextArea
                            className="inputForm"
                            placeholder={field.placeholder}
                            onChange={(e) =>
                              handleInputChange(el, field.field, e.target.value)
                            }
                          />
                        ) : field.type === "select" ? (
                          <select
                            className="inputForm"
                            onChange={(e) =>
                              handleInputChange(el, field.field, e.target.value)
                            }
                          >
                            {field.options.map((el) => {
                              return (
                                <option value={el.field}>{el.label}</option>
                              );
                            })}
                          </select>
                        ) : (
                          <Input
                            value={field?.initialValue}
                            disabled={field?.initialValue}
                            className="inputForm"
                            placeholder={field.placeholder}
                            onChange={(e) =>
                              handleInputChange(el, field.field, e.target.value)
                            }
                          />
                        )}
                      </div>
                    );
                  })
                )}
              </div>
              <div
                style={{
                  marginTop: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {el !== "Sender Info" && (
                  <>
                    <MondayButton
                      className="Yellow"
                      onClick={
                        goBackButtonClick
                          ? goBackButtonClick
                          : () => {
                              navigate("/");
                            }
                      }
                    >
                      Go Back
                    </MondayButton>
                    <MondayButton className="Green" onClick={clickEvent}>
                      {createButtonText ? createButtonText : "Add Shipment"}
                    </MondayButton>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Form;

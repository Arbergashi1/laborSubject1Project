import { Input } from "antd";
import "./Form.scss";
import MondayButton from "../MondayButton/MondayButton";
import { useNavigate } from "react-router-dom";
import { H1 } from "../hTags/HTags";

const Form = ({
  inputStructure,
  onChange,
  clickEvent,
  goBackButtonClick,
  createButtonText,
  loading,
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
              <H1>{el}</H1>
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
                              handleInputChange(
                                el,
                                field.field || field.value,
                                e.target.value
                              )
                            }
                          >
                            {field.options.map((el) => {
                              return (
                                <option value={el.field || el.value}>
                                  {el.label || el.value}
                                </option>
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
                  margin: "10px 0 10px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {el !== "Sender Info" && (
                  <div className="flex gap-10 flex-grow">
                    <MondayButton
                      loading={loading}
                      disabled={loading}
                      className="mondayButtonYellow"
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
                    <MondayButton
                      className="mondayButtonGreen"
                      onClick={clickEvent}
                      loading={loading}
                      disabled={loading}
                    >
                      {createButtonText ? createButtonText : "Add Shipment"}
                    </MondayButton>
                  </div>
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

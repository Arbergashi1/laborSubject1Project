import "./PrintShipment.scss";
import Logo from "../../../sidebar/utils/logoOfLab.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/appcontext";
import MondayButton from "../../../reusable/MondayButton/MondayButton";
import useSaveLogs from "../../../hooks/UseSaveLogs";
import { Html5QrcodeScanner } from "html5-qrcode";

const PrintShipment = () => {
  // const [scanResult, setScanResult] = useState("");
  const saveLogs = useSaveLogs();
  const location = useLocation();
  const navigate = useNavigate();
  const { record } = location.state;
  const { currentUserLoggedIn } = useContext(AppContext);
  console.log({ record });

  // useEffect(() => {
  //   const scanner = new Html5QrcodeScanner("reader", {
  //     qrbox: {
  //       width: 250,
  //       height: 250,
  //     },
  //     fps: 5,
  //   });

  //   function success(result) {
  //     scanner.clear();
  //     setScanResult(result);
  //   }
  //   function error(err) {
  //     console.log({ err });
  //   }
  //   scanner.render(success, error);
  // }, []);

  const handlePrint = () => {
    setTimeout(() => {
      window.print();
    }, 500);
    saveLogs({
      actionType: "Print",
      previousData: "",
      updatedData: record.shipmentId,
    });
  };

  const goBack = () => {
    navigate("/");
  };

  return (
    <>
      <div className="print-wrapper">
        <div className="wpcargo-result-print">
          <div className="printheader" style={{ width: "100%" }}>
            <table style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <td style={{ textAlign: "center" }}>
                    <img src={Logo} height={50} />
                  </td>
                  <td style={{ textAlign: "center" }}>KSD-DELIVRY </td>
                  <td
                    style={{
                      display: "grid",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {/* {scanResult !== "" ? (
                      <div>
                        Success{" "}
                        <a href={"http://" + scanResult}>{scanResult}</a>
                      </div>
                    ) : (
                      <div id="reader"></div>
                    )} */}
                    <img
                      src={"https://img.icons8.com/ios/100/barcode.png"}
                      width={250}
                    />{" "}
                    #{record.shipmentId}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="print-shipper-info">
              <div className="col-6" style={{ float: "left", width: "50%" }}>
                <table style={{ width: "100%" }}>
                  <tbody>
                    <tr style={{ border: "solid 1px #ccc", height: "30px" }}>
                      <td
                        style={{ border: "solid 1px #000", paddingLeft: "5px" }}
                      >
                        <div className="sender_row_title">pickup at</div>
                        <div className="sender_row_body">
                          {currentUserLoggedIn.firmName}
                        </div>
                      </td>
                    </tr>
                    <tr style={{ border: "solid 1px #ccc", height: "30px" }}>
                      <td
                        style={{ border: "solid 1px #000", paddingLeft: "5px" }}
                      >
                        <div className="sender_row_title">Address</div>
                        <div className="sender_row_body">
                          {currentUserLoggedIn?.address}
                        </div>
                      </td>
                    </tr>
                    <tr style={{ border: "solid 1px #ccc", height: "30px" }}>
                      <td
                        style={{ border: "solid 1px #000", paddingLeft: "5px" }}
                      >
                        <div className="sender_row_title">State</div>
                        <div className="sender_row_body">
                          {currentUserLoggedIn?.state}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-6" style={{ float: "right", width: "50%" }}>
                <table
                  style={{
                    width: "90%",
                    marginLeft: "15px",
                    marginBottom: "5px",
                  }}
                >
                  <tbody>
                    <tr style={{ border: "solid 1px #ccc", height: "30px" }}>
                      <td
                        style={{ border: "solid 1px #000", paddingLeft: "5px" }}
                        colSpan="3"
                      >
                        <div className="sender_row_title">Deliver To</div>
                        <div className="sender_row_body">{record.name}</div>
                      </td>
                      <tr style={{ border: "solid 1px #ccc", height: "30px" }}>
                        <td
                          style={{
                            border: "solid 1px #000",
                            paddingLeft: "5px",
                          }}
                          // colSpan="3"
                        >
                          <div className="sender_row_title">COD</div>
                          <div className="sender_row_body">
                            {record.reference}
                          </div>
                        </td>
                      </tr>
                    </tr>
                    <tr style={{ border: "solid 1px #ccc", height: "30px" }}>
                      <td
                        style={{ border: "solid 1px #000", paddingLeft: "5px" }}
                        colSpan="3"
                      >
                        <div className="sender_row_title">Address</div>
                        <div className="sender_row_body">{record.address}</div>
                      </td>
                    </tr>

                    <tr style={{ border: "solid 1px #ccc", height: "30px" }}>
                      <td
                        style={{ border: "solid 1px #000", paddingLeft: "5px" }}
                        colSpan="3"
                      >
                        <div className="sender_row_title">City</div>
                        <div className="sender_row_body">{record.city}</div>
                      </td>
                    </tr>

                    <tr style={{ border: "solid 1px #ccc", height: "30px" }}>
                      <td
                        style={{ border: "solid 1px #000", paddingLeft: "5px" }}
                      >
                        <div className="sender_row_title">Phone Number</div>
                        <div className="sender_row_body">{record.phone}</div>
                      </td>
                      <td
                        style={{ border: "solid 1px #000", paddingLeft: "5px" }}
                        colSpan="2"
                      >
                        <div className="sender_row_title">A lejohet hapja</div>
                        <div className="sender_row_body">
                          {record.doYouLetOpen}
                        </div>
                      </td>
                      <td colSpan="2"></td>
                      <td
                        style={{ border: "solid 1px #000", paddingLeft: "5px" }}
                      >
                        <div className="sender_row_title">Created At</div>
                        <div className="sender_row_body">
                          {record.updatedAt}
                        </div>
                      </td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {} */}
      <div className="print-wrapper">
        <div className="wpcargo-result-print">
          <div className="printheader" style={{ width: "100%" }}>
            <table style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <td style={{ textAlign: "center" }}>
                    <img src={Logo} height={50} />
                  </td>
                  <td style={{ textAlign: "center" }}>KSD-DELIVRY </td>
                  <td
                    style={{
                      display: "grid",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={"https://img.icons8.com/ios/100/barcode.png"}
                      width={250}
                    />{" "}
                    #{record.shipmentId}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="print-shipper-info">
              <div className="col-6" style={{ float: "left", width: "50%" }}>
                <table style={{ width: "100%" }}>
                  <tbody>
                    <tr style={{ border: "solid 1px #ccc", height: "30px" }}>
                      <td
                        style={{ border: "solid 1px #000", paddingLeft: "5px" }}
                      >
                        <div className="sender_row_title">pickup at</div>
                        <div className="sender_row_body">
                          {currentUserLoggedIn.firmName}
                        </div>
                      </td>
                    </tr>
                    <tr style={{ border: "solid 1px #ccc", height: "30px" }}>
                      <td
                        style={{ border: "solid 1px #000", paddingLeft: "5px" }}
                      >
                        <div className="sender_row_title">Address</div>
                        <div className="sender_row_body">
                          {currentUserLoggedIn?.address}
                        </div>
                      </td>
                    </tr>
                    <tr style={{ border: "solid 1px #ccc", height: "30px" }}>
                      <td
                        style={{ border: "solid 1px #000", paddingLeft: "5px" }}
                      >
                        <div className="sender_row_title">State</div>
                        <div className="sender_row_body">
                          {currentUserLoggedIn?.state}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-6" style={{ float: "right", width: "50%" }}>
                <table
                  style={{
                    width: "90%",
                    marginLeft: "15px",
                    marginBottom: "5px",
                  }}
                >
                  <tbody>
                    <tr style={{ border: "solid 1px #ccc", height: "30px" }}>
                      <td
                        style={{ border: "solid 1px #000", paddingLeft: "5px" }}
                        colSpan="3"
                      >
                        <div className="sender_row_title">Deliver To</div>
                        <div className="sender_row_body">{record.name}</div>
                      </td>
                      <tr style={{ border: "solid 1px #ccc", height: "30px" }}>
                        <td
                          style={{
                            border: "solid 1px #000",
                            paddingLeft: "5px",
                          }}
                          // colSpan="3"
                        >
                          <div className="sender_row_title">COD</div>
                          <div className="sender_row_body">
                            {record.reference}
                          </div>
                        </td>
                      </tr>
                    </tr>
                    <tr style={{ border: "solid 1px #ccc", height: "30px" }}>
                      <td
                        style={{ border: "solid 1px #000", paddingLeft: "5px" }}
                        colSpan="3"
                      >
                        <div className="sender_row_title">Address</div>
                        <div className="sender_row_body">{record.address}</div>
                      </td>
                    </tr>

                    <tr style={{ border: "solid 1px #ccc", height: "30px" }}>
                      <td
                        style={{ border: "solid 1px #000", paddingLeft: "5px" }}
                        colSpan="3"
                      >
                        <div className="sender_row_title">City</div>
                        <div className="sender_row_body">{record.city}</div>
                      </td>
                    </tr>

                    <tr style={{ border: "solid 1px #ccc", height: "30px" }}>
                      <td
                        style={{ border: "solid 1px #000", paddingLeft: "5px" }}
                      >
                        <div className="sender_row_title">Phone Number</div>
                        <div className="sender_row_body">{record.phone}</div>
                      </td>
                      <td
                        style={{ border: "solid 1px #000", paddingLeft: "5px" }}
                        colSpan="2"
                      >
                        <div className="sender_row_title">A lejohet hapja</div>
                        <div className="sender_row_body">
                          {record.doYouLetOpen}
                        </div>
                      </td>
                      <td colSpan="2"></td>
                      <td
                        style={{ border: "solid 1px #000", paddingLeft: "5px" }}
                      >
                        <div className="sender_row_title">Created At</div>
                        <div className="sender_row_body">
                          {record.updatedAt}
                        </div>
                      </td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {} */}
      <div className="print-wrapper">
        <div className="wpcargo-result-print">
          <div className="printheader" style={{ width: "100%" }}>
            <table style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <td style={{ textAlign: "center" }}>
                    <img src={Logo} height={50} />
                  </td>
                  <td style={{ textAlign: "center" }}>KSD-DELIVRY </td>
                  <td
                    style={{
                      display: "grid",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={"https://img.icons8.com/ios/100/barcode.png"}
                      width={250}
                    />{" "}
                    #{record.shipmentId}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="print-shipper-info">
              <div className="col-6" style={{ float: "left", width: "50%" }}>
                <table style={{ width: "100%" }}>
                  <tbody>
                    <tr style={{ border: "solid 1px #ccc", height: "30px" }}>
                      <td
                        style={{ border: "solid 1px #000", paddingLeft: "5px" }}
                      >
                        <div className="sender_row_title">pickup at</div>
                        <div className="sender_row_body">
                          {currentUserLoggedIn.firmName}
                        </div>
                      </td>
                    </tr>
                    <tr style={{ border: "solid 1px #ccc", height: "30px" }}>
                      <td
                        style={{ border: "solid 1px #000", paddingLeft: "5px" }}
                      >
                        <div className="sender_row_title">Address</div>
                        <div className="sender_row_body">
                          {currentUserLoggedIn?.address}
                        </div>
                      </td>
                    </tr>
                    <tr style={{ border: "solid 1px #ccc", height: "30px" }}>
                      <td
                        style={{ border: "solid 1px #000", paddingLeft: "5px" }}
                      >
                        <div className="sender_row_title">State</div>
                        <div className="sender_row_body">
                          {currentUserLoggedIn?.state}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-6" style={{ float: "right", width: "50%" }}>
                <table
                  style={{
                    width: "90%",
                    marginLeft: "15px",
                    marginBottom: "5px",
                  }}
                >
                  <tbody>
                    <tr style={{ border: "solid 1px #ccc", height: "30px" }}>
                      <td
                        style={{ border: "solid 1px #000", paddingLeft: "5px" }}
                        colSpan="3"
                      >
                        <div className="sender_row_title">Deliver To</div>
                        <div className="sender_row_body">{record.name}</div>
                      </td>
                      <tr style={{ border: "solid 1px #ccc", height: "30px" }}>
                        <td
                          style={{
                            border: "solid 1px #000",
                            paddingLeft: "5px",
                          }}
                          // colSpan="3"
                        >
                          <div className="sender_row_title">COD</div>
                          <div className="sender_row_body">
                            {record.reference}
                          </div>
                        </td>
                      </tr>
                    </tr>
                    <tr style={{ border: "solid 1px #ccc", height: "30px" }}>
                      <td
                        style={{ border: "solid 1px #000", paddingLeft: "5px" }}
                        colSpan="3"
                      >
                        <div className="sender_row_title">Address</div>
                        <div className="sender_row_body">{record.address}</div>
                      </td>
                    </tr>

                    <tr style={{ border: "solid 1px #ccc", height: "30px" }}>
                      <td
                        style={{ border: "solid 1px #000", paddingLeft: "5px" }}
                        colSpan="3"
                      >
                        <div className="sender_row_title">City</div>
                        <div className="sender_row_body">{record.city}</div>
                      </td>
                    </tr>

                    <tr style={{ border: "solid 1px #ccc", height: "30px" }}>
                      <td
                        style={{ border: "solid 1px #000", paddingLeft: "5px" }}
                      >
                        <div className="sender_row_title">Phone Number</div>
                        <div className="sender_row_body">{record.phone}</div>
                      </td>
                      <td
                        style={{ border: "solid 1px #000", paddingLeft: "5px" }}
                        colSpan="2"
                      >
                        <div className="sender_row_title">A lejohet hapja</div>
                        <div className="sender_row_body">
                          {record.doYouLetOpen}
                        </div>
                      </td>
                      <td colSpan="2"></td>
                      <td
                        style={{ border: "solid 1px #000", paddingLeft: "5px" }}
                      >
                        <div className="sender_row_title">Created At</div>
                        <div className="sender_row_body">
                          {record.updatedAt}
                        </div>
                      </td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        <MondayButton className="Yellow" onClick={goBack}>
          GO BACK
        </MondayButton>
        <MondayButton className="Blue" onClick={handlePrint}>
          PRINT
        </MondayButton>
      </div>
    </>
  );
};

export default PrintShipment;

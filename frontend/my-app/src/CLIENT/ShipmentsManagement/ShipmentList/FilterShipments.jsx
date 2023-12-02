import { Input, Radio, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import MondayButton from "../../../reusable/MondayButton/MondayButton";
import { useState } from "react";
import axios from "axios";

const FilterShipments = ({
  filters,
  setFilters,
  preferences,
  setShipmentsList,
  clickedApply,
  setClickedApply,
}) => {
  const buttonDisabled =
    filters.searchById !== "" ||
    filters.searchByName !== "" ||
    filters.searchByCity !== "" ||
    filters.searchByStatus !== "" ||
    filters.searchByPayment;

  const applyFilter = () => {
    setClickedApply(true);

    const filteredOptions = preferences.filter((option) => {
      const { name, shipmentId, city, status, isPaid } = option;

      const lowercasedShipmentId = shipmentId?.toLowerCase()?.trim();
      const lowercasedFullName = name?.toLowerCase()?.trim();
      const lowercasedCity = city?.toLowerCase()?.trim();
      const lowercasedStatus = status?.toLowerCase()?.trim();

      const searchId = filters?.searchById?.toLowerCase()?.trim();
      const searchName = filters?.searchByName?.toLowerCase()?.trim();
      const searchCity = filters?.searchByCity?.toLowerCase()?.trim();
      const searchStatus = filters?.searchByStatus?.toLowerCase()?.trim();
      const searchPayment = filters?.searchByPayment;

      // Check only one condition based on the selected criteria
      if (searchId) {
        return lowercasedShipmentId?.includes(searchId);
      }
      if (searchName) {
        return lowercasedFullName?.includes(searchName);
      }
      if (searchCity) {
        return lowercasedCity?.includes(searchCity);
      }
      if (searchStatus) {
        return lowercasedStatus?.includes(searchStatus);
      }
      if (searchPayment !== undefined) {
        return isPaid === searchPayment;
      }

      // If no criteria is selected, return true to include all items
      return true;
    });

    setShipmentsList(filteredOptions);
  };

  const clearFilters = () => {
    axios
      .get("https://localhost:44312/api/ShipmentsManagement/GetListOfShipments")
      .then((res) => {
        setShipmentsList(res.data.listOfShipments);
      })
      .catch((Err) => console.log({ Err }));
    setFilters({
      searchById: "",
      searchByName: "",
      searchByCity: "",
      searchByStatus: "",
      searchByPayment: "",
    });
    setClickedApply(false);
  };

  return (
    <div className="bg-white border mb-5 rounded-md p-3 flex gap-5">
      <div className="grid gap-2 w-1/4">
        <div>Shipmpent Id</div>
        <div>
          <Input
            value={filters.searchById}
            placeholder="search by tracking id..."
            prefix={<SearchOutlined />}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, searchById: e.target.value }))
            }
          />
        </div>
      </div>
      <div className="grid gap-2 w-1/4">
        <div>Name</div>
        <div>
          <Input
            value={filters.searchByName}
            placeholder="search by name..."
            prefix={<SearchOutlined />}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, searchByName: e.target.value }))
            }
          />
        </div>
      </div>

      <div className="grid gap-2 w-1/4">
        <div>City</div>
        <div>
          <Input
            value={filters.searchByCity}
            placeholder="search by city id..."
            prefix={<SearchOutlined />}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, searchByCity: e.target.value }))
            }
          />
        </div>
      </div>

      <div className="grid gap-2 w-1/4">
        <div>Shipment Status</div>
        <div>
          <Select
            style={{ width: "100%" }}
            value={filters.searchByStatus}
            placeholder="search by tracking id..."
            showSearch
            options={[
              { label: "Deliverd", value: "Deliverd" },
              { label: "In Delivry", value: "In Delivry" },
              { label: "Refuzed", value: "Refuzed" },
            ]}
            onChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                searchByStatus: value,
              }))
            }
          />
        </div>
      </div>
      <div className="grid gap-2 w-1/4">
        <div>Payment</div>
        <div>
          <Radio.Group
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                searchByPayment: e.target.value,
              }))
            }
            value={filters.searchByPayment}
          >
            <Radio value={true}>Paid</Radio>
            <Radio value={false}>Not Paid</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="grid gap-2 w-1/4">
        <div>Confirm</div>
        <div>
          {clickedApply ? (
            <MondayButton className="mondayButtonRed" onClick={clearFilters}>
              Clear Filters
            </MondayButton>
          ) : (
            <MondayButton
              className="mondayButtonGreen"
              disabled={!buttonDisabled}
              onClick={applyFilter}
            >
              Apply Filters
            </MondayButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterShipments;

import React from "react";
import AdminPieChartComponent from "../../charts/AdminPieChart";
import { CustomDropdown } from "../../../components/Common/CustomDropdown";
import { useNavigate } from "react-router-dom";

const ChequeClearance = ({
  data,
  colors,
  totalSum,
  showLegends,
  centerText,
  buildings,
  locationId,
  mainBuildingId,
  chequeClearanceBuildingId,
  handleChequeClearanceBuildingChange,
  chequeClearanceDate,
  handleInternalDateChange,
}) => {
  let totalUnits = 0;

  const buildingsOptions =
    Number(locationId) && Number(locationId) !== -1 && buildings
      ? buildings.map((building) => ({
          id: building.id,
          name: building.name,
        }))
      : [];

  if (Number(mainBuildingId) && Number(mainBuildingId) !== -1) {
    if (
      Number(chequeClearanceBuildingId) &&
      Number(chequeClearanceBuildingId) !== -1
    ) {
      let building = buildings.find(
        (bld) => bld.id === Number(chequeClearanceBuildingId)
      );
      if (building && building.flatCount) {
        totalUnits = building.flatCount.total;
      }
    } else if (Number(chequeClearanceBuildingId) === -1) {
      buildings.forEach((building) => {
        if (building && building.flatCount) {
          totalUnits += building.flatCount.total;
        }
      });
    } else {
      let building = buildings.find((bld) => bld.id === Number(mainBuildingId));
      if (building && building.flatCount) {
        totalUnits = building.flatCount.total;
      }
    }
  } else {
    buildings.forEach((building) => {
      if (building && building.flatCount) {
        totalUnits += building.flatCount.total;
      }
    });
  }

  const formattedDate = chequeClearanceDate.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const navigate = useNavigate();

  const handleDetailedView = () => {
    navigate("/detailedview", {
      state: {
        locationId,
        buildingId: chequeClearanceBuildingId,
        selectedFilter: "cheque-clearance",
        date: chequeClearanceDate,
      },
    });
  };

  return (
    <div className="w-full p-4 bg-white border border-[#0000001A] drop-shadow-sm rounded-lg">
      <div className="flex justify-between items-center">
        <span className="font-semibold text-[19px]">Cheque Clearance</span>

        <div className="flex gap-[10px] items-center ">
          <h4 className="text-black text-xs">{formattedDate}</h4>
          <div className="flex gap-[10px]">
            <button
              className="group flex justify-center items-center cursor-pointer p-1 px-1.5 rounded-md border hover:bg-custom-gradient-green active:bg-custom-gradient-green"
              onClick={() => {
                handleInternalDateChange({
                  move: "backward",
                  type: "cheque-clearance",
                });
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="5.811"
                height="10.121"
                viewBox="0 0 5.811 10.121"
              >
                <path
                  id="Path_38693"
                  data-name="Path 38693"
                  d="M8,4,4,0,0,4"
                  transform="translate(0.75 9.061) rotate(-90)"
                  fill="none"
                  stroke="#1e1e1e"
                  className="group-hover:stroke-white"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
              </svg>
            </button>
            <button
              className="group flex justify-center items-center cursor-pointer p-1 px-1.5 rounded-md border hover:bg-custom-gradient-green active:bg-custom-gradient-green"
              onClick={() => {
                handleInternalDateChange({
                  move: "forward",
                  type: "cheque-clearance",
                });
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="5.811"
                height="10.121"
                viewBox="0 0 5.811 10.121"
              >
                <path
                  id="Path_38693"
                  data-name="Path 38693"
                  d="M16,15l-4,4L8,15"
                  transform="translate(-13.939 17.061) rotate(-90)"
                  fill="none"
                  stroke="#1e1e1e"
                  className="group-hover:stroke-white"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-5">
        <div className="custom-select relative">
          <CustomDropdown
            defaultSelectedOptionText="Default"
            optionsData={buildingsOptions}
            onChange={handleChequeClearanceBuildingChange}
            defaultSelectedOptionValue={
              chequeClearanceBuildingId ?? mainBuildingId ?? -1
            }
          />
        </div>
        <button
          onClick={handleDetailedView}
          className="font-medium drop-shadow-sm items-center text-[13px] p-[7px] h-max text-nowrap rounded-[5px] bg-white border border-[#0000001A] text-[#1E1E1E] hover:bg-custom-gradient-green hover:text-white group"
        >
          View All
        </button>
      </div>

      {/* Statistics Line Chart Section */}
      {/* Pie Chart & Total Cheque Value Section */}
      {totalSum > 1 ? (
        <div className="mt-6 text-center">
          <AdminPieChartComponent
            data={data}
            colors={colors}
            totalSum={totalSum}
            centerText={centerText}
            showLegends={showLegends}
          />
        </div>
      ) : (
        <div className="h-[350px] w-full text-center font-semibold flex items-center justify-center">
          <h1>No Data Found</h1>
        </div>
      )}
    </div>
  );
};

ChequeClearance.defaultProps = {
  data: [
    { name: "Deposited", value: 0.01 },
    { name: "Not Deposited", value: 0.01 },
  ],
  colors: ["#23AE24", "#777777", "#D82323"],
  totalSum: 0,
  showLegends: true,
  centerText: "Total Cheques",
};

export default ChequeClearance;

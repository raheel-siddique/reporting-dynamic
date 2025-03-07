import { Link, useNavigate } from "react-router-dom";
import { CustomDropdown } from "../../../components/Common/CustomDropdown";
import React, { useEffect, useState } from "react";

const VacantUnits = ({ buildings, buildingId, locationId }) => {
  const [internalBuildingId, setInternalBuildingId] = useState(null);
  const navigate = useNavigate();
  let stat = {
    is_profit: true,
    vacantUnits: 90,
  };
  let vacantUnits = 0;
  let vacantExpiredUnits = 0;
  let vacantWithoutTenantsUnits = 0;
  let vacantWithoutLeaseUnits = 0;
  let vacantDeactivatedUnits = 0;

  const buildingsOptions =
    Number(locationId) && Number(locationId) !== -1 && buildings
      ? buildings.map((building) => ({
          id: building.id,
          name: building.name,
        }))
      : [];

  useEffect(() => {
    setInternalBuildingId(buildingId);
  }, [buildingId]);

  if (
    (Number(buildingId) && Number(buildingId) !== -1) ||
    Number(internalBuildingId)
  ) {
    if (Number(internalBuildingId) && Number(internalBuildingId) !== -1) {
      let building = buildings.find(
        (bld) => bld.id === Number(internalBuildingId)
      );
      if (building && building.flatCount) {
        vacantUnits = building.flatCount.vacant;
        if (building.flatCount.vacantBreakDown) {
          vacantExpiredUnits = building.flatCount.vacantBreakDown.expired;
          vacantWithoutLeaseUnits =
            building.flatCount.vacantBreakDown.withoutLease;
          vacantWithoutTenantsUnits =
            building.flatCount.vacantBreakDown.withoutTenant;
          vacantDeactivatedUnits =
            building.flatCount.vacantBreakDown.deActivated;
        }
      }
    } else if (Number(internalBuildingId) === -1) {
      buildings.forEach((building) => {
        if (building && building.flatCount) {
          vacantUnits += building.flatCount.vacant;
          if (building.flatCount.vacantBreakDown) {
            vacantExpiredUnits += building.flatCount.vacantBreakDown.expired;
            vacantWithoutLeaseUnits +=
              building.flatCount.vacantBreakDown.withoutLease;
            vacantWithoutTenantsUnits +=
              building.flatCount.vacantBreakDown.withoutTenant;

            vacantDeactivatedUnits +=
              building.flatCount.vacantBreakDown.deActivated;
          }
        }
      });
    } else {
      let building = buildings.find((bld) => bld.id === Number(buildingId));
      if (building && building.flatCount) {
        vacantUnits = building.flatCount.vacant;
        if (building.flatCount.vacantBreakDown) {
          vacantExpiredUnits = building.flatCount.vacantBreakDown.expired;
          vacantWithoutLeaseUnits =
            building.flatCount.vacantBreakDown.withoutLease;
          vacantWithoutTenantsUnits =
            building.flatCount.vacantBreakDown.withoutTenant;

          vacantDeactivatedUnits =
            building.flatCount.vacantBreakDown.deActivated;
        }
      }
    }
  } else {
    buildings.forEach((building) => {
      if (building && building.flatCount) {
        vacantUnits += building.flatCount.vacant;
        if (building.flatCount.vacantBreakDown) {
          vacantExpiredUnits += building.flatCount.vacantBreakDown.expired;
          vacantWithoutLeaseUnits +=
            building.flatCount.vacantBreakDown.withoutLease;
          vacantWithoutTenantsUnits +=
            building.flatCount.vacantBreakDown.withoutTenant;
          vacantDeactivatedUnits +=
            building.flatCount.vacantBreakDown.deActivated;
        }
      }
    });
  }
  const handleBuildingChange = (e) => {
    const selectedBuildingId = e.target.value;
    setInternalBuildingId(selectedBuildingId); // Update locationId state if needed
  };

  const handleDetailedView = () => {
    navigate(
      "/vacant-details"

      //   {
      //   state: {
      //     locationId,
      //     buildingId: chequeClearanceBuildingId,
      //     selectedFilter: "cheque-clearance",
      //     date: chequeClearanceDate,
      //   },
      // }
    );
  };

  return (
    <div className="w-full flex flex-col justify-between items-center p-4 bg-white border border-[#0000001A] drop-shadow-sm rounded-lg">
      {/* Svg Icon and Mini Stats Name Section */}

      <div className="flex items-center justify-between w-full">
        <div className="flex gap-1">
          <div className="flex justify-center items-center h-[30px] w-[30px] rounded-lg border border-[#0000001A] drop-shadow-sm bg-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15.5"
              height="14.722"
              viewBox="0 0 15.5 14.722"
            >
              <g
                id="Group_23387"
                data-name="Group 23387"
                transform="translate(-712.25 -289.25)"
              >
                <path
                  id="Path_38354"
                  data-name="Path 38354"
                  d="M4,17.222V5.556A1.673,1.673,0,0,1,5.556,4H9.444A1.673,1.673,0,0,1,11,5.556V17.222"
                  transform="translate(709.778 286)"
                  fill="none"
                  stroke="#1e1e1e"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
                <path
                  id="Path_38355"
                  data-name="Path 38355"
                  d="M16,8h1.556a1.673,1.673,0,0,1,1.556,1.556v8.556"
                  transform="translate(707.111 285.111)"
                  fill="none"
                  stroke="#1e1e1e"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
                <path
                  id="Path_38356"
                  data-name="Path 38356"
                  d="M3,21H17"
                  transform="translate(710 282.222)"
                  fill="none"
                  stroke="#1e1e1e"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
                <path
                  id="Path_38357"
                  data-name="Path 38357"
                  d="M10,12h0"
                  transform="translate(708.444 284.222)"
                  fill="none"
                  stroke="#1e1e1e"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
                <path
                  id="Path_38358"
                  data-name="Path 38358"
                  d="M10,16h0"
                  transform="translate(708.444 283.333)"
                  fill="none"
                  stroke="#1e1e1e"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
                <path
                  id="Path_38359"
                  data-name="Path 38359"
                  d="M10,8h0"
                  transform="translate(708.444 285.111)"
                  fill="none"
                  stroke="#1e1e1e"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
                <path
                  id="Path_38360"
                  data-name="Path 38360"
                  d="M7,12H7"
                  transform="translate(709.111 284.222)"
                  fill="none"
                  stroke="#1e1e1e"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
                <path
                  id="Path_38361"
                  data-name="Path 38361"
                  d="M7,16H7"
                  transform="translate(709.111 283.333)"
                  fill="none"
                  stroke="#1e1e1e"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
                <path
                  id="Path_38362"
                  data-name="Path 38362"
                  d="M7,8H7"
                  transform="translate(709.111 285.111)"
                  fill="none"
                  stroke="#1e1e1e"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
                <path
                  id="Path_38363"
                  data-name="Path 38363"
                  d="M17,12h0"
                  transform="translate(706.889 284.222)"
                  fill="none"
                  stroke="#1e1e1e"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
                <path
                  id="Path_38364"
                  data-name="Path 38364"
                  d="M17,16h0"
                  transform="translate(706.889 283.333)"
                  fill="none"
                  stroke="#1e1e1e"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
              </g>
            </svg>
          </div>
          <h4 className="text-[16px] mb-2">{"Vacant Units"}</h4>
        </div>
        <div className="flex gap-3 justify-between">
          <div className="custom-select relative">
            {/* <select className="w-[90px] cursor-pointer select-sm p-[7px] rounded-lg border border-[#1E1E1E1A] hover:border-custom-green text-black placeholder:text-[#959595] focus-visible:outline-custom-green placeholder:text-[14px] text-[13px]">
              <option label="Default" />
            </select> */}
            <CustomDropdown
              defaultSelectedOptionText="Default"
              optionsData={buildingsOptions}
              onChange={handleBuildingChange}
              defaultSelectedOptionValue={
                internalBuildingId ?? buildingId ?? -1
              }
            />
          </div>

          <>
            <Link
              to="/vacant-details"
              state={{ buildingId: internalBuildingId, locationId: locationId }}
            >
              <button className="font-medium drop-shadow-sm items-center text-[13px] p-[7px] h-max text-nowrap rounded-[5px] bg-white border border-[#0000001A] text-[#1E1E1E] hover:bg-custom-gradient-green hover:text-white group">
                View All
              </button>
            </Link>
          </>
        </div>
      </div>

      <div className="flex items-center mt-3 w-full justify-between">
        <div className="flex-col">
          {/* Mini Stats Up And Down Arrow, profit or loss rate and according to their background color Section  */}
          <div className="flex flex-wrap gap-[10px] items-center">
            <span className="text-[15px]">
              Total <br /> <b>{vacantUnits}</b>
            </span>
            {/* <span className="text-[15px]">
              Expired <br /> <b>{vacantExpiredUnits} </b>
            </span> */}
            <span className="text-[15px] text-nowrap">
              Unassigned <br /> <b>{vacantWithoutTenantsUnits}</b>
            </span>
            <span className="text-[15px] text-nowrap">
              No Lease <br /> <b>{vacantWithoutLeaseUnits} </b>
            </span>

            <span className="text-[15px] text-nowrap">
              Deactivated <br /> <b>{vacantDeactivatedUnits} </b>
            </span>
          </div>
        </div>

        <div className="flex justify-between gap-[10px] items-end flex-col h-full">
          <div className="flex gap-[10px] items-center ">
            {/* <h4 className="text-black text-xs">6 February, 2025</h4> */}
            {/* <div className="flex gap-[10px]">
            <button className="group flex justify-center items-center cursor-pointer p-1 px-1.5 rounded-md border hover:bg-custom-gradient-green active:bg-custom-gradient-green">
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
            <button className="group flex justify-center items-center cursor-pointer p-1 px-1.5 rounded-md border hover:bg-custom-gradient-green active:bg-custom-gradient-green">
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
          </div> */}
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40.471"
            height="38.306"
            viewBox="0 0 40.471 38.306"
          >
            <g
              id="Group_25462"
              data-name="Group 25462"
              transform="translate(-712.25 -289.25)"
              opacity="0.1"
            >
              <path
                id="Path_38354"
                data-name="Path 38354"
                d="M4,40.806V8.33A4.657,4.657,0,0,1,8.33,4H19.155a4.657,4.657,0,0,1,4.33,4.33V40.806"
                transform="translate(711.165 286)"
                fill="none"
                stroke="#1e1e1e"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              />
              <path
                id="Path_38355"
                data-name="Path 38355"
                d="M16,8h4.33a4.657,4.657,0,0,1,4.33,4.33V36.145"
                transform="translate(725.145 290.66)"
                fill="none"
                stroke="#1e1e1e"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              />
              <path
                id="Path_38356"
                data-name="Path 38356"
                d="M3,21H41.971"
                transform="translate(710 305.806)"
                fill="none"
                stroke="#1e1e1e"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              />
              <path
                id="Path_38357"
                data-name="Path 38357"
                d="M10,12h0"
                transform="translate(718.155 295.32)"
                fill="none"
                stroke="#1e1e1e"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              />
              <path
                id="Path_38358"
                data-name="Path 38358"
                d="M10,16h0"
                transform="translate(718.155 299.98)"
                fill="none"
                stroke="#1e1e1e"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              />
              <path
                id="Path_38359"
                data-name="Path 38359"
                d="M10,8h0"
                transform="translate(718.155 290.66)"
                fill="none"
                stroke="#1e1e1e"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              />
              <path
                id="Path_38360"
                data-name="Path 38360"
                d="M7,12H7"
                transform="translate(714.66 295.32)"
                fill="none"
                stroke="#1e1e1e"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              />
              <path
                id="Path_38361"
                data-name="Path 38361"
                d="M7,16H7"
                transform="translate(714.66 299.98)"
                fill="none"
                stroke="#1e1e1e"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              />
              <path
                id="Path_38362"
                data-name="Path 38362"
                d="M7,8H7"
                transform="translate(714.66 290.66)"
                fill="none"
                stroke="#1e1e1e"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              />
              <path
                id="Path_38363"
                data-name="Path 38363"
                d="M17,12h0"
                transform="translate(726.31 295.32)"
                fill="none"
                stroke="#1e1e1e"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              />
              <path
                id="Path_38364"
                data-name="Path 38364"
                d="M17,16h0"
                transform="translate(726.31 299.98)"
                fill="none"
                stroke="#1e1e1e"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default VacantUnits;

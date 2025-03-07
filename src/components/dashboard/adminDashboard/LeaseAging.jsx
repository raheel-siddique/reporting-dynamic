import ExportCSVIcon from "../../../icons/ExportCSVIcon";
import DatePickerField from "../../../components/DatePicker/DatePickerField";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { exportToCSV } from "../../../utils/format";

const LeaseAging = ({
  leaseAging,
  handleLeaseAgingDateFilter,
  setFromDate,
  fromDate,
  setToDate,
  toDate,
  locationId,
}) => {
  const [isExporting, setIsExporting] = useState(false);

  const buildingsWithLocationName = leaseAging
    ? leaseAging.map((item) => {
        return {
          ...item,
          buildings: item.buildings.map((building) => {
            return {
              ...building,
              locationName: item.name,
            };
          }),
        };
      })
    : [];

  const buildings = buildingsWithLocationName
    ? buildingsWithLocationName.reduce((acc, item) => {
        return acc.concat(item.buildings);
      }, [])
    : [];

  const handleCSVExport = () => {
    if (buildings && buildings.length) {
      console.log({ buildings });

      setIsExporting(true); // Start loading

      // Define CSV headers
      const csvHeaders = [
        { label: "Location Name", key: "locationName" },
        { label: "Building Name", key: "name" },
        { label: "Active", key: "leaseCount.active" },
        { label: "Pending", key: "leaseCount.pending" },
        { label: "Expired", key: "leaseCount.expired" },
        { label: "Cancelled", key: "leaseCount.cancelled" },
      ];

      // Format data
      const csvData = buildings.map((item) => ({
        locationName: item.locationName || "N/A",
        name: item.name || "N/A",
        "leaseCount.active": item.leaseCount.active || "0",
        "leaseCount.pending": item.leaseCount.pending || "0",
        "leaseCount.expired": item.leaseCount.expired || "0",
        "leaseCount.cancelled": item.leaseCount.cancelled || "0",
      }));

      exportToCSV({
        data: csvData,
        filename: "lease_aging.csv",
        headers: csvHeaders,
      });

      setIsExporting(false); // Stop loading
    }
  };

  const dateFilters = [
    {
      label: "Today",
    },
    {
      label: "This Month",
    },
    {
      label: "Previous Month",
    },
  ];

  const [activeTab, setActiveTab] = useState(dateFilters[0].label);

  const navigate = useNavigate();

  const handleNavigation = (tabName, buildingId) => {
    navigate("/tenants", {
      state: { selectedTab: tabName, locationId, buildingId },
    });
  };

  return (
    <>
      <div className="w-full p-4 bg-white border border-[#0000001A] drop-shadow-sm rounded-lg">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-[19px]">Lease Aging</span>

          <div className="flex gap-[10px] items-center ">
            <DatePickerField
              label={"From Date"}
              onDateChange={setFromDate}
              dateValue={fromDate}
              maxDate={toDate} // Prevent selecting a fromDate after toDate
              formInput={false}
              className="bg-white !mt-0 w-[230px] p-2 !py-1.5 rounded-lg select-sm border border-custom-gray hover:border-custom-green text-black placeholder:text-[#959595] focus-visible:outline-custom-green placeholder:text-[14px] text-[14px]"
            />
            <DatePickerField
              label={"To Date"}
              onDateChange={setToDate}
              dateValue={toDate}
              minDate={fromDate} // Prevent selecting a toDate before fromDate
              formInput={false}
              className="bg-white !mt-0 w-[230px] p-2 !py-1.5 rounded-lg select-sm border border-custom-gray hover:border-custom-green text-black placeholder:text-[#959595] focus-visible:outline-custom-green placeholder:text-[14px] text-[14px]"
            />
            {/* <h4 className="text-black text-xs">6 February, 2025</h4>
            <div className="flex gap-[10px]">
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
        </div>
        <div className="flex justify-between mt-5">
          <div className="flex gap-5">
            {dateFilters.map((filter) => (
              <button
                key={filter.label}
                onClick={() => {
                  setActiveTab(filter.label);
                  handleLeaseAgingDateFilter({ label: filter.label });
                }}
                className={`font-medium drop-shadow-sm items-center text-[13px] p-[7px] h-max text-nowrap rounded-[5px] border border-[#0000001A] 
            ${
              activeTab === filter.label
                ? "bg-custom-gradient-green text-white"
                : "bg-white text-[#1E1E1E] hover:bg-custom-gradient-green hover:text-white"
            }
          `}
              >
                {filter.label}
              </button>
            ))}
          </div>
          {/* <button
            // onClick={handleDetailedView}
            className="font-medium drop-shadow-sm items-center text-[13px] p-[7px] h-max text-nowrap rounded-[5px] bg-white border border-[#0000001A] text-[#1E1E1E] hover:bg-custom-gradient-green hover:text-white group"
          >
            View All
          </button> */}
          <button
            className="flex font-medium p-2.5 py-1.5 text-[14px] justify-center drop-shadow-sm items-center gap-[10px] h-max text-nowrap rounded-[5px] bg-white border border-[#0000001A] text-[#1E1E1E] hover:bg-custom-gradient-green hover:text-white group"
            onClick={() => handleCSVExport()}
            disabled={isExporting}
          >
            <ExportCSVIcon />

            {isExporting ? "Exporting" : "Export"}
          </button>
        </div>
        {buildings.slice(0, 3).map((building) => {
          return (
            <div className="mt-4 border-dashed border-b border-custom-gray pb-3">
              <div className="flex justify-between items-center">
                <span className="text-[17px] font-semibold">
                  {building.name}
                </span>
              </div>
              <div className="mt-2 grid lg:grid-cols-4 gap-4">
                <div
                  onClick={() => handleNavigation("Current", building.id)}
                  className="cursor-pointer"
                >
                  <div className="flex items-center gap-1">
                    <span className="h-[13px] w-[13px] block bg-[#23ae24] rounded-[5px]"></span>
                    <span className="text-[#23ae24] text-[13px]">Active</span>
                  </div>
                  <span className="text-[16px] font-semibold ms-[18px]">
                    {building.leaseCount.active}
                  </span>
                </div>

                <div
                  onClick={() => handleNavigation("Pending", building.id)}
                  className="cursor-pointer"
                >
                  <div className="flex items-center gap-1">
                    <span className="h-[13px] w-[13px] block bg-[#777777] rounded-[5px]"></span>
                    <span className="text-[#777777] text-[13px]">Pending</span>
                  </div>
                  <span className="text-[16px] font-semibold ms-[18px]">
                    {building.leaseCount.pending}
                  </span>
                </div>

                <div
                  onClick={() => handleNavigation("Expired", building.id)}
                  className="cursor-pointer"
                >
                  <div className="flex items-center gap-1">
                    <span className="h-[13px] w-[13px] block bg-[#D82323] rounded-[5px]"></span>
                    <span className="text-[#777777] text-[13px]">Expired</span>
                  </div>
                  <span className="text-[16px] font-semibold ms-[18px]">
                    {building.leaseCount.expired}
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-1">
                    <span className="h-[13px] w-[13px] block bg-[#D82323] rounded-[5px]"></span>
                    <span className="text-[#777777] text-[13px]">
                      Cancelled
                    </span>
                  </div>
                  <span className="text-[16px] font-semibold ms-[18px]">
                    {building.leaseCount.cancelled}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default LeaseAging;

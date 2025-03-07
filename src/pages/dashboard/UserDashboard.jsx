import React, { useState, useMemo } from "react";
import { formatDate } from "../../utils/format";
import TotalTenants from "../../components/dashboard/TotalTenants";
import TotalLocations from "../../components/dashboard/TotalLocations";
import TotalBuildings from "../../components/dashboard/TotalBuildings";
import Analytics from "../../components/dashboard/Analytics";
import Statistics from "../../components/dashboard/Statistics";
import ChequeOverview from "../../components/dashboard/ChequeOverview";
import LeaseActivity from "../../components/dashboard/LeaseActivity";
import ChequeActivity from "../../components/dashboard/ChequeActivity";
import RentStatsCard from "../../components/dashboard/RentStatsCard";
import DashboardTitle from "../../components/dashboard/DashboardTitle";
import ChequeDeposit from "../../components/dashboard/ChequeDeposit";

const UserDashboard = () => {
  const daysFilter = [
    { id: 1, option: "Next 1 day", value: "1 day" },
    { id: 2, option: "Next 3 days", value: "3 days" },
    { id: 3, option: "Next 5 days", value: "5 days" },
    { id: 4, option: "Next 7 days", value: "7 days" },
    { id: 5, option: "Next 15 days", value: "15 days" },
    { id: 6, option: "Next 30 days", value: "30 days" },
  ];

  const mini_stats_data = [
    {
      id: 1,
      name: "Total Tenants",
      value: "1,000",
      is_profit: true,
      rate: "10",
    },
    {
      id: 2,
      name: "Total Locations",
      value: "15",
      is_profit: false,
      rate: "1",
    },
    {
      id: 3,
      name: "Total Buildings",
      value: "45",
      is_profit: true,
      rate: "6",
    },
  ];

  const statistics_data = [
    { name: "Mon", Amount: 1000 },
    { name: "Tue", Amount: 2000 },
    { name: "Wed", Amount: 2500 },
    { name: "Thu", Amount: 5000 },
    { name: "Fri", Amount: 15000 },
    { name: "Sat", Amount: 5000 },
    { name: "Sun", Amount: 1000 },
  ];

  const chequeData = [
    { name: "Received", value: 350 },
    { name: "Pending", value: 43 },
    { name: "Rejected", value: 70 },
  ];

  const RentCardData = [
    {
      buildingName: "AJ 1",
      totalActualRent: "35,000",
      totalContractRent: "50,000",
    },
    {
      buildingName: "AJ 2",
      totalActualRent: "135,000",
      totalContractRent: "187,000",
    },
    {
      buildingName: "AJ 3",
      totalActualRent: "80,000",
      totalContractRent: "98,000",
    },
  ];

  const chequeChartColor = ["#23AE24", "#777777", "#D82323"];

  const totalSum = chequeData.reduce((acc, curr) => acc + curr.value, 0);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [role, setRole] = useState("Admin");

  const chequeTableData = [
    {
      id: 1,
      bankName: "Bank of America",
      chequeNo: "123456",
      chequeAmt: "500.00",
      note: "Payment for invoice #1001",
      status: "Pending",
    },
    {
      id: 2,
      bankName: "Wells Fargo",
      chequeNo: "789101",
      chequeAmt: "1200.50",
      note: "Refund issued",
      status: "Received",
    },
    {
      id: 3,
      bankName: "Chase Bank",
      chequeNo: "112131",
      chequeAmt: "850.75",
      note: "Payment for contract #204",
      status: "Rejected",
    },
    {
      id: 4,
      bankName: "Citi Bank",
      chequeNo: "415161",
      chequeAmt: "2500.00",
      note: "Advance payment for services",
      status: "Pending",
    },
  ];

  const chequeTableColumns = useMemo(
    () => [
      { Header: "#", accessor: "id" },
      {
        Header: "Bank Name",
        accessor: "bankName",
        Cell: ({ value }) => <span className="text-nowrap">{value}</span>, // Using `value` for better readability
      },
      {
        Header: "Cheque No.",
        accessor: "chequeNo",
        Cell: ({ value }) => <span className="text-nowrap">{value}</span>, // Using `value` for consistency
      },
      {
        Header: "Cheque Amt.",
        accessor: "chequeAmt",
        Cell: ({ value }) => <span className="text-nowrap">{value}</span>, // Using `value` directly
      },
      {
        Header: "Note",
        accessor: "note",
        Cell: ({ value }) => <span className="text-nowrap">{value}</span>, // Using `value` directly
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (
          <span
            className={`${
              value.toLowerCase() === "rejected"
                ? "bg-[#fbe9e9] text-[#d82323]"
                : value.toLowerCase() === "pending"
                ? "bg-[#f1f1f1] text-[#7b7b7b]"
                : "bg-[#e9f7e9] text-[#23ae24]"
            } py-1 px-2  rounded-md`}
          >
            {value}
          </span>
        ), // Example: Adding a class for status styling
      },
    ],
    []
  );

  const leaseTableData = [
    {
      id: 1,
      startDate: "2025-01-01",
      endDate: "2025-01-05",
      noOfDays: 25,
      status: "Reserved",
    },
    {
      id: 2,
      startDate: "2025-01-06",
      endDate: "2025-01-10",
      noOfDays: 5,
      status: "Expired",
    },
    {
      id: 3,
      startDate: "2025-01-11",
      endDate: "2025-01-15",
      noOfDays: 15,
      status: "Reserved",
    },
    {
      id: 4,
      startDate: "2025-01-16",
      endDate: "2025-01-20",
      noOfDays: 30,
      status: "Expired",
    },
  ];

  const leaseTableColumns = useMemo(
    () => [
      { Header: "#", accessor: "id" },
      {
        Header: "Lease Start",
        accessor: "startDate",
        Cell: ({ value }) => <span>{formatDate(value)}</span>, // Using `value` for better readability
      },
      {
        Header: "Lease End",
        accessor: "endDate",
        Cell: ({ value }) => <span>{formatDate(value)}</span>, // Using `value` for consistency
      },
      {
        Header: "No. Of Days",
        accessor: "noOfDays",
        Cell: ({ value }) => <span>{value}</span>, // Using `value` directly
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (
          <span
            className={`${
              value.toLowerCase() === "expired"
                ? "bg-[#fbe9e9] text-[#d82323]"
                : "bg-[#e9f7e9] text-[#23ae24]"
            } py-1 px-2  rounded-md`}
          >
            {value}
          </span>
        ), // Example: Adding a class for status styling
      },
    ],
    []
  );

  return (
    <div className="">
      {/* Name , Days Filter Dropdown, Export & Filter Button Section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        {/* <span className="text-[24px] font-semibold">Hey, John!</span> */}
        <DashboardTitle />
        {/* Days Filter, Export & Filter Buttons Section */}
        <div className="flex flex-wrap mt-5 md:mt-0 items-center gap-3">
          {/* Days Filter */}
          <div className="custom-select">
            <select className="p-3 w-[50vw] sm:w-[30vw] md:w-[150px] cursor-pointer rounded-lg drop-shadow-sm border border-[#0000001A] hover:border-custom-green text-black placeholder:text-[#959595] focus-visible:outline-custom-green placeholder:text-[14px] text-[14px]">
              {daysFilter.map((filterArr) => (
                <option
                  key={filterArr.id}
                  selected={filterArr.value === "7 days"}
                  value={filterArr.value}
                >
                  {filterArr.option}
                </option>
              ))}
            </select>
          </div>
          {/* Export Button */}
          <button className="flex font-medium px-4 justify-center drop-shadow-sm items-center gap-[10px] h-max text-nowrap rounded-[10px] bg-white border border-[#0000001A] p-2.5 py-1.5 text-[14px] text-[#1E1E1E] hover:bg-custom-gradient-green hover:text-white group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15.921"
              height="17.5"
              viewBox="0 0 15.921 17.5"
            >
              <g
                id="Group_145"
                data-name="Group 145"
                transform="translate(-2130.25 319.75)"
              >
                <path
                  id="Path_112"
                  data-name="Path 112"
                  d="M14,3V6.556a.889.889,0,0,0,.889.889h3.556"
                  transform="translate(2125.889 -322)"
                  fill="none"
                  className="group-hover:stroke-white stroke-[#1e1e1e]"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
                <path
                  id="Path_113"
                  data-name="Path 113"
                  d="M5,11V4.778A1.778,1.778,0,0,1,6.778,3H13l4.444,4.444V11"
                  transform="translate(2126.889 -322)"
                  fill="none"
                  className="group-hover:stroke-white stroke-[#1e1e1e]"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
                <path
                  id="Path_114"
                  data-name="Path 114"
                  d="M6.667,16.333a1.333,1.333,0,1,0-2.667,0V19a1.333,1.333,0,0,0,2.667,0"
                  transform="translate(2127 -323.333)"
                  fill="none"
                  className="group-hover:stroke-white stroke-[#1e1e1e]"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
                <path
                  id="Path_115"
                  data-name="Path 115"
                  d="M10,19.667a.667.667,0,0,0,.667.667h1.111a.889.889,0,0,0,.889-.889v-.889a.889.889,0,0,0-.889-.889h-.889A.889.889,0,0,1,10,16.778v-.889A.889.889,0,0,1,10.889,15H12a.667.667,0,0,1,.667.667"
                  transform="translate(2126.333 -323.333)"
                  fill="none"
                  className="group-hover:stroke-white stroke-[#1e1e1e]"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
                <path
                  id="Path_116"
                  data-name="Path 116"
                  d="M16,15l1.778,5.333L19.556,15"
                  transform="translate(2125.667 -323.333)"
                  fill="none"
                  className="group-hover:stroke-white stroke-[#1e1e1e]"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
              </g>
            </svg>
            Export
          </button>

          {/* Filter Button */}
          <button className="flex font-medium px-4 justify-center drop-shadow-sm items-center gap-[10px] h-max text-nowrap rounded-[10px] bg-white border border-[#0000001A] p-2.5 py-1.5 text-[14px] text-[#1E1E1E] hover:bg-custom-gradient-green hover:text-white group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15.5"
              height="12"
              viewBox="0 0 15.5 12"
            >
              <g
                id="Group_23379"
                data-name="Group 23379"
                transform="translate(-3960.75 1032.75)"
              >
                <path
                  id="Path_38350"
                  data-name="Path 38350"
                  d="M4,6H18"
                  transform="translate(3957.5 -1038)"
                  fill="none"
                  className="group-hover:stroke-white stroke-[#1e1e1e]"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
                <path
                  id="Path_38351"
                  data-name="Path 38351"
                  d="M7,12h8.75"
                  transform="translate(3957.125 -1038.75)"
                  fill="none"
                  className="group-hover:stroke-white stroke-[#1e1e1e]"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
                <path
                  id="Path_38352"
                  data-name="Path 38352"
                  d="M10,18h3.5"
                  transform="translate(3956.75 -1039.5)"
                  fill="none"
                  className="group-hover:stroke-white stroke-[#1e1e1e]"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
              </g>
            </svg>
            Filter
          </button>
        </div>
      </div>

      {/* Total Tenants, Total Locations & Total Buildings Mini Stats Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        {/* {role && role.toLowerCase() === "admin" && RentCardData ? (
          <RentStatsCard stat={RentCardData} />
        ) : (
          ""
        )} */}

        {role && role.toLowerCase() === "admin" ? (
          <>
            <TotalTenants stat={mini_stats_data[0]} />
            <TotalLocations stat={mini_stats_data[1]} />
            <TotalBuildings stat={mini_stats_data[2]} />

            {/* Analytics Data Card Section */}
            <Analytics />

            {/* Statistics Data Card Section */}
            <Statistics data={statistics_data} />

            {/* Cheque Overview Data Card Section */}
            <ChequeOverview
              totalSum={totalSum}
              centerText={"Total Cheques"}
              data={chequeData}
              colors={chequeChartColor}
              showLegends={true}
            />
          </>
        ) : (
          ""
        )}
      </div>

      {role && role.toLowerCase() === "user" ? (
        <>
          {/* Lease And Cheque Activities With Table Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
            {/* Lease Activity Section */}
            <LeaseActivity
              data={leaseTableData}
              columns={leaseTableColumns}
              page={page}
              pageSize={pageSize}
              setPage={setPage}
              setPageSize={setPageSize}
            />

            {/* Cheque Activity Section */}
            <ChequeActivity
              data={chequeTableData}
              columns={chequeTableColumns}
              page={page}
              pageSize={pageSize}
              setPage={setPage}
              setPageSize={setPageSize}
            />
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default UserDashboard;

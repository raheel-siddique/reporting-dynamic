import { useAdminDashboard } from "../../hooks/useAdminDashboard";
import React, { useState, useMemo, useEffect } from "react";
import { formatDate } from "../../utils/format";
import LeaseActivity from "../../components/dashboard/LeaseActivity";
import ChequeActivity from "../../components/dashboard/ChequeActivity";
import DashboardTitle from "../../components/dashboard/DashboardTitle";
import TotalUnits from "../../components/dashboard/adminDashboard/TotalUnits";
import OccupiedUnits from "../../components/dashboard/adminDashboard/OccupiedUnits";
import VacantUnits from "../../components/dashboard/adminDashboard/VacantUnits";
import ChequeDeposit from "../../components/dashboard/adminDashboard/ChequeDeposit";
import ChequeClearance from "../../components/dashboard/adminDashboard/ChequeClearance";
import LeaseAging from "../../components/dashboard/adminDashboard/LeaseAging";
import DatePickerField from "../../components/DatePicker/DatePickerField";
import { useMyLocations } from "../../hooks/useMyLocations";
import { useFlats } from "../../hooks/useFlats";
import Skeleton from "react-loading-skeleton";
import { CustomDropdown } from "../../components/Common/CustomDropdown";

const AdminDashboard = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [locationId, setLocationId] = useState(-1);
  const [buildingId, setBuildingId] = useState(null);
  const [mainDate, setMainDate] = useState(new Date());
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const [chequeDepositBuildingId, setChequeDepositBuildingId] = useState(null);
  const [chequeDepositDate, setChequeDepositDate] = useState(new Date());

  const [chequeClearanceBuildingId, setChequeClearanceBuildingId] =
    useState(null);
  const [chequeClearanceDate, setChequeClearanceDate] = useState(new Date());

  useEffect(() => {
    setChequeDepositBuildingId(null);
    setChequeClearanceBuildingId(null);
  }, [buildingId]);

  useEffect(() => {
    setChequeDepositBuildingId(null);
    setChequeClearanceBuildingId(null);
  }, [locationId]);

  useEffect(() => {
    setChequeDepositDate(mainDate);
    setChequeClearanceDate(mainDate);
    setFromDate(mainDate);
    setToDate(mainDate);
  }, [mainDate]);

  const { stats, chequeDeposit, chequeClearance, leaseAging } =
    useAdminDashboard({
      date: mainDate,
      fromDate: fromDate,
      toDate: toDate,
      buildingId: buildingId,
      locationId: locationId,
      chequeDepositBuildingId: chequeDepositBuildingId,
      chequeDepositDate: chequeDepositDate,
      chequeClearanceBuildingId: chequeClearanceBuildingId,
      chequeClearanceDate: chequeClearanceDate,
    });

  const { locationsData, isLocationsLoading } = useMyLocations(page, pageSize);
  const { buildingsDataOwn } = useFlats(
    page,
    pageSize,
    buildingId ? buildingId : -1,
    locationId,
    null
  );
  let locations = [];
  let buildings = [];

  useEffect(() => {
    if (locationsData && locationsData.length > 0) {
      const initialLocation = locationsData[0];

      setLocationId(initialLocation.id);
    }
  }, [locationsData]);

  if (stats) {
    locations = [...stats];
    if (Number(locationId) && Number(locationId) !== -1) {
      let location = locations.find(
        (location) => location.id === Number(locationId)
      );

      buildings = [...location.buildings];
    } else
      locations.forEach((location) => {
        buildings = [...buildings, ...location.buildings];
      });
  }

  // const daysFilter = [
  //   { id: 1, option: "Next 1 day", value: "1 day" },
  //   { id: 2, option: "Next 3 days", value: "3 days" },
  //   { id: 3, option: "Next 5 days", value: "5 days" },
  //   { id: 4, option: "Next 7 days", value: "7 days" },
  //   { id: 5, option: "Next 15 days", value: "15 days" },
  //   { id: 6, option: "Next 30 days", value: "30 days" },
  // ];

  // const mini_stats_data = [
  //   {
  //     id: 1,
  //     name: "Total Units",
  //     value: "1,000",
  //     is_profit: true,
  //     rate: "10",
  //   },
  //   {
  //     id: 2,
  //     name: "Occupied Units",
  //     value: "15",
  //     is_profit: false,
  //     rate: "1",
  //   },
  //   {
  //     id: 3,
  //     name: "Vacant Units",
  //     value: "45",
  //     is_profit: true,
  //     rate: "6",
  //   },
  // ];

  // const statistics_data = [
  //   { name: "Mon", Amount: 1000 },
  //   { name: "Tue", Amount: 2000 },
  //   { name: "Wed", Amount: 2500 },
  //   { name: "Thu", Amount: 5000 },
  //   { name: "Fri", Amount: 15000 },
  //   { name: "Sat", Amount: 5000 },
  //   { name: "Sun", Amount: 1000 },
  // ];

  const chequeDepositData = [
    {
      name: "Deposited",
      value: chequeDeposit ? chequeDeposit.deposited || 0.00001 : 0.01,
    },
    {
      name: "Not Deposited",
      value: chequeDeposit ? chequeDeposit.notDeposited || 0.00001 : 0.01,
    },
  ];
  const totalChequeOfChequeDeposit = chequeDepositData.reduce(
    (acc, curr) => acc + curr.value,
    0
  );

  const chequeClearanceData = [
    {
      name: "Cleared",
      value: chequeClearance ? chequeClearance.cleared || 0.00001 : 0.01,
    },
    {
      name: "Not Cleared",
      value: chequeClearance ? chequeClearance.notCleared || 0.00001 : 0.01,
    },
    {
      name: "Bounced",
      value: chequeClearance ? chequeClearance.bounced || 0.00001 : 0.01,
    },
  ];

  const totalChequeOfChequeClearance = chequeClearanceData.reduce(
    (acc, curr) => acc + curr.value,
    0
  );

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

  const [role, setRole] = useState("Admin");

  // const chequeTableData = [
  //   {
  //     id: 1,
  //     bankName: "Bank of America",
  //     chequeNo: "123456",
  //     chequeAmt: "500.00",
  //     note: "Payment for invoice #1001",
  //     status: "Pending",
  //   },
  //   {
  //     id: 2,
  //     bankName: "Wells Fargo",
  //     chequeNo: "789101",
  //     chequeAmt: "1200.50",
  //     note: "Refund issued",
  //     status: "Received",
  //   },
  //   {
  //     id: 3,
  //     bankName: "Chase Bank",
  //     chequeNo: "112131",
  //     chequeAmt: "850.75",
  //     note: "Payment for contract #204",
  //     status: "Rejected",
  //   },
  //   {
  //     id: 4,
  //     bankName: "Citi Bank",
  //     chequeNo: "415161",
  //     chequeAmt: "2500.00",
  //     note: "Advance payment for services",
  //     status: "Pending",
  //   },
  // ];

  // const chequeTableColumns = useMemo(
  //   () => [
  //     { Header: "#", accessor: "id" },
  //     {
  //       Header: "Bank Name",
  //       accessor: "bankName",
  //       Cell: ({ value }) => <span className="text-nowrap">{value}</span>, // Using `value` for better readability
  //     },
  //     {
  //       Header: "Cheque No.",
  //       accessor: "chequeNo",
  //       Cell: ({ value }) => <span className="text-nowrap">{value}</span>, // Using `value` for consistency
  //     },
  //     {
  //       Header: "Cheque Amt.",
  //       accessor: "chequeAmt",
  //       Cell: ({ value }) => <span className="text-nowrap">{value}</span>, // Using `value` directly
  //     },
  //     {
  //       Header: "Note",
  //       accessor: "note",
  //       Cell: ({ value }) => <span className="text-nowrap">{value}</span>, // Using `value` directly
  //     },
  //     {
  //       Header: "Status",
  //       accessor: "status",
  //       Cell: ({ value }) => (
  //         <span
  //           className={`${
  //             value.toLowerCase() === "rejected"
  //               ? "bg-[#fbe9e9] text-[#d82323]"
  //               : value.toLowerCase() === "pending"
  //               ? "bg-[#f1f1f1] text-[#7b7b7b]"
  //               : "bg-[#e9f7e9] text-[#23ae24]"
  //           } py-1 px-2  rounded-md`}
  //         >
  //           {value}
  //         </span>
  //       ), // Example: Adding a class for status styling
  //     },
  //   ],
  //   []
  // );

  // const leaseTableData = [
  //   {
  //     id: 1,
  //     startDate: "2025-01-01",
  //     endDate: "2025-01-05",
  //     noOfDays: 25,
  //     status: "Reserved",
  //   },
  //   {
  //     id: 2,
  //     startDate: "2025-01-06",
  //     endDate: "2025-01-10",
  //     noOfDays: 5,
  //     status: "Expired",
  //   },
  //   {
  //     id: 3,
  //     startDate: "2025-01-11",
  //     endDate: "2025-01-15",
  //     noOfDays: 15,
  //     status: "Reserved",
  //   },
  //   {
  //     id: 4,
  //     startDate: "2025-01-16",
  //     endDate: "2025-01-20",
  //     noOfDays: 30,
  //     status: "Expired",
  //   },
  // ];

  // const leaseTableColumns = useMemo(
  //   () => [
  //     { Header: "#", accessor: "id" },
  //     {
  //       Header: "Lease Start",
  //       accessor: "startDate",
  //       Cell: ({ value }) => <span>{formatDate(value)}</span>, // Using `value` for better readability
  //     },
  //     {
  //       Header: "Lease End",
  //       accessor: "endDate",
  //       Cell: ({ value }) => <span>{formatDate(value)}</span>, // Using `value` for consistency
  //     },
  //     {
  //       Header: "No. Of Days",
  //       accessor: "noOfDays",
  //       Cell: ({ value }) => <span>{value}</span>, // Using `value` directly
  //     },
  //     {
  //       Header: "Status",
  //       accessor: "status",
  //       Cell: ({ value }) => (
  //         <span
  //           className={`${
  //             value.toLowerCase() === "expired"
  //               ? "bg-[#fbe9e9] text-[#d82323]"
  //               : "bg-[#e9f7e9] text-[#23ae24]"
  //           } py-1 px-2  rounded-md`}
  //         >
  //           {value}
  //         </span>
  //       ), // Example: Adding a class for status styling
  //     },
  //   ],
  //   []
  // );

  const handleLocationChange = (e) => {
    const selectedLocationId = e.target.value;
    setLocationId(selectedLocationId); // Update state
    setBuildingId(null);
  };

  const handleBuildingChange = (e) => {
    const selectedBuildingId = e.target.value;
    setBuildingId(selectedBuildingId); // Update locationId state if needed
  };

  const handleChequeDepositBuildingChange = (e) => {
    const selectedBuildingId = e.target.value;
    setChequeDepositBuildingId(selectedBuildingId); // Update locationId state if needed
  };

  const handleChequeClearanceBuildingChange = (e) => {
    const selectedBuildingId = e.target.value;
    setChequeClearanceBuildingId(selectedBuildingId); // Update locationId state if needed
  };

  const handleInternalDateChange = ({ move, type }) => {
    if (type === "cheque-deposit") {
      const updatedDate = new Date(chequeDepositDate);
      if (move === "forward") {
        updatedDate.setDate(updatedDate.getDate() + 1); // Move one day forward
      } else if (move === "backward") {
        updatedDate.setDate(updatedDate.getDate() - 1); // Move one day backward
      }
      setChequeDepositDate(updatedDate);
    }
    if (type === "cheque-clearance") {
      const updatedDate = new Date(chequeClearanceDate);
      if (move === "forward") {
        updatedDate.setDate(updatedDate.getDate() + 1); // Move one day forward
      } else if (move === "backward") {
        updatedDate.setDate(updatedDate.getDate() - 1); // Move one day backward
      }
      setChequeClearanceDate(updatedDate);
    }
  };

  const handleLeaseAgingDateFilter = ({ label }) => {
    const now = new Date();
    let fromDate, toDate;

    if (label === "Today") {
      // Set both fromDate and toDate to today's date
      fromDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      toDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    } else if (label === "This Month") {
      // Set fromDate to the 1st day of the current month
      fromDate = new Date(now.getFullYear(), now.getMonth(), 1);
      // Set toDate to the last day of the current month
      toDate = new Date(now.getFullYear(), now.getMonth() + 1, 0); // Correct month boundary
    } else if (label === "Previous Month") {
      // Set fromDate to the 1st day of the previous month
      fromDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      // Set toDate to the last day of the previous month
      toDate = new Date(now.getFullYear(), now.getMonth(), 0);
    }

    setFromDate(fromDate);
    setToDate(toDate);
  };

  return (
    <>
      {/* <div>
        <TopFilterSection />
        <BuildingStats buildingsStats={buildingsStats} />
      </div> */}
      <div className="">
        {/* Name , Days Filter Dropdown, Export & Filter Button Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          {/* <span className="text-[24px] font-semibold">Hey, John!</span> */}
          <DashboardTitle />
          {/* Days Filter, Export & Filter Buttons Section */}
         
        </div>

        {/* Total Tenants, Total Locations & Total Buildings Mini Stats Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
          {/* {role && role.toLowerCase() === "admin" && RentCardData ? (
          <RentStatsCard stat={RentCardData} />
        ) : (
          ""
        )} */}

         </div>
         </div>
    </>
  );
};

export default AdminDashboard;

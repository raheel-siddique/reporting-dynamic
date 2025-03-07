import React, { useMemo, useState } from "react";
import DummyCard from "../../assets/dummy_card.jpg";
import TenantBreadcrumb from "../../components/tenants/TenantBreadcrumb";
import MyTable from "../../components/myTable/MyTable";
import {
  chequeStatusStyle,
  formatDate,
  leaseStatusStyle,
} from "../../utils/format";
import eyeIcon from "../../assets/eye_icn.svg";

import { useNavigate, useParams } from "react-router-dom";
import { useTenants } from "../../hooks/useTenants";
import DeleteModal from "../../components/modal/DeleteModal";
import { useImages } from "../../hooks/useImages";
import { useBankType } from "../../hooks/useBankType";
import Notifier from "../../components/errors/Notifier";
import Tooltip from "../../components/tooltip/tooltip";
import AddLeaseModal from "../../components/tenants/add-tenant/AddLeaseModal";

const TenantDetails = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (img) => {
    setSelectedImage(img);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalOpen(false);
  };

  const { id } = useParams();
  const {
    // totalCountLease,
    // totalCountCheque,
    // fetchAllTenantsExport,
    useTenantById,
    deleteChequeMutation,
    deleteLeaseMutation,
  } = useTenants();

  const { data: tenantDetails, isLoading } = useTenantById(id);
  const { bankTypesData } = useBankType(1, 100000);

  const { fetchedImages } = useImages(tenantDetails && tenantDetails);

  // show lease details
  const [showLeasesModal, setShowLeasesModal] = useState(false);
  const [selectedLeaseView, setSelectedLeaseView] = useState(null);

  const [tableOption, settableOption] = useState("Lease");
  const [showDltLeaseModal, setShowDltLeaseModal] = useState(false);
  const [showDltRentChequeModal, setShowDltRentChequeModal] = useState(false);
  const [showDltSecurityChequeModal, setShowDltSecurityChequeModal] =
    useState(false);

  const [leaseDeleteId, setLeaseDeleteId] = useState(null);
  const [rentChequeDeleteId, setRentChequeDeleteId] = useState(null);
  const [securityChequeDeleteId, setSecurityChequeDeleteId] = useState(null);

  const navigate = useNavigate();

  const rentCheques = tenantDetails
    ? tenantDetails.cheques.filter((rc) => rc.depositTypeText === "Rent")
    : [];

  const securityCheques = tenantDetails
    ? tenantDetails.cheques.filter((rc) => rc.depositTypeText === "Security")
    : [];

  const TableOption = [
    {
      id: 1,
      isNotify: tenantDetails?.isLeaseNotify,

      name: "Lease",
      count: tenantDetails?.leases.length,
      show: false,
    },
    {
      id: 2,
      name: "Rent Cheque/Cash",
      count: rentCheques.length,
      isNotify: tenantDetails?.isRentChequeNotify,

      show: true,
    },
    {
      id: 3,
      name: "Security Cheque/Cash",
      count: securityCheques.length,
      isNotify: tenantDetails?.isSecurityChequeNotify,

      show: true,
    },
  ];

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const viewLease = (data) => {
    setShowLeasesModal(true);
    setSelectedLeaseView(data);
  };

  const leaseColumns = useMemo(
    () => [
      {
        Header: "S.No",
        accessor: "id",
        Cell: ({ row }) => (
          <div className="flex items-center gap-2">
            {row.original.isNotify && <Notifier />}{" "}
            {/* Show Notifier when isNotify is true */}
            <span>{row.index + 1}</span> {/* Display row index as S.No */}
          </div>
        ),
      },
      {
        Header: "Start Date",
        accessor: "startDate",
        Cell: ({ row }) => (
          <div className="flex items-center gap-[5px]">
            {/* {row.original.isNotify && (
              <span className="w-2 h-2 flex-shrink-0 rounded-full bg-red-500"></span>
            )} */}

            <span>{formatDate(row.original.startDate)}</span>
          </div>
        ),
      },
      {
        Header: "End Date",
        accessor: "endDate",
        Cell: ({ row }) => <span>{formatDate(row.original.endDate)}</span>,
      },

      {
        Header: "Annual Rent As Per Contract",
        accessor: "annualRentAsPerContract",
      },
      {
        Header: "Actual Rent",
        accessor: "actualRent",
      },

      {
        Header: "Status",
        accessor: "leaseStatusText",
        Cell: ({ row }) => {
          const statusName = row.original.leaseStatusText
            ? row.original.leaseStatusText
            : "Unknown";

          // Apply custom styles based on the status name
          return (
            <span
              className={
                leaseStatusStyle[statusName] ||
                "bg-gray-100 text-gray-600 px-2 py-1 rounded"
              }
            >
              {statusName}
            </span>
          );
        },
      },

      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="flex gap-x-3 h-full w-full ps-1 items-center">
            <Tooltip text="View">
              <button
                onClick={() => {
                  viewLease(row.original);
                }}
              >
                <img className="cursor-pointer" src={eyeIcon} alt="delete" />
              </button>
            </Tooltip>
            <Tooltip text="Delete">
              <button className="mr-5" onClick={() => handleDeleteLease(row)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15.722"
                  height="17.5"
                  viewBox="0 0 15.722 17.5"
                >
                  <g
                    id="Group_70"
                    data-name="Group 70"
                    transform="translate(-1268.25 -54.25)"
                  >
                    <path
                      id="Path_72"
                      data-name="Path 72"
                      d="M4,7H18.222"
                      transform="translate(1265 51.556)"
                      fill="none"
                      stroke="#1e1e1e"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                    <path
                      id="Path_75"
                      data-name="Path 75"
                      d="M5,7l.889,10.667a1.778,1.778,0,0,0,1.778,1.778h7.111a1.778,1.778,0,0,0,1.778-1.778L17.444,7"
                      transform="translate(1264.889 51.556)"
                      fill="none"
                      stroke="#1e1e1e"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                    <path
                      id="Path_76"
                      data-name="Path 76"
                      d="M9,6.556V3.889A.889.889,0,0,1,9.889,3h3.556a.889.889,0,0,1,.889.889V6.556"
                      transform="translate(1264.444 52)"
                      fill="none"
                      stroke="#1e1e1e"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                  </g>
                </svg>
              </button>
            </Tooltip>
          </div>
        ),
      },
    ],
    []
  );

  const rentChequeColumns = useMemo(
    () => [
      {
        Header: "Cheque Number",
        accessor: "chequeNo",
        Cell: ({ row }) => (
          <div className="flex items-center gap-[5px]">
            {row.original.isNotify && (
              <span className="w-2 h-2 flex-shrink-0 rounded-full bg-red-500"></span>
            )}
            {row.original.amountTypeText.toLowerCase() === "cash"
              ? "-"
              : row.original.chequeNo}
          </div>
        ),
      },
      {
        Header: "Amount Type",
        accessor: "amountTypeText",
      },
      { Header: "Amount", accessor: "amount" },
      {
        Header: "Date",
        accessor: "date",
        Cell: ({ value }) =>
          value ? new Date(value).toLocaleDateString() : "-",
      },
      { Header: "Note", accessor: "note" },
      {
        Header: "Status",
        accessor: "statusText",
        Cell: ({ row }) => {
          if (row.original.amountTypeText.toLowerCase() === "cash") {
            return "-"; // Display "-" if amountTypeText is "cash"
          }

          const statusName = row.original.statusText
            ? row.original.statusText
            : "Unknown";

          // Apply custom styles based on the status name
          return (
            <span
              className={
                chequeStatusStyle[statusName] ||
                "bg-gray-100 text-gray-600 px-2 py-1 rounded"
              }
            >
              {statusName}
            </span>
          );
        },
      },
      {
        Header: "Bank Name",
        accessor: "bankId",
        Cell: ({ value }) => {
          const bank =
            bankTypesData && bankTypesData.find((b) => b.id == value);
          return bank ? bank.name : "";
        },
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div>
            <button
              className="mr-5"
              onClick={() => handleDeleteRentCheque(row)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15.722"
                height="17.5"
                viewBox="0 0 15.722 17.5"
              >
                <g
                  id="Group_70"
                  data-name="Group 70"
                  transform="translate(-1268.25 -54.25)"
                >
                  <path
                    id="Path_72"
                    data-name="Path 72"
                    d="M4,7H18.222"
                    transform="translate(1265 51.556)"
                    fill="none"
                    stroke="#1e1e1e"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  />
                  <path
                    id="Path_75"
                    data-name="Path 75"
                    d="M5,7l.889,10.667a1.778,1.778,0,0,0,1.778,1.778h7.111a1.778,1.778,0,0,0,1.778-1.778L17.444,7"
                    transform="translate(1264.889 51.556)"
                    fill="none"
                    stroke="#1e1e1e"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  />
                  <path
                    id="Path_76"
                    data-name="Path 76"
                    d="M9,6.556V3.889A.889.889,0,0,1,9.889,3h3.556a.889.889,0,0,1,.889.889V6.556"
                    transform="translate(1264.444 52)"
                    fill="none"
                    stroke="#1e1e1e"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  />
                </g>
              </svg>
            </button>
          </div>
        ),
      },
    ],
    [bankTypesData]
  );

  const securityChequeColumns = useMemo(
    () => [
      {
        Header: "Cheque Number",
        accessor: "chequeNo",
        Cell: ({ row }) => (
          <div className="flex items-center gap-[5px]">
            {row.original.isNotify && (
              <span className="w-2 h-2 flex-shrink-0 rounded-full bg-red-500"></span>
            )}
            {row.original.amountTypeText.toLowerCase() === "cash"
              ? "-"
              : row.original.chequeNo}
          </div>
        ),
      },
      {
        Header: "Amount Type",
        accessor: "amountTypeText",
      },
      { Header: "Amount", accessor: "amount" },
      {
        Header: "Date",
        accessor: "date",
        Cell: ({ value }) =>
          value ? new Date(value).toLocaleDateString() : "-",
      },
      { Header: "Note", accessor: "note" },
      {
        Header: "Status",
        accessor: "statusText",
        Cell: ({ row }) => {
          if (row.original.amountTypeText.toLowerCase() === "cash") {
            return "-"; // Display "-" if amountTypeText is "cash"
          }

          const statusName = row.original.statusText
            ? row.original.statusText
            : "Unknown";

          // Apply custom styles based on the status name
          return (
            <span
              className={
                chequeStatusStyle[statusName] ||
                "bg-gray-100 text-gray-600 px-2 py-1 rounded"
              }
            >
              {statusName}
            </span>
          );
        },
      },
      {
        Header: "Bank Name",
        accessor: "bankId",
        Cell: ({ value }) => {
          const bank =
            bankTypesData && bankTypesData.find((b) => b.id == value);
          return bank ? bank.name : "";
        },
      }, // New column for bankName
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div>
            <button
              className="mr-5"
              onClick={() => handleDeleteSecurityCheque(row)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15.722"
                height="17.5"
                viewBox="0 0 15.722 17.5"
              >
                <g
                  id="Group_70"
                  data-name="Group 70"
                  transform="translate(-1268.25 -54.25)"
                >
                  <path
                    id="Path_72"
                    data-name="Path 72"
                    d="M4,7H18.222"
                    transform="translate(1265 51.556)"
                    fill="none"
                    stroke="#1e1e1e"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  />
                  <path
                    id="Path_75"
                    data-name="Path 75"
                    d="M5,7l.889,10.667a1.778,1.778,0,0,0,1.778,1.778h7.111a1.778,1.778,0,0,0,1.778-1.778L17.444,7"
                    transform="translate(1264.889 51.556)"
                    fill="none"
                    stroke="#1e1e1e"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  />
                  <path
                    id="Path_76"
                    data-name="Path 76"
                    d="M9,6.556V3.889A.889.889,0,0,1,9.889,3h3.556a.889.889,0,0,1,.889.889V6.556"
                    transform="translate(1264.444 52)"
                    fill="none"
                    stroke="#1e1e1e"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  />
                </g>
              </svg>
            </button>
          </div>
        ),
      },
    ],
    [bankTypesData]
  );

  const getColumns = (tableOption) => {
    if (tableOption === "Lease") {
      return leaseColumns;
    }
    if (tableOption === "Rent Cheque/Cash") {
      return rentChequeColumns;
    }
    if (tableOption === "Security Cheque/Cash") {
      return securityChequeColumns;
    }
    return "Lease";
  };

  const getData = (tableOption) => {
    if (tableOption === "Lease" && tenantDetails) {
      return tenantDetails.leases;
    }
    if (tableOption === "Rent Cheque/Cash") {
      return rentCheques;
    }
    if (tableOption === "Security Cheque/Cash") {
      return securityCheques;
    }
    return [];
  };

  const columns = getColumns(tableOption);

  const data = getData(tableOption);

  const handleDeleteRentCheque = (row) => {
    if (!id) {
      setRentCheques((prevCheques) =>
        prevCheques.filter((_, i) => i !== row.index)
      );
    } else {
      setRentChequeDeleteId(row.original.id);
      setShowDltRentChequeModal(true);
    }
  };

  const handleDeleteSecurityCheque = (row) => {
    if (!id) {
      setRentCheques((prevCheques) =>
        prevCheques.filter((_, i) => i !== row.index)
      );
    } else {
      setSecurityChequeDeleteId(row.original.id);
      setShowDltSecurityChequeModal(true);
    }
  };

  const handleDeleteLease = (row) => {
    if (!id) {
      setLeases((prevLeases) => prevLeases.filter((_, i) => i !== row.index));
    } else {
      setLeaseDeleteId(row.original.id);
      // setLeases((prevLeases) => prevLeases.filter((_, i) => i !== row.index));

      setShowDltLeaseModal(true);
    }
  };

  return (
    <div className="p-5">
      <div className="flex items-center mb-5 justify-between w-full">
        <TenantBreadcrumb singleTenant={{ name: "Tenant Details" }} />

        {/* Edit & Delete Button Section */}
        {/* <div className="flex gap-3">
          <button className="flex group bg-white justify-center items-center gap-[10px] h-max text-nowrap rounded-[10px] border border-custom-gray w-full p-2.5 py-1.5 text-[14px] text-[#1E1E1E] hover:bg-[#D82323] hover:text-white group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15.722"
              height="17.5"
              viewBox="0 0 15.722 17.5"
            >
              <g
                id="Group_70"
                data-name="Group 70"
                transform="translate(-1268.25 -54.25)"
              >
                <path
                  id="Path_72"
                  data-name="Path 72"
                  d="M4,7H18.222"
                  transform="translate(1265 51.556)"
                  fill="none"
                  className="group-hover:stroke-white stroke-[#1e1e1e]"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
                <path
                  id="Path_75"
                  data-name="Path 75"
                  d="M5,7l.889,10.667a1.778,1.778,0,0,0,1.778,1.778h7.111a1.778,1.778,0,0,0,1.778-1.778L17.444,7"
                  transform="translate(1264.889 51.556)"
                  fill="none"
                  className="group-hover:stroke-white stroke-[#1e1e1e]"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
                <path
                  id="Path_76"
                  data-name="Path 76"
                  d="M9,6.556V3.889A.889.889,0,0,1,9.889,3h3.556a.889.889,0,0,1,.889.889V6.556"
                  transform="translate(1264.444 52)"
                  fill="none"
                  className="group-hover:stroke-white stroke-[#1e1e1e]"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
              </g>
            </svg>
          </button>

          <button className="flex group bg-white justify-center items-center gap-[10px] h-max text-nowrap rounded-[10px] border border-custom-gray w-full p-2.5 py-1.5 text-[14px] text-[#1E1E1E] hover:bg-custom-gradient-green hover:text-white group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17.5"
              height="17.665"
              viewBox="0 0 17.5 17.665"
            >
              <g
                id="Group_69"
                data-name="Group 69"
                transform="translate(-1484.25 -93.085)"
              >
                <path
                  id="Path_68"
                  data-name="Path 68"
                  d="M6.824,7H5.882A1.882,1.882,0,0,0,4,8.882v8.471a1.882,1.882,0,0,0,1.882,1.882h8.471a1.882,1.882,0,0,0,1.882-1.882v-.941"
                  transform="translate(1481 90.765)"
                  fill="none"
                  className="group-hover:stroke-white stroke-[#1e1e1e]"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
                <path
                  id="Path_69"
                  data-name="Path 69"
                  d="M19.715,6.374a1.977,1.977,0,1,0-2.8-2.8L9,11.471v2.824h2.824l7.892-7.92Z"
                  transform="translate(1480.706 91)"
                  fill="none"
                  className="group-hover:stroke-white stroke-[#1e1e1e]"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
                <path
                  id="Path_70"
                  data-name="Path 70"
                  d="M16,5l2.824,2.824"
                  transform="translate(1480.294 90.882)"
                  fill="none"
                  className="group-hover:stroke-white stroke-[#1e1e1e]"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
              </g>
            </svg>
          </button>
        </div> */}
      </div>

      {/* Tenant General Info & Accommodation View Card Main Section */}
      <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        {/* Tenant General Info View Card */}
        <div className="bg-white rounded-lg w-full border border-[#0000001A] shadow-sm p-4">
          <div className="flex w-full mb-3 items-center gap-3">
            <div className="flex justify-center items-center rounded-lg h-[30px] w-[30px] border border-[#0000001A] shadow-sm bg-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17.5"
                height="15.722"
                viewBox="0 0 17.5 15.722"
              >
                <g
                  id="Group_23449"
                  data-name="Group 23449"
                  transform="translate(-3919.25 -3988.25)"
                >
                  <path
                    id="Path_38409"
                    data-name="Path 38409"
                    d="M3,4,3,6.667A2.667,2.667,0,0,1,5.667,4H16.333A2.667,2.667,0,0,1,19,6.667v8.889a2.667,2.667,0,0,1-2.667,2.667H5.667A2.667,2.667,0,0,1,3,15.556Z"
                    transform="translate(3917 3985)"
                    fill="none"
                    stroke="#1e1e1e"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  />
                  <path
                    id="Path_38410"
                    data-name="Path 38410"
                    d="M8.778,9.778,7,9.778A1.778,1.778,0,1,0,8.778,8,1.778,1.778,0,0,0,7,9.778"
                    transform="translate(3916.556 3984.556)"
                    fill="none"
                    stroke="#1e1e1e"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  />
                  <path
                    id="Path_38411"
                    data-name="Path_38411"
                    d="M15,8h1.778"
                    transform="translate(3915.667 3984.556)"
                    fill="none"
                    stroke="#1e1e1e"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  />
                  <path
                    id="Path_38412"
                    data-name="Path_38412"
                    d="M15,12h1.778"
                    transform="translate(3915.667 3984.111)"
                    fill="none"
                    stroke="#1e1e1e"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  />
                  <path
                    id="Path_38413"
                    data-name="Path_38413"
                    d="M7,16h8.889"
                    transform="translate(3916.556 3983.667)"
                    fill="none"
                    stroke="#1e1e1e"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  />
                </g>
              </svg>
            </div>
            <span className="font-semibold text-[17px]">General Info</span>
          </div>

          <div className="flex py-3 items-center">
            <span className="text-[#777777] w-[55px] font-medium text-[14px]">
              Name:
            </span>
            <span className="text-[14px]">
              {(tenantDetails && tenantDetails.name) || "john"}
            </span>
          </div>
          <div className="flex py-3 border-t border-[#0000001A] items-center">
            <span className="text-[#777777] w-[55px] font-medium text-[14px]">
              Phone:
            </span>
            <span className="text-[14px]">
              {(tenantDetails && tenantDetails.phone) || "3456798090"}
            </span>
          </div>
          <div className="flex py-3 border-t border-[#0000001A] items-center">
            <span className="text-[#777777] w-[55px] font-medium text-[14px]">
              Email:
            </span>
            <span className="text-[14px]">
              {(tenantDetails && tenantDetails.email) || ""}
            </span>
          </div>
          <div className="flex py-3 border-t border-[#0000001A] items-center">
            <span className="text-[#777777] w-[55px] font-medium text-[14px]">
              ID #:
            </span>
            <span className="text-[14px]">
              {(tenantDetails && tenantDetails.optionalId) || ""}
            </span>
          </div>
          <div className="flex gap-2 py-3 border-t border-[#0000001A] items-center">
            <span className="text-[#777777] w-[65px] font-medium text-[14px]">
              ID Image:
            </span>

            <div className="flex flex-wrap gap-4">
              {fetchedImages?.length > 0 ? (
                fetchedImages.map((file, index) => (
                  <div
                    key={index}
                    className="relative group border-custom-green border rounded-lg overflow-hidden w-52 h-28"
                  >
                    {file.fileType === "application/pdf" ? (
                      <div className="flex flex-col items-center">
                        <p className="text-gray-700">PDF File</p>
                        <a
                          href={file.blobUrl}
                          download={`Document_${index + 1}.pdf`}
                          className="text-blue-500 underline"
                        >
                          Download PDF
                        </a>
                      </div>
                    ) : (
                      <img
                        src={file.blobUrl}
                        alt={`Uploaded ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    )}

                    {/* View Button */}
                    <button
                      type="button"
                      onClick={() => openModal(file.blobUrl)}
                      className="absolute top-2 right-2 bg-blue-500 text-white p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-eye"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM8 4.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7z" />
                        <path d="M8 6.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
                      </svg>
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No images uploaded yet.</p>
              )}

              {/* Image Modal */}
              {modalOpen && (
                <div
                  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                  onClick={closeModal}
                >
                  <div
                    className="bg-white p-4 rounded-lg shadow-lg max-w-[600px]"
                    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
                  >
                    <div className="overflow-y-auto max-h-[500px]">
                      <img
                        src={selectedImage}
                        alt="Selected"
                        className=" h-auto rounded-md"
                      />
                    </div>
                    <div className="items-center justify-center mt-2 flex w-full">
                      <button
                        type="button"
                        className="mt-4 bg-red-500 text-white mr-2 px-4 py-2 rounded-lg"
                        onClick={closeModal}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex py-3 border-t border-[#0000001A] items-center">
            <span className="text-[#777777] w-[90px] font-medium text-[14px]">
              Sewerage Account
            </span>
            <span className="text-[14px] max-h-20 overflow-y-auto ms-3">
              {(tenantDetails && tenantDetails?.sewerageAccountNo) || ""}
            </span>
          </div>
          <div className="flex py-3 border-t border-[#0000001A] items-center">
            <span className="text-[#777777] w-[90px] font-medium text-[14px]">
              FEWA Account
            </span>
            <span className="text-[14px] max-h-20 overflow-y-auto ms-3">
              {(tenantDetails && tenantDetails?.fewaAccountNo) || ""}
            </span>
          </div>
        </div>

        {/* Tenant Accommodation View Card */}
        <div className="bg-white rounded-lg w-full border border-[#0000001A] shadow-sm p-4">
          <div className="flex w-full mb-3 items-center gap-3">
            <div className="flex justify-center items-center rounded-lg h-[30px] w-[30px] border border-[#0000001A] shadow-sm bg-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15.5"
                height="14.722"
                viewBox="0 0 15.5 14.722"
              >
                <g
                  id="Group_23492"
                  data-name="Group 23492"
                  transform="translate(-679.25 -309.25)"
                >
                  <path
                    id="Path_38370"
                    data-name="Path 38370"
                    d="M3,21H17"
                    transform="translate(677 302.222)"
                    fill="none"
                    stroke="#1e1e1e"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  />
                  <path
                    id="Path_38371"
                    data-name="Path 38371"
                    d="M4,17.222V5.556A1.556,1.556,0,0,1,5.556,4h9.333a1.556,1.556,0,0,1,1.556,1.556V17.222"
                    transform="translate(676.778 306)"
                    fill="none"
                    stroke="#1e1e1e"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  />
                  <path
                    id="Path_38372"
                    data-name="Path 38372"
                    d="M10,12h3.111v3.111H10Z"
                    transform="translate(675.444 303.444)"
                    fill="none"
                    stroke="#1e1e1e"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  />
                </g>
              </svg>
            </div>
            <span className="font-semibold text-[17px]">Accommodation</span>
          </div>

          <div className="flex py-3 items-center">
            <span className="text-[#777777] w-[90px] font-medium text-[14px]">
              Location:
            </span>
            <span className="text-[14px]">
              {(tenantDetails &&
                tenantDetails?.flat?.building?.location?.name) ||
                "abcd"}
            </span>
          </div>
          <div className="flex py-3 border-t border-[#0000001A] items-center">
            <span className="text-[#777777] w-[90px] font-medium text-[14px]">
              Building:
            </span>
            <span className="text-[14px]">
              {(tenantDetails && tenantDetails?.flat?.building?.name) || "abcd"}
            </span>
          </div>
          <div className="flex py-3 border-t border-[#0000001A] items-center">
            <span className="text-[#777777] w-[90px] font-medium text-[14px]">
              Flat:
            </span>
            <span className="text-[14px]">
              #{(tenantDetails && tenantDetails?.flat?.number) || ""}
            </span>
          </div>
          <div className="flex py-3 border-t border-[#0000001A] items-center">
            <span className="text-[#777777] w-[90px] font-medium text-[14px]">
              Description:
            </span>
            <span className="text-[14px] max-h-20 overflow-y-auto ms-3">
              {(tenantDetails && tenantDetails?.flat?.description) || ""}
            </span>
          </div>
          <div className="flex py-3 border-t border-[#0000001A] items-center">
            <span className="text-[#777777] w-[90px] font-medium text-[14px]">
              Sewerage ID:
            </span>
            <span className="text-[14px] max-h-20 overflow-y-auto ms-3">
              {(tenantDetails && tenantDetails?.flat?.sewerageAccountId) || ""}
            </span>
          </div>
          <div className="flex py-3 border-t border-[#0000001A] items-center">
            <span className="text-[#777777] w-[90px] font-medium text-[14px]">
              FEWA ID
            </span>
            <span className="text-[14px] max-h-20 overflow-y-auto ms-3">
              {(tenantDetails && tenantDetails?.flat?.fewaAccountId) || ""}
            </span>
          </div>
        </div>
      </div>

      {/* Lease & Cheque Button Section */}
      <div className="flex gap-4 mb-5">
        {TableOption.map((data) => (
          <>
            <button
              key={data.id}
              onClick={() => settableOption(data.name)} // Handle click to set the selected option
              className={`flex gap-3 justify-between items-center group h-max p-2.5 rounded-md border border-[#1E1E1E14] drop-shadow-sm bg-white hover:bg-custom-gradient-green active:bg-custom-gradient-green ${
                data.name === tableOption
                  ? "bg-custom-gradient-green text-white border-transparent"
                  : "border-transparent"
              }`}
            >
              {data?.isNotify && <Notifier />}
              <h2
                className={`text-[15px] flex gap-1 items-center text-nowrap group-hover:text-white text-[#1E1E1E] group-active:text-white ${
                  data.name === tableOption
                    ? "bg-custom-gradient-green text-white"
                    : ""
                }`}
              >
                {data.name}
              </h2>
              <div
                className={`flex justify-center items-center w-5 h-5 rounded-full p-1 text-[10px] group-hover:text-white text-[#1E1E1E] group-hover:bg-[#32a733] group-active:bg-[#32a733] group-active:text-white ${
                  data.name === tableOption
                    ? "bg-[#32a733] text-white"
                    : "bg-custom-gray"
                }`}
              >
                {data.count}
              </div>
            </button>
          </>
        ))}
      </div>

      <div className="relative overflow-x-auto sm:rounded-lg bg-white border border-black/10 rounded-lg opacity-100">
        <div className="flex bg-white items-center p-3 px-5 justify-between">
          <span className="text-[18px] text-[#1E1E1E] font-[500]">
            {tableOption}
          </span>
        </div>

        <div className="flex px-5 pt-2 pb-4 items-center justify-between">
          {/* <div className="flex items-center gap-4">
            <SearchField />
          </div> */}
          {/* <div className="flex items-center gap-4">
            <button
              //   onClick={() => {
              //     navigate("/tenants/addnewlease");
              //   }}
              className="flex justify-center items-center gap-[10px] w-auto rounded-[10px] border border-custom-gray p-2.5 py-1.5 text-[14px] text-[#1E1E1E] hover:bg-custom-gradient-green hover:text-white group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15.5"
                height="15.5"
                viewBox="0 0 15.5 15.5"
              >
                <g
                  id="Group_23192"
                  data-name="Group 23192"
                  transform="translate(-1103.25 -12.25)"
                >
                  <path
                    className="group-hover:stroke-white stroke-[#1E1E1E]"
                    id="Path_38297"
                    data-name="Path 38297"
                    d="M12,5V19"
                    transform="translate(1099 8)"
                    fill="none"
                    stroke="#1e1e1e"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  />
                  <path
                    className="group-hover:stroke-white stroke-[#1E1E1E]"
                    id="Path_38298"
                    data-name="Path 38298"
                    d="M5,12H19"
                    transform="translate(1099 8)"
                    fill="none"
                    stroke="#1e1e1e"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  />
                </g>
              </svg>
              Add {tableOption}
            </button>

            <div className="action-list-btn border border-[#1E1E1E1A] p-3 px-2 hover:bg-custom-gradient-green hover:text-white group relative rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="3.5"
                height="17.5"
                viewBox="0 0 3.5 17.5"
              >
                <g
                  id="Group_23334"
                  data-name="Group 23334"
                  transform="translate(-300.25 -220.25)"
                >
                  <path
                    className="stroke-[#1E1E1E] group-hover:stroke-white"
                    id="Path_52"
                    data-name="Path 52"
                    d="M12,12m-1,0a1,1,0,1,0,1-1,1,1,0,0,0-1,1"
                    transform="translate(290 217)"
                    fill="none"
                    stroke="#1e1e1e"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  />
                  <path
                    className="stroke-[#1E1E1E] group-hover:stroke-white"
                    id="Path_53"
                    data-name="Path 53"
                    d="M12,19m-1,0a1,1,0,1,0,1-1,1,1,0,0,0-1,1"
                    transform="translate(290 217)"
                    fill="none"
                    stroke="#1e1e1e"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  />
                  <path
                    className="stroke-[#1E1E1E] group-hover:stroke-white"
                    id="Path_54"
                    data-name="Path 54"
                    d="M12,5,11,5a1,1,0,1,0,1-1,1,1,0,0,0-1,1"
                    transform="translate(290 217)"
                    fill="none"
                    stroke="#1e1e1e"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  />
                </g>
              </svg>
              <div className="hidden w-[190px] action-list flex-col justify-between p-4 rounded-xl absolute bg-green right-[-10px] gap-1 bg-white border-custom-gray border z-40">
                <div
                  // onClick={() => {
                  //   editLocations(location);
                  // }}
                  className="action-list-item flex gap-3 items-center hover:bg-custom-gradient-green group cursor-pointer py-1.5 px-3 rounded-md"
                >
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
                        stroke="#1e1e1e"
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
                        stroke="#1e1e1e"
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
                        stroke="#1e1e1e"
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
                        stroke="#1e1e1e"
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
                        stroke="#1e1e1e"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                      />
                    </g>
                  </svg>

                  <h2 className="text-[15px] text-[#1E1E1E]">Export CSV</h2>
                </div>
                <div
                  // onClick={() => {
                  //   deleteLocations(location.id);
                  // }}
                  className="action-list-item flex gap-3 items-center hover:bg-custom-gradient-red group cursor-pointer py-1.5 px-3 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15.722"
                    height="17.5"
                    viewBox="0 0 15.722 17.5"
                  >
                    <g
                      id="Group_140"
                      data-name="Group 140"
                      transform="translate(-1268.25 -54.25)"
                    >
                      <path
                        id="Path_72"
                        data-name="Path 72"
                        d="M4,7H18.222"
                        transform="translate(1265 51.556)"
                        fill="none"
                        stroke="#1e1e1e"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                      />
                      <path
                        id="Path_75"
                        data-name="Path 75"
                        d="M5,7l.889,10.667a1.778,1.778,0,0,0,1.778,1.778h7.111a1.778,1.778,0,0,0,1.778-1.778L17.444,7"
                        transform="translate(1264.889 51.556)"
                        fill="none"
                        stroke="#1e1e1e"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                      />
                      <path
                        id="Path_76"
                        data-name="Path 76"
                        d="M9,6.556V3.889A.889.889,0,0,1,9.889,3h3.556a.889.889,0,0,1,.889.889V6.556"
                        transform="translate(1264.444 52)"
                        fill="none"
                        stroke="#1e1e1e"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                      />
                    </g>
                  </svg>
                  <h2 className="text-[15px] text-[#1E1E1E]">Delete</h2>
                </div>
              </div>
            </div>
          </div> */}
        </div>

        <div className="table-height">
          <MyTable
            columns={columns}
            data={data ? data : []}
            page={page}
            pageSize={pageSize}
            setPage={setPage}
            setPageSize={setPageSize}
            totalCount={1000}
            // pagination={false}
          />
        </div>
      </div>

      {showDltLeaseModal && (
        <DeleteModal
          onClose={() => setShowDltLeaseModal(!showDltLeaseModal)}
          title={`Are you sure you want to delete?`}
          setShowDltModal={setShowDltLeaseModal}
          deleteMutation={deleteLeaseMutation}
          deleteId={leaseDeleteId}
        />
      )}

      {showDltRentChequeModal && (
        <DeleteModal
          onClose={() => setShowDltRentChequeModal(!showDltRentChequeModal)}
          title={`Are you sure you want to delete?`}
          setShowDltModal={setShowDltRentChequeModal}
          deleteMutation={deleteChequeMutation}
          deleteId={rentChequeDeleteId}
        />
      )}

      {showDltSecurityChequeModal && (
        <DeleteModal
          onClose={() =>
            setShowDltSecurityChequeModal(!showDltSecurityChequeModal)
          }
          title={`Are you sure you want to delete?`}
          setShowDltModal={setShowDltSecurityChequeModal}
          deleteMutation={deleteChequeMutation}
          deleteId={securityChequeDeleteId}
        />
      )}

      {showLeasesModal && (
        <AddLeaseModal
          onClose={() => setShowLeasesModal(false)}
          // onSave={handleLeaseSaveCheques}
          title={"View Lease"}
          viewOnly={true}
          editingCheque={selectedLeaseView}
          initialValues={selectedLeaseView !== null ? selectedLeaseView : null} // Pre-fill data if editing
        />
      )}
    </div>
  );
};

export default TenantDetails;

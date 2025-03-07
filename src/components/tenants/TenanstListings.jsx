import React, { useCallback, useMemo, useState } from "react";
import SearchField from "../../components/search/Searchfield";
import dlticon from "../../assets/dlticon.svg";
import deactivateIcon from "../../assets/deactivateIcon.svg";
import { useDebounce } from "use-debounce";
import edticon from "../../assets/edticon.svg";
import { useTenants } from "../../hooks/useTenants";
import {
  formatAmount,
  formatDate,
  formatPhoneNumber,
} from "../../utils/format";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import MyTable from "../../components/myTable/MyTable";
import DeleteModal from "../../components/modal/DeleteModal";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Tooltip from "../../components/tooltip/tooltip";

function TenanstListings({ activeBuilding, selectedDefaultTab }) {
  const [checkedItems, setCheckedItems] = useState({});
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDltModal, setShowDltModal] = useState(false);
  const [tenantDeleteId, setTenantDeleteId] = useState(null);
  const [isExporting, setIsExporting] = useState(false);

  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const [isLoading, setIsLoading] = useState(false);
  const [orderBy, setOrderBy] = useState("Ascending"); // Default to ascending
  const [orderByProperty, setOrderByProperty] = useState("Flat.Number"); // Default to sorting by Name
  const { hasManagementAccess } = useSelector((state) => state.auth);

  const [listingTypeFilter, setListingTypeFilter] =
    useState(selectedDefaultTab || "All");
  const [showAlertsOnly, setShowAlertsOnly] = useState(false);

  const [tenantDeactivateId, setTenantDeactivateId] = useState(null);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);

  const {
    tenantsData,
    totalCount,
    isTenantsLoading,
    deleteTenantMutation,
    deactivateTenantMutation,
    fetchAllTenantsExport,
    tenantsCount,
  } = useTenants(
    page,
    pageSize,
    debouncedSearchQuery,
    null,
    null,
    null,
    null,
    activeBuilding,
    null,
    listingTypeFilter,
    showAlertsOnly,
    orderBy,
    orderByProperty
  );

  const handleExport = async () => {
    try {
      setIsLoading(true); // Start loader
      await fetchAllTenantsExport(); // Assuming this is an async function that triggers the export
    } catch (error) {
      console.error("Error exporting tenants:", error);
    } finally {
      setIsLoading(false); // Stop loader
    }
  };

  const columnToOrderByProperty = {
    id: "Id",
    name: "Name",
    phone: "Phone",
    email: "Email",
    optionalId: "OptionalId",
    flatId: "FlatId",
    description: "Description",
    startDate: "StartDate",
    endDate: "EndDate",
    totalAmount: "TotalAmount",
    receivedAmount: "ReceivedAmount",
    ["flat.number"]: "Flat.Number",
    isNotify: "IsNotify",
  };

  const columns = useMemo(
    () => [
      { Header: "Apartment no", accessor: "flat.number" },

      {
        Header: "Name",
        accessor: "name",
        Cell: ({ row }) => (
          <div className="flex items-center gap-[5px]">
            {row.original.isNotify && (
              <span className="w-2 h-2 flex-shrink-0 rounded-full bg-red-500"></span>
            )}
            <span>{row.original.name}</span>
          </div>
        ),
      },

      {
        Header: "Phone",
        accessor: "phone",
        Cell: ({ row }) => (
          <span>
            {formatPhoneNumber(
              row.original.phone,
              row.original.phoneCountryCode
            )}
          </span>
        ),
      },

      {
        Header: "Lease Start",
        accessor: "startDate",
        Cell: ({ row }) => <span>{formatDate(row.original.startDate)}</span>,
      },
      {
        Header: "Lease End",
        accessor: "endDate",
        Cell: ({ row }) => <span>{formatDate(row.original.endDate)}</span>,
      },
      // {
      //   Header: "Grace period End Date",
      //   accessor: "gracePeriodEndDate",
      //   Cell: ({ row }) => (
      //     <span>{formatDate(row.original.gracePeriodEndDate)}</span>
      //   ),
      // },

      { Header: "No Of Days", accessor: "noOfdays" },

      {
        Header: "Description",
        accessor: "description",
        Cell: ({ row }) => (
          <span>{row?.original.flat?.description ?? "-"}</span>
        ),
      },

      {
        Header: "Contract Rent",
        accessor: "annualRentAsPerContract",
        Cell: ({ row }) => (
          <span>{formatAmount(row.original.annualRentAsPerContract)}</span>
        ),
      },
      {
        Header: "Actual Rent",
        accessor: "actualRent",
        Cell: ({ row }) => <span>{formatAmount(row.original.actualRent)}</span>,
      },

      {
        Header: "Actions",
        accessor: "actions",
        disableSortBy: true,

        Cell: ({ row }) => (
          <div className="flex gap-[20px] w-max ">
            <Tooltip text="View">
              <button
                onClick={() => {
                  viewMyTenant(row.original.id);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19.779"
                  height="13.5"
                  viewBox="0 0 19.779 13.5"
                >
                  <g
                    id="Group_25369"
                    data-name="Group 25369"
                    transform="translate(-3305.25 -1248.25)"
                  >
                    <path
                      id="Path_38670"
                      data-name="Path 38670"
                      d="M10,12a2,2,0,1,0,2-2,2,2,0,0,0-2,2"
                      transform="translate(3303 1243)"
                      fill="none"
                      stroke="#000"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                    <path
                      id="Path_38671"
                      data-name="Path 38671"
                      d="M21,12q-3.6,6-9,6T3,12q3.6-6,9-6t9,6"
                      transform="translate(3303 1243)"
                      fill="none"
                      stroke="#000"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                  </g>
                </svg>
              </button>
            </Tooltip>
            {!row.original.isDeActive && hasManagementAccess && (
              <Tooltip text="Deactivate">
                <img
                  className="cursor-pointer"
                  onClick={() => {
                    deactivateTenant(row.original.id);
                  }}
                  src={deactivateIcon}
                  alt=""
                />
              </Tooltip>
            )}
            {hasManagementAccess && (
              <Tooltip text="Delete">
                <img
                  className="cursor-pointer"
                  onClick={() => {
                    deleteMyTenant(row.original.id);
                  }}
                  src={dlticon}
                  alt=""
                />
              </Tooltip>
            )}

            <Tooltip text="Edit">
              <img
                onClick={() => {
                  editMyTenant(row.original.id);
                }}
                className="cursor-pointer"
                src={edticon}
                alt=""
              />
            </Tooltip>
          </div>
        ),
      },
    ],
    [checkedItems]
  );

  const deleteMyTenant = (id) => {
    setTenantDeleteId(id);

    setShowDltModal(true);
  };

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  }, []);

  const navigate = useNavigate();

  const handleAddTenantClick = () => {
    navigate("/tenants/addnewtenant");
  };

  const editMyTenant = (tenantId) => {
    navigate(`/tenants/addnewtenant/${tenantId}`);
  };

  const viewMyTenant = (tenantId) => {
    navigate(`/tenants/details/${tenantId}`);
  };

  const tenantFilterButtons = [
    {
      id: 1,
      label: "All Tenants",
      value: "All",
      countKey: "all",
    },
    {
      id: 2,
      label: "Active",
      value: "Current",
      countKey: "current",
    },
    {
      id: 3,
      label: "Pending",
      value: "Pending",
      countKey: "pending",
    },

    {
      id: 12,
      label: "Expired",
      value: "Expired",
      countKey: "expired",
    },
    {
      id: 5,
      label: "Deactivated",
      value: "DeActivated",
      countKey: "deActivated",
    },
    {
      id: 6,
      label: "Without Lease",
      value: "WithoutLease",
      countKey: "tenantWithoutLease",
    },
    {
      id: 4,
      label: "History",
      value: "History",
      countKey: "history",
    },
  ];

  const deactivateTenant = (id) => {
    setTenantDeactivateId(id);
    setShowDeactivateModal(true);
  };

  return (
    <div className="relative overflow-x-auto sm:rounded-lg bg-white border border-black/10 rounded-lg opacity-100">
      <div className="py-[20px] px-[10px] flex items-center flex-row  justify-between flex-wrap gap-2">
        <div className="flex flex-wrap gap-2">
          {tenantFilterButtons.map((b) => {
            return (
              <>
                <button
                  className={`flex gap-3 justify-between items-center group h-max p-2.5 py-1.5 rounded-md border border-custom-gray bg-white hover:bg-custom-gradient-green active:bg-custom-gradient-green ${
                    listingTypeFilter === b.value
                      ? "bg-custom-gradient-green border-transparent text-white"
                      : ""
                  }`}
                  onClick={() => setListingTypeFilter(b.value)}
                >
                  <h2
                    className={`text-[14px] text-nowrap group-hover:text-white group-active:text-white ${
                      listingTypeFilter === b.value ? "text-white" : ""
                    }`}
                  >
                    {b.label}
                  </h2>
                  {tenantsCount && (
                    <div
                      className={`flex justify-center items-center w-5 h-5 rounded-full p-1 text-[10px] group-hover:text-white text-[#1E1E1E] group-hover:bg-[#32a733]  group-active:bg-[#32a733] group-active:text-white  ${
                        listingTypeFilter === b.value
                          ? "bg-[#32a733] text-white"
                          : "bg-custom-gray"
                      }`}
                    >
                      {tenantsCount[b.countKey]}
                    </div>
                  )}
                </button>
              </>
            );
          })}
        </div>
        <div className="flex gap-2 flex-wrap">
          <div>
            <SearchField
              handleSearchChange={handleSearchChange}
              searchQuery={searchQuery}
            />
          </div>
          <button
            onClick={() => setShowAlertsOnly(!showAlertsOnly)}
            className={`flex justify-center items-center p-2.5 py-1.5 gap-[5px] h-max text-nowrap rounded-[10px] border border-custom-gray text-[14px] text-[#1E1E1E] hover:bg-custom-gradient-green hover:text-white group ${
              showAlertsOnly
                ? "bg-custom-gradient-green border-transparent text-white"
                : ""
            }`}
          >
            <span
              className={`w-2 h-2 flex-shrink-0 rounded-full group-hover:bg-white bg-red-500 ${
                showAlertsOnly ? "bg-white" : ""
              }`}
            ></span>
            Alerts
          </button>
          <button
            onClick={handleAddTenantClick}
            className="flex justify-center items-center gap-[5px] h-max text-nowrap rounded-[10px] border border-custom-gray  p-2.5 py-1.5 text-[14px] text-[#1E1E1E] hover:bg-custom-gradient-green hover:text-white group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15.5"
              height="15.5"
              viewBox="0 0 15.5 15.5"
            >
              <g
                id="Group_23168"
                data-name="Group 23168"
                transform="translate(-1103.25 -12.25)"
              >
                <path
                  id="Path_38297"
                  data-name="Path 38297"
                  d="M12,5V19"
                  transform="translate(1099 8)"
                  fill="none"
                  className="group-hover:stroke-white stroke-[#1E1E1E]"
                  stroke="#0000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
                <path
                  id="Path_38298"
                  data-name="Path 38298"
                  d="M5,12H19"
                  transform="translate(1099 8)"
                  fill="none"
                  className="group-hover:stroke-white stroke-[#1E1E1E]"
                  stroke="#0000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
              </g>
            </svg>
            Add
          </button>
          <button
            onClick={handleExport}
            className="flex justify-center items-center gap-[6px] h-max text-nowrap rounded-[10px] border border-custom-gray  p-2.5 py-1.5 text-[14px] text-[#1E1E1E] hover:bg-custom-gradient-green hover:text-white group"
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="loader"></div> {/* Add your loader styles */}
                Exporting...
              </div>
            ) : (
              <>
                {" "}
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
                      className="group-hover:stroke-white stroke-[#1E1E1E]"
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
                      className="group-hover:stroke-white stroke-[#1E1E1E]"
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
                      className="group-hover:stroke-white stroke-[#1E1E1E]"
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
                      className="group-hover:stroke-white stroke-[#1E1E1E]"
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
                      className="group-hover:stroke-white stroke-[#1E1E1E]"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                  </g>
                </svg>
                Export
              </>
            )}
          </button>
        </div>
      </div>

      {isTenantsLoading ? (
        <div className="p-6 table-height">
          {Array.from({ length: pageSize }).map((_, index) => (
            <div key={index} className="mb-4">
              <Skeleton height={40} />
            </div>
          ))}
        </div>
      ) : tenantsData && tenantsData.length > 0 ? (
        <MyTable
          columns={columns}
          data={tenantsData}
          page={page}
          pageSize={pageSize}
          setPage={setPage}
          setPageSize={setPageSize}
          totalCount={totalCount} // Pass total records to ReactTable
          pagination={true}
          columnToOrderByProperty={columnToOrderByProperty}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          orderByProperty={orderByProperty}
          setOrderByProperty={setOrderByProperty}
        />
      ) : (
        <div className="p-6">No Tenants found.</div>
      )}
      {showDltModal && (
        <DeleteModal
          onClose={() => setShowDltModal(!showDltModal)}
          title={"Are you sure you want to delete this tenant?"}
          setShowDltModal={setShowDltModal}
          deleteMutation={deleteTenantMutation}
          deleteId={tenantDeleteId}
        />
      )}

      {showDeactivateModal && (
        <DeleteModal
          onClose={() => setShowDeactivateModal(!showDeactivateModal)}
          title={"Are you sure you want to deactivate this tenant?"}
          setShowDltModal={setShowDeactivateModal}
          deleteId={tenantDeactivateId}
          deleteMutation={deactivateTenantMutation}
          hideDltIcon={true}
        />
      )}
    </div>
  );
}

export default TenanstListings;

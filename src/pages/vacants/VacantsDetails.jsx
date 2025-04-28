import { useMemo, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";
import {
  useLocation,
  useNavigate,
  useSearchParams
} from "react-router-dom";
import { useDebounce } from "use-debounce";
import edticon from "../../assets/edticon.svg";
import { CustomDropdown } from "../../components/Common/CustomDropdown";
import FlatListing from "../../components/flat/FlatListing";
import MyTable from "../../components/myTable/MyTable";
import Tooltip from "../../components/tooltip/tooltip";
import { useAdminDashboard } from "../../hooks/useAdminDashboard";
import { useFlats } from "../../hooks/useFlats";
import { useMyLocations } from "../../hooks/useMyLocations";
import { useTenants } from "../../hooks/useUsers";
import {
  formatAmount,
  formatDate,
  formatPhoneNumber,
} from "../../utils/format";

function VacantDetails({ activeBuilding }) {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  // const buildingId = searchParams.get("buildingId"); // Get the buildingId from the URL

  const location = useLocation();
  const { buildingId: buildingIdState, locationId: locationIdState } =
    location.state || {};

  const [locationId, setLocationId] = useState(locationIdState);
  const [buildingId, setBuildingId] = useState(buildingIdState);

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

  const [listingTypeFilter, setListingTypeFilter] = useState("WithoutTenant");
  const [showAlertsOnly, setShowAlertsOnly] = useState(false);

  const [tenantDeactivateId, setTenantDeactivateId] = useState(null);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);

  let distinctOnly = true;
  const { tenantsData, totalCount, isTenantsLoading } = useTenants(
    page,
    pageSize,
    debouncedSearchQuery,
    null,
    null,
    null,
    null,
    (activeBuilding = buildingId),
    null,
    listingTypeFilter != "WithoutTenant" ? listingTypeFilter : undefined,
    showAlertsOnly,
    orderBy,
    orderByProperty,
    locationId,
    null,
    null,
    null,
    null,
    distinctOnly
  );
  const { locationsData, isLocationsLoading } = useMyLocations(1, 10000);

  const handleLocationChange = (e) => {
    const selectedLocationId = e.target.value;

    setLocationId(
      selectedLocationId == "All Locations" ? null : selectedLocationId
    );
    setBuildingId(null);
  };

  const handleBuildingChange = (e) => {
    const selectedBuildingId = e.target.value;
    setBuildingId(
      selectedBuildingId == "All Buildings" ? null : selectedBuildingId
    ); // Update locationId state if needed
  };

  const { buildingsDataOwn, flatsData } = useFlats(
    1,
    100000,
    buildingId,
    locationId
  );

  const { formattedStats } = useAdminDashboard({
    buildingId: buildingId,
    locationId: locationId,
    useLocationInStats: true
  });

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

  const tenantColumns = useMemo(
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
      //   {
      //     Header: "Grace period End Date",
      //     accessor: "gracePeriodEndDate",
      //     Cell: ({ row }) => (
      //       <span>{formatDate(row.original.gracePeriodEndDate)}</span>
      //     ),
      //   },

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

  const viewMyTenant = (tenantId) => {
    navigate(`/tenants/details/${tenantId}`);
  };

  const editMyTenant = (tenantId) => {
    navigate(`/tenants/addnewtenant/${tenantId}`);
  };
  const tenantFilterButtons = [
    // {
    //   id: 4,
    //   label: "Expired",
    //   value: "History",
    //   countKey: "history",
    // },

    {
      id: 6,
      label: "Unassigned",
      value: "WithoutTenant",
      countKey: "withoutTenant",
    },
    {
      id: 7,
      label: "No lease",
      value: "WithoutLease",
      countKey: "withoutLease",
    },
    {
      id: 8,
      label: "Deactivated",
      value: "DeActivated",
      countKey: "deActivated",
    },
  ];

  return (
    <div className="flex h-full">
      <div className="px-5 py-0 w-full wrapper-height">
        <div className="my-4 flex gap-4">
          <div className="flex flex-wrap mt-5 md:mt-0 items-center gap-3">
            {!isLocationsLoading ? (
              <>
                <div className="custom-select relative">
                  <CustomDropdown
                    defaultSelectedOptionText="All Locations"
                    optionsData={locationsData}
                    onChange={handleLocationChange}
                    defaultSelectedOptionValue={locationId}
                  />
                </div>
                <div className="custom-select relative">
                  <CustomDropdown
                    defaultSelectedOptionText="All Buildings"
                    optionsData={buildingsDataOwn}
                    onChange={handleBuildingChange}
                    defaultSelectedOptionValue={buildingId}
                  />
                </div>
              </>
            ) : (
              <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, index) => (
                  <div key={index}>
                    <Skeleton height={20} width={80} className="mb-2" />
                    <Skeleton height={40} className="rounded-md" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
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
                      {formattedStats && (
                        <div
                          className={`flex justify-center items-center w-5 h-5 rounded-full p-1 text-[10px] group-hover:text-white text-[#1E1E1E] group-hover:bg-[#32a733]  group-active:bg-[#32a733] group-active:text-white  ${
                            listingTypeFilter === b.value
                              ? "bg-[#32a733] text-white"
                              : "bg-custom-gray"
                          }`}
                        >
                          {formattedStats[b.countKey]}
                        </div>
                      )}
                    </button>
                  </>
                );
              })}
            </div>
          </div>

          {listingTypeFilter === "History" ||
          listingTypeFilter === "WithoutLease" ||
          listingTypeFilter === "DeActivated" ? (
            <>
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
                  columns={tenantColumns}
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
            </>
          ) : (
            <>
              <FlatListing activeBuilding={buildingId} hideTopBar={true} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default VacantDetails;

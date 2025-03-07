import { useEffect, useState } from "react";
import { useMyLocations } from "../../../hooks/useMyLocations";
import LocationsBreadcrumb from "../../../components/locations/LocationsBreadcrumb";
import BuildingsListing from "../../../components/buildings/BuildingsListing";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import DetailedViewListings from "./DetailedViewListing";
import { useAdminDashboard } from "../../../hooks/useAdminDashboard";
import { useFlats } from "../../../hooks/useFlats";
import DatePickerField from "../../../components/DatePicker/DatePickerField";
import { CustomDropdown } from "../../../components/Common/CustomDropdown";
import { useTenants } from "../../../hooks/useTenants";
import { ChequeStatuses, LeaseStatuses } from "../../../utils/enums";
import { useLocation } from "react-router-dom";

const filterOptions = [
  {
    id: "cheque-deposit",
    name: "Cheque Deposit",
  },
  {
    id: "cheque-clearance",
    name: "Cheque Clearance",
  },
  // {
  //   id: "lease-aging",
  //   name: "Lease Aging",
  // },
];

const DetailedView = () => {
  const location = useLocation();
  const passedState = location.state || {}; // Get passed state or empty object
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [chequePage, setChequePage] = useState(1);
  const [chequePageSize, setChequePageSize] = useState(10);
  const [locationId, setLocationId] = useState(passedState.locationId ?? -1);
  const [buildingId, setBuildingId] = useState(passedState.buildingId || null);
  const [selectedFilter, setSelectedFilter] = useState(
    passedState.selectedFilter
      ? filterOptions.find((fl) => fl.id === passedState.selectedFilter).id
      : filterOptions[0].id
  );
  const [date, setDate] = useState(passedState.date || new Date());
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const [chequeDepositBuildingId, setChequeDepositBuildingId] = useState(null);
  const [chequeDepositDate, setChequeDepositDate] = useState(new Date());

  const [chequeClearanceBuildingId, setChequeClearanceBuildingId] =
    useState(null);
  const [chequeClearanceDate, setChequeClearanceDate] = useState(new Date());
  let tabs = [];

  let filterFound = filterOptions.find(
    (filter) => filter.id === selectedFilter
  );

  if (filterFound) {
    switch (filterFound.id) {
      case "cheque-deposit": {
        tabs = [
          {
            id: 0,
            name: "All",
            count: 0,
            key: [ChequeStatuses.PDC.label, ChequeStatuses.Deposited.label],
          },
          {
            id: 1,
            name: "Deposited",
            count: 0,
            key: [ChequeStatuses.Deposited.label],
          },
          {
            id: 2,
            name: "Not Deposited",
            count: 0,
            key: [ChequeStatuses.PDC.label],
          },
        ];
        break;
      }
      case "cheque-clearance": {
        tabs = [
          {
            id: 0,
            name: "All",
            count: 0,
            key: [
              ChequeStatuses.Bounced.label,
              ChequeStatuses.Cleared.label,
              ChequeStatuses.PDC.label,
            ],
          },
          {
            id: 1,
            name: "Bounced",
            count: 0,
            key: [ChequeStatuses.Bounced.label],
          },
          {
            id: 2,
            name: "Cleared",
            count: 0,
            key: [ChequeStatuses.Cleared.label],
          },
          {
            id: 3,
            name: "Not Cleared",
            count: 0,
            key: [ChequeStatuses.PDC.label],
          },
        ];
        break;
      }
      case "lease-aging": {
        tabs = [
          {
            id: 0,
            name: "All",
            count: 0,
            key: [
              LeaseStatuses.Active.label,
              LeaseStatuses.Pending.label,
              LeaseStatuses.Expired.label,
              LeaseStatuses.Cancelled.label,
            ],
          },
          {
            id: 1,
            name: "Active",
            count: 0,
            key: [LeaseStatuses.Active.label],
          },
          {
            id: 2,
            name: "Pending",
            count: 0,
            key: [LeaseStatuses.Pending.label],
          },
          {
            id: 3,
            name: "Expired",
            count: 0,
            key: [LeaseStatuses.Expired.label],
          },
          {
            id: 4,
            name: "Cancelled",
            count: 0,
            key: [LeaseStatuses.Cancelled.label],
          },
        ];
        break;
      }
    }
  }
  useEffect(() => {
    setChequeDepositBuildingId(null);
    setChequeClearanceBuildingId(null);
  }, [buildingId]);

  useEffect(() => {
    setChequeDepositBuildingId(null);
    setChequeClearanceBuildingId(null);
  }, [locationId]);

  useEffect(() => {
    setChequeDepositDate(date);
    setChequeClearanceDate(date);
    setFromDate(date);
    setToDate(date);
  }, [date]);

  // const { leaseAging } = useAdminDashboard({
  //   date: date,
  //   fromDate: fromDate,
  //   toDate: toDate,
  //   buildingId: buildingId,
  //   locationId: locationId,
  //   chequeDepositBuildingId: chequeDepositBuildingId,
  //   chequeDepositDate: chequeDepositDate,
  //   chequeClearanceBuildingId: chequeClearanceBuildingId,
  //   chequeClearanceDate: chequeClearanceDate,
  // });

  const { locationsData, isLocationsLoading } = useMyLocations(page, pageSize);
  const { buildingsDataOwn } = useFlats(
    page,
    pageSize,
    buildingId ? buildingId : -1,
    locationId,
    null
  );

  useEffect(() => {
    if (locationsData && locationsData.length > 0 && !locationId) {
      const initialLocation = locationsData[0];

      setLocationId(initialLocation.id);
    }
  }, [locationsData]);

  const handleLocationChange = (e) => {
    const selectedLocationId = e.target.value;
    setLocationId(selectedLocationId); // Update state
    setBuildingId(null);
  };

  const handleBuildingChange = (e) => {
    const selectedBuildingId = e.target.value;
    setBuildingId(selectedBuildingId); // Update locationId state if needed
  };

  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setSelectedFilter(selectedFilter); // Update locationId state if needed
  };

  // useEffect(() => {
  //   if (locationsData && locationsData.length > 0) {
  //     const initialLocation =
  //       locationsData.find((location) => location.id === activeLocation) ||
  //       locationsData[0];

  //     setActiveLocation(initialLocation.id);
  //     setSingleLocation(initialLocation);
  //     setBuildings(initialLocation.buildings || []);
  //   }
  // }, [locationsData]);

  // useEffect(() => {
  //   if (buildings) {
  //     const initialBuilding =
  //       buildings.find((building) => building.id === activeBuilding) ||
  //       buildings[0];

  //     setActiveBuilding(initialBuilding?.id || null);
  //     setSingleBuilding(initialBuilding || null);
  //   }
  // }, [buildings]);

  // const handleLocationClick = (location) => {
  //   setActiveLocation(location.id);
  //   setSingleLocation(location);
  //   setBuildings(location.buildings || []);
  // };

  // const handleBuildingClick = (building) => {
  //   console.log("building", building.id);
  //   setActiveBuilding(building.id);
  //   setSingleBuilding(building);
  // };

  return (
    <>
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
                      defaultSelectedOptionValue={locationId ?? -1}
                    />
                  </div>
                  <div className="custom-select relative">
                    <CustomDropdown
                      defaultSelectedOptionText="All Buildings"
                      optionsData={buildingsDataOwn}
                      onChange={handleBuildingChange}
                      defaultSelectedOptionValue={buildingId ?? -1}
                    />
                  </div>
                  <div className="custom-select relative">
                    <CustomDropdown
                      defaultSelectedOptionText={selectedFilter}
                      optionsData={filterOptions}
                      onChange={handleFilterChange}
                      defaultSelectedOptionValue={selectedFilter}
                      isdefaultOption={false}
                    />
                  </div>
                </>
              ) : (
                // Skeletons for Assign Accommodation
                <div className="grid grid-cols-4 gap-4">
                  {[...Array(4)].map((_, index) => (
                    <div key={index}>
                      <Skeleton height={20} width={80} className="mb-2" />
                      <Skeleton height={40} className="rounded-md" />
                    </div>
                  ))}
                </div>
              )}
              {/* <DatePickerField
                label={""}
                onDateChange={setDate}
                dateValue={date}
                formInput={false}
                className="bg-white !mt-0 w-[230px] p-2 !py-1.5 rounded-lg select-sm border border-custom-gray hover:border-custom-green text-black placeholder:text-[#959595] focus-visible:outline-custom-green placeholder:text-[14px] text-[14px]"
              /> */}
            </div>
          </div>

          <DetailedViewListings
            rowClick={true}
            tabs={tabs}
            selectedFilter={selectedFilter}
            locationId={locationId}
            buildingId={buildingId}
            date={date}
          />
        </div>
      </div>
    </>
  );
};

export default DetailedView;

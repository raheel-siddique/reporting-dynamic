// import ReusableModal from "../../components/modal/ReusableModal";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TenanstListings from "../../components/tenants/TenanstListings";
// import ReusableModal from "../../components/modal/ReusableModal";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import BuildingsListing from "../../components/buildings/BuildingsListing";
import { useMyLocations } from "../../hooks/useMyLocations";

const Tenants = () => {
  // const filters = [{ name: "Current" }, { name: "History" }];

  const location = useLocation();
  const { selectedTab, locationId, buildingId } = location.state || {};

  console.log({ selectedTab, locationId, buildingId })

  const navigate = useNavigate();

  const filters = [{ name: "Current" }, { name: "History" }];

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);

  const { locationsData, isLocationsLoading, deleteLocationMutation } =
    useMyLocations(page, pageSize);

    const [activeLocation, setActiveLocation] = useState(() => {
      return locationId || JSON.parse(localStorage.getItem("activeLocation")) || null;
    });
    
    const [activeBuilding, setActiveBuilding] = useState(() => {
      return buildingId || JSON.parse(localStorage.getItem("activeBuilding")) || null;
    });
    
    

  const [buildings, setBuildings] = useState([]);

  useEffect(() => {
    if (locationsData && locationsData.length > 0) {
      const savedLocation = JSON.parse(localStorage.getItem("activeLocation"));
      const initialLocation =
        locationsData.find((location) => location.id == savedLocation) ||
        locationsData[0];
  
      setActiveLocation(initialLocation.id);
      setBuildings(initialLocation.buildings || []);
    }
  }, [locationsData]);
  
  useEffect(() => {
    if (buildings && buildings.length > 0) {
      const savedBuilding = JSON.parse(localStorage.getItem("activeBuilding"));
      const initialBuilding =
        buildings.find((building) => building.id === savedBuilding) ||
        buildings[0];
  
      setActiveBuilding(initialBuilding.id);
    }
  }, [buildings]);
  
  
  const handleLocationClick = (location) => {
    setActiveLocation(location.id);
    setBuildings(location.buildings || []);
    localStorage.setItem("activeLocation", JSON.stringify(location.id));
  };
  
  const handleBuildingClick = (building) => {
    setActiveBuilding(building.id);
    localStorage.setItem("activeBuilding", JSON.stringify(building.id));
  };
  

  return (
    <>
      <div className="flex h-full">
        <div className="px-5 py-0 w-full wrapper-height">
          <div className="my-4 flex gap-4">
            {isLocationsLoading ? (
              Array.from({ length: 10 }).map((_, index) => (
                <Skeleton key={index} height={30} />
              ))
            ) : locationsData && locationsData.length > 0 ? (
              <div className="custom-select relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18.812"
                  height="21.676"
                  viewBox="0 0 18.812 21.676"
                  className="absolute top-[12px] left-[14px] h-[39%] z-10"
                >
                  <g transform="translate(0.75 0.75)">
                    <path
                      d="M9,11a3,3,0,1,0,3-3,3,3,0,0,0-3,3"
                      transform="translate(-3.344 -2.394)"
                      fill="none"
                      className="stroke-black"
                      stroke="#fff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M18.776,17.776l-4.591,4.591a2.164,2.164,0,0,1-3.059,0L6.535,17.776a8.656,8.656,0,1,1,12.241,0Z"
                      transform="translate(-4 -3)"
                      fill="none"
                      className="stroke-black"
                      stroke="#fff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                  </g>
                </svg>
                <select
                  className="w-[220px] px-3 py-[7.1px] ps-[37px] rounded-lg border border-[#1e1e1e70] hover:border-custom-green text-black placeholder:text-[#959595] focus-visible:outline-custom-green placeholder:text-[14px] text-[14px]"
                  // value={activeLocation?.id || ""}
                  onChange={(e) => {
                    const selectedLocation = locationsData.find(
                      (location) => location.id === Number(e.target.value)
                    );
                    handleLocationClick(selectedLocation);
                  }}
                  defaultValue={activeLocation}
                >
                  <option value="" disabled>
                    Select a Location
                  </option>
                  {locationsData.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <p>No Location Found</p>
            )}

            <div className="flex items-center justify-between">
              <div className="flex gap-4 tab-width">
                {isLocationsLoading ? (
                  Array.from({ length: 6 }).map((_, index) => (
                    <Skeleton key={index} height={35} width={120} />
                  ))
                ) : buildings.length > 0 ? (
                  buildings.map((building, index) => (
                    <BuildingsListing
                      building={building}
                      key={index}
                      handleBuildingClick={handleBuildingClick}
                      activeBuilding={activeBuilding}
                      count={building.tenantCount}
                    />
                  ))
                ) : (
                  <p>No buildings available for this location.</p>
                )}
              </div>
            </div>
          </div>
          <TenanstListings
            activeBuilding={activeBuilding}
            rowClick={true}
            selectedDefaultTab={selectedTab}
          />
        </div>
      </div>
    </>
  );
};

export default Tenants;

import { useEffect, useState } from "react";
import ReusableModal from "../../components/modal/ReusableModal";
import { useMyLocations } from "../../hooks/useMyLocations";
import LocationListings from "../../components/locations/LocationsListing";
import LocationsFooter from "../../components/locations/LocationsFooter";
import LocationsBreadcrumb from "../../components/locations/LocationsBreadcrumb";
import BuildingsListing from "../../components/buildings/BuildingsListing";
import AddBuildingBtn from "../../components/buildings/AddBuildingBtn";
import FlatListing from "../../components/flat/FlatListing";
import ReusableInput from "../../components/form-elements/input/ReusableInput";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import AddBuildingModal from "../../components/locations/AddBuildingModal";

const TalentLocationFilter = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);

  const { locationsData, isLocationsLoading, deleteLocationMutation } =
    useMyLocations(page, pageSize);

  const [activeLocation, setActiveLocation] = useState(
    localStorage.getItem("activeLocation") || null
  );
  const [activeBuilding, setActiveBuilding] = useState(
    localStorage.getItem("activeBuilding") || null
  );

  const [singleLocation, setSingleLocation] = useState(null);
  const [singleBuilding, setSingleBuilding] = useState(null);

  const [buildings, setBuildings] = useState([]);

  useEffect(() => {
    if (locationsData && locationsData.length > 0) {
      const initialLocation =
        locationsData.find((location) => location.id === activeLocation) ||
        locationsData[0];

      setActiveLocation(initialLocation.id);
      setSingleLocation(initialLocation);
      setBuildings(initialLocation.buildings || []);
    }
  }, [locationsData]);

  useEffect(() => {
    if (buildings) {
      const initialBuilding =
        buildings.find((building) => building.id === activeBuilding) ||
        buildings[0];

      setActiveBuilding(initialBuilding?.id || null);
      setSingleBuilding(initialBuilding || null);
    }
  }, [buildings]);

  useEffect(() => {
    if (activeLocation) {
      localStorage.setItem("activeLocation", activeLocation);
    }
  }, [activeLocation]);

  useEffect(() => {
    if (activeBuilding) {
      localStorage.setItem("activeBuilding", activeBuilding);
    }
  }, [activeBuilding]);

  const handleLocationClick = (location) => {
    setActiveLocation(location.id);
    setSingleLocation(location);
    setBuildings(location.buildings || []);
  };

  const handleBuildingClick = (building) => {
    setActiveBuilding(building.id);
    setSingleBuilding(building);
  };

  const closeModal = () => setShowLoginModal(false);
  const openModal = () => setShowLoginModal(true);

  return (
    <div className="flex h-full">
      <div className="w-[315px] h-full flex-col flex justify-between bg-white border-r-[1px] border-br-border">
        <div className="flex flex-col gap-3 scroll calc-height py-[20px] px-[15px] pr-[10px]">
          {isLocationsLoading
            ? Array.from({ length: 10 }).map((_, index) => (
                <Skeleton key={index} height={30} />
              ))
            : locationsData && locationsData.length > 0
            ? locationsData.map((location, index) => (
                <LocationListings
                  key={index}
                  location={location}
                  activeLocation={activeLocation}
                  handleLocationClick={handleLocationClick}
                  deleteLocationMutation={deleteLocationMutation}
                />
              ))
            : "No Location Found"}
        </div>

        <LocationsFooter />
      </div>
      <div className="p-5 w-full wrapper-height">
        {/* <LocationsBreadcrumb singleLocation={singleLocation} /> */}
        <div className="my-4 flex items-center justify-between">
          <div className="flex gap-4 flex-wrap w-[82%]">
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
                />
              ))
            ) : (
              <p>No buildings available for this location.</p>
            )}
          </div>
          <AddBuildingBtn openModal={openModal} />

          {showLoginModal && (
            <AddBuildingModal
              title="Add New Building"
              description="Please log in to ask more questions."
              onClose={closeModal}
              onConfirm={() => {
                window.location.href = "/#/auth/login";
              }}
              onsubmit={() => {
                window.location.href = "/#/auth/signup";
              }}
              locationId={singleLocation.id}
            />
          )}
        </div>
        <FlatListing
          activeBuilding={activeBuilding}
          singleBuilding={singleBuilding}
        />
      </div>
    </div>
  );
};

export default TalentLocationFilter;

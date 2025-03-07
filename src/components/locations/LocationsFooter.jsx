import { useEffect, useState } from "react";
import ReusableModal from "../../components/modal/ReusableModal";
import AddNewBuildingForm from "./AddNewBuildingForm";
import AddLocationModal from "./AddLocationModal";

const LocationsFooter = () => {
  const [buildings, setBuildings] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [activeLocation, setActiveLocation] = useState(null);
  const [activeBuilding, setActiveBuilding] = useState(null);
  const [singleLocation, setSingleLocation] = useState(null);
  const closeModal = () => setShowLoginModal(false);
  const openModal = () => setShowLoginModal(true);

  useEffect(() => {
    if (buildings) {
      let buildFirstData = buildings[0]?.id;
      setActiveBuilding(buildFirstData);
    }
  }, [buildings]);
  return (
    <>
      <div className="py-[20px] px-[15px]">
        <button
          onClick={openModal}
          className=" flex justify-center items-center gap-[10px] rounded-[10px] border border-custom-gray w-full p-2.5 py-1.5 text-[14px] text-[#1E1E1E] hover:bg-custom-gradient-green hover:text-white group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16.879"
            height="17.641"
            viewBox="0 0 16.879 17.641"
          >
            <g
              id="Group_23164"
              data-name="Group 23164"
              transform="translate(49.97 -1125.11)"
            >
              <path
                className="group-hover:stroke-white stroke-[#1E1E1E]"
                id="Path_38282"
                data-name="Path 38282"
                d="M9,10.526A2.526,2.526,0,1,0,11.526,8,2.526,2.526,0,0,0,9,10.526"
                transform="translate(-53.789 1122.211)"
                fill="none"
                stroke="#1e1e1e"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              />
              <path
                className="group-hover:stroke-white stroke-[#1E1E1E]"
                id="Path_38283"
                data-name="Path 38283"
                d="M11.406,18.429a1.684,1.684,0,0,1-1.859-.355L5.973,14.5a6.737,6.737,0,1,1,11.444-3.887"
                transform="translate(-53 1123)"
                fill="none"
                stroke="#1e1e1e"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              />
              <path
                className="group-hover:stroke-white stroke-[#1E1E1E]"
                id="Path_38284"
                data-name="Path 38284"
                d="M16,19h5.053"
                transform="translate(-54.894 1120.474)"
                fill="none"
                stroke="#1e1e1e"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              />
              <path
                className="group-hover:stroke-white stroke-[#1E1E1E]"
                id="Path_38285"
                data-name="Path 38285"
                d="M19,16v5.053"
                transform="translate(-55.368 1120.948)"
                fill="none"
                stroke="#1e1e1e"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              />
            </g>
          </svg>
          Add Location
        </button>
        {showLoginModal && (
          // <ReusableModal
          //   ownFrom={
          //     <>
          //       <AddNewBuildingForm />
          //     </>
          //   }
          //   title="Add New Location"
          //   description="Please log in to ask more questions."
          //   onClose={closeModal}
          //   onConfirm={() => {
          //     // Redirect to login page
          //     window.location.href = "/#/auth/login";
          //   }}
          //   onsubmit={() => {
          //     // Redirect to sign up page
          //     window.location.href = "/#/auth/signup";
          //   }}
          // />

          <AddLocationModal
            title="Add New Location"
            description="Please log in to ask more questions."
            onClose={closeModal}
            onConfirm={() => {
              // Redirect to login page
              window.location.href = "/#/auth/login";
            }}
            onsubmit={() => {
              // Redirect to sign up page
              window.location.href = "/#/auth/signup";
            }}
          />
        )}
      </div>
    </>
  );
};

export default LocationsFooter;

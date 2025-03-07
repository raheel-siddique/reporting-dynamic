import DeleteModal from "../../components/modal/DeleteModal";
import { useState } from "react";
import AddLocationModal from "./AddLocationModal";
import { useSelector } from "react-redux";

const LocationListings = ({
  location,
  activeLocation,
  key,
  handleLocationClick,
  deleteLocationMutation,
}) => {
  const [showDltModal, setShowDltModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [singleLocation, setSingleLocation] = useState(null);
  const { hasManagementAccess } = useSelector((state) => state.auth);

  const deleteLocations = (id) => {
    setDeleteId(id);
    setShowDltModal(true);
  };

  const editLocations = (myLocation) => {
    setShowLoginModal(true);
    setSingleLocation(myLocation);
  };

  const closeModal = () => setShowLoginModal(false);

  return (
    <>
      <div
        key={key}
        className={`group flex gap-3 justify-between items-center cursor-pointer py-1.5 px-3 rounded-md ${
          activeLocation === location.id
            ? "bg-custom-gradient-green text-white"
            : "hover:bg-custom-gradient-green"
        }`}
        onClick={() => handleLocationClick(location)}
      >
        <div className="flex gap-5 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15.349"
            height="15.65"
            className="object-contain flex-shrink-0"
            viewBox="0 0 15.349 17.65"
          >
            <g
              id="Group_23161"
              data-name="Group 23161"
              transform="translate(-23.25 -230.25)"
            >
              <path
                className={`${
                  activeLocation === location.id
                    ? "stroke-white"
                    : "group-hover:stroke-white stroke-[#1E1E1E]"
                }`}
                id="Path_38278"
                data-name="Path 38278"
                d="M9,10.4A2.4,2.4,0,1,0,11.4,8,2.4,2.4,0,0,0,9,10.4"
                transform="translate(19.525 227.485)"
                fill="none"
                stroke="#1e1e1e"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
              <path
                className={`${
                  activeLocation === location.id
                    ? "stroke-white"
                    : "group-hover:stroke-white stroke-[#1E1E1E]"
                }`}
                id="Path_38279"
                data-name="Path 38279"
                d="M15.821,14.821l-3.673,3.673a1.731,1.731,0,0,1-2.447,0L6.028,14.821a6.925,6.925,0,1,1,9.793,0Z"
                transform="translate(20 228)"
                fill="none"
                stroke="#1e1e1e"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </g>
          </svg>
          <h2
            className={`text-[15px] ${
              activeLocation === location.id
                ? "text-white"
                : "group-hover:text-white text-[#1E1E1E]"
            }`}
          >
            {location.name}
          </h2>
        </div>
        <div className="flex gap-4 items-center">
          {location.buildings.length > 0 && (
            <div
              className={`rounded-full p-1 px-2 text-[10px] ${
                activeLocation === location.id
                  ? "text-white bg-[#32a733]"
                  : "group-hover:text-white text-[#1E1E1E] group-hover:bg-[#32a733] bg-custom-gray"
              }`}
            >
              {location.buildings.length}
            </div>
          )}

          <div className="action-list-btn relative">
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
                  className={`${
                    activeLocation === location.id
                      ? "stroke-white"
                      : "group-hover:stroke-white stroke-[#1E1E1E]"
                  }`}
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
                  className={`${
                    activeLocation === location.id
                      ? "stroke-white"
                      : "group-hover:stroke-white stroke-[#1E1E1E]"
                  }`}
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
                  className={`${
                    activeLocation === location.id
                      ? "stroke-white"
                      : "group-hover:stroke-white stroke-[#1E1E1E]"
                  }`}
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
                onClick={() => {
                  editLocations(location);
                }}
                className="action-list-item flex gap-3 items-center hover:bg-custom-gradient-green group cursor-pointer py-1.5 px-3 rounded-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17.5"
                  height="17.665"
                  viewBox="0 0 17.5 17.665"
                >
                  <g
                    id="Group_23331"
                    data-name="Group 23331"
                    transform="translate(-1484.25 -93.085)"
                  >
                    <path
                      className=" stroke-[#1E1E1E]"
                      id="Path_68"
                      data-name="Path 68"
                      d="M6.824,7H5.882A1.882,1.882,0,0,0,4,8.882v8.471a1.882,1.882,0,0,0,1.882,1.882h8.471a1.882,1.882,0,0,0,1.882-1.882v-.941"
                      transform="translate(1481 90.765)"
                      fill="none"
                      stroke="#1e1e1e"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                    <path
                      className=" stroke-[#1E1E1E]"
                      id="Path_69"
                      data-name="Path 69"
                      d="M19.715,6.374a1.977,1.977,0,1,0-2.8-2.8L9,11.471v2.824h2.824l7.892-7.92Z"
                      transform="translate(1480.706 91)"
                      fill="none"
                      stroke="#1e1e1e"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                    <path
                      className=" stroke-[#1E1E1E]"
                      id="Path_70"
                      data-name="Path 70"
                      d="M16,5l2.824,2.824"
                      transform="translate(1480.294 90.882)"
                      fill="none"
                      stroke="#1e1e1e"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                  </g>
                </svg>
                <h2 className="text-[15px] text-[#1E1E1E]">Edit</h2>
              </div>
              {hasManagementAccess && (
                <div
                  onClick={() => {
                    deleteLocations(location.id);
                  }}
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
              )}
            </div>
          </div>
        </div>
        {showDltModal && (
          <DeleteModal
            deleteMutation={deleteLocationMutation}
            deleteId={deleteId}
            onClose={closeModal}
            title={"Are you sure you want to delete this location?"}
            setShowDltModal={setShowDltModal}
          />
        )}

        {showLoginModal && (
          <AddLocationModal
            location={singleLocation}
            title={`${
              !singleLocation ? "Add New Location" : "Edit New Location"
            } `}
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

export default LocationListings;

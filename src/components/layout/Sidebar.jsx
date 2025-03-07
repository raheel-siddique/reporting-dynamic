import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { brLogo } from "../../utils/constant/image";
import { clearAuth } from "../../features/auth/authSlice";
import Tooltip from "../../components/tooltip/tooltip";

const sidebarItems = [
  {
    id: 1,
    name: "Dashboard",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="21.788"
        height="19.327"
        viewBox="0 0 21.788 19.327"
      >
        <g transform="translate(-29.106 -10.25)">
          <path
            d="M12.222,13.222m-2.222,0A2.222,2.222,0,1,0,12.222,11,2.222,2.222,0,0,0,10,13.222"
            transform="translate(27.778 7.828)"
            fill="none"
            className="group-hover:stroke-custom-green stroke-white"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M13.45,11.778,15.728,9.5"
            transform="translate(28.161 7.661)"
            fill="none"
            className="group-hover:stroke-custom-green stroke-white"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M6.778,21.782a10,10,0,1,1,12.444,0Z"
            transform="translate(27 7.046)"
            fill="none"
            className="group-hover:stroke-custom-green stroke-white"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </g>
      </svg>
    ),
    path: "/",
  },
  {
    id: 2,
    name: "Tenants",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="21.5"
        height="21.5"
        viewBox="0 0 21.5 21.5"
      >
        <g transform="translate(0.75 0.75)">
          <path
            d="M18.061,3.937l4,4a3.2,3.2,0,0,1,0,4.521L19.127,15.4a3.2,3.2,0,0,1-4.521,0l-.334-.334L6.984,22.349a2.222,2.222,0,0,1-1.377.642L5.413,23h-1.3a1.111,1.111,0,0,1-1.1-.981L3,21.889v-1.3a2.222,2.222,0,0,1,.519-1.427l.132-.144.46-.46H6.333V16.333H8.556V14.111l2.382-2.382-.334-.334a3.2,3.2,0,0,1,0-4.521L13.54,3.937a3.2,3.2,0,0,1,4.521,0Z"
            transform="translate(-3 -3)"
            fill="none"
            className="group-hover:stroke-custom-green stroke-white"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M15,9h.011"
            transform="translate(-1.667 -2.333)"
            fill="none"
            className="group-hover:stroke-custom-green stroke-white"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </g>
      </svg>
    ),
    path: "/tenants",
  },
  {
    id: 3,
    name: "Expenses",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="19.395"
        height="21.5"
        viewBox="0 0 19.395 21.5"
      >
        <g
          id="Group_85"
          data-name="Group 85"
          transform="translate(-806.25 -3831.25)"
        >
          <path
            className="group-hover:stroke-custom-green stroke-white"
            id="Path_56"
            data-name="Path 56"
            d="M4,6.158C4,7.9,7.771,9.316,12.421,9.316S20.842,7.9,20.842,6.158,17.072,3,12.421,3,4,4.414,4,6.158"
            transform="translate(803 3829)"
            fill="none"
            stroke="#000"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          />
          <path
            className="group-hover:stroke-custom-green stroke-white"
            id="Path_57"
            data-name="Path 57"
            d="M4,6v6.316c0,1.744,3.771,3.158,8.421,3.158q.655,0,1.284-.037"
            transform="translate(803 3829.158)"
            fill="none"
            stroke="#000"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          />
          <path
            className="group-hover:stroke-custom-green stroke-white"
            id="Path_58"
            data-name="Path 58"
            d="M20,10.211V6"
            transform="translate(803.842 3829.158)"
            fill="none"
            stroke="#000"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          />
          <path
            className="group-hover:stroke-custom-green stroke-white"
            id="Path_59"
            data-name="Path 59"
            d="M4,12v6.316c0,1.744,3.771,3.158,8.421,3.158.371,0,.735-.009,1.092-.026"
            transform="translate(803 3829.474)"
            fill="none"
            stroke="#000"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          />
          <path
            className="group-hover:stroke-custom-green stroke-white"
            id="Path_60"
            data-name="Path 60"
            d="M21.211,15H18.579a1.579,1.579,0,1,0,0,3.158h1.053a1.579,1.579,0,1,1,0,3.158H17"
            transform="translate(803.684 3829.632)"
            fill="none"
            stroke="#000"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          />
          <path
            className="group-hover:stroke-custom-green stroke-white"
            id="Path_61"
            data-name="Path 61"
            d="M19,21.368v1.053M19,14v1.053"
            transform="translate(803.789 3829.579)"
            fill="none"
            stroke="#000"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          />
        </g>
      </svg>
    ),
    path: "/expenses",
  },
  {
    id: 4,
    name: "Receipts",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15.79"
        height="19.79"
        viewBox="0 0 15.79 19.79"
      >
        <g
          id="Group_25547"
          data-name="Group 25547"
          transform="translate(-2085.96 -1809.25)"
        >
          <path
            id="Path_38715"
            className="group-hover:stroke-custom-green stroke-white"
            data-name="Path 38715"
            d="M5,21V5A2,2,0,0,1,7,3H17a2,2,0,0,1,2,2V21l-3-2-2,2-2-2-2,2L8,19,5,21M9,7h6M9,11h6m-2,4h2"
            transform="translate(2082 1807)"
            fill="none"
            stroke="#23ae24"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          />
        </g>
      </svg>
    ),
    path: "/receipts",
  },

  {
    id: 5,
    name: "Locations",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18.812"
        height="21.676"
        viewBox="0 0 18.812 21.676"
      >
        <g transform="translate(0.75 0.75)">
          <path
            d="M9,11a3,3,0,1,0,3-3,3,3,0,0,0-3,3"
            transform="translate(-3.344 -2.394)"
            fill="none"
            className="group-hover:stroke-custom-green stroke-white"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M18.776,17.776l-4.591,4.591a2.164,2.164,0,0,1-3.059,0L6.535,17.776a8.656,8.656,0,1,1,12.241,0Z"
            transform="translate(-4 -3)"
            fill="none"
            className="group-hover:stroke-custom-green stroke-white"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </g>
      </svg>
    ),
    path: "/locations",
  },
  {
    id: 6,
    name: "User Management",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="19.5"
        height="19.533"
        viewBox="0 0 19.5 19.533"
      >
        <g
          id="Group_25373"
          data-name="Group 25373"
          transform="translate(0.75 0.783)"
        >
          <path
            className="group-hover:stroke-custom-green stroke-white"
            id="Path_38677"
            data-name="Path 38677"
            d="M9,7,5,7A4,4,0,1,0,9,3,4,4,0,0,0,5,7"
            transform="translate(-3 -3)"
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          />
          <path
            className="group-hover:stroke-custom-green stroke-white"
            id="Path_38678"
            data-name="Path 38678"
            d="M3,21V19a4,4,0,0,1,4-4h4a4,4,0,0,1,4,4v2"
            transform="translate(-3 -3)"
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          />
          <path
            className="group-hover:stroke-custom-green stroke-white"
            id="Path_38679"
            data-name="Path 38679"
            d="M16,3.13a4,4,0,0,1,0,7.75"
            transform="translate(-3 -3)"
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          />
          <path
            className="group-hover:stroke-custom-green stroke-white"
            id="Path_38680"
            data-name="Path 38680"
            d="M21,21V19a4,4,0,0,0-3-3.85"
            transform="translate(-3 -3)"
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          />
        </g>
      </svg>
    ),
    path: "/users",
  },
  {
    id: 7,
    name: "Reporting",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20.447"
        height="21.5"
        viewBox="0 0 20.447 21.5"
      >
        <g
          id="Group_23412"
          data-name="Group 23412"
          transform="translate(0.75 0.75)"
        >
          <path
            className="group-hover:stroke-custom-green stroke-white"
            id="Path_31"
            data-name="Path 31"
            d="M8.211,5H6.105A2.105,2.105,0,0,0,4,7.105V19.737a2.105,2.105,0,0,0,2.105,2.105h6"
            transform="translate(-4 -2.895)"
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          />
          <path
            className="group-hover:stroke-custom-green stroke-white"
            id="Path_32"
            data-name="Path 32"
            d="M18,14v4.211h4.211"
            transform="translate(-3.263 -2.421)"
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          />
          <path
            className="group-hover:stroke-custom-green stroke-white"
            id="Path_33"
            data-name="Path 33"
            d="M18.211,11.316V7.105A2.105,2.105,0,0,0,16.105,5H14"
            transform="translate(-3.474 -2.895)"
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          />
          <path
            className="group-hover:stroke-custom-green stroke-white"
            id="Path_34"
            data-name="Path 34"
            d="M8,3,8,5.105A2.105,2.105,0,0,1,10.105,3h2.105a2.105,2.105,0,0,1,2.105,2.105h0a2.105,2.105,0,0,1-2.105,2.105H10.105A2.105,2.105,0,0,1,8,5.105Z"
            transform="translate(-3.79 -3)"
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          />
          <path
            className="group-hover:stroke-custom-green stroke-white"
            id="Path_35"
            data-name="Path 35"
            d="M18.211,18.211m-4.211,0A4.211,4.211,0,1,0,18.211,14,4.211,4.211,0,0,0,14,18.211"
            transform="translate(-3.474 -2.421)"
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          />
          <path
            className="group-hover:stroke-custom-green stroke-white"
            id="Path_36"
            data-name="Path 36"
            d="M8,11h4.211"
            transform="translate(-3.79 -2.579)"
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          />
          <path
            className="group-hover:stroke-custom-green stroke-white"
            id="Path_37"
            data-name="Path 37"
            d="M8,15h3.158"
            transform="translate(-3.79 -2.368)"
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          />
        </g>
      </svg>
    ),
    path: "/reporting",
  },
  {
    id: 8,
    name: "Parameters",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="21.5"
        height="21.5"
        viewBox="0 0 21.5 21.5"
      >
        <g
          id="Group_23413"
          data-name="Group 23413"
          transform="translate(0.75 0.75)"
        >
          <path
            className="group-hover:stroke-custom-green stroke-white"
            id="Path_38287"
            data-name="Path 38287"
            d="M4,10.5A2.5,2.5,0,1,0,6.5,8,2.5,2.5,0,0,0,4,10.5"
            transform="translate(-4 -3)"
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          />
          <path
            className="group-hover:stroke-custom-green stroke-white"
            id="Path_38288"
            data-name="Path 38288"
            d="M6,4V9"
            transform="translate(-3.5 -4)"
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          />
          <path
            className="group-hover:stroke-custom-green stroke-white"
            id="Path_38289"
            data-name="Path 38289"
            d="M6,12V22"
            transform="translate(-3.5 -2)"
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          />
          <path
            className="group-hover:stroke-custom-green stroke-white"
            id="Path_38290"
            data-name="Path 38290"
            d="M10,16.5A2.5,2.5,0,1,0,12.5,14,2.5,2.5,0,0,0,10,16.5"
            transform="translate(-2.5 -1.5)"
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          />
          <path
            className="group-hover:stroke-custom-green stroke-white"
            id="Path_38291"
            data-name="Path 38291"
            d="M12,4V16.5"
            transform="translate(-2 -4)"
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          />
          <path
            className="group-hover:stroke-custom-green stroke-white"
            id="Path_38292"
            data-name="Path 38292"
            d="M12,18v2.5"
            transform="translate(-2 -0.5)"
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          />
          <path
            className="group-hover:stroke-custom-green stroke-white"
            id="Path_38293"
            data-name="Path 38293"
            d="M16,7.5A2.5,2.5,0,1,0,18.5,5,2.5,2.5,0,0,0,16,7.5"
            transform="translate(-1 -3.75)"
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          />
          <path
            className="group-hover:stroke-custom-green stroke-white"
            id="Path_38294"
            data-name="Path 38294"
            d="M18,4V5.25"
            transform="translate(-0.5 -4)"
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          />
          <path
            className="group-hover:stroke-custom-green stroke-white"
            id="Path_38295"
            data-name="Path 38295"
            d="M18,9V22.75"
            transform="translate(-0.5 -2.75)"
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          />
        </g>
      </svg>
    ),
    path: "/parameters",
  },
];

function Sidebar() {
  const location = useLocation();
  const { hasManagementAccess } = useSelector((state) => state.auth);

  return (
    <ul className="w-[86px] bg-[#1E1E1E] flex flex-col py-6 h-screen relative">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <img
          src={brLogo}
          alt="Logo"
          className="pb-6 mx-[20px] mb-[20px] border-b-[1px] border-white border-opacity-30"
        />

        {/* Sidebar items */}
        <div className="flex flex-col flex-grow overflow-y-auto overflow-x-hidden">
          {sidebarItems
            .filter(
              (item) => hasManagementAccess || item.name !== "User Management"
            )
            .map((item) => (
              <li key={item.id} className="relative mb-5 group">
                <Tooltip position='right' text={item.name} > 
                <Link
                  to={item.path}
                  className={`flex items-center justify-center p-[12px] rounded-lg w-max m-auto text-gray-900 dark:text-white ${
                    location.pathname === item.path
                      ? "bg-custom-green item-active opacity-100"
                      : "bg-transparent"
                  }`}
                  >
                  {item.icon}
                </Link>
                  </Tooltip>
                {/* <span
                  className="btn-gradient-green text-nowrap absolute z-50 left-[40px] top-1/2 -translate-y-1/2 px-3 py-2 text-xs text-white bg-gray-800 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ pointerEvents: "none" }}
                >
                  {item.name}
                </span> */}
              </li>
            ))}
        </div>

        {/* Logout Button - Stays at the Bottom */}
        <li className="relative mb-5 group">
        <Tooltip position='right' text='Logout' > 

          <Link
            to={"/auth/login"}
            className={`flex items-center justify-center p-[12px] rounded-lg w-max m-auto text-gray-900 dark:text-white ${
              location.pathname === "Logout"
                ? "bg-custom-green item-active opacity-100"
                : "bg-transparent"
            }`}
          >
            <svg
              onClick={() => {
                localStorage.removeItem("authToken");
              }}
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="19.278"
              viewBox="0 0 21.811 19.278"
            >
              <g
                id="Group_23414"
                data-name="Group 23414"
                transform="translate(1.061 0.75)"
              >
                <path
                  className="group-hover:stroke-custom-green stroke-white"
                  id="Path_39"
                  d="M10,8.444V6.222A2.222,2.222,0,0,1,12.222,4H20a2.222,2.222,0,0,1,2.222,2.222V19.556A2.222,2.222,0,0,1,20,21.778H12.222A2.222,2.222,0,0,1,10,19.556V17.333"
                  transform="translate(-2.222 -4)"
                  fill="none"
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
                <path
                  className="group-hover:stroke-custom-green stroke-white"
                  id="Path_40"
                  d="M16.333,12.333H3L6.333,9"
                  transform="translate(-3 -3.444)"
                  fill="none"
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
                <path
                  className="group-hover:stroke-custom-green stroke-white"
                  id="Path_41"
                  d="M6.333,15.333,3,12"
                  transform="translate(-3 -3.111)"
                  fill="none"
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </g>
            </svg>
          </Link>
          </Tooltip>
        </li>
      </div>
    </ul>
  );
}

export default Sidebar;

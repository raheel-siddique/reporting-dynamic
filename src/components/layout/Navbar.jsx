import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  notificationIcon
} from "../../utils/constant/image";

const LOCAL_STORAGE_KEY = "chatHistory";

function Navbar() {
  const isSidebarOpen = useSelector((state) => state.layout.isSidebarOpen);
  const darkMode = useSelector((state) => state.layout.darkMode);
  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const dispatch = useDispatch();
  const location = useLocation();
  const hideLayout =
    location.pathname === "/auth/login" || location.pathname === "/auth/signup"; // Add paths to exclude

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Define a function to determine the header text based on the current route
  const getPageHeader = () => {
    const navigate = useNavigate();

    switch (location.pathname) {
      case "/":
        return "";
      case "/expenses":
        return "Expenses";
      case "/receipts":
        return "Receipts";
      case "/locations":
        return "Locations";
      case "/tenants":
        return "Tenants";
      case "/tenants/addnewtenant":
        return "Add New Tenant";
      case "/tenants/addnewlease":
        return "Add New Lease";
      case "/tenants/addnewcheque":
        return "Add New Cheque";
      case "/reporting":
        return "Reporting";
      case "/parameters":
        return "Parameters";
      case "/lease":
        return "Lease Activity";
      case "/cheque":
        return "Cheque Activity";
      case "/tenants/details":
        return "Tenant Details";
      case "/users":
        return "User Management";
      case "/detailedview":
        return "Detailed View";
      default:
        return "";
    }
  };
  return (
    <>
      {!hideLayout && (
        <header className="relative p-[13px] border-b-[1px] bg-white border-custom-gray">
          <div className="flex justify-between items-center">
            {/* Update the header dynamically based on the route */}
            <div className="text-xl leading-5 text-black font-semibold">
              {getPageHeader()}
            </div>
            <div className="flex gap-5 items-center">
              {/* <SearchField /> */}
              <div className="cursor-pointer p-[10px] outline-none border rounded-lg border-[#1E1E1E1A] hover:border-custom-green">
                <img src={notificationIcon} alt="Notifications" />
              </div>
              <div className="w-[1px] h-[20px] bg-[#1E1E1E1A]"></div>
              {user && (
                <div className="flex gap-4 items-center text-[15px] text-[#1E1E1E] font-semibold">
                  {/* <img src={ellipse} alt="User Avatar" /> */}
                  Welcome {user.name}
                </div>
              )}

              {/* <img
                className="cursor-pointer"
                src={optionIcon}
                alt="Options"
                onClick={toggleDropdown}
              /> */}
            </div>
          </div>
        </header>
      )}
    </>
  );
}

export default Navbar;

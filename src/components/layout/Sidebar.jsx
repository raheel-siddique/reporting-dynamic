import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { brLogo } from "../../utils/constant/image";
import Tooltip from "../../components/tooltip/tooltip";
import {

  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const sidebarItems = [
   {
    id: 1,
    name: "Dashboard",
    path: "/",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="21.788" height="19.327" viewBox="0 0 21.788 19.327">
        <g transform="translate(-29.106 -10.25)">
          <path
            d="M12.222,13.222m-2.222,0A2.222,2.222,0,1,0,12.222,11,2.222,2.222,0,0,0,10,13.222"
            transform="translate(27.778 7.828)"
            className="group-hover:stroke-custom-green stroke-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M13.45,11.778,15.728,9.5"
            transform="translate(28.161 7.661)"
            className="group-hover:stroke-custom-green stroke-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M6.778,21.782a10,10,0,1,1,12.444,0Z"
            transform="translate(27 7.046)"
            className="group-hover:stroke-custom-green stroke-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </g>
      </svg>
    ),
  },
  {
    id: 3,
    name: "Cloud Configuration",
    path: "/cloud-configuration",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="19.395"
        height="21.5"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M6 19a4 4 0 0 1 0-8 6 6 0 0 1 11.3-2.6A5 5 0 0 1 18 19H6z" />
      </svg>
    ),
  },
  {
    id: 4,
    name: "Instances",
    path: "/instances",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15.79"
        height="19.79"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M4 3h16v4H4V3zm0 7h16v4H4v-4zm0 7h16v4H4v-4z" />
      </svg>
    ),
  },
  {
    id: 41,
    name: "Volumes",
    path: "/volumes",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15.79"
        height="19.79"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2 3 7v10l9 5 9-5V7l-9-5zm0 2.2 7 3.9v8l-7 3.9-7-3.9v-8l7-3.9z" />
      </svg>
    ),
  },
  {
    id: 6,
    name: "User Management",
    path: "/users",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="19.5"
        height="19.533"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 12c2.67 0 8 1.34 8 4v2H4v-2c0-2.66 5.33-4 8-4zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
      </svg>
    ),
  },
];



function Sidebar() {
  const location = useLocation();
  const { hasManagementAccess } = useSelector((state) => state.auth);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.div
      animate={{ width: collapsed ? 86 : 350 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="h-screen bg-[#0d0d0d] text-white flex flex-col shadow-2xl"
    >
      {/* Logo + Toggle */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-yellow-500/30">
        {/* <motion.img
          src={brLogo}
          alt="Logo"
          animate={{ width: collapsed ? 36 : 80 }}
          className="transition-all duration-300"
        /> */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-md hover:bg-[#1a1a1a] text-gray-400 hover:text-yellow-400 transition-colors"
        >
          {collapsed ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
        </button>
      </div>

      {/* Sidebar Items */}
      <ul className="flex flex-col flex-grow mt-6 space-y-2 overflow-y-auto">
        {sidebarItems
          .filter((item) => hasManagementAccess || item.name !== "User Management")
          .map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Tooltip key={item.id} position="right" text={item.name} disable={!collapsed}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg mx-2 transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black shadow-md"
                      : "text-gray-300 hover:text-yellow-400 hover:bg-[#1a1a1a]"
                  }`}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="whitespace-nowrap text-xl font-medium"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </Link>
              </Tooltip>
            );
          })}
      </ul>

      {/* Logout */}
      <div className="mt-auto mb-6">
        <Tooltip position="right" text="Logout" disable={!collapsed}>
          <Link
            to={"/auth/login"}
            onClick={() => localStorage.removeItem("authToken")}
            className="flex items-center gap-3 px-4 py-3 rounded-lg mx-2 transition-all duration-300 text-gray-300 hover:text-yellow-400 hover:bg-[#1a1a1a]"
          >
            <LogOut size={20} />
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="whitespace-nowrap text-sm font-medium"
              >
                Logout
              </motion.span>
            )}
          </Link>
        </Tooltip>
      </div>
    </motion.div>
  );
}

export default Sidebar;

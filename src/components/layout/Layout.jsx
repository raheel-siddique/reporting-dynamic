import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ children }) {
  const isSidebarOpen = useSelector((state) => state.layout.isSidebarOpen);
  const darkMode = useSelector((state) => state.layout.darkMode);
  const location = useLocation();
  const hideLayout = location.pathname === "/auth/login"; // Add paths to exclude

  // useEffect(() => {
  //   if (darkMode) {
  //     document.documentElement.classList.add("dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //   }
  // }, [darkMode]);

  return (
    <div className="flex h-screen bg-[#F5F5F5] text-gray-800">
      {!hideLayout && <Sidebar />}
      <div className="wrapper-width">
        {!hideLayout && <Navbar />}

        <main
          className="overflow-y-auto relative z-10"
          style={{
            height: hideLayout ? "100vh" : "calc(100vh - 70px)",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;

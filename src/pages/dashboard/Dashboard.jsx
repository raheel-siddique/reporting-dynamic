import React, { useState, useMemo } from "react";
// import { formatDate } from "../../utils/format";
// import TotalTenants from "../../components/dashboard/TotalTenants";
// import TotalLocations from "../../components/dashboard/TotalLocations";
// import TotalBuildings from "../../components/dashboard/TotalBuildings";
// import Analytics from "../../components/dashboard/Analytics";
// import Statistics from "../../components/dashboard/Statistics";
// import ChequeOverview from "../../components/dashboard/ChequeOverview";
// import LeaseActivity from "../../components/dashboard/LeaseActivity";
// import ChequeActivity from "../../components/dashboard/ChequeActivity";
// import RentStatsCard from "../../components/dashboard/RentStatsCard";
import AdminDashboard from "./AdminDashboard";
import DummyDash from "./DummyDash";
import { useSelector } from "react-redux";
import UserDashboard from "./UserDashboard";

const Dashboard = () => {
  const { hasManagementAccess } = useSelector((state) => state.auth);

  return (
    <div className="p-3">
      {hasManagementAccess ? (
        <>
          <AdminDashboard />
          {/* <DummyDash /> */}
          {/* <UserDashboard /> */}
        </>
      ) : (
        <>
          {/* <UserDashboard /> */}
        </>
      )}
    </div>
  );
};

export default Dashboard;

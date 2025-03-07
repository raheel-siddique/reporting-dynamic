import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Layout from "./components/layout/Layout";
import Login from "./pages/auth/sign-in/Login";
import Signup from "./pages/auth/sign-in/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "./store/store";
import NotFound from "./pages/404/NotFound";
import Location from "./pages/location/Location";
// import Dashboard from "./pages/dashboard/Dashboard";
import Tenants from "./pages/tenants/Tenants";
import AddNewLease from "./pages/tenants/AddNewLease";
import AddNewCheque from "./pages/tenants/AddNewCheque";
// import ProtectedRoute from "./components/auth/ProtectedRoute";
import Lease from "./pages/activity/Lease";
import Cheque from "./pages/activity/Cheque";
import Reporting from "./pages/reporting/Reporting";
import TenantDetails from "./pages/tenants/TenantDetails";
import UserManagement from "./pages/user/UserManagement";
import AddNewTenant from "./pages/tenants/AddNewTenants";
import Parameters from "./pages/parameters/Parameters";
import Expenses from "./pages/expenses/Expenses";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Dashboard from "./pages/dashboard/Dashboard";
import { useEffect } from "react";
import DetailedView from "./components/dashboard/adminDashboard/DetailedView";
import Receipts from "./pages/receipts/Receipts";
import VacantDetails from "./pages/vacants/VacantsDetails";

// Create a QueryClient with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      keepPreviousData: true,
      staleTime: 5000,
      refetchOnWindowFocus: false,
      retry: 1, // Retry failed queries once (optional)
    },
  },
});

function App() {
  useEffect(() => {
    const checkTokenValidity = () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        window.location.href = "/#/auth/login";
      }
    };

    const interval = setInterval(checkTokenValidity, 2000);

    const handleStorageChange = (event) => {
      if (event.key === "authToken") {
        window.location.href = "/#/auth/login";
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <HashRouter>
          <ToastContainer />
          <Layout>
            <Routes>
              {/* <Route path="/" element={<ProtectedRoute></ProtectedRoute>} /> */}

              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/signup" element={<Signup />} />
              <Route path="*" element={<NotFound />} />

              <Route
                path="/locations"
                element={
                  <ProtectedRoute>
                    <Location />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tenants"
                element={
                  <ProtectedRoute>
                    <Tenants />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/vacant-details"
                element={
                  <ProtectedRoute>
                    <VacantDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tenants/addnewtenant/:id?"
                element={
                  <ProtectedRoute>
                    <AddNewTenant />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/lease"
                element={
                  <ProtectedRoute>
                    <Lease />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cheque"
                element={
                  <ProtectedRoute>
                    <Cheque />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reporting"
                element={
                  <ProtectedRoute>
                    <Reporting />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/users"
                element={
                  <ProtectedRoute allowedRoles={["Admin"]}>
                    <UserManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/parameters"
                element={
                  <ProtectedRoute>
                    <Parameters />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tenants/addnewlease"
                element={
                  <ProtectedRoute>
                    <AddNewLease />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tenants/addnewcheque"
                element={
                  <ProtectedRoute>
                    <AddNewCheque />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tenants/details/:id"
                element={
                  <ProtectedRoute>
                    <TenantDetails />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/expenses"
                element={
                  <ProtectedRoute>
                    <Expenses />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/receipts"
                element={
                  <ProtectedRoute>
                    <Receipts />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/detailedview"
                element={
                  <ProtectedRoute>
                    <DetailedView />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Layout>
        </HashRouter>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;

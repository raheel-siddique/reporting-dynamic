import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { HashRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/layout/Layout";
import NotFound from "./pages/404/NotFound";
import Login from "./pages/auth/sign-in/Login";
import Signup from "./pages/auth/sign-in/Signup";
import Location from "./pages/location/Location";
import store from "./store/store";
// import Dashboard from "./pages/dashboard/Dashboard";
import AddNewCheque from "./pages/tenants/AddNewCheque";
import AddNewLease from "./pages/tenants/AddNewLease";
import Tenants from "./pages/tenants/Tenants";
// import ProtectedRoute from "./components/auth/ProtectedRoute";
import { useEffect } from "react";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import DetailedView from "./components/dashboard/adminDashboard/DetailedView";
import Cheque from "./pages/activity/Cheque";
import Lease from "./pages/activity/Lease";
import Dashboard from "./pages/dashboard/Dashboard";
import Expenses from "./pages/expenses/Expenses";
import Parameters from "./pages/parameters/Parameters";
import Receipts from "./pages/receipts/Receipts";
import Reporting from "./pages/reporting/Reporting";
import AddNewTenant from "./pages/tenants/AddNewTenants";
import TenantDetails from "./pages/tenants/TenantDetails";
import UserManagement from "./pages/user/UserManagement";
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
                  <ProtectedRoute>
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

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { HashRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/layout/Layout";
import NotFound from "./pages/404/NotFound";
import Login from "./pages/auth/sign-in/Login";
import Location from "./pages/location/Location";
import store from "./store/store";
// import Dashboard from "./pages/dashboard/Dashboard";
// import ProtectedRoute from "./components/auth/ProtectedRoute";
import { useEffect } from "react";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Dashboard from "./pages/dashboard/Dashboard";
import AddUsers from "./pages/users/AddUsers";
import Users from "./pages/users/Users";

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
              {/* <Route path="/auth/signup" element={<Signup />} /> */}
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
                path="/users"
                element={
                  <ProtectedRoute>
                    <Users />
                  </ProtectedRoute>
                }
              />

<Route
                path="/users/add/:id?"
                element={
                  <ProtectedRoute>
                    <AddUsers />
   ./               </ProtectedRoute>
                }
              />


              {/* <Route
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
              /> */}
{/* 
              <Route
                path="/lease"
                element={
                  <ProtectedRoute>
                    <Lease />
                  </ProtectedRoute>
                }
              /> */}
              {/* <Route
                path="/cheque"
                element={
                  <ProtectedRoute>
                    <Cheque />
                  </ProtectedRoute>
                }
              /> */}
              {/* <Route
                path="/reporting"
                element={
                  <ProtectedRoute>
                    <Reporting />
                  </ProtectedRoute>
                }
              /> */}
              {/* <Route
                path="/users"
                element={
                  <ProtectedRoute>
                    <UserManagement />
                  </ProtectedRoute>
                }
              /> */}
              {/* <Route
                path="/parameters"
                element={
                  <ProtectedRoute>
                    <Parameters />
                  </ProtectedRoute>
                }
              /> */}
              {/* <Route
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
              /> */}
              {/* <Route
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
              /> */}
              {/* <Route
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
              /> */}
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

import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { roles } = useSelector((state) => state.auth);
  const isAuth = localStorage.getItem("authToken");
  // console.log({ isAuth });

  if (!isAuth) {
    return <Navigate to="/auth/login" />;
  }

  if (allowedRoles && !roles?.some((role) => allowedRoles.includes(role))) {
    return <Navigate to="/#/" />; // Redirect unauthorized users
  }

  return <>{children}</>;
};

export default ProtectedRoute;

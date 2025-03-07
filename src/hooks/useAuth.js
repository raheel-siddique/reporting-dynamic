import { useDispatch } from "react-redux";
import { signIn } from "../api/authService";
import {
  setAuthentication,
  setUser,
  clearAuth,
  setRoles,
} from "../features/auth/authSlice";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      localStorage.setItem("authToken", data.token);
      const decodedToken = jwtDecode(data.token);

      let filteredRoles = decodedToken?.role.filter((roles) => {
        return !roles.includes("tmp1");
      });
      dispatch(setRoles(filteredRoles));
      dispatch(setAuthentication(true));
      dispatch(setUser(data));
      toast.success("Login successful!", {
        position: "top-center",
      });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    },
    onError: (error) => {
      toast.error(`Login failed: ${error.response.data.message}`, {
        position: "top-center",
      });
    },
  });

  const signOut = () => {
    localStorage.removeItem("authToken");
    dispatch(clearAuth());
    navigate("/auth/login");
  };

  return { loginMutate: mutate, signOut, isLoading: isPending };
};

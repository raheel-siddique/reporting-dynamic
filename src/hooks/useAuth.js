import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signIn } from "../api/authService";
import {
  clearAuth,
  setAuthentication,
  setRoles,
  setUser,
} from "../features/auth/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      console.log("data::", data)
      localStorage.setItem("authToken", data.access_token);
      // const decodedToken = jwtDecode(data.access_token);

      // console.log("decodedToken::", decodedToken)
      // let filteredRoles = decodedToken?.role.filter((roles) => {
      //   return !roles.includes("tmp1");
      // });
      
      let filteredRoles=['Admin', "User"]
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

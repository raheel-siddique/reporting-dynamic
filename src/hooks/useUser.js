import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { toast } from "react-toastify";
import { addUser, fetchUsers, editUser } from "../api/userService";
import { QueryKeys } from "../utils/queryKeys";

export const useUser = ({
  // page = 1,
  // pageSize = 10,
  // search = "",
  // orderBy,
  // orderByProperty,
}) => {
  const queryClient = useQueryClient();

  const { data: users, isPending: isUsersLoading } = useQuery({
    queryKey: [
      QueryKeys.USERS,
      {
        // page,
        // pageSize,
        // search,
        // orderBy,
        // orderByProperty,
      },
    ],
    queryFn: fetchUsers,
  });

  // const { mutate: deleteFlatMutation, isLoading: isDeleting } = useMutation({
  //   mutationFn: deleteFlat,
  //   onSuccess: () => {
  //     toast.success("Flat deleted successfully!", {
  //       position: "top-center",
  //     });
  //     queryClient.invalidateQueries(["flats"]);
  //   },
  //   onError: (error) => {
  //     console.error("Failed to delete flat:", error);
  //     toast.error(`${error.response.data.message}`, {
  //       position: "top-center",
  //     });
  //   },
  // });

  const { mutate: addUserMutation, isLoading: isUserAdding } = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      toast.success("User added successfully!", { position: "top-center" });
      queryClient.invalidateQueries([QueryKeys.USERS]);
    },
    onError: (error) => {
      console.error("Failed to add user:", error);
      toast.error(`${error.response.data.message}`, { position: "top-center" });
    },
  });

  const { mutate: editUserMutation } = useMutation({
    mutationFn: editUser,
    onSuccess: () => {
      toast.success("User updated successfully!", { position: "top-center" });
      queryClient.invalidateQueries([QueryKeys.USERS]);
    },
    onError: (error) => {
      toast.error(`${error.response.data.message}`, { position: "top-center" });
    },
  });

  // const totalCount = useMemo(() => {
  //   if (data?.headers?.["x-pagination"]) {
  //     try {
  //       const pagination = JSON.parse(data.headers["x-pagination"]);
  //       return pagination.totalItems || 0;
  //     } catch (error) {
  //       console.error("Error parsing x-pagination header:", error);
  //       return 0;
  //     }
  //   }
  //   return 0;
  // }, [data]);

  return {
    users: users?.data?.body?.userList,
    isUsersLoading,
    addUserMutation,
    editUserMutation,
  };
};

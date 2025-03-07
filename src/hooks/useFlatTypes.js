import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addFlatType,
  fetchFlatTypes,
  deleteFlatType,
  updateFlatType,
} from "../api/flatTypeService";
import { toast } from "react-toastify";

export const useFlatTypes = (
  page,
  pageSize,
  search = "",
  orderBy,
  orderByProperty
) => {
  const queryClient = useQueryClient();

  const { data, isPending } = useQuery({
    queryKey: [
      "flatTypes",
      { page, pageSize, search, orderBy, orderByProperty },
    ],
    queryFn: fetchFlatTypes,
    keepPreviousData: true, // Retain old data during new fetches
    staleTime: 10 * 1000, // Data remains fresh for 10 seconds
    cacheTime: 5 * 60 * 1000, // Data remains in cache for 5 minutes
  });

  const { mutate: deleteFlatTypeMutation, isLoading: isDeleting } = useMutation(
    {
      mutationFn: deleteFlatType,
      onSuccess: () => {
        toast.success("Flat Type deleted successful!", {
          position: "top-center",
        });
        queryClient.invalidateQueries(["flatTypes"]);
      },
      onError: (error) => {
        console.error("Failed to delete Flat Type:", error);
        toast.error(`${error.response.data.message}`, {
          position: "top-center",
        });
      },
    }
  );

  const { mutate: addFlatTypeMutation, isLoading: isAdding } = useMutation({
    mutationFn: addFlatType,
    onSuccess: () => {
      toast.success("Flat Type added successfully!", {
        position: "top-center",
      });
      queryClient.invalidateQueries(["flatTypes"]); // Refetch flatTypes after addition
    },
    onError: (error) => {
      console.error("Failed to add flat type:", error);
      toast.error(`${error.response.data.message}`, { position: "top-center" });
    },
  });

  const { mutate: updateFlatTypeMutation } = useMutation({
    mutationFn: updateFlatType,
    onSuccess: () => {
      toast.success("flat type updated successfully!", {
        position: "top-center",
      });
      queryClient.invalidateQueries(["flatTypes"]);
      //   navigate("/tenants");
    },
    onError: (error) => {
      console.error("Failed to update flat type:", error);
      //   toast.error(`${error.response.data.message}`, { position: "top-center" });
    },
  });

  return {
    flatTypesData: data,
    isFlatTypesLoading: isPending,
    deleteFlatTypeMutation,
    addFlatTypeMutation,
    updateFlatTypeMutation,
  };
};

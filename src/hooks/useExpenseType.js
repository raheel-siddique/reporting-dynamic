import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addExpenseType,
  deleteExpenseType,
  fetchExpenseTypes,
  updateExpenseType,
} from "../api/expenseTypeService";

import { toast } from "react-toastify";

export const useExpenseType = (
  page,
  pageSize,
  search = "",
  orderBy,
  orderByProperty
) => {
  const queryClient = useQueryClient();

  const {
    data,
    isPending,
    isLoading: isExpenseLoading,
  } = useQuery({
    queryKey: [
      "expenseTypes",
      { page, pageSize, search, orderBy, orderByProperty },
    ],
    queryFn: fetchExpenseTypes,
    keepPreviousData: true, // Retain old data during new fetches
    staleTime: 10 * 1000, // Data remains fresh for 10 seconds
    cacheTime: 5 * 60 * 1000, // Data remains in cache for 5 minutes
  });

  const { mutate: deleteExpenseTypeMutation, isLoading: isDeleting } =
    useMutation({
      mutationFn: deleteExpenseType,
      onSuccess: () => {
        toast.success("Expense Type deleted successful!", {
          position: "top-center",
        });
        queryClient.invalidateQueries(["expenseTypes"]);
      },
      onError: (error) => {
        console.error("Failed to delete expense Type:", error);
        toast.error(`${error.response.data.message}`, {
          position: "top-center",
        });
      },
    });

  const { mutate: addExpenseTypeMutation, isLoading: isAdding } = useMutation({
    mutationFn: addExpenseType,
    onSuccess: () => {
      toast.success("Expense Type added successfully!", {
        position: "top-center",
      });
      queryClient.invalidateQueries(["expenseTypes"]); // Refetch flatTypes after addition
    },
    onError: (error) => {
      toast.error(`${error.response.data.message}`, { position: "top-center" });
    },
  });

  const { mutate: updateExpenseTypeMutation } = useMutation({
    mutationFn: updateExpenseType,
    onSuccess: () => {
      toast.success("Expense Type updated successfully!", {
        position: "top-center",
      });
      queryClient.invalidateQueries(["expenseTypes"]);
    },
    onError: (error) => {
      console.error("Failed to update expense type:", error);
      toast.error(`${error.response.data.message}`, { position: "top-center" });
    },
  });

  return {
    expenseTypesData: data,
    addExpenseTypeMutation,
    deleteExpenseTypeMutation,
    updateExpenseTypeMutation,
    isExpenseLoading,
  };
};

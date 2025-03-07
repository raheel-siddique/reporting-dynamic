import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchBankTypes,
  addBankType,
  deleteBankType,
  updateBankType,
} from "../api/bankTypeService";

import { toast } from "react-toastify";

export const useBankType = (
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
    isLoading: isBankLoading,
  } = useQuery({
    queryKey: [
      "bankTypes",
      { page, pageSize, search, orderBy, orderByProperty },
    ],
    queryFn: fetchBankTypes,
    keepPreviousData: true, // Retain old data during new fetches
    staleTime: 10 * 1000, // Data remains fresh for 10 seconds
    cacheTime: 5 * 60 * 1000, // Data remains in cache for 5 minutes
  });

  const { mutate: deleteBankTypeMutation, isLoading: isDeleting } = useMutation(
    {
      mutationFn: deleteBankType,
      onSuccess: () => {
        toast.success("Bank deleted successful!", {
          position: "top-center",
        });
        queryClient.invalidateQueries(["bankTypes"]);
      },
      onError: (error) => {
        toast.error(`${error.response.data.message}`, {
          position: "top-center",
        });
      },
    }
  );

  const { mutate: addBankTypeMutation, isLoading: isAdding } = useMutation({
    mutationFn: addBankType,
    onSuccess: () => {
      toast.success("Bank added successfully!", {
        position: "top-center",
      });
      queryClient.invalidateQueries(["bankTypes"]); // Refetch flatTypes after addition
    },
    onError: (error) => {
      toast.error(`${error.response.data.message}`, { position: "top-center" });
    },
  });

  const { mutate: updateBankTypeMutation } = useMutation({
    mutationFn: updateBankType,
    onSuccess: () => {
      toast.success("Bank updated successfully!", {
        position: "top-center",
      });
      queryClient.invalidateQueries(["bankTypes"]);
    },
    onError: (error) => {
      console.error("Failed to update bank:", error);
    },
  });

  return {
    bankTypesData: data,
    addBankTypeMutation,
    deleteBankTypeMutation,
    updateBankTypeMutation,
    bankTypeLoading: isPending,
    isBankLoading,
  };
};

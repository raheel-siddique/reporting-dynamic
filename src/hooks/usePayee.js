import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addPayee,
  deletePayeeType,
  fetchPayee,
  updatePayeeType,
} from "../api/payeeService";
import { toast } from "react-toastify";

export const usePayee = (
  page = 1,
  pageSize = 10000,
  search = "",
  orderBy,
  orderByProperty
) => {
  const queryClient = useQueryClient();

  const {
    data,
    isPending,
    isLoading: isPayeeLoading,
  } = useQuery({
    queryKey: ["payee", { page, pageSize, search, orderBy, orderByProperty }],
    queryFn: fetchPayee,
  });

  const { mutate: addPayeeMutation } = useMutation({
    mutationFn: addPayee,
    onSuccess: () => {
      toast.success("Payee added successfully!", { position: "top-center" });
      queryClient.invalidateQueries(["payee"]); // Refetch locations after addition
    },
    onError: (error) => {
      console.error("Failed to add payee:", error);
      toast.error(`${error.response.data.message}`, { position: "top-center" });
    },
  });

  const { mutate: deletePayeeTypeMutation, isLoading: isDeleting } =
    useMutation({
      mutationFn: deletePayeeType,
      onSuccess: () => {
        toast.success("Payee Type deleted successful!", {
          position: "top-center",
        });
        queryClient.invalidateQueries(["payeeTypes"]);
      },
      onError: (error) => {
        toast.error(`${error.response.data.message}`, {
          position: "top-center",
        });
      },
    });

  const { mutate: updatePayeeTypeMutation } = useMutation({
    mutationFn: updatePayeeType,
    onSuccess: () => {
      toast.success("Payee type updated successfully!", {
        position: "top-center",
      });
      queryClient.invalidateQueries(["payeeTypes"]);
    },
    onError: (error) => {
      console.error("Failed to update payee:", error);
    },
  });

  return {
    payeeData: data,
    addPayeeMutation,
    deletePayeeTypeMutation,
    updatePayeeTypeMutation,
    isPayeeLoading,
  };
};

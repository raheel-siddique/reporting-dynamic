import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useMemo } from "react";
import { toast } from "react-toastify";
import { addExpense, fetchExpenses } from "../api/expenseService";

export const useExpense = (
  page,
  pageSize,
  //   search,
  orderBy,
  orderByProperty
) => {
  const queryClient = useQueryClient();

  const { data, isPending } = useQuery({
    queryKey: [
      "expenses",
      {
        page,
        pageSize,
        // search,
        orderBy,
        orderByProperty,
      },
    ],
    queryFn: fetchExpenses,
    keepPreviousData: true,
    staleTime: 5000,
  });

  const { mutate: addExpenseMutation } = useMutation({
    mutationFn: addExpense,
    onSuccess: () => {
      toast.success("Expense added successfully!", { position: "top-center" });
      queryClient.invalidateQueries(["expenses"]);
    },
    onError: (error) => {
      console.error("Failed to add expense:", error);
      toast.error(`${error.response.data.message}`, { position: "top-center" });
    },
  });

  const totalExpenseCount = useMemo(() => {
    if (data?.headers?.["x-pagination"]) {
      try {
        const pagination = JSON.parse(data.headers["x-pagination"]);
        return pagination.totalItems || 0;
      } catch (error) {
        console.error("Error parsing x-pagination header:", error);
        return 0;
      }
    }
    return 0;
  }, [data]);

  return {
    expenseData: data?.data,
    isExpenseLoading: isPending,
    totalExpenseCount,
    addExpenseMutation,
  };
};

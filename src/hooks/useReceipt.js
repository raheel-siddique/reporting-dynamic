import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useMemo } from "react";
import { toast } from "react-toastify";
import { addReceipt, fetchReceipts } from "../api/receiptService";
import { QueryKeys } from "../utils/queryKeys";

export const useReceipt = (
  page,
  pageSize,
  search = null,
  orderBy,
  orderByProperty
) => {
  const queryClient = useQueryClient();

  const { data, isPending } = useQuery({
    queryKey: [
      QueryKeys.RECEIPTS,
      {
        page,
        pageSize,
        search,
        orderBy,
        orderByProperty,
      },
    ],
    queryFn: fetchReceipts,
    keepPreviousData: true,
    staleTime: 5000,
  });

  const { mutate: addReceiptMutation } = useMutation({
    mutationFn: addReceipt,
    onSuccess: () => {
      toast.success("Receipt added successfully!", { position: "top-center" });
      queryClient.invalidateQueries([QueryKeys.RECEIPTS]);
    },
    onError: (error) => {
      console.error("Failed to add receipt:", error);
      toast.error(`${error.response.data.message}`, { position: "top-center" });
    },
  });

  const totalReceiptCount = useMemo(() => {
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
    receiptData: data?.data,
    isReceiptLoading: isPending,
    totalReceiptCount,
    addReceiptMutation,
  };
};

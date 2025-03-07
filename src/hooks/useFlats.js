import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addFlats,
  deleteFlat,
  editFlats,
  fetchBuildings,
  fetchFlats,
  fetchFlatsTypes,
  fetchAllFlats, // Import fetchAllFlats
} from "../api/flatService";
import { useMemo } from "react";
import { toast } from "react-toastify";

export const useFlats = (
  page,
  pageSize,
  buildingId,
  locationId,
  search,
  flatStatus,
  orderBy,
  orderByProperty,
  flatPage,
  flatPageSize,
  TenantStatus
) => {
  const queryClient = useQueryClient();

  const { data, isPending } = useQuery({
    queryKey: [
      "flats",
      {
        page: flatPage ? flatPage : 1,
        pageSize: flatPageSize ? flatPageSize : 100000,
        buildingId,
        search,
        flatStatus,
        orderBy,
        orderByProperty,
        TenantStatus,
      },
    ],
    queryFn: fetchFlats,
    keepPreviousData: true,
    staleTime: 5000,
  });

  const { data: buildingsData, isPending: isBuildLoading } = useQuery({
    queryKey: ["buildings", { page, pageSize: 100000, locationId }],
    queryFn: fetchBuildings,
    keepPreviousData: true,
    staleTime: 5000,
  });

  const { data: flatTypesData, isPending: flatTypeLoading } = useQuery({
    queryKey: ["flatsTypes", { page: 1, pageSize: 100000 }],
    queryFn: fetchFlatsTypes,
    keepPreviousData: true,
    staleTime: 5000,
  });

  const { mutate: deleteFlatMutation, isLoading: isDeleting } = useMutation({
    mutationFn: deleteFlat,
    onSuccess: () => {
      toast.success("Flat deleted successfully!", {
        position: "top-center",
      });
      queryClient.invalidateQueries(["flats"]);
    },
    onError: (error) => {
      console.error("Failed to delete flat:", error);
      toast.error(`${error.response.data.message}`, {
        position: "top-center",
      });
    },
  });

  const { mutate: addFlatsMutation, isLoading: isAdding } = useMutation({
    mutationFn: addFlats,
    onSuccess: () => {
      toast.success("Flats added successfully!", { position: "top-center" });
      queryClient.invalidateQueries(["flats"]);
    },
    onError: (error) => {
      console.error("Failed to add flats:", error);
      toast.error(`${error.response.data.message}`, { position: "top-center" });
    },
  });

  const { mutate: editFlatsMutation } = useMutation({
    mutationFn: editFlats,
    onSuccess: () => {
      toast.success("Flat updated successfully!", { position: "top-center" });
      queryClient.invalidateQueries(["flats"]);
    },
    onError: (error) => {
      toast.error(`${error.response.data.message}`, { position: "top-center" });
    },
  });

  const totalCount = useMemo(() => {
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

  // Fetch all flats (ignores pagination)
  const fetchAllFlatsData = async () => {
    try {
      return await fetchAllFlats({ buildingId, search, flatStatus });
    } catch (error) {
      console.error("Error fetching all flats:", error);
      toast.error("Failed to fetch all flats.", { position: "top-center" });
      throw error;
    }
  };

  return {
    flatsData: data?.data,
    isFlatsLoading: isPending,
    totalCount,
    deleteFlatMutation,
    addFlatsMutation,
    flatTypesData,
    editFlatsMutation,
    flatTypeLoading,
    buildingsDataOwn: buildingsData?.data,
    fetchAllFlatsData, // Return fetchAllFlatsData for export functionality
  };
};

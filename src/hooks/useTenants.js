import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchTenantById,
  fetchTenants,
  fetchLeases,
  fetchCheques,
  addTenant,
  deleteTenant,
  addCheque,
  updateTenant,
  updateLeases,
  updateCheques,
  deleteLease,
  deleteCheque,
  addLease,
  fetchAllTenants,
  fetchTenantsCount,
  deactivateTenant,
  updateChequeStatus,
} from "../api/tenantService";
import { useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { formatDateForBackend } from "../utils/format";

export const useTenants = (
  page,
  pageSize,
  search,
  leasePage,
  leasePageSize,
  chequePage,
  chequePageSize,
  activeBuilding,
  leaseFilter,
  listingTypeFilter,
  showAlertsOnly,
  orderBy,
  orderByProperty,
  locationId,
  buildingId,
  date,
  chequeFilters,
  chequeStatus,
  distinctOnly
) => {
  // const { locationId, buildingId, date, chequeFilters } = filters;
  // console.log("my", chequeFilters);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  let chequeId = 0;
  let statusId = 0;
  if (chequeStatus) {
    chequeId = chequeStatus.chequeId;
    statusId = chequeStatus.statusId;
  }

  const { data, isPending } = useQuery({
    queryKey: [
      "tenants",
      {
        page,
        pageSize,
        search,
        activeBuilding,
        leaseFilter,
        listingTypeFilter,
        isNotify: showAlertsOnly,
        orderBy,
        orderByProperty,
        buildingId,
        distinctOnly,
      },
    ],
    queryFn: fetchTenants,
    keepPreviousData: true,
    staleTime: 10 * 1000,
    cacheTime: 5 * 60 * 1000,
  });

  const { data: tenantsCount } = useQuery({
    queryKey: [
      "tenantsCount",
      { buildingId: activeBuilding, search: search || null },
    ],
    queryFn: fetchTenantsCount,
    keepPreviousData: true,
    staleTime: 10 * 1000,
    cacheTime: 5 * 60 * 1000,
  });

  const { data: chequeData, isPending: isChequeLoading } = useQuery({
    queryKey: [
      "cheques",
      {
        chequePage,
        chequePageSize,
        search,
        date: formatDateForBackend(date), // Backend-friendly format
        locationId:
          Number(locationId) && Number(locationId) !== -1 ? locationId : null,
        buildingId:
          Number(buildingId) && Number(buildingId) !== -1 ? buildingId : null,
        chequeStatuses:
          chequeFilters && chequeFilters.length ? [...chequeFilters] : null,
      },
    ],
    queryFn: fetchCheques,
    keepPreviousData: true,
    staleTime: 10 * 1000,
    cacheTime: 5 * 60 * 1000,
  });

  const { mutate: addTenantMutation } = useMutation({
    mutationFn: addTenant,
    onSuccess: () => {
      toast.success("Tenant added successfully!", { position: "top-center" });
      queryClient.invalidateQueries(["tenants"]);
      navigate("/tenants");
    },
    onError: (error) => {
      console.error("Failed to add tenant:", error);
      toast.error(`${error.response.data.message}`, { position: "top-center" });
    },
  });

  const { mutate: updateTenantMutation } = useMutation({
    mutationFn: updateTenant,
    onSuccess: () => {
      toast.success("Tenant updated successfully!", { position: "top-center" });
      queryClient.invalidateQueries(["tenants"]);
      navigate("/tenants");
    },
    onError: (error) => {
      console.error("Failed to update tenant:", error);
      toast.error(`${error.response.data.message}`, { position: "top-center" });
    },
  });

  const { mutate: updateLeaseMutation } = useMutation({
    mutationFn: updateLeases,
    onSuccess: () => {
      toast.success("Lease updated successfully!", { position: "top-center" });
      queryClient.invalidateQueries(["leases"]);
      //   navigate("/tenants");
    },
    onError: (error) => {
      console.error("Failed to update tenant:", error);
      //   toast.error(`${error.response.data.message}`, { position: "top-center" });
    },
  });

  const { mutate: updateChequesMutation } = useMutation({
    mutationFn: updateCheques,
    onSuccess: () => {
      toast.success("Cheque updated successfully!", { position: "top-center" });
      queryClient.invalidateQueries(["cheques"]);
      //   navigate("/tenants");
    },
    onError: (error) => {
      console.error("Failed to update tenant:", error);
      //   toast.error(`${error.response.data.message}`, { position: "top-center" });
    },
  });

  const { mutate: deleteTenantMutation, isLoading: isDeleting } = useMutation({
    mutationFn: deleteTenant,
    onSuccess: () => {
      toast.success("Tenant deleted successfully!", { position: "top-center" });
      queryClient.invalidateQueries(["tenants"]);
    },
    onError: (error) => {
      console.error("Failed to delete tenant:", error);
      toast.error(`${error.response.data.message}`, { position: "top-center" });
    },
  });

  const { mutate: deactivateTenantMutation, isLoading: isDeactivating } =
    useMutation({
      mutationFn: deactivateTenant,
      onSuccess: () => {
        toast.success("Tenant deactivated successfully!", {
          position: "top-center",
        });
        queryClient.invalidateQueries(["tenants"]);
      },
      onError: (error) => {
        console.error("Failed to deactivate tenant:", error);
        toast.error(`${error.response.data.message}`, {
          position: "top-center",
        });
      },
    });

  const { mutate: deleteLeaseMutation } = useMutation({
    mutationFn: deleteLease,
    onSuccess: () => {
      toast.success("Lease deleted successfully!", { position: "top-center" });
      queryClient.invalidateQueries(["leases"]);
    },
    onError: (error) => {
      console.error("Failed to delete lease:", error);
      toast.error(`${error.response.data.message}`, { position: "top-center" });
    },
  });

  const { mutate: deleteChequeMutation } = useMutation({
    mutationFn: deleteCheque,
    onSuccess: () => {
      toast.success("Cheque deleted successfully!", { position: "top-center" });
      queryClient.invalidateQueries(["cheques"]);
    },
    onError: (error) => {
      console.error("Failed to delete cheque:", error);
      toast.error(`${error.response.data.message}`, { position: "top-center" });
    },
  });

  const addChequeMutation = useMutation({
    mutationFn: addCheque,
    onSuccess: () => {
      toast.success("Cheque added successfully!", { position: "top-center" });
      queryClient.invalidateQueries(["cheques"]);
      return data;
    },
    onError: (error) => {
      console.error("Failed to add cheque:", error);
      toast.error(`${error.response.data.message}`, { position: "top-center" });
    },
  });

  const addLeaseMutation = useMutation({
    mutationFn: addLease,
    onSuccess: () => {
      toast.success("Lease added successfully!", { position: "top-center" });
      queryClient.invalidateQueries(["leases"]);
    },
    onError: (error) => {
      console.error("Failed to add cheque:", error);
      toast.error(`${error.response.data.message}`, { position: "top-center" });
    },
  });

  // New Query: Fetch Tenant by ID
  // Updated Query: Fetch Tenant by ID
  const useTenantById = (tenantId) => {
    return useQuery({
      queryKey: ["tenantById", { tenantId }],
      queryFn: ({ queryKey }) => fetchTenantById(queryKey[1].tenantId),
      enabled: !!tenantId, // Only run if tenantId is provided
      staleTime: 10 * 1000,
      cacheTime: 5 * 60 * 1000,
    });
  };

  const fetchAllTenantsExport = async () => {
    try {
      const allTenants = await fetchAllTenants();
      const csvData = convertToCSV(allTenants);
      downloadCSV(csvData, "tenants.csv");
      toast.success("Tenant data exported successfully!", {
        position: "top-center",
      });
    } catch (error) {
      console.error("Failed to export tenants:", error);
      toast.error("Failed to export tenants.", { position: "top-center" });
    }
  };

  const {
    mutate: updateChequeStatusMutation,
    isPending: isUpdatingChequeStatus,
  } = useMutation({
    mutationFn: updateChequeStatus,
    onSuccess: () => {
      toast.success("Status updated successfully!", { position: "top-center" });
      queryClient.invalidateQueries(["cheques"]);
    },
    onError: (error) => {
      console.error("Failed to update tenant:", error);
      toast.error(`${error.response.data.message}`, { position: "top-center" });
    },
  });

  useEffect(() => {
    if (chequeId !== 0 && statusId !== 0) {
      updateChequeStatusMutation({
        chequeId: chequeId,
        statusId: Number(statusId),
      });
    }
  }, [chequeId, statusId]);

  // Utility: Convert JSON to CSV
  // Utility: Flatten nested objects and convert JSON to CSV
  const convertToCSV = (data) => {
    if (!data || !data.length) return "";

    // Flatten nested objects into a single level
    const flattenObject = (obj, prefix = "") => {
      return Object.keys(obj).reduce((acc, key) => {
        const value = obj[key];
        const prefixedKey = prefix ? `${prefix}_${key}` : key;
        if (value && typeof value === "object" && !Array.isArray(value)) {
          Object.assign(acc, flattenObject(value, prefixedKey));
        } else {
          acc[prefixedKey] = value;
        }
        return acc;
      }, {});
    };

    // Flatten all rows
    const flattenedData = data.map((item) => flattenObject(item));

    // Get headers from the first object
    const headers = Object.keys(flattenedData[0]);
    const rows = flattenedData.map((row) =>
      headers.map((field) => JSON.stringify(row[field] || "")).join(",")
    );

    return [headers.join(","), ...rows].join("\n");
  };

  // Utility: Trigger CSV download
  const downloadCSV = (csv, filename) => {
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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

  const totalChequeCount = useMemo(() => {
    if (chequeData?.headers?.["x-pagination"]) {
      try {
        const pagination = JSON.parse(chequeData.headers["x-pagination"]);
        return pagination.totalItems || 0;
      } catch (error) {
        console.error("Error parsing x-pagination header:", error);
        return 0;
      }
    }
    return 0;
  }, [chequeData]);

  return {
    tenantsData: data?.data,
    isTenantsLoading: isPending,
    isChequeLoading: isChequeLoading,
    totalCount,
    deleteTenantMutation,
    deleteLeaseMutation,
    deleteChequeMutation,
    addTenantMutation,
    updateTenantMutation,
    updateLeaseMutation,
    updateChequesMutation,
    addChequeMutation,
    addLeaseMutation,
    fetchAllTenantsExport,
    chequeData,
    // tenantLeaseData: leaseData?.data,
    // tenantChequeData: chequeData?.data,
    // totalCountLease: leaseData?.headers?.["x-pagination"]?.totalItems || 0,
    // totalCountCheque: chequeData?.headers?.["x-pagination"]?.totalItems || 0,
    useTenantById,
    totalChequeCount,
    tenantsCount: tenantsCount?.data,
    deactivateTenantMutation,
    updateChequeStatusMutation,
    isUpdatingChequeStatus,
  };
};

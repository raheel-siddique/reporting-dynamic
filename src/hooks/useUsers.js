import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addUser,
  fetchUsers
} from "../api/usersService";

export const useUsers = (
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, isPending } = useQuery({
    queryKey: [
      "users",
      
    ],
    queryFn: fetchUsers,
    keepPreviousData: true,
    staleTime: 10 * 1000,
    cacheTime: 5 * 60 * 1000,
  });



  const { mutate: addUserMutation } = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      toast.success("User added successfully!", { position: "top-center" });
      queryClient.invalidateQueries(["users"]);
      navigate("/users");
    },
    onError: (error) => {
      console.error("Failed to add user:", error);
      toast.error(`${error.response.data.message}`, { position: "top-center" });
    },
  });

  // const { mutate: updateUserMutation } = useMutation({
  //   mutationFn: updateUser,
  //   onSuccess: () => {
  //     toast.success("user updated successfully!", { position: "top-center" });
  //     queryClient.invalidateQueries(["users"]);
  //     navigate("/users");
  //   },
  //   onError: (error) => {
  //     console.error("Failed to update users:", error);
  //     toast.error(`${error.response.data.message}`, { position: "top-center" });
  //   },
  // });

  // const useTenantById = (tenantId) => {
  //   return useQuery({
  //     queryKey: ["tenantById", { tenantId }],
  //     queryFn: ({ queryKey }) => fetchTenantById(queryKey[1].tenantId),
  //     enabled: !!tenantId, // Only run if tenantId is provided
  //     staleTime: 10 * 1000,
  //     cacheTime: 5 * 60 * 1000,
  //   });
  // };

  // const fetchAllTenantsExport = async () => {
  //   try {
  //     const allTenants = await fetchAllTenants();
  //     const csvData = convertToCSV(allTenants);
  //     downloadCSV(csvData, "tenants.csv");
  //     toast.success("Tenant data exported successfully!", {
  //       position: "top-center",
  //     });
  //   } catch (error) {
  //     console.error("Failed to export tenants:", error);
  //     toast.error("Failed to export tenants.", { position: "top-center" });
  //   }
  // };

  // const convertToCSV = (data) => {
  //   if (!data || !data.length) return "";

  //   // Flatten nested objects into a single level
  //   const flattenObject = (obj, prefix = "") => {
  //     return Object.keys(obj).reduce((acc, key) => {
  //       const value = obj[key];
  //       const prefixedKey = prefix ? `${prefix}_${key}` : key;
  //       if (value && typeof value === "object" && !Array.isArray(value)) {
  //         Object.assign(acc, flattenObject(value, prefixedKey));
  //       } else {
  //         acc[prefixedKey] = value;
  //       }
  //       return acc;
  //     }, {});
  //   };

  //   // Flatten all rows
  //   const flattenedData = data.map((item) => flattenObject(item));

  //   // Get headers from the first object
  //   const headers = Object.keys(flattenedData[0]);
  //   const rows = flattenedData.map((row) =>
  //     headers.map((field) => JSON.stringify(row[field] || "")).join(",")
  //   );

  //   return [headers.join(","), ...rows].join("\n");
  // };

  // // Utility: Trigger CSV download
  // const downloadCSV = (csv, filename) => {
  //   const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  //   const link = document.createElement("a");
  //   link.href = URL.createObjectURL(blob);
  //   link.download = filename;
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

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
    usersData: data?.body?.userList,
    isUsersLoading: isPending,
    addUserMutation
    
  };
};

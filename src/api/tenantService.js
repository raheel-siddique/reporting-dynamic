import axiosInstance from "./axiosInstance";

export const fetchTenants = async ({ queryKey }) => {
  const [
    ,
    {
      page,
      pageSize,
      search,
      activeBuilding,
      leaseFilter,
      listingTypeFilter,
      isNotify,
      orderBy,
      orderByProperty,
      distinctOnly,
    },
  ] = queryKey; // Destructure queryKey for params

  let params = {
    page,
    pageSize,
    search,
    buildingId: activeBuilding,
    leaseFilter,
    ListingTypeFilter: listingTypeFilter,
    OrderBy: orderBy, // 'asc' or 'desc'
    OrderByProperty: orderByProperty, // Backend-compatible property
    distinctOnly,
  };

  if (isNotify) params.isNotify = true;

  const response = await axiosInstance.get("/api/Tenants", {
    params: params, // Pass the params
  });
  return response;
};

export const fetchTenantById = async (tenantId) => {
  try {
    // Check if tenantId is valid
    if (!tenantId) {
      console.warn("No tenant ID provided. Skipping API call.");
      return null; // You can return null or handle this case as needed
    }

    const response = await axiosInstance.get(`/api/Tenants/${tenantId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tenant by ID:", error);
    throw error;
  }
};

// Fetch all tenants (for CSV export)
export const fetchAllTenants = async () => {
  try {
    const response = await axiosInstance.get("/api/Tenants", {
      params: { page: 1, pageSize: 1000 }, // Fetch all data, assuming large pageSize
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching all tenants:", error);
    throw error;
  }
};

export const fetchLeases = async ({ queryKey }) => {
  const [, { leasePage, leasePageSize }] = queryKey; // Destructure queryKey for params
  const response = await axiosInstance.get("/api/Leases", {
    params: { page: leasePage, pageSize: leasePageSize }, // Pass the params
  });
  return response;
};

export const fetchCheques = async ({ queryKey }) => {
  const [
    ,
    {
      chequePage,
      chequePageSize,
      search,
      locationId,
      buildingId,
      date,
      chequeStatuses,
    },
  ] = queryKey; // Destructure queryKey for params
  const response = await axiosInstance.get("/api/Cheques", {
    params: {
      page: chequePage,
      pageSize: chequePageSize,
      search: search,
      locationId: locationId,
      buildingId: buildingId,
      date: date,
      chequeStatuses: chequeStatuses,
    }, // Pass the params
  });
  return response;
};

export const fetchTenantsCount = async ({ queryKey }) => {
  const [, { buildingId, search }] = queryKey;
  const response = await axiosInstance.get("/api/Tenants/counts", {
    params: { buildingId, search }, // Pass the params
  });
  return response;
};

export const deleteTenant = async (tenantId) => {
  try {
    const response = await axiosInstance.delete(
      `/api/Tenants/soft/${tenantId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deactivateTenant = async (tenantId) => {
  try {
    const response = await axiosInstance.post(
      "/api/Tenants/set-active-deactive",
      { id: Number(tenantId), status: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error deactivating tenant:", error);
    throw error;
  }
};

export const deleteLease = async (leaseId) => {
  try {
    const response = await axiosInstance.delete(`/api/Leases/soft/${leaseId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCheque = async (chequeId) => {
  try {
    const response = await axiosInstance.delete(
      `/api/Cheques/soft/${chequeId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addTenant = async (tenantData) => {
  console.log("Adding tenant data::", tenantData);
  try {
    const response = await axiosInstance.post("/api/Tenants", tenantData);
    console.log("Add location response:", response);
    return response.data;
  } catch (error) {
    console.error("Error adding location:", error);
    throw error;
  }
};

export const updateTenant = async (tenantData) => {
  console.log("updating tenant data::", tenantData);
  try {
    const response = await axiosInstance.put("/api/Tenants", tenantData);
    //   console.log("Add location response:", response);
    return response.data;
  } catch (error) {
    //   console.error('Error adding location:', error);
    throw error;
  }
};

export const updateLeases = async (leaseData) => {
  console.log("updating lease data::", leaseData);
  try {
    const response = await axiosInstance.put("/api/Leases", leaseData);
    //   console.log("Add location response:", response);
    return response.data;
  } catch (error) {
    //   console.error('Error adding location:', error);
    throw error;
  }
};

export const updateCheques = async (leaseData) => {
  console.log("updating chqhes data::", leaseData);
  try {
    const response = await axiosInstance.put("/api/cheques", leaseData);
    //   console.log("Add location response:", response);
    return response.data;
  } catch (error) {
    //   console.error('Error adding location:', error);
    throw error;
  }
};

export const addCheque = async (chequeData) => {
  console.log("Adding cheque data::", chequeData);
  try {
    const response = await axiosInstance.post("/api/cheques", chequeData);
    console.log("Add cheque response:", response);
    return response.data;
  } catch (error) {
    console.error("Error adding cheque:", error);
    throw error;
  }
};

export const addLease = async (leaseData) => {
  console.log("Adding lease data::", leaseData);
  try {
    const response = await axiosInstance.post("/api/leases", leaseData);
    console.log("Add cheque response:", response);
    return response.data;
  } catch (error) {
    console.error("Error adding cheque:", error);
    throw error;
  }
};

export const updateChequeStatus = async (chequeStatusData) => {
  console.log("updating chqhes data::", chequeStatusData);
  try {
    const response = await axiosInstance.put("/api/cheques/update-status", {
      id: chequeStatusData.chequeId,
      status: Number(chequeStatusData.statusId),
    });
    //   console.log("Add location response:", response);
    return response.data;
  } catch (error) {
    //   console.error('Error adding location:', error);
    throw error;
  }
};

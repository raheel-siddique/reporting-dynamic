import axiosInstance from "./axiosInstance";

export const fetchFlats = async ({ queryKey }) => {
  const [
    ,
    {
      page,
      pageSize,
      buildingId,
      search,
      flatStatus,
      orderBy,
      orderByProperty,
      TenantStatus,
    },
  ] = queryKey;

  // Check if buildingId is available
  // if (!buildingId) {
  //   console.warn("No building ID provided. Skipping Flats API call.");
  //   return null; // Return null or handle this case as needed
  // }

  const response = await axiosInstance.get("/api/Flats", {
    params: {
      page,
      pageSize,
      buildingId,
      search,
      flatStatus,
      orderBy,
      orderByProperty,
      TenantStatus,
    },
  });
  return response;
};

export const fetchAllFlats = async ({ buildingId, search, flatStatus }) => {
  // Check if buildingId is available
  if (!buildingId) {
    console.warn("No building ID provided. Skipping Flats API call.");
    return null; // Return null or handle this case as needed
  }

  try {
    const response = await axiosInstance.get("/api/Flats", {
      params: {
        page: 1,
        pageSize: 1000, // High pageSize to fetch all flats
        buildingId,
        search,
        flatStatus,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching all flats:", error);
    throw error;
  }
};

export const fetchBuildings = async ({ queryKey }) => {
  const [, { page, pageSize, locationId }] = queryKey; // Destructure queryKey for params

  // Check if locationId is provided
  // if (!locationId) {
  //   console.warn('fetchBuildings: locationId is required but not provided.');
  //   return null; // Optionally return null or handle it as needed
  // }

  try {
    const response = await axiosInstance.get("/api/Buildings", {
      params: { page, pageSize, locationId }, // Pass the params
    });
    return response;
  } catch (error) {
    console.error("Error fetching buildings:", error);
    throw error;
  }
};

export const fetchFlatsTypes = async ({ queryKey }) => {
  const [, { page, pageSize }] = queryKey; // Destructure queryKey for params
  const response = await axiosInstance.get("/api/FlatTypes", {
    params: { page, pageSize }, // Pass the params
  });
  return response;
};

export const deleteFlat = async (flatId) => {
  try {
    const response = await axiosInstance.delete(`/api/Flats/soft/${flatId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addBuilding = async (buildingData) => {
  try {
    const response = await axiosInstance.post("/api/Buildings", buildingData);
    return response.data;
  } catch (error) {
    console.error("Error adding Building:", error);
    throw error;
  }
};

export const addFlats = async (flatsData) => {
  try {
    const response = await axiosInstance.post("/api/Flats", flatsData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editFlats = async (flatsData) => {
  try {
    const response = await axiosInstance.put(`/api/Flats`, flatsData); // Adjust the HTTP method if needed (e.g., PATCH)
    return response.data;
  } catch (error) {
    throw error;
  }
};

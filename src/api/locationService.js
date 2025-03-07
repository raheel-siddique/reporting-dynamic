import axiosInstance from "./axiosInstance";

export const fetchLocations = async ({ queryKey }) => {
  const [, { page, pageSize }] = queryKey; // Destructure queryKey for params
  const response = await axiosInstance.get("/api/Locations", {
    params: { page, pageSize }, // Pass the params
  });

  return response.data;
};

export const deleteLocation = async (locationId) => {
  try {
    const response = await axiosInstance.delete(
      `/api/Locations/soft/${locationId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addLocation = async (locationData) => {
  try {
    const response = await axiosInstance.post("/api/Locations", locationData);
    return response.data;
  } catch (error) {
    console.error("Error adding location:", error);
    throw error;
  }
};

export const editLocation = async (id, name) => {
  try {
    const response = await axiosInstance.put(`/api/Locations`, { id, name }); // Adjust the HTTP method if needed (e.g., PATCH)
    return response.data;
  } catch (error) {
    throw error;
  }
};

//   building

export const addBuilding = async (buildingData) => {
  try {
    const response = await axiosInstance.post("/api/Buildings", buildingData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

import axiosInstance from "./axiosInstance";

export const fetchFlatTypes = async ({ queryKey }) => {
  const [, { page, pageSize, search, orderBy, orderByProperty }] = queryKey; // Destructure queryKey for params
  const response = await axiosInstance.get("/api/FlatTypes", {
    params: { page, pageSize, search, orderBy, orderByProperty }, // Pass the params
  });

  return response.data;
};

export const deleteFlatType = async (flatTypeId) => {
  try {
    const response = await axiosInstance.delete(
      `/api/FlatTypes/soft/${flatTypeId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addFlatType = async (flatTypeData) => {
  try {
    const response = await axiosInstance.post("/api/FlatTypes", flatTypeData);
    return response.data;
  } catch (error) {
    console.error("Error adding flat type:", error);
    throw error;
  }
};

export const updateFlatType = async (flatData) => {
  try {
    const response = await axiosInstance.put("/api/FlatTypes", flatData);
    //   console.log("Add location response:", response);
    return response.data;
  } catch (error) {
    //   console.error('Error adding location:', error);
    throw error;
  }
};

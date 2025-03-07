import axiosInstance from "./axiosInstance";

export const fetchUsers = async ({ queryKey }) => {
  try {
    const [, { page, pageSize, search, orderBy, orderByProperty }] = queryKey;

    const response = await axiosInstance.get("/api/User", {
      params: {
        page,
        pageSize: 100000,
        search,
        orderBy,
        orderByProperty,
      },
    });
    return response;
  } catch (err) {
    console.error("Error fetching users:", err);
    throw err;
  }
};

export const deleteFlat = async (flatId) => {
  try {
    const response = await axiosInstance.delete(`/api/Flats/soft/${flatId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/api/User", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editUser = async (userData) => {
  try {
    const response = await axiosInstance.put(`/api/User`, userData); // Adjust the HTTP method if needed (e.g., PATCH)
    return response.data;
  } catch (error) {
    throw error;
  }
};

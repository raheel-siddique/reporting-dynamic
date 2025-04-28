import axiosInstance from "./axiosInstance";

export const fetchUsers = async ({ queryKey }) => {

  

  const response = await axiosInstance.get("/api/v1/auth/users");
  return response?.data;
}

export const addUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/api/v1/auth/register", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const fetchUserById = async (userId) => {
  try {
    // Check if userId is valid
    if (!userId) {
      console.warn("No user ID provided. Skipping API call.");
      return null; // You can return null or handle this case as needed
    }

    const response = await axiosInstance.get(`/api/Users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tenant by ID:", error);
    throw error;
  }
};

// Fetch all tenants (for CSV export)
export const fetchAllUsers = async () => {
  try {
    const response = await axiosInstance.get("/api/users", {
      params: {  }, // Fetch all data, assuming large pageSize
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};


export const deleteUsers = async (userId) => {
  try {
    const response = await axiosInstance.delete(
      `/api/users/soft/${userId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};




export const updateUser = async (userData) => {
  console.log("updating tenant data::", userData);
  try {
    const response = await axiosInstance.put("/api/users", userData);
    //   console.log("Add location response:", response);
    return response.data;
  } catch (error) {
    //   console.error('Error adding location:', error);
    throw error;
  }
};




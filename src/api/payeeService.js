import axiosInstance from "./axiosInstance";

export const fetchPayee = async ({ queryKey }) => {
  const [, { page, pageSize, search, orderBy, orderByProperty }] = queryKey; // Destructure queryKey for params
  const response = await axiosInstance.get("/api/Payees", {
    params: { page, pageSize, search, orderBy, orderByProperty }, // Pass the params
  });

  return response.data;
};

// export const deleteLocation = async (locationId) => {
//   try {
//     const response = await axiosInstance.delete(
//       `/api/Locations/soft/${locationId}`
//     );
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

export const addPayee = async (payeeData) => {
  try {
    const response = await axiosInstance.post("/api/Payees", [payeeData]);
    return response.data;
  } catch (error) {
    console.error("Error adding payee:", error);
    throw error;
  }
};

export const deletePayeeType = async (payeeTypeId) => {
  try {
    const response = await axiosInstance.delete(
      `/api/Payees/soft/${payeeTypeId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePayeeType = async (payeeData) => {
  try {
    const response = await axiosInstance.put("/api/Payees", payeeData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// export const editLocation = async (id, name) => {
//   try {
//     const response = await axiosInstance.put(`/api/Locations`, { id, name }); // Adjust the HTTP method if needed (e.g., PATCH)
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// //   building

// export const addBuilding = async (buildingData) => {
//   try {
//     const response = await axiosInstance.post("/api/Buildings", buildingData);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

import axiosInstance from "./axiosInstance";

export const fetchExpenses = async ({ queryKey }) => {
  const [, { page, pageSize, orderBy, orderByProperty }] = queryKey; // Destructure queryKey for params
  const response = await axiosInstance.get("/api/Expenses", {
    params: { page, pageSize, orderBy, orderByProperty }, // Pass the params
  });
  return response;
};

// export const deleteFlat = async (flatId) => {
//   try {
//     const response = await axiosInstance.delete(`/api/Flats/soft/${flatId}`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

export const addExpense = async (expenseData) => {
  try {
    const response = await axiosInstance.post("/api/Expenses", expenseData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// export const editFlats = async (flatsData) => {
//   try {
//     const response = await axiosInstance.put(`/api/Flats`, flatsData); // Adjust the HTTP method if needed (e.g., PATCH)
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

import axiosInstance from "./axiosInstance";

export const fetchExpenseTypes = async ({ queryKey }) => {
  const [, { page, pageSize, search, orderBy, orderByProperty }] = queryKey; // Destructure queryKey for params
  const response = await axiosInstance.get("/api/ExpenseTypes", {
    params: { page, pageSize, search, orderBy, orderByProperty }, // Pass the params
  });

  return response.data;
};

export const deleteExpenseType = async (expenseTypeId) => {
  try {
    const response = await axiosInstance.delete(
      `/api/ExpenseTypes/soft/${expenseTypeId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addExpenseType = async (expenseTypeData) => {
  try {
    const response = await axiosInstance.post(
      "/api/ExpenseTypes",
      expenseTypeData
    );
    return response.data;
  } catch (error) {
    console.error("Error adding flat type:", error);
    throw error;
  }
};

export const updateExpenseType = async (expenseTypeData) => {
  try {
    const response = await axiosInstance.put(
      "/api/ExpenseTypes",
      expenseTypeData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

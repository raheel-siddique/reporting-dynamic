import axiosInstance from "./axiosInstance";

export const fetchReceipts = async ({ queryKey }) => {
  const [, { page, pageSize, search, orderBy, orderByProperty }] = queryKey; // Destructure queryKey for params
  const response = await axiosInstance.get("/api/Receipts", {
    params: { page, pageSize, search, orderBy, orderByProperty }, // Pass the params
  });
  return response;
};

export const addReceipt = async (receiptData) => {
  try {
    const response = await axiosInstance.post("/api/Receipts", receiptData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

import axiosInstance from "./axiosInstance";

export const fetchBankTypes = async ({ queryKey }) => {
  const [, { page, pageSize, search, orderBy, orderByProperty }] = queryKey; // Destructure queryKey for params
  const response = await axiosInstance.get("/api/Banks", {
    params: { page, pageSize, search, orderBy, orderByProperty }, // Pass the params
  });

  return response.data;
};

export const deleteBankType = async (bankTypeId) => {
  try {
    const response = await axiosInstance.delete(
      `/api/Banks/soft/${bankTypeId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addBankType = async (bankTypeData) => {
  try {
    const response = await axiosInstance.post("/api/Banks", bankTypeData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateBankType = async (bankTypeData) => {
  try {
    const response = await axiosInstance.put("/api/Banks", bankTypeData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

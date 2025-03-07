import axiosInstance from "./axiosInstance";

export const fetchCountry = async ({ queryKey }) => {
  const [, { page, pageSize }] = queryKey; // Destructure queryKey for params
  const response = await axiosInstance.get("/api/Countries", {
    params: { page, pageSize }, // Pass the params
  });
  return response;
};

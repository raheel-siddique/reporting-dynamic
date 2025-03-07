import axiosInstance from './axiosInstance';

export const signIn = async (credentials) => {
    const response = await axiosInstance.post('/api/Auth/token', credentials);
    return response.data; // Assuming the API returns user data and token
  
};

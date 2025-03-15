import axiosInstance from './axiosInstance';

export const signIn = async (credentials) => {
    const response = await axiosInstance.post('/api/v1/auth/authenticate', credentials);
    return response.data; // Assuming the API returns user data and token
  
};

import axiosInstance from "./axiosInstance";


export const fetchProviders = async () => {
  try {
    const response = await axiosInstance.get("/providers");
    console.log("providersData:::", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching providers:", error);
    throw error;
  }
};


export const fetchInstances = async () => {
  try {
    const response = await axiosInstance.get("/ecs/list");
    console.log("instances:::", response);

    // agar result string hai to parse kardo
    const result = response.data?.result;
    return typeof result == "string" ? JSON.parse(result) : result;
  } catch (error) {
    console.error("Error fetching instances:", error);
    throw error;
  }
};                                                                              

export const fetchInstanceSpec = async ({ instanceId, day, duration }) => {
  try {
    const response = await axiosInstance.get("/monitor/instances/spec", {
      params: {
        instanceId,
        day,
        duration,
      },
    });

    console.log("instanceSpecData:::", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching instance spec:", error);
    throw error;
  }
};



export const fetchRegions = async () => {
  try {
    const response = await axiosInstance.get("/region");
    console.log("providersData:::", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching providers:", error);
    throw error;
  }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
};



export const addCloudConfig= async (configData) => {
  try {                                              
    const response = await axiosInstance.post("/aws", configData);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const addAgentServ = async (userData) => {
  try {
    const response = await axiosInstance.post("/agent/execute", userData);
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

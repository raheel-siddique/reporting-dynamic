import axiosInstance from "./axiosInstance";

export const fetchAdminBuildingStats = async ({ queryKey }) => {
  const [, { date, buildingId, locationId }] = queryKey; // Destructure queryKey for params
  const response = await axiosInstance.get(
    "/api/AdminDashboard/statistics/buildings",
    {
      params: {
        date,
        buildingId,
        locationId
      },
    }
  );
  return response;
};

export const fetchChequeDeposit = async ({ queryKey }) => {
  const [, { date, locationId, buildingId }] = queryKey; // Destructure queryKey for params

  const response = await axiosInstance.get(
    "/api/AdminDashboard/statistics/cheque-deposit",
    {
      params: {
        date,
        buildingId,
        locationId,
      },
    }
  );
  return response;
};

export const fetchChequeClearance = async ({ queryKey }) => {
  const [, { date, locationId, buildingId }] = queryKey; // Destructure queryKey for params

  const response = await axiosInstance.get(
    "/api/AdminDashboard/statistics/cheque-clearance",
    {
      params: {
        date,
        buildingId,
        locationId,
      },
    }
  );
  return response;
};

export const fetchLeaseAging = async ({ queryKey }) => {
  const [, { fromDate, toDate, locationId, buildingId }] = queryKey; // Destructure queryKey for params

  const response = await axiosInstance.get(
    "/api/AdminDashboard/statistics/lease-aging",
    {
      params: {
        fromDate,
        toDate,
        buildingId,
        locationId,
      },
    }
  );
  return response;
};

import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchAdminBuildingStats,
  fetchChequeClearance,
  fetchChequeDeposit,
  fetchLeaseAging,
} from "../api/adminBuildingStats";
import { useEffect, useState } from "react";
import { formatDateForBackend, sumVacantBreakdown } from "../utils/format";

export const useAdminDashboard = ({
  date,
  fromDate,
  toDate,
  buildingId,
  useLocationInStats = false,
  locationId,
  chequeDepositBuildingId,
  chequeDepositDate,
  chequeClearanceBuildingId,
  chequeClearanceDate,
}) => {
  const queryClient = useQueryClient();

  const [stats, setStats] = useState(null);
  const [chequeDeposit, setChequeDeposit] = useState(null);
  const [chequeClearance, setChequeClearance] = useState(null);
  const [leaseAging, setLeaseAging] = useState(null);

  const { data: buildingStats, isPending } = useQuery({
    queryKey: [
      "statisticsBuilding",
      {
        date: formatDateForBackend(date), // Backend-friendly format
        buildingId:
          useLocationInStats && Number(buildingId) && Number(buildingId) !== -1
            ? buildingId
            : null,
        locationId:
          useLocationInStats && Number(locationId) && Number(locationId) !== -1
            ? locationId
            : null,
      },
    ],
    queryFn: fetchAdminBuildingStats,
    keepPreviousData: true,
    staleTime: 5000,
  });

  const getBuildingIdParam = (buildingId, internalBuildingId) => {
    if (Number(internalBuildingId) && Number(internalBuildingId) === -1) {
      return null;
    }
    if (Number(internalBuildingId) && Number(internalBuildingId) !== -1) {
      return internalBuildingId;
    }

    if (Number(buildingId) && Number(buildingId) !== -1) {
      return buildingId;
    }
    return null;
  };

  const { data: chequeDepositData, isChequeDepositPending } = useQuery({
    queryKey: [
      "chequeDeposit",
      {
        date: formatDateForBackend(chequeDepositDate), // Backend-friendly format
        locationId:
          Number(locationId) && Number(locationId) !== -1 ? locationId : null,
        buildingId: getBuildingIdParam(buildingId, chequeDepositBuildingId),
      },
    ],
    queryFn: fetchChequeDeposit,
    keepPreviousData: true,
    staleTime: 5000,
  });

  const { data: chequeClearanceData, isChequeClearancePending } = useQuery({
    queryKey: [
      "chequeClearance",
      {
        date: formatDateForBackend(chequeClearanceDate), // Backend-friendly format
        locationId:
          Number(locationId) && Number(locationId) !== -1 ? locationId : null,
        buildingId: getBuildingIdParam(buildingId, chequeClearanceBuildingId),
      },
    ],
    queryFn: fetchChequeClearance,
    keepPreviousData: true,
    staleTime: 5000,
  });

  const { data: leaseAgingData, isLeaseAgingPending } = useQuery({
    queryKey: [
      "leaseAging",
      {
        fromDate: formatDateForBackend(fromDate), // Backend-friendly format
        toDate: formatDateForBackend(toDate), // Backend-friendly format
        locationId:
          Number(locationId) && Number(locationId) !== -1 ? locationId : null,
        buildingId:
          Number(buildingId) && Number(buildingId) !== -1 ? buildingId : null,
      },
    ],
    queryFn: fetchLeaseAging,
    keepPreviousData: true,
    staleTime: 5000,
  });

  useEffect(() => {
    if (buildingStats && buildingStats.data) {
      setStats(buildingStats.data);
    }
  }, [buildingStats]);

  useEffect(() => {
    if (chequeDepositData && chequeDepositData.data) {
      setChequeDeposit(chequeDepositData.data);
    }
  }, [chequeDepositData]);

  useEffect(() => {
    if (chequeClearanceData && chequeClearanceData.data) {
      setChequeClearance(chequeClearanceData.data);
    }
  }, [chequeClearanceData]);

  useEffect(() => {
    if (leaseAgingData && leaseAgingData.data) {
      setLeaseAging(leaseAgingData.data);
    }
  }, [leaseAgingData]);

  return {
    stats,
    formattedStats: sumVacantBreakdown(stats),
    chequeDeposit,
    chequeClearance,
    leaseAging,
  };
};

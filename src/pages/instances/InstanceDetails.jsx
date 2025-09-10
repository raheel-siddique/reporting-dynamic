import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Cpu, Activity, HardDrive, Database } from "lucide-react";
import { fetchInstanceSpec } from "../../api/cloudService";
import { useQuery } from "@tanstack/react-query";

const InstantDetails = () => {
  const { id } = useParams();

  // 🔹 Filter States
  const [day, setDay] = useState(7);
  const [duration, setDuration] = useState("day");

  // 🔹 Data Fetching
  const {
    data: instanceSpecData,
    isPending: isSpecLoading,
  } = useQuery({
    queryKey: ["instanceSpec", { instanceId: id, day, duration }],
    queryFn: () =>
      fetchInstanceSpec({
        instanceId: id,
        day,
        duration,
      }),
    enabled: !!id,
    staleTime: 5000,
  });

  if (isSpecLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="animate-pulse text-amber-600 text-lg font-medium">
          Loading instance details...
        </p>
      </div>
    );

  if (!instanceSpecData)
    return (
      <p className="text-center text-gray-500 p-10 rounded-xl bg-amber-50 border border-amber-200">
        No data available
      </p>
    );

  return (
    <div className="p-8 space-y-8 bg-gradient-to-br from-white via-amber-50 to-yellow-100 min-h-screen text-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-yellow-600 via-amber-500 to-orange-500 bg-clip-text text-transparent tracking-tight">
          Instance Details
        </h1>
        <span className="px-4 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 text-white border border-amber-600 text-sm font-medium shadow-md">
          {instanceSpecData.instanceId}
        </span>
      </div>

      {/* Suggestion */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-100 to-yellow-50 border border-amber-200 shadow-md flex items-center gap-3">
        <Activity className="text-yellow-600 w-6 h-6" />
        <p className="text-yellow-800 font-medium">
          {instanceSpecData.suggestion}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Duration Filter */}
        <div className="flex gap-2">
          {["day", "hour"].map((opt) => (
            <button
              key={opt}
              onClick={() => setDuration(opt)}
              className={`px-4 py-2 rounded-xl font-medium transition-all shadow-sm ${
                duration === opt
                  ? "bg-gradient-to-r from-yellow-500 to-amber-600 text-white shadow-lg"
                  : "bg-white border border-gray-200 text-gray-700 hover:bg-amber-50"
              }`}
            >
              {opt === "day" ? "By Day" : "By Hour"}
            </button>
          ))}
        </div>

        {/* Days Filter */}
        <div className="flex gap-2">
          {[7, 10, 15, 30].map((d) => (
            <button
              key={d}
              onClick={() => setDay(d)}
              className={`px-4 py-2 rounded-xl font-medium transition-all shadow-sm ${
                day === d
                  ? "bg-gradient-to-r from-yellow-500 to-amber-600 text-white shadow-lg"
                  : "bg-white border border-gray-200 text-gray-700 hover:bg-amber-50"
              }`}
            >
              Last {d} Days
            </button>
          ))}
        </div>
      </div>

      {/* CPU Utilization Graph */}
      <div className="w-full h-96 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-amber-200">
        <h2 className="text-xl font-semibold mb-6 text-gray-700 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-amber-600" />
          CPU Utilization
        </h2>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={instanceSpecData.cpuData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="date"
              tick={{ fill: "#6b7280", fontSize: 12 }}
              interval={duration === "hour" ? 23 : 0}
              tickFormatter={(value) =>
                duration === "hour"
                  ? new Date(value).toLocaleTimeString([], { hour: "2-digit" })
                  : new Date(value).toLocaleDateString()
              }
            />
            <YAxis
              tick={{ fill: "#6b7280" }}
              label={{
                value: "CPU %",
                angle: -90,
                position: "insideLeft",
                fill: "#92400e",
              }}
              domain={[0, "auto"]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fffdf5",
                borderRadius: "0.75rem",
                border: "1px solid #fcd34d",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#f59e0b"
              strokeWidth={3}
              dot={{ r: 3 }}
              name="CPU Utilization"
              activeDot={{ r: 6, fill: "#d97706" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Average Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-yellow-50 to-amber-100 border border-amber-200 shadow-md flex flex-col items-start">
          <Cpu className="w-6 h-6 text-amber-600 mb-2" />
          <p className="text-sm text-gray-500">Avg CPU</p>
          <p className="text-2xl font-bold text-amber-700">
            {instanceSpecData.avgCpu}%
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-gradient-to-br from-yellow-50 to-amber-100 border border-amber-200 shadow-md flex flex-col items-start">
          <HardDrive className="w-6 h-6 text-amber-600 mb-2" />
          <p className="text-sm text-gray-500">Avg Memory</p>
          <p className="text-2xl font-bold text-amber-700">
            {instanceSpecData.avgMemory}%
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-gradient-to-br from-yellow-50 to-amber-100 border border-amber-200 shadow-md flex flex-col items-start">
          <Database className="w-6 h-6 text-amber-600 mb-2" />
          <p className="text-sm text-gray-500">Avg Disk</p>
          <p className="text-2xl font-bold text-amber-700">
            {instanceSpecData.avgDisk}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default InstantDetails;

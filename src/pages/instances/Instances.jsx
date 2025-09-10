import React, { useMemo } from "react";
import MyTable from "../../components/myTable/MyTable";
import { useCloudConfig } from "../../hooks/useCloudConfig";
import { useNavigate } from "react-router-dom";

const CloudView = () => {
  const { instanceData } = useCloudConfig(); 
  const navigate=useNavigate()
  console.log("instances main::", instanceData);

  const viewInstance = (instances) => {                                
    console.log("instances:", instances.id);
    navigate(`/instances/${instances.id}`)
  };

  const instanceColumns = useMemo(
    () => [
      { Header: "ID", accessor: "id" },                                 
      { Header: "Type", accessor: "type" },
      { Header: "State", accessor: "status" },
      { Header: "Private IP", accessor: "privateIp" },
      { Header: "Public DNS", accessor: "publicDns" },
      { Header: "Subnet", accessor: "subnet" },
      { Header: "VPC", accessor: "vpc" },
      { Header: "AZ", accessor: "availabilityZone" },
      { Header: "Architecture", accessor: "architecture" },
      { Header: "Root Device", accessor: "rootDevice" },
      { Header: "CPU Cores", accessor: "cpuCores" },
      { Header: "Threads/Core", accessor: "threadsPerCore" },
      { Header: "Launch Time", accessor: "launchTime" },
      {
        Header: "Actions",
        accessor: "actions",
        disableSortBy: true,
        Cell: ({ row }) => (
          <button
            className="text-blue-600 hover:underline text-sm"
            onClick={() => viewInstance(row.original)}
          >
            View
          </button>
        ),
      },
    ],
    []
  );

  const tableData =
    instanceData?.map((inst) => ({
      id: inst.instanceId,
      type: inst.instanceType,
      status: inst.state?.name,
      privateIp: inst.privateIpAddress,
      publicDns: inst.publicDnsName || "-",
      subnet: inst.subnetId,
      vpc: inst.vpcId,
      availabilityZone: inst.placement?.availabilityZone,
      architecture: inst.architecture,
      rootDevice: inst.rootDeviceType,
      cpuCores: inst.cpuOptions?.coreCount,
      threadsPerCore: inst.cpuOptions?.threadsPerCore,
      launchTime: new Date(inst.launchTime).toLocaleString(),
    })) || [];

  return (
    <div className="px-8 py-6 bg-gray-50 min-h-screen font-sans">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Cloud Resources</h1>

      <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          EC2 Instances
        </h2>
        <div className="table-height mt-5">
          <MyTable columns={instanceColumns} data={tableData} />
        </div>
      </div>
    </div>
  );
};

export default CloudView;

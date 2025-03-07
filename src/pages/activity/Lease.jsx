import React, { useMemo, useState } from "react";
import MyTable from "../../components/myTable/MyTable";
import { formatDate } from "../../utils/format";

const Lease = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const leaseData = [
    {
      id: 1,
      startDate: "2025-01-01",
      endDate: "2025-01-05",
      noOfDays: 25,
      status: "Reserved",
    },
    {
      id: 2,
      startDate: "2025-01-06",
      endDate: "2025-01-10",
      noOfDays: 5,
      status: "Expired",
    },
    {
      id: 3,
      startDate: "2025-01-11",
      endDate: "2025-01-15",
      noOfDays: 15,
      status: "Reserved",
    },
    {
      id: 4,
      startDate: "2025-01-16",
      endDate: "2025-01-20",
      noOfDays: 30,
      status: "Expired",
    },
    {
      id: 5,
      startDate: "2025-01-21",
      endDate: "2025-01-25",
      noOfDays: 7,
      status: "Reserved",
    },
    {
      id: 6,
      startDate: "2025-01-26",
      endDate: "2025-01-30",
      noOfDays: 18,
      status: "Expired",
    },
    {
      id: 7,
      startDate: "2025-02-01",
      endDate: "2025-02-05",
      noOfDays: 23,
      status: "Reserved",
    },
    {
      id: 8,
      startDate: "2025-02-06",
      endDate: "2025-02-10",
      noOfDays: 18,
      status: "Expired",
    },
    {
      id: 9,
      startDate: "2025-02-11",
      endDate: "2025-02-15",
      noOfDays: 22,
      status: "Reserved",
    },
    {
      id: 10,
      startDate: "2025-02-16",
      endDate: "2025-02-20",
      noOfDays: 11,
      status: "Expired",
    },
  ];

  const columns = useMemo(
    () => [
      { Header: "#", accessor: "id" },
      {
        Header: "Lease Start",
        accessor: "startDate",
        Cell: ({ value }) => <span>{formatDate(value)}</span>, // Using `value` for better readability
      },
      {
        Header: "Lease End",
        accessor: "endDate",
        Cell: ({ value }) => <span>{formatDate(value)}</span>, // Using `value` for consistency
      },
      {
        Header: "No. Of Days",
        accessor: "noOfDays",
        Cell: ({ value }) => <span>{value}</span>, // Using `value` directly
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (
          <span
            className={`${
              value.toLowerCase() === "expired"
                ? "bg-[#fbe9e9] text-[#d82323]"
                : "bg-[#e9f7e9] text-[#23ae24]"
            } py-1 px-2  rounded-md`}
          >
            {value}
          </span>
        ), // Example: Adding a class for status styling
      },
    ],
    []
  );

  

  return (
    <div className="p-5 w-full">
      <div className="relative overflow-x-auto sm:rounded-lg bg-white border border-black/10 rounded-lg opacity-100">
        <div className="flex bg-white items-center p-3 justify-between">
          <span className="text-[18px] text-[#1E1E1E] font-[500]">
            Lease Activity
          </span>
        </div>
        <div className="table-height">

        <MyTable
          columns={columns}
          data={leaseData}
          page={page}
          pageSize={pageSize}
          setPage={setPage}
          setPageSize={setPageSize}
          totalCount={10}
          pagination={true}
        />
        </div>
      </div>
    </div>
  );
};

export default Lease;

import { chequeStatusStyle, formatDate } from "../../utils/format";
import React, { useState, useMemo } from "react";
import MyTable from "../../components/myTable/MyTable";
import generateChequeDepositColumns from "./columns";
const ChequeDeposit = () => {
  const [tableOption, settableOption] = useState("All");
  const [leaseFilter, setLeaseFilter] = useState("WithLease");

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [chequePage, setChequePage] = useState(1);
  const [chequePageSize, setChequePageSize] = useState(10);
  const TableOption = [
    { id: 1, name: "All", count: 4, show: false },
    { id: 2, name: "Not Deposited", count: 4, show: false },
    { id: 3, name: "Deposited", count: 10, show: false },
  ];

  const columns = useMemo(
    () => generateChequeDepositColumns(tableOption === 'All'),
    [tableOption]
  );

  const data = [
    {
      id: 1,
      tenantName: "Alexander James",
      bankName: "Arab Bank",
      chequeNo: "051254",
      chequeAmount: "23,000",
      chequeDate: Date.now(),
      note: "This is free text",
      status: "Not Deposited",
    },
    {
      id: 2,
      tenantName: "Sophia Williams",
      bankName: "HSBC",
      chequeNo: "874512",
      chequeAmount: "15,500",
      chequeDate: Date.now(),
      note: "Urgent processing required",
      status: "Deposited",
    },
    {
      id: 3,
      tenantName: "Michael Brown",
      bankName: "Citibank",
      chequeNo: "963258",
      chequeAmount: "45,700",
      chequeDate: Date.now(),
      note: "Pending confirmation",
      status: "Not Deposited",
    },
    {
      id: 4,
      tenantName: "Emma Johnson",
      bankName: "Standard Chartered",
      chequeNo: "357159",
      chequeAmount: "32,900",
      chequeDate: Date.now(),
      note: "Cleared by the bank",
      status: "Deposited",
    },
    {
      id: 5,
      tenantName: "Liam Smith",
      bankName: "Barclays",
      chequeNo: "741258",
      chequeAmount: "18,200",
      chequeDate: Date.now(),
      note: "Hold due to verification",
      status: "Not Deposited",
    },
    {
      id: 6,
      tenantName: "Olivia Martinez",
      bankName: "Deutsche Bank",
      chequeNo: "852369",
      chequeAmount: "29,800",
      chequeDate: Date.now(),
      note: "Processing initiated",
      status: "Deposited",
    },
    {
      id: 7,
      tenantName: "Noah Wilson",
      bankName: "BNP Paribas",
      chequeNo: "654123",
      chequeAmount: "40,000",
      chequeDate: Date.now(),
      note: "Delayed due to holidays",
      status: "Not Deposited",
    },
    {
      id: 8,
      tenantName: "Ava Thomas",
      bankName: "Santander",
      chequeNo: "951753",
      chequeAmount: "50,500",
      chequeDate: Date.now(),
      note: "Priority clearance",
      status: "Deposited",
    },
  ];

  const tableOptionChanged = (optionName) => {
    settableOption(optionName);
  };

  return (
    <div className="w-full h-full">
      <div className="relative overflow-x-auto  sm:rounded-lg bg-white border border-black/10 rounded-lg opacity-100">
        {/* Lease And Cheque Activity BUttons Section */}
        <div className="flex p-5 gap-4 mb-2">
          {TableOption.map((data) => (
            <button
              key={data.id}
              onClick={() => {
                tableOptionChanged(data.name);
              }}
              className={`flex gap-3 justify-between items-center group h-max p-2.5 rounded-md border border-[#0000001A] bg-white hover:bg-custom-gradient-green active:bg-custom-gradient-green ${
                data.name === tableOption
                  ? "bg-custom-gradient-green text-white border-transparent"
                  : "border-custom-gray"
              }`}
            >
              <h2
                className={`text-[15px] flex gap-1 items-center text-nowrap group-hover:text-white text-[#1E1E1E] group-active:text-white ${
                  data.name === tableOption
                    ? "bg-custom-gradient-green text-white"
                    : ""
                }`}
              >
                {/* {data.show && (
                  <span className="bg-[#D82323] rounded-full h-2 w-2 block"></span>
                )} */}
                {data.name}
              </h2>
              <div
                className={`flex justify-center items-center w-5 h-5 rounded-full p-1 text-[10px] group-hover:text-white text-[#1E1E1E] group-hover:bg-[#32a733] group-active:bg-[#32a733] group-active:text-white ${
                  data.name === tableOption
                    ? "bg-[#32a733] text-white"
                    : "bg-custom-gray"
                }`}
              >
                {data.count}
              </div>
            </button>
          ))}
        </div>

        {/* Lease Or Cheque Table Heading Section */}
        <span className="text-[18px] ps-5 text-[#1E1E1E] font-semibold">
          {tableOption}
        </span>

        {/* Lease Or Cheque Table Dynamically Work Button Press */}

        <div className="table-height mt-5">
          <MyTable
            columns={columns}
            data={data ?? []}
            page={page}
            pageSize={pageSize}
            setPage={setPage}
            setPageSize={setPageSize}
            totalCount={70}
            pagination={true}
          />
        </div>
      </div>
    </div>
  );
};

export default ChequeDeposit;

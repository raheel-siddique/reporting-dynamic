import React, { useMemo, useState } from "react";
import MyTable from "../../components/myTable/MyTable";
import { formatDate } from "../../utils/format";
import { ChequeStatuses } from "../../utils/enums";

const Cheque = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const chequeData = [
    {
      id: 1,
      bankName: "Bank of America",
      chequeNo: "123456",
      chequeAmt: "500.00",
      note: "Payment for invoice #1001",
      status: "PDC",
    },
    {
      id: 2,
      bankName: "Wells Fargo",
      chequeNo: "789101",
      chequeAmt: "1200.50",
      note: "Refund issued",
      status: "Received",
    },
    {
      id: 3,
      bankName: "Chase Bank",
      chequeNo: "112131",
      chequeAmt: "850.75",
      note: "Payment for contract #204",
      status: "Rejected",
    },
    {
      id: 4,
      bankName: "Citi Bank",
      chequeNo: "415161",
      chequeAmt: "2500.00",
      note: "Advance payment for services",
      status: "PDC",
    },
    {
      id: 5,
      bankName: "PNC Bank",
      chequeNo: "718192",
      chequeAmt: "945.30",
      note: "Reimbursement for expenses",
      status: "Received",
    },
    {
      id: 6,
      bankName: "TD Bank",
      chequeNo: "202122",
      chequeAmt: "375.90",
      note: "Deposit for project #304",
      status: "Rejected",
    },
    {
      id: 7,
      bankName: "US Bank",
      chequeNo: "232425",
      chequeAmt: "1590.40",
      note: "Monthly payment for lease",
      status: "Pending",
    },
    {
      id: 8,
      bankName: "HSBC",
      chequeNo: "262728",
      chequeAmt: "4200.00",
      note: "Annual maintenance fee",
      status: "Received",
    },
    {
      id: 9,
      bankName: "Barclays",
      chequeNo: "293031",
      chequeAmt: "310.25",
      note: "Partial payment for order #506",
      status: "Rejected",
    },
    {
      id: 10,
      bankName: "Santander",
      chequeNo: "323334",
      chequeAmt: "785.80",
      note: "Final payment for invoice #901",
      status: "Pending",
    },
  ];

  const columns = useMemo(
    () => [
      { Header: "#", accessor: "id" },
      {
        Header: "Bank Name",
        accessor: "bankName",
        Cell: ({ value }) => <span>{value}</span>, // Using `value` for better readability
      },
      {
        Header: "Cheque No.",
        accessor: "chequeNo",
        Cell: ({ value }) => <span>{value}</span>, // Using `value` for consistency
      },
      {
        Header: "Cheque Amt.",
        accessor: "chequeAmt",
        Cell: ({ value }) => <span>{value}</span>, // Using `value` directly
      },
      {
        Header: "Note",
        accessor: "note",
        Cell: ({ value }) => <span>{value}</span>, // Using `value` directly
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (
          <span
            className={`${
              value.toLowerCase() === "rejected"
                ? "bg-[#fbe9e9] text-[#d82323]"
                : value.toLowerCase() === ChequeStatuses.PDC.label.toLowerCase()
                ? "bg-[#f1f1f1] text-[#7b7b7b]"
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
            Cheque Activity
          </span>
        </div>
        <div className="table-height">
          <MyTable
            columns={columns}
            data={chequeData}
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

export default Cheque;

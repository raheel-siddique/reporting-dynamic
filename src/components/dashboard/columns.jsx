import React from "react";
import edticon from "../../assets/edticon.svg";
import dlticon from "../../assets/dlticon.svg";
import DescriptionCell from "../../components/myTable/DescriptionCell";
import { chequeStatusStyle, formatDate } from "../../utils/format";
import pdfIcon from '../../assets/pdf.svg'

function generateChequeDepositColumns(includeStatus) {
  const columns = [
    { Header: "#", accessor: "id" },

    {
      Header: "Tenant Name",
      accessor: "tenantName",
      Cell: ({ row }) => <span>{row.original.tenantName}</span>,
    },
    {
      Header: "Bank Name",
      accessor: "bankName",
      Cell: ({ row }) => <span>{row.original.bankName}</span>,
    },
    {
      Header: "Cheque No.",
      accessor: "chequeNo",
      Cell: ({ row }) => <span>{row.original.chequeNo}</span>,
    },
    {
      Header: "Cheque Amount",
      accessor: "chequeAmount",
      Cell: ({ row }) => <span>{row.original.chequeAmount}</span>,
    },
    {
      Header: "Cheque Date",
      accessor: "chequeDate",
      Cell: ({ row }) => <span>{formatDate(row.original.chequeDate)}</span>,
    },
    {
      Header: "Note",
      accessor: "note",
      Cell: ({ row }) => <DescriptionCell content={row.original.note} />,
    },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: ({ row }) => <img className="cursor-pointer" src={pdfIcon} alt="download pdf icon" />,
    },
  ];

  if (includeStatus) {
    columns.splice(7, 0, {
      Header: "Status",
      accessor: "status",
      Cell: ({ row }) => (
        <span
          className={`
            ${row.original.status.toLowerCase() === "deposited" ? " bg-[#e9f7e9] text-[#23ae24]" : " bg-[#f1f1f1] text-[#777777]"}
          text-nowrap p-1 text-[14px] font-semibold rounded-md`}
        >
          {row.original.status}
        </span>
      ),
    });
  }

  return columns;
}

export default generateChequeDepositColumns;

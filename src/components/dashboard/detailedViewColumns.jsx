import React from "react";
import edticon from "../../assets/edticon.svg";
import dlticon from "../../assets/dlticon.svg";
import DescriptionCell from "../../components/myTable/DescriptionCell";
import { chequeStatusStyle, formatDate } from "../../utils/format";
import { CustomDropdown } from "../../components/Common/CustomDropdown";

export function generateChequeDepositViewColumns({
  includeStatus = false,
  statuses = [],
  handleStatusChange = () => {},
}) {
  const columns = [
    {
      Header: "Tenant Name",
      accessor: "tenant.name",
      Cell: ({ row }) => <span>{row.original.tenant.name}</span>,
    },
    {
      Header: "Building Name",
      accessor: "tenant.flat.building.name",
      Cell: ({ row }) => {
        let name = "-";
        const tenant = row.original.tenant;
        if (tenant && tenant.flat && tenant.flat.building) {
          name = tenant.flat.building.name;
        }
        return <span>{name}</span>;
      },
    },
    {
      Header: "Bank Name",
      accessor: "bank.name",
    },
    {
      Header: "Cheque No.",
      accessor: "chequeNo",
      Cell: ({ row }) => <span>{row.original.chequeNo}</span>,
    },
    {
      Header: "Cheque Amount",
      accessor: "amount",
      Cell: ({ row }) => <span>{row.original.amount}</span>,
    },
    {
      Header: "Cheque Date",
      accessor: "date",
      Cell: ({ row }) => <span>{formatDate(row.original.date)}</span>,
    },
    {
      Header: "Note",
      accessor: "note",
      Cell: ({ row }) => <DescriptionCell content={row.original.note} />,
    },
  ];

  if (includeStatus) {
    columns.splice(7, 0, {
      Header: "Status",
      accessor: "statusText",
      Cell: ({ row }) => {
        let defaultOptionValue = statuses.find(
          (st) => st.id === row.original.status
        );

        return (
          <span
            className={`
              ${
                row.original.statusText.toLowerCase() === "deposited"
                  ? " bg-[#e9f7e9] text-[#23ae24]"
                  : " bg-[#f1f1f1] text-[#777777]"
              }
            text-nowrap p-1 text-[14px] font-semibold rounded-md`}
          >
            <CustomDropdown
              defaultSelectedOptionText="All Locations"
              optionsData={statuses}
              onChange={(e) => {
                handleStatusChange(e, row.original.id);
              }}
              defaultSelectedOptionValue={
                defaultOptionValue ? defaultOptionValue.id : -1
              }
              isdefaultOption={false}
            />
          </span>
        );
      },
    });
  }

  return columns;
}

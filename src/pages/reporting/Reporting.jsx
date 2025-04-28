import { useCallback, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import MyTable from "../../components/myTable/MyTable";
import SearchField from "../../components/search/Searchfield";
import { useBankType } from "../../hooks/useBankType";
import { useTenants } from "../../hooks/useUsers";
import ExportCSVIcon from "../../icons/ExportCSVIcon";
import { chequeStatusStyle, exportToCSV, formatDate } from "../../utils/format";

const Reporting = () => {
  const [tableOption, settableOption] = useState("Lease");
  const [leaseFilter, setLeaseFilter] = useState("WithLease");
  const { bankTypesData, bankTypeLoading } = useBankType(1, 100000);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [chequePage, setChequePage] = useState(1);
  const [chequePageSize, setChequePageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  const [isExporting, setIsExporting] = useState(false);

  const { tenantsData, chequeData, totalCount, totalChequeCount } = useTenants(
    page,
    pageSize,
    debouncedSearchQuery,
    null,
    null,
    chequePage,
    chequePageSize,
    null,
    leaseFilter
  );

  const columnsTenantsLease = useMemo(
    () => [
      { Header: "Tenant Id", accessor: "id" },
      { Header: "Name", accessor: "name" },

      {
        Header: "Lease Start",
        accessor: "startDate",
        Cell: ({ row }) => <span>{formatDate(row.original.startDate)}</span>,
      },
      {
        Header: "Lease End",
        accessor: "endDate",
        Cell: ({ row }) => <span>{formatDate(row.original.endDate)}</span>,
      },
      {
        Header: "Grace Period Start Date",
        accessor: "gracePeriodStartDate",
        Cell: ({ row }) => (
          <span>{formatDate(row.original.gracePeriodStartDate)}</span>
        ),
      },
      {
        Header: "Grace Period End Date",
        accessor: "gracePeriodEndDate",
        Cell: ({ row }) => (
          <span>{formatDate(row.original.gracePeriodEndDate)}</span>
        ),
      },
      { Header: "No Of Days", accessor: "noOfdays" },
      {
        Header: "Annual Rent As Per Contract",
        accessor: "annualRentAsPerContract",
      },
      { Header: "Annual Rent", accessor: "actualRent" },
      {
        Header: "Status",
        accessor: "leaseStatusText",
        Cell: ({ row }) => {
          const statusName = row.original.leaseStatusText
            ? row.original.leaseStatusText
            : "Unknown";

          // Apply custom styles based on the status name
          return (
            <span
              className={
                chequeStatusStyle[statusName] ||
                "bg-gray-100 text-gray-600 px-2 py-1 rounded"
              }
            >
              {statusName}
            </span>
          );
        },
      },
    ],
    []
  );

  // console.log("tenants leases::", tenantsData);
  // console.log("tenants cheques::", chequeData);

  const TableOption = [
    { id: 1, name: "Lease", count: 4, show: false },
    { id: 2, name: "Cheque", count: 1, show: false },
  ];

  const chequeTenantsColumns = useMemo(
    () => [
      { Header: "Tenant Id", accessor: "tenantId" },
      ,
      {
        Header: "Cheque Number",
        accessor: "chequeNo",
        Cell: ({ row }) =>
          row.original.amountTypeText.toLowerCase() === "cash"
            ? "-"
            : row.original.chequeNo,
      },
      {
        Header: "Amount Type",
        accessor: "amountTypeText",
      },
      { Header: "Amount", accessor: "amount" },
      {
        Header: "Date",
        accessor: "date",
        Cell: ({ value }) => (value ? formatDate(value) : "-"),
      },
      { Header: "Note", accessor: "note" },
      {
        Header: "Status",
        accessor: "statusText",
        Cell: ({ row }) => {
          if (row.original.amountTypeText.toLowerCase() === "cash") {
            return "-"; // Display "-" if amountTypeText is "cash"
          }

          const statusName = row.original.statusText
            ? row.original.statusText
            : "Unknown";

          // Apply custom styles based on the status name
          return (
            <span
              className={
                chequeStatusStyle[statusName] ||
                "bg-gray-100 text-gray-600 px-2 py-1 rounded"
              }
            >
              {statusName}
            </span>
          );
        },
      },
      {
        Header: "Bank Name",
        accessor: "bankId",
        Cell: ({ value }) => {
          let bank = bankTypesData && bankTypesData?.find((b) => b.id == value);
          return <>{bank ? bank.name : ""}</>;
        },
      },
      // {
      //   Header: "Deposit Bank Name",
      //   accessor: "depositBankId",
      //   Cell: ({ value }) => {
      //     const bank =
      //       bankTypesData && bankTypesData.find((b) => b.id == value);
      //     return bank ? bank.name : "";
      //   },
      // },
    ],
    [bankTypesData]
  );

  const columns =
    tableOption == "Lease" ? columnsTenantsLease : chequeTenantsColumns;

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  }, []);

  const handleCSVExport = () => {
    let data = [];
    if (tableOption === "Lease") {
      data = tenantsData ? [...tenantsData] : [];
      if (data && data.length) {
        setIsExporting(true); // Start loading

        // Define CSV headers
        const csvHeaders = [
          { label: "Tenant Id", key: "id" },
          { label: "Lease Start", key: "startDate" },
          { label: "Lease End", key: "endDate" },
          { label: "Grace Period Start Date", key: "gracePeriodStartDate" },
          { label: "Grace Period End Date", key: "gracePeriodEndDate" },
          { label: "No Of Days", key: "noOfdays" },
          {
            label: "Annual Rent As Per Contract",
            key: "annualRentAsPerContract",
          },
          { label: "Actual Rent", key: "actualRent" },
          { label: "Status", key: "leaseStatusText" },
        ];

        // Format data
        const csvData = data.map((item) => ({
          id: item.id || "N/A",
          startDate: item.startDate ? formatDate(item.startDate) : "N/A",
          endDate: item.endDate ? formatDate(item.endDate) : "N/A",
          gracePeriodStartDate: item.gracePeriodStartDate
            ? formatDate(item.gracePeriodStartDate)
            : "N/A",
          gracePeriodEndDate: item.gracePeriodEndDate
            ? formatDate(item.gracePeriodEndDate)
            : "N/A",
          noOfdays: item.noOfdays ?? "0",
          annualRentAsPerContract: item.annualRentAsPerContract ?? "N/A",
          actualRent: item.actualRent ?? "N/A",
          leaseStatusText: item.leaseStatusText ?? "N/A",
        }));

        exportToCSV({
          data: csvData,
          filename: "lease_activity_reporting.csv",
          headers: csvHeaders,
        });

        setIsExporting(false); // Stop loading
      }
    } else {
      data = chequeData && chequeData.data ? [...chequeData.data] : [];
      if (data && data.length) {
        setIsExporting(true); // Start loading

        // Define CSV headers
        const csvHeaders = [
          { label: "Tenant Id", key: "tenantId" },
          { label: "Cheque Number", key: "chequeNo" },
          { label: "Amount Type", key: "amountTypeText" },
          { label: "Amount", key: "amount" },
          {
            label: "Date",
            key: "date",
          },
          { label: "Note", key: "note" },
          { label: "Status", key: "statusText" },
          { label: "Bank Name", key: "bank.name" },
        ];

        // Format data
        const csvData = data.map((item) => ({
          tenantId: item.tenantId || "N/A",
          chequeNo: item.chequeNo || "N/A",
          amountTypeText: item.amountTypeText || "N/A",
          amount: item.amount ?? "N/A",
          date: item.date ? formatDate(item.date) : "N/A",
          note: item.note ?? "N/A",
          statusText: item.statusText ?? "N/A",
          "bank.name": item.bank.name ?? "N/A",
        }));

        exportToCSV({
          data: csvData,
          filename: "cheque_activity_reporting.csv",
          headers: csvHeaders,
        });

        setIsExporting(false); // Stop loading
      }
    }
  };

  return (
    <div className="p-5 w-full h-full">
      <div className="relative overflow-x-auto  sm:rounded-lg bg-white border border-black/10 rounded-lg opacity-100">
        {/* Lease And Cheque Activity BUttons Section */}
        <div className="flex justify-between">
          <div className="flex p-5 gap-4 mb-2">
            {TableOption?.map((data) => (
              <button
                key={data.id}
                onClick={() => {
                  settableOption(data.name);
                }}
                className={`flex gap-3 justify-between items-center group h-max p-2.5 py-1.5 rounded-md border border-custom-gray bg-white hover:bg-custom-gradient-green active:bg-custom-gradient-green ${
                  data.name === tableOption
                    ? "bg-custom-gradient-green text-white border-transparent"
                    : "border-custom-gray"
                }`}
              >
                <h2
                  className={`text-[14px] text-nowrap group-hover:text-white group-active:text-white ${
                    data.name === tableOption
                      ? "bg-custom-gradient-green text-white"
                      : ""
                  }`}
                >
                  {/* {data.show && (
                  <span className="bg-[#D82323] rounded-full h-2 w-2 block"></span>
                )} */}
                  {data.name + " Activity"}
                </h2>

                {/* <div
                className={`flex justify-center items-center w-5 h-5 rounded-full p-1 text-[10px] group-hover:text-white text-[#1E1E1E] group-hover:bg-[#32a733] group-active:bg-[#32a733] group-active:text-white ${
                  data.name === tableOption
                    ? "bg-[#32a733] text-white"
                    : "bg-custom-gray"
                }`}
              >
                {data.count}
              </div> */}
              </button>
            ))}
            <div>
              <SearchField
                handleSearchChange={handleSearchChange}
                searchQuery={searchQuery}
              />
            </div>
          </div>
          <div className="p-5 gap-4 mb-2">
            <button
              className="flex font-medium p-2.5 py-1.5 text-[14px] justify-center drop-shadow-sm items-center gap-[10px] h-max text-nowrap rounded-[5px] bg-white border border-[#0000001A] text-[#1E1E1E] hover:bg-custom-gradient-green hover:text-white group"
              onClick={() => handleCSVExport()}
              disabled={isExporting}
            >
              <ExportCSVIcon />

              {isExporting ? "Exporting" : "Export"}
            </button>
          </div>
        </div>

        {/* Lease Or Cheque Table Heading Section */}
        {/* <span className="text-[18px] ps-5 text-[#1E1E1E] font-[500]">
          {tableOption + " "} Activity
        </span> */}
        {/* Lease Or Cheque Table Dynamically Work Button Press */}
        {tableOption == "Lease" ? (
          <>
            <div className="table-height mt-2">
              <MyTable
                columns={columns}
                data={tenantsData ?? []}
                page={page}
                pageSize={pageSize}
                setPage={setPage}
                setPageSize={setPageSize}
                totalCount={totalCount}
                pagination={true}
              />
            </div>
          </>
        ) : (
          <>
            <div className="table-height mt-5">
              {!bankTypeLoading && (
                <MyTable
                  columns={columns}
                  data={chequeData?.data ?? []}
                  page={chequePage}
                  pageSize={chequePageSize}
                  setPage={setChequePage}
                  setPageSize={setChequePageSize}
                  totalCount={totalChequeCount}
                  pagination={true}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Reporting;

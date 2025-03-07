import { useState, useMemo, useCallback } from "react";
import MyTable from "../../components/myTable/MyTable";
import AddReceiptModal from "../../components/receipt/AddReceiptModal";
import { useReceipt } from "../../hooks/useReceipt";
import {
  expenseAndReceiptsColumnToOrderByProperty,
  formatDate,
} from "../../utils/format";
import { ReceiptType } from "../../utils/enums";
import { useDebounce } from "use-debounce";
import SearchField from "../../components/search/Searchfield";

const Receipts = () => {
  const [receiptPage, setReceiptPage] = useState(1);
  const [receiptPageSize, setReceiptPageSize] = useState(50);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const [orderBy, setOrderBy] = useState("Ascending");
  const [orderByProperty, setOrderByProperty] = useState("Id");

  const { receiptData, totalReceiptCount, addReceiptMutation } = useReceipt(
    receiptPage,
    receiptPageSize,
    debouncedSearchQuery,
    orderBy,
    orderByProperty
  );

  const receiptColumns = useMemo(
    () => [
      // {
      //   Header: "Flat#",
      //   accessor: "flat.number",
      // },
      {
        Header: "Received From",
        accessor: "payee.name",
      },
      {
        Header: "Amount Received",
        accessor: "vatAmount",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Payment Mode",
        accessor: "paymentModeText",
      },
      {
        Header: "Date",
        accessor: "date",
        Cell: ({ row }) => <span>{formatDate(row.original.date)}</span>,
      },
      {
        Header: "Vat Percentage",
        accessor: "vatPercentage",
        Cell: ({ row }) => (
          <span>
            {row.original.vatPercentage
              ? `${row.original.vatPercentage}%`
              : "-"}
          </span>
        ),
      },
      {
        Header: "Total Amount",
        accessor: "totalAmount",
      },
      {
        Header: "Bank Name",
        accessor: "bank.name",
      },
      // {
      //   Header: "Invoice No.",
      //   accessor: "invoiceNumber",
      // },
      {
        Header: "Receipt/Deposit",
        accessor: "receiptType",
        Cell: ({ row }) => {
          const type = Object.values(ReceiptType).find(
            (t) => t.value === row.original.receiptType
          );
          return <span>{type ? type.label : "Unknown"}</span>;
        },
      },
      {
        Header: "Receipt No.",
        accessor: "receiptNumber",
      },
    ],
    []
  );
  const openModal = () => {
    setShowReceiptModal(true), setSelectedReceipt(null);
  };
  const closeModal = () => {
    setShowReceiptModal(false);
  };

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  }, []);

  return (
    <div className="p-5 w-full h-full">
      <div className="relative overflow-x-auto  sm:rounded-lg bg-white border border-black/10 rounded-lg opacity-100">
        {/* <div className="pt-[20px] pl-[20px]">
          <h1 className="text-[18px] text-[#1E1E1E] font-[500]">Receipts</h1>
        </div> */}
        <div className="pt-[15px] px-[20px] flex flex-row w-full justify-between  flex-wrap gap-2">
          <div>
            <div>
              <SearchField
                handleSearchChange={handleSearchChange}
                searchQuery={searchQuery}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={openModal}
              className="flex justify-center items-center gap-[10px] h-max text-nowrap rounded-[10px] border border-custom-gray w-full p-2.5 py-1.5 text-[14px] text-[#1E1E1E] hover:bg-custom-gradient-green hover:text-white group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15.5"
                height="15.5"
                viewBox="0 0 15.5 15.5"
              >
                <g
                  id="Group_23168"
                  data-name="Group 23168"
                  transform="translate(-1103.25 -12.25)"
                >
                  <path
                    id="Path_38297"
                    data-name="Path 38297"
                    d="M12,5V19"
                    transform="translate(1099 8)"
                    fill="none"
                    className="group-hover:stroke-white stroke-[#1E1E1E]"
                    stroke="#0000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  />
                  <path
                    id="Path_38298"
                    data-name="Path 38298"
                    d="M5,12H19"
                    transform="translate(1099 8)"
                    fill="none"
                    className="group-hover:stroke-white stroke-[#1E1E1E]"
                    stroke="#0000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  />
                </g>
              </svg>
              Add Receipt/Deposit
            </button>
          </div>
        </div>

        <div className="table-height mt-5">
          <MyTable
            columns={receiptColumns}
            data={receiptData ? receiptData : []}
            page={receiptPage}
            pageSize={receiptPageSize}
            setPage={setReceiptPage}
            setPageSize={setReceiptPageSize}
            totalCount={totalReceiptCount}
            pagination={true}
            columnToOrderByProperty={expenseAndReceiptsColumnToOrderByProperty}
            orderBy={orderBy}
            setOrderBy={setOrderBy}
            orderByProperty={orderByProperty}
            setOrderByProperty={setOrderByProperty}
            seeMoreColumns={["Received From"]}
          />
        </div>

        {showReceiptModal && (
          <AddReceiptModal
            title={"Add Receipt/Deposit"}
            onClose={closeModal}
            addReceiptMutation={addReceiptMutation}
            selectedReceipt={selectedReceipt}
          />
        )}
      </div>
    </div>
  );
};

export default Receipts;

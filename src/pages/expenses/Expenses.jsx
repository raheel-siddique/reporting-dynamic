import { useCallback, useState, useMemo, useEffect } from "react";
import MyTable from "../../components/myTable/MyTable";
import {
  expenseAndReceiptsColumnToOrderByProperty,
  formatDate,
} from "../../utils/format";
import AddExpenseModal from "../../components/expense/AddExpenseModal";
import { useExpense } from "../../hooks/useExpense";
import TemplateContainer from "../../utils/exportPdfs/templateContainer";
import { exportToPDF } from "../../utils/exportPdfs/exportPDF";
import pdfIcon from "../../assets/pdf.svg";
import Tooltip from "../../components/tooltip/tooltip";
import { printIcon } from "../../utils/constant/image";

const Expenses = () => {
  const [expensePage, setExpensePage] = useState(1);
  const [expensePageSize, setExpensePageSize] = useState(50);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [orderBy, setOrderBy] = useState("Descending");
  const [orderByProperty, setOrderByProperty] = useState("Id");
  const { expenseData, totalExpenseCount, addExpenseMutation } = useExpense(
    expensePage,
    expensePageSize,
    orderBy,
    orderByProperty
  );

  console.log("expenseData =>", expenseData);

  let data = {
    expenseType: "",
    date: "",
    description: "",
    buildingname: "",
    flatname: "",
    payeename: "",
    paymentMode: "",
    chequeNumber: "",
    bankname: "",
    totalAmount: "",
  };
  const [selectedExpenseToPrint, setSelectedExpenseToPrint] = useState(data);

  const expenseColumns = useMemo(
    () => [
      {
        Header: "Expense Type",
        accessor: "expenseType.name",
      },
      {
        Header: "Building Name",
        accessor: "building.name",
      },
      {
        Header: "Flat#",
        accessor: "flat.number",
      },
      {
        Header: "Payment To",
        accessor: "payee.name",
      },
      {
        Header: "Expense Amount",
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
      {
        Header: "Invoice No.",
        accessor: "invoiceNumber",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="flex gap-[20px] w-max ">
            <Tooltip position="top" text="Print Voucher">
              <img
                className="cursor-pointer"
                src={printIcon}
                onClick={() => {
                  exportPdf(row.original);
                }}
                alt="print"
              />
            </Tooltip>
          </div>
        ),
      },
    ],
    []
  );

  const exportPdf = (selectedExpense) => {
    try {
      let data = {
        expenseType: selectedExpense?.expenseType?.name ?? "",
        createdAt: selectedExpense?.createdAt ?? "",
        description: selectedExpense?.description ?? "",
        buildingname: selectedExpense?.building?.name ?? "",
        flatname: selectedExpense?.flat?.number ?? "",
        payeename: selectedExpense?.payee?.name ?? "",
        paymentMode: selectedExpense?.paymentModeText ?? "",
        chequeNumber: selectedExpense?.chequeNumber ?? "",
        bankname: selectedExpense?.bank?.name ?? "",
        totalAmount: selectedExpense?.totalAmount ?? "",
        date: selectedExpense?.date ?? "",
      };
      setSelectedExpenseToPrint(data); // This updates the state asynchronously
    } catch (error) {
      console.error("Error printing receipt:", error);
    }
  };

  useEffect(() => {
    if (selectedExpenseToPrint && selectedExpenseToPrint.expenseType) {
      exportToPDF();
    }
  }, [selectedExpenseToPrint]);

  const handleEditExpense = (selectedExpense) => {
    console.log("selectedExpense:::", selectedExpense);
    setSelectedExpense(selectedExpense);
    setShowExpenseModal(true);
  };
  const openModal = () => {
    setShowExpenseModal(true), setSelectedExpense(null);
  };
  const closeModal = () => {
    setShowExpenseModal(false);
  };

  return (
    <div className="p-5 w-full h-full">
      <div className="relative overflow-x-auto  sm:rounded-lg bg-white border border-black/10 rounded-lg opacity-100">
        {/* <div className="pt-[20px] pl-[20px]">
          <h1 className="text-[18px] text-[#1E1E1E] font-[500]">Expenses</h1>
        </div> */}
        <div className="pt-[15px] px-[20px] flex flex-row w-full justify-between  flex-wrap gap-2">
          <div></div>
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
              Add Expense
            </button>
          </div>
        </div>

        <div className="table-height mt-5">
          <MyTable
            columns={expenseColumns}
            data={expenseData ? expenseData : []}
            page={expensePage}
            pageSize={expensePageSize}
            setPage={setExpensePage}
            setPageSize={setExpensePageSize}
            totalCount={totalExpenseCount}
            pagination={true}
            columnToOrderByProperty={expenseAndReceiptsColumnToOrderByProperty}
            orderBy={orderBy}
            setOrderBy={setOrderBy}
            orderByProperty={orderByProperty}
            setOrderByProperty={setOrderByProperty}
          />
          <TemplateContainer
            templatetype={"Expense"}
            data={selectedExpenseToPrint}
          />
        </div>

        {showExpenseModal && (
          <AddExpenseModal
            title={"Add Expense"}
            onClose={closeModal}
            addExpenseMutation={addExpenseMutation}
            selectedExpense={selectedExpense}
          />
        )}
      </div>
    </div>
  );
};

export default Expenses;

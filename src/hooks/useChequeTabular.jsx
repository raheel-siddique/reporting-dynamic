import {
  chequesStatus,
  compareStringNumberValues,
  formatDate,
} from "../utils/format";
import {
  AmountTypeEnum,
  AmountTypeEnumReverse,
  DatedOrOpenEnum,
  DatedOrOpenEnumReverse,
} from "../utils/enums";
import { useBankType } from "./useBankType";
import dlticon from "../assets/dlticon.svg";
import saveicon from "../assets/tick.svg";
import Notifier from "../components/errors/Notifier";
import { useSelector } from "react-redux";
import Tooltip from "../components/tooltip/tooltip";
import eyeIcon from "../assets/eye_icn.svg";

export const useChequeTabular = (
  type = "Rent",
  handleAddRow = () => {},
  handleEditRow = () => {},
  handleDeleteRow = () => {},
  viewCheque = () => {}
) => {
  const { bankTypesData } = useBankType(1, 100000);
  const { hasManagementAccess } = useSelector((state) => state.auth);

  const newRowObj = {
    chequeNo: "",
    amount: null,
    date: null,
    note: "",
    bankId: "",
    depositBankId: "",
    statusText: "PDC",
    amountType: "Cheque",
    isVat: true,
    vat: null,
    discount: null,
    depositType: type,
    datedOrOpen: "Open",
  };

  const rowColumns = [
    {
      field: "amountType",
      headerName: "Amount Type",
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: Object.keys(AmountTypeEnum), // ["Cheque", "Cash"]
      },
      valueFormatter: (params) =>
        AmountTypeEnumReverse[params.value] || params.value,
      valueParser: (params) =>
        AmountTypeEnum[params.newValue] || params.newValue,
      cellRenderer: (params) => (
        <div className="flex items-center gap-2">
          {params.data.isNotify && <div><Notifier /></div>}
          <div>{AmountTypeEnumReverse[params.value] || params.value}</div>
          {/* Show Notifier when isNotify is true */}
        </div>
      ),
    },
    {
      field: "datedOrOpen",
      headerName: "Dated/Open",
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: Object.keys(DatedOrOpenEnum), // ["Dated", "Open"]
      },
      valueFormatter: (params) =>
        DatedOrOpenEnumReverse[params.value] || params.value,
      valueParser: (params) =>
        DatedOrOpenEnum[params.newValue] || params.newValue,
    },
    {
      field: "date",
      headerName: "Date",
      editable: (params) =>
        compareStringNumberValues(DatedOrOpenEnum, params.data.datedOrOpen, 1), // Editable only if "Dated" is selected
      cellEditor: "agDateCellEditor",
      cellEditorParams: {
        placeholder: "Select Date",
      },
      valueGetter: (params) =>
        compareStringNumberValues(DatedOrOpenEnum, params.data.datedOrOpen, 2)
          ? "-"
          : params.data.date, // Show "-" if "Open"
      valueFormatter: (params) => {
        const dateValue = params.value;

        // If the date is not valid or it's empty, return empty string
        if (!dateValue || dateValue === "-" || isNaN(new Date(dateValue))) {
          return ""; // or return something else like "-" if you prefer
        }

        // Apply your formatterFunc if the date is valid
        return formatDate(new Date(dateValue)); // Assuming formatterFunc is defined elsewhere
      },
    },
    {
      field: "amount",
      headerName: "Amount",
      editable: true,
      cellRenderer: (params) => {
        return (
          <div className="flex items-center gap-2">
            <span>{params.value}</span>
          </div>
        );
      },
    },

    {
      field: "chequeNo",
      headerName: "Cheque No",
      editable: (params) =>
        compareStringNumberValues(AmountTypeEnum, params.data.amountType, 1),
      valueGetter: (params) =>
        compareStringNumberValues(AmountTypeEnum, params.data.amountType, 2)
          ? "-"
          : params.data.chequeNo,
    },

    {
      field: "bankId",
      headerName: "Bank Name",
      editable: (params) =>
        compareStringNumberValues(AmountTypeEnum, params.data.amountType, 1),
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: bankTypesData
          ? bankTypesData
              .filter((bank) => bank.name.trim() !== "") // Remove empty names
              .map((bank) => bank.name)
          : [],
      },
      valueGetter: (params) => {
        const bank = bankTypesData?.find(
          (bank) => bank.id === params.data.bankId
        );
        return compareStringNumberValues(
          AmountTypeEnum,
          params.data.amountType,
          2
        )
          ? "-"
          : bank
          ? bank.name
          : ""; // Display bank name
      },
      valueSetter: (params) => {
        const bank = bankTypesData?.find(
          (bank) => bank.name === params.newValue
        );
        if (bank) {
          params.data.bankId = bank.id; // Store bank ID
          params.api.refreshCells({
            rowNodes: [params.node],
            columns: ["bankId"],
          }); // Refresh dropdown
          return true;
        }
        return false;
      },
    },

    {
      field: "depositBankId",
      headerName: "Deposit Bank Name",
      editable: (params) =>
        compareStringNumberValues(AmountTypeEnum, params.data.amountType, 1),
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: bankTypesData
          ? bankTypesData
              .filter((bank) => bank.name.trim() !== "") // Remove empty names
              .map((bank) => bank.name)
          : [],
      },
      valueGetter: (params) => {
        const bank = bankTypesData?.find(
          (bank) => bank.id === params.data.depositBankId
        );
        return compareStringNumberValues(
          AmountTypeEnum,
          params.data.amountType,
          2
        )
          ? "-"
          : bank
          ? bank.name
          : ""; // Display bank name
      },
      valueSetter: (params) => {
        const bank = bankTypesData?.find(
          (bank) => bank.name === params.newValue
        );
        if (bank) {
          params.data.depositBankId = bank.id; // Store deposit bank ID
          return true;
        }
        return false;
      },
    },

    {
      field: "statusText",
      headerName: "Cheque Status",
      editable: (params) =>
        compareStringNumberValues(AmountTypeEnum, params.data.amountType, 1),
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: chequesStatus.map((status) => status.name),
      },
      valueGetter: (params) =>
        !compareStringNumberValues(AmountTypeEnum, params.data.amountType, 1)
          ? "-"
          : params.data.statusText,
    },

    {
      field: "vat",
      headerName: "VAT",
      editable: true,
    },
    { field: "discount", headerName: "Discount", editable: true },
    // {
    //   field: "depositType",
    //   headerName: "Deposit Type",
    //   editable: false,
    //   cellRenderer: (params) => "Rent",
    // },
    { field: "note", headerName: "Note", editable: true },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params) => (
        <>
          <div className="flex gap-x-3 h-full w-full ps-1 items-center">
            <Tooltip text="View">
              <button
                onClick={() => {
                  viewCheque(params.data);
                }}
              >
                <img className="cursor-pointer" src={eyeIcon} alt="delete" />
              </button>
            </Tooltip>
            {params.data?.id ? (
              <Tooltip text="Edit">
                <button onClick={() => handleEditRow && handleEditRow(params)}>
                  <img
                    height={10}
                    width={17}
                    className="cursor-pointer"
                    src={saveicon}
                    alt="edit"
                  />
                </button>
              </Tooltip>
            ) : (
              <Tooltip text="Add">
                <button onClick={() => handleAddRow && handleAddRow(params)}>
                  <img
                    height={10}
                    width={17}
                    className="cursor-pointer"
                    src={saveicon}
                    alt="add"
                  />
                </button>
              </Tooltip>
            )}
            {hasManagementAccess && (
              <Tooltip text="Delete">
                <button
                  className="flex items-center justify-center"
                  onClick={() => handleDeleteRow && handleDeleteRow(params)}
                >
                  <img className="cursor-pointer" src={dlticon} alt="delete" />
                </button>
              </Tooltip>
            )}
          </div>
        </>
      ),
    },
  ];
  return { rowColumns, newRowObj };
};

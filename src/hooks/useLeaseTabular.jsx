import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import dlticon from "../assets/dlticon.svg";
import eyeIcon from "../assets/eye_icn.svg";
import saveicon from "../assets/tick.svg";
import uploadIcon from "../assets/upload.svg";
import Notifier from "../components/errors/Notifier";
import Tooltip from "../components/tooltip/tooltip";
import { formatDate, formatDateForBackend, leaseStatus } from "../utils/format";
import { useLeaseDocumentImages } from "./useLeaseImages";
import { useUsers } from "./useUsers";

export const useLeaseTabular = (
  tenantId,
  handleAddRow = () => {},
  handleEditRow = () => {},
  handleDeleteRow = () => {},
  manuallyUpdateColumn = () => {},
  handleLeaseDocuments = () => {},
  viewLease = () => {}
) => {
  const { usersData } =
    useUsers();

  const { documentPaths } = useLeaseDocumentImages();

  const { hasManagementAccess } = useSelector((state) => state.auth);

  const calculateNoOfDays = (startDate, endDate) => {
    if (!startDate || !endDate) return ""; // Ensure empty if any date is missing

    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert ms to days

    return diffDays > 0 ? diffDays : "";
  };

  const handleCellValueChanged = (params, rowData, setRowData) => {
    const { column, data, api } = params;
    const colId = column.getColId();
    const updatedRow = { ...data };

    // Auto-set endDate only when startDate changes
    if (colId === "startDate") {
      const newEndDate = new Date(updatedRow.startDate);
      newEndDate.setDate(newEndDate.getDate() + 365);
      updatedRow.endDate = new Date(newEndDate.toISOString().split("T")[0]);

      // Notify AG Grid of the change
      api.applyTransaction({ update: [updatedRow] });
    }

    // Recalculate noOfdays when relevant fields change
    if (["startDate", "gracePeriodEndDate", "endDate"].includes(colId)) {
      updatedRow.noOfdays = calculateNoOfDays(
        updatedRow.startDate,
        updatedRow.gracePeriodEndDate || updatedRow.endDate
      );
    }

    // Update the row data
    setRowData((prev) =>
      prev.map((row) =>
        (row?.newId && row.newId === updatedRow.newId) ||
        (row?.id && row.id === updatedRow.id)
          ? { ...updatedRow }
          : row
      )
    );
  };

  const formatPayload = (payload) => {
    const formattedPayload = {
      startDate: formatDateForBackend(payload.startDate),
      endDate: formatDateForBackend(payload.endDate),
      gracePeriodStartDate: formatDateForBackend(payload.gracePeriodStartDate),
      gracePeriodEndDate: formatDateForBackend(payload.gracePeriodEndDate),
      annualRentAsPerContract: payload.annualRentAsPerContract,
      actualRent: payload.actualRent,
      leaseStatus: payload.leaseStatus,
      noOfdays: payload.noOfdays,
      contractFile: payload.contractFile,
    };

    if (tenantId) formattedPayload.tenantId = tenantId;

    if (payload?.id) formattedPayload.id = payload.id;

    return formattedPayload;
  };

  const checkForValidation = (payload) => {
    const {
      startDate,
      endDate,
      actualRent,
      annualRentAsPerContract,
      gracePeriodStartDate,
      gracePeriodEndDate,
    } = payload;

    if (!startDate || !endDate || !actualRent || !annualRentAsPerContract) {
      if (!startDate) {
        toast.error("Start Date is required!", { position: "top-center" });
      } else if (!endDate) {
        toast.error("End Date is required!", { position: "top-center" });
      } else if (!actualRent) {
        toast.error("Actual Rent is required!", { position: "top-center" });
      } else if (!annualRentAsPerContract) {
        toast.error("Annual Rent As Per Contract is required!", {
          position: "top-center",
        });
      }
      return false;
    }

    if (new Date(endDate) < new Date(startDate)) {
      toast.error("End Date cannot be before Start Date!", {
        position: "top-center",
      });
      return false;
    }

    if (
      gracePeriodStartDate &&
      new Date(gracePeriodStartDate) < new Date(endDate)
    ) {
      toast.error(
        "Grace Period Start Date should be the same as or greater than End Date!",
        {
          position: "top-center",
        }
      );
      return false;
    }

    if (
      gracePeriodEndDate &&
      new Date(gracePeriodEndDate) <= new Date(endDate)
    ) {
      toast.error("Grace Period End Date should be greater than End Date!", {
        position: "top-center",
      });
      return false;
    }

    if (
      gracePeriodStartDate &&
      gracePeriodEndDate &&
      new Date(gracePeriodStartDate) > new Date(gracePeriodEndDate)
    ) {
      toast.error(
        "Grace Period Start Date cannot be greater than Grace Period End Date!",
        {
          position: "top-center",
        }
      );
      return false;
    }

    return true;
  };

  const handleAddDocument = (payload, contractFile) => {
    if (!contractFile && !payload.contractFile) return;
    let joinedContractFile = contractFile.join(",");
    (joinedContractFile = payload.contractFile
      ? payload.contractFile + "," + joinedContractFile
      : joinedContractFile),
      handleEditLease({
        ...payload,
        contractFile: joinedContractFile,
      });

    manuallyUpdateColumn("contractFile", payload.id, joinedContractFile);
  };

  const handleAddLease = async (payload) => {
    let obj = formatPayload(payload);

    if (!checkForValidation(payload)) return;

    if (tenantId) {
      try {
        const response = await addLeaseMutation.mutateAsync([obj]);
        return response.message;
      } catch (error) {}
    } else {
      toast.success("Changes saved successfully", {
        position: "top-center",
      });
    }
  };

  const handleEditLease = (payload) => {
    let obj = formatPayload(payload);

    if (!checkForValidation(payload)) return;

    updateLeaseMutation({ ...obj });
  };

  const handleDeleteLease = (id) => {
    deleteLeaseMutation(Number(id));
  };

  const newRowObj = {
    sNo: "",
    startDate: null,
    endDate: null,
    gracePeriodStartDate: null,
    gracePeriodEndDate: null,
    noOfdays: "", // Auto-calculated
    annualRentAsPerContract: null,
    actualRent: null,
    leaseStatus: "1",
    newId: Date.now(),
    contractFile: null,
  };

  const rowColumns = [
    {
      field: "sNo",
      headerName: "S.no",
      valueGetter: (params) => params.node.rowIndex + 1,
      cellRenderer: (params) => (
        <div className="flex items-center gap-2">
          {params.data.isNotify && <Notifier />}{" "}
          <span>{params.node.rowIndex + 1}</span>
          {/* Show Notifier when isNotify is true */}
        </div>
      ),
    },

    {
      field: "contractFile",
      headerName: "Contract File",
      hide: true, // Hides the column but keeps data in rowData
    },
    {
      field: "startDate",
      headerName: "Start Date",
      editable: true,
      cellEditor: "agDateCellEditor",
      cellEditorParams: { placeholder: "Select Date" },
      valueGetter: (params) => {
        const dateValue = params.data?.startDate;
        return dateValue ? new Date(dateValue) : null; // Ensure it's a Date object
      },
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
      field: "endDate",
      headerName: "End Date",
      editable: true,
      cellEditor: "agDateCellEditor",
      cellEditorParams: { placeholder: "Select Date" },
      valueGetter: (params) => {
        const dateValue = params.data?.endDate;
        return dateValue ? new Date(dateValue) : null; // Ensure it's a Date object
      },
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
      field: "gracePeriodStartDate",
      headerName: "Grace Period Start Date",
      editable: true,
      cellEditor: "agDateCellEditor",
      cellEditorParams: { placeholder: "Select Date" },
      valueGetter: (params) => {
        const dateValue = params.data?.gracePeriodStartDate;
        return dateValue ? new Date(dateValue) : null; // Ensure it's a Date object
      },
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
      field: "gracePeriodEndDate",
      headerName: "Grace Period End Date",
      editable: true,
      cellEditor: "agDateCellEditor",
      cellEditorParams: { placeholder: "Select Date" },
      valueGetter: (params) => {
        const dateValue = params.data?.gracePeriodEndDate;
        return dateValue ? new Date(dateValue) : null; // Ensure it's a Date object
      },
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
      field: "noOfdays",
      headerName: "No. of Days",
      editable: false, // Auto-calculated
    },
    {
      field: "annualRentAsPerContract",
      headerName: "Annual Rent (Contract)",
      editable: true,
    },
    {
      field: "actualRent",
      headerName: "Actual Rent",
      editable: true,
    },
    {
      field: "leaseStatus",
      headerName: "Lease Status",
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: leaseStatus.map((status) => status.value), // Only values in dropdown
      },
      valueFormatter: (params) => {
        const statusObj = leaseStatus.find(
          (status) => status.value == params.value
        );
        return statusObj ? statusObj.name : params.value;
      },
      valueGetter: (params) => {
        return params.data.leaseStatus;
      },
    },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params) => (
        <div className="flex gap-x-3 h-full w-full ps-1 items-center">
          <Tooltip text="View">
            <button
              onClick={() => {
                viewLease(params.data);
              }}
            >
              <img className="cursor-pointer" src={eyeIcon} alt="delete" />
            </button>
          </Tooltip>
          {params.data?.id ? (
            <Tooltip text="Edit">
              <button onClick={() => handleEditRow(params)}>
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
              <button onClick={() => handleAddRow(params)}>
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
                onClick={() => handleDeleteRow(params)}
              >
                <img className="cursor-pointer" src={dlticon} alt="delete" />
              </button>
            </Tooltip>
          )}
          {params.data.id && (
            <Tooltip text="Upload Image">
              <button
                className="flex items-center justify-center"
                onClick={() => handleLeaseDocuments(params.data)}
              >
                <img className="cursor-pointer" src={uploadIcon} alt="delete" />
              </button>
            </Tooltip>
          )}
        </div>
      ),
    },
  ];

  return {
    rowColumns,
    newRowObj,
    handleCellValueChanged,
    handleAddLease,
    handleEditLease,
    handleDeleteLease,
    formatPayload,
    handleAddDocument,
    checkForValidation,
  };
};

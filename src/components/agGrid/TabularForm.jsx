import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry } from "ag-grid-community";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import {
  useState,
  useEffect,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from "react";
import DeleteModal from "../../components/modal/DeleteModal";

// Register Required Modules
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const TabularForm = forwardRef(
  (
    {
      initialData = null,
      addRow,
      editRow,
      deleteRow,
      getRowCount = () => {},
      rowColumns,
      newRowObj,
      handleCellValueChanged = null,
    },
    ref
  ) => {
    useImperativeHandle(ref, () => ({
      getRowValues() {
        return rowData;
      },
      handleAddRow(params) {
        handleAddRowMut(params);
      },
      handleEditRow(params) {
        handleEditRowMut(params);
      },
      handleDeleteRow(params) {
        handleDeleteRowMut(params);
      },

      manuallyUpdateColumn(columnName, id, value) {
        setRowData((prev) =>
          prev.map((row) =>
            (row?.id && row.id === id) || (row?.newId && row.newId === id)
              ? { ...row, [columnName]: value } // Use dynamic key
              : row
          )
        );
      },
    }));

    const [firstSave, setFirstSave] = useState(true);
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteRowId, setDeleteRowId] = useState(null);
    const [deleteRowData, setDeleteRowData] = useState(null);

    const [rowData, setRowData] = useState([]);

    useEffect(() => {
      if (initialData && firstSave) {
        setRowData(initialData);
        setFirstSave(false);
      }
    }, [initialData]);

    useEffect(() => {
      getRowCount(rowData?.length || 0);
    }, [rowData]);

    const onCellValueChanged = (params) => {
      setRowData((prev) =>
        prev.map((row) =>
          row === params.data
            ? { ...params.data } // Ensure the object reference updates
            : row
        )
      );
    };

    // Define columnDefs dynamically based on rowData

    const handleAddRow = () => {
      setRowData([newRowObj, ...rowData]);
    };

    const handleDeleteRow = (params) => {
      setRowData((prev) => prev.filter((row) => row !== params.data));
    };

    const handleUpdateRow = (params) => {
      setRowData((prev) =>
        prev.map((row) => (row === params.data ? { ...params.data } : row))
      );
    };

    const handleEditRowMut = (params) => {
      editRow(params.data);
    };

    const handleAddRowMut = async (params) => {
      let newId = await addRow(params.data);

      // Update the rowData at the given index
      const updatedRowData = [
        ...params.api.getRenderedNodes().map((node) => node.data),
      ];
      updatedRowData[params.node.rowIndex].id = newId;

      // Assuming setRowData is the state setter for your rowData
      setRowData(updatedRowData); // Update the state with new row data
    };

    const handleDeleteRowMut = async (params) => {
      if (params.data.id) {
        setDeleteRowId(params.data.id);
        setDeleteModal(true);
        setDeleteRowData(params);
      } else handleDeleteRow(params);
    };

    // Define columns dynamically based on rowData
    const columns = useMemo(() => {
      return rowColumns;
    }, [rowData]);

    return (
      <>
        <div className="mt-4">
          <div className="flex w-full justify-start gap-x-2 mt-3 mb-2">
            <button
              onClick={handleAddRow}
              className="flex justify-center items-center gap-[10px] text-nowrap rounded-[10px] border border-custom-gray p-2.5 py-1.5 text-[14px] bg-custom-gradient-green text-white"
            >
              Add Row
            </button>
            {/* <button
              onClick={handleSave}
              className="flex justify-center items-center gap-[10px] text-nowrap rounded-[10px] border border-custom-gray p-2.5 py-1.5 text-[14px] text-[#1E1E1E] hover:bg-custom-gradient-green hover:text-white group"
            >
              Save
            </button> */}
          </div>
          <div
            className="ag-theme-alpine mt-4"
            style={{ height: 400, width: "100%" }}
          >
            <AgGridReact
              rowData={rowData}
              columnDefs={columns}
              modules={[ClientSideRowModelModule]}
              defaultColDef={{
                flex: 1,
                singleClickEdit: true, // Enable editing on a single click
              }}
              onCellValueChanged={(params) =>
                handleCellValueChanged
                  ? handleCellValueChanged(params, rowData, setRowData)
                  : onCellValueChanged(params)
              } // Update state when cell value changes
              gridOptions={{
                stopEditingWhenCellsLoseFocus: true,
              }}
            />
          </div>

          {deleteModal && (
            <DeleteModal
              onClose={() => setDeleteModal(!deleteModal)}
              title={`Are you sure you want to delete?`}
              setShowDltModal={setDeleteModal}
              deleteMutation={(id) => {
                deleteRow(id);
                handleDeleteRow(deleteRowData);
              }}
              deleteId={deleteRowId}
            />
          )}
        </div>
      </>
    );
  }
);

export default TabularForm;

import React, { useState, useMemo, useCallback } from "react";
import MyTable from "../../../components/myTable/MyTable";
import DeleteModal from "../../../components/modal/DeleteModal";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";
import { dlticon } from "../../../utils/constant/image";
import Tooltip from "../../../components/tooltip/tooltip";
import editicon from "../../../assets/edticon.svg";
import {
  formatPhoneNumber,
  payeeColumnToOrderByProperty,
} from "../../../utils/format";
import { usePayee } from "../../../hooks/usePayee";
import { useDebounce } from "use-debounce";
import SearchField from "../../../components/search/Searchfield";

function PayeeTypeListing({ handleEdit }) {
  const [payeeTypeId, setPayeeTypeId] = useState(null);
  const [orderBy, setOrderBy] = useState("Ascending");
  const [orderByProperty, setOrderByProperty] = useState("Name");
  const [showDltModal, setShowDltModal] = useState(false);
  const { hasManagementAccess } = useSelector((state) => state.auth);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [searchQuery, setSearchQuery] = useState("");

  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const { payeeData, deletePayeeTypeMutation, isPayeeLoading } = usePayee(
    page,
    pageSize,
    debouncedSearchQuery,
    orderBy,
    orderByProperty
  );

  const totalCount = payeeData ? payeeData.length : 0;

  // Hardcoded column mapping

  const columns = useMemo(() => {
    const baseColumns = [
      { Header: "#", accessor: "id" },
      { Header: "Name", accessor: "name" },
      { Header: "Email", accessor: "email" },
      {
        Header: "Phone",
        accessor: "phone",
        Cell: ({ row }) => (
          <span>
            {formatPhoneNumber(
              row.original.phone,
              row.original.phoneCountryCode
            )}
          </span>
        ),
      },
      { Header: "TRN", accessor: "trn" },
    ];

    baseColumns.push({
      Header: "Actions",
      accessor: "actions",
      Cell: ({ row }) => (
        <div className="flex gap-[20px]">
          {hasManagementAccess && (
            <Tooltip text="Delete">
              <img
                className="cursor-pointer"
                onClick={() => deletePayeeType(row.original.id)}
                src={dlticon}
                alt="Delete"
              />
            </Tooltip>
          )}

          <Tooltip text="Edit">
            <img
              onClick={() => {
                handleEdit(row.original);
              }}
              className="cursor-pointer"
              src={editicon}
              alt="Edit"
            />
          </Tooltip>
        </div>
      ),
    });

    return baseColumns;
  }, []);

  const deletePayeeType = (id) => {
    setPayeeTypeId(id);
    setShowDltModal(true);
  };

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  }, []);

  return (
    <div className="relative overflow-x-auto shadow-md mt-[20px] sm:rounded-lg bg-white border border-black/10 rounded-lg opacity-100">
      <div className="p-4">
        <SearchField
          handleSearchChange={handleSearchChange}
          searchQuery={searchQuery}
        />
      </div>
      {isPayeeLoading ? (
        <div className="p-6 table-height">
          {Array.from({ length: pageSize }).map((_, index) => (
            <div key={index} className="mb-4">
              <Skeleton height={40} />
            </div>
          ))}
        </div>
      ) : payeeData && payeeData.length > 0 ? (
        <MyTable
          columns={columns}
          data={payeeData}
          page={page}
          pageSize={pageSize}
          setPage={setPage}
          setPageSize={setPageSize}
          totalCount={totalCount}
          pagination={true}
          columnToOrderByProperty={payeeColumnToOrderByProperty}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          orderByProperty={orderByProperty}
          setOrderByProperty={setOrderByProperty}
        />
      ) : (
        <div className="p-6">No Payee found.</div>
      )}
      {showDltModal && (
        <DeleteModal
          onClose={() => setShowDltModal(!showDltModal)}
          title={"Are you sure you want to delete this Parameter?"}
          setShowDltModal={setShowDltModal}
          deleteId={payeeTypeId}
          deleteMutation={(id) => deletePayeeTypeMutation(id)}
        />
      )}
    </div>
  );
}

export default PayeeTypeListing;

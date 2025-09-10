import React, { useState } from "react";
import { useTable, useSortBy } from "react-table";
import doubleArrow from "../../assets/doubleerrow.svg";
import singleArrow from "../../assets/singleerrow.svg";
import nextArrow from "../../assets/nexterrow.svg";
import lastArrow from "../../assets/lasterrow.svg";
import Dropdown from "../../components/PaginationDropdown/Dropdown";
import updownarrow from "../../assets/group-up-down-arrow.svg";
import DescriptionCell from "./DescriptionCell";
import { downArrow, upArrow } from "../../utils/constant/image";

const MyTable = ({
  columns,
  data,
  page,
  pageSize,
  setPage,
  setPageSize,
  totalCount,
  pagination,
  columnToOrderByProperty,
  orderBy,
  setOrderBy,
  orderByProperty,
  setOrderByProperty,
  seeMoreColumns = [],
}) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  const totalPages = Math.ceil(totalCount / pageSize);
  const [selectedRows, setSelectedRows] = useState([]);
  const allSelected = selectedRows.length === rows.length && rows.length > 0;

  const handleFirstPage = () => setPage(1);
  const handleLastPage = () => setPage(totalPages);
  const handleNextPage = () => setPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  const handlePageSizeChange = (selected) => {
    setPageSize(Number(selected.value));
    setPage(1);
  };

  return (
  <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-md bg-white">
  <table
    {...getTableProps()}
    className="w-full text-md text-left text-gray-700"
  >

        {/* ===== Table Header ===== */}
        <thead className="sticky top-0 bg-gray-50 border-b border-gray-200 shadow-sm z-10">
          {headerGroups.map((headerGroup, index) => (
            <tr key={index} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
               <th
  {...column.getHeaderProps()}
  onClick={() => {
    if (columnToOrderByProperty) {
      const property = columnToOrderByProperty[column.id];
      if (property) {
        const isAsc =
          orderBy === "Ascending" && orderByProperty === property;
        setOrderBy(isAsc ? "Descending" : "Ascending");
        setOrderByProperty(property);
      }
    }
  }}
  className={`px-6 py-4 text-md font-semibold text-gray-700 uppercase tracking-wider 
    cursor-pointer select-none group whitespace-nowrap`}
>
  <div className="flex items-center gap-2">
    {column.render("Header")}
    {column.id !== "actions" && (
      <img
        className="w-3 h-3 opacity-50 group-hover:opacity-100 transition"
        src={
          columnToOrderByProperty &&
          columnToOrderByProperty[column.id] === orderByProperty
            ? orderBy === "Ascending"
              ? upArrow
              : downArrow
            : updownarrow
        }
        alt="Sort Icon"
      />
    )}
  </div>
</th>

              ))}
            </tr>
          ))}
        </thead>

        {/* ===== Table Body ===== */}
        {/* ===== Table Body ===== */}
<tbody {...getTableBodyProps()}>
  {rows.length === 0 ? (
    <tr>
      <td
        colSpan={columns.length}
        className="py-10 text-center text-gray-400"
      >
        No data available
      </td>
    </tr>
  ) : (
    rows.map((row, rowIndex) => {
      prepareRow(row);
      return (
      <tr
  {...row.getRowProps()}
  className={`border-b last:border-none transition 
    ${rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"} 
    hover:bg-gray-100/70`}
>
  {row.cells.map((cell) => {
    const value =
      cell.value !== undefined && cell.value !== null
        ? cell.render("Cell")
        : cell.column.Header.toLowerCase() === "actions"
        ? cell.render("Cell")
        : "-";

    return (
      <td
        {...cell.getCellProps()}
        className="px-6 py-4 text-lg text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis max-w-[520px]"
        title={typeof cell.value === "string" ? cell.value : ""}
      >
        {value}
      </td>
    );
  })}
</tr>

      );
    })
  )}
</tbody>

      </table>

      {/* ===== Pagination Bar ===== */}
      {pagination && (
        <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <span className="text-md text-gray-700">Items per page:</span>
            <Dropdown
              items={[
                { label: "5", value: 5 },
                { label: "10", value: 10 },
                { label: "20", value: 20 },
                { label: "30", value: 30 },
                { label: "50", value: 50 },
              ]}
              initialValue={{ label: String(pageSize), value: pageSize }}
              onSelect={handlePageSizeChange}
              className="w-[80px]"
            />
          </div>

          <span className="text-md text-gray-600">
            {(page - 1) * pageSize + 1} -{" "}
            {Math.min(page * pageSize, totalCount)} of {totalCount}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleFirstPage}
              disabled={page === 1}
              className="p-2 rounded hover:bg-gray-200 disabled:opacity-50"
            >
              <img src={doubleArrow} alt="First" className="w-4 h-4" />
            </button>
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className="p-2 rounded hover:bg-gray-200 disabled:opacity-50"
            >
              <img src={singleArrow} alt="Previous" className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextPage}
              disabled={page === totalPages}
              className="p-2 rounded hover:bg-gray-200 disabled:opacity-50"
            >
              <img src={nextArrow} alt="Next" className="w-4 h-4" />
            </button>
            <button
              onClick={handleLastPage}
              disabled={page === totalPages}
              className="p-2 rounded hover:bg-gray-200 disabled:opacity-50"
            >
              <img src={lastArrow} alt="Last" className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTable;

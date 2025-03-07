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
  columnToOrderByProperty, // Optional prop for mapping column IDs to backend properties
  orderBy, // Current sorting order ('Ascending' or 'Descending')
  setOrderBy, // Function to update the sorting order
  orderByProperty, // Current backend property used for sorting
  setOrderByProperty, // Function to update the backend property for sorting
  seeMoreColumns = [],
}) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  const totalPages = Math.ceil(totalCount / pageSize);

  const handleFirstPage = () => setPage(1);
  const handleLastPage = () => setPage(totalPages);
  const handleNextPage = () =>
    setPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  const handlePageSizeChange = (selected) => {
    setPageSize(Number(selected.value));
    setPage(1);
  };

  const [selectedRows, setSelectedRows] = useState([]);
  const allSelected = selectedRows.length === rows.length && rows.length > 0;

  return (
    <>
      <div className="table-height">
        <table
          {...getTableProps()}
          className="w-full text-sm text-left rtl:text-right text-gray-500"
        >
          <thead className="sticky top-0 text-xs text-gray-700 uppercase bg-[#f8f8f8]">
            {headerGroups.map((headerGroup, index) => (
              <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className={` ${
                      column.id === "name" && column.id === "#"
                        ? "w-[65px]"
                        : ""
                    } py-3 text-[14px] text-[#1E1E1E] opacity-[0.5] font-[600] cursor-pointer`}
                    onClick={() => {
                      // Apply sorting logic only if columnToOrderByProperty is provided
                      if (columnToOrderByProperty) {
                        const property = columnToOrderByProperty[column.id]; // Map column ID to backend property
                        if (property) {
                          const isAsc =
                            orderBy === "Ascending" &&
                            orderByProperty === property;
                          setOrderBy(isAsc ? "Descending" : "Ascending");
                          setOrderByProperty(property); // Update backend property
                        }
                      }
                    }}
                  >
                    <div className="flex normal-case flex-nowrap px-4">
                      {column.render("Header")}

                      {column.id !== "actions" && ( // Skip rendering the sort icon for the "Actions" column
                        <img
                          className="pl-3"
                          src={
                            columnToOrderByProperty &&
                            columnToOrderByProperty[column.id] ===
                              orderByProperty
                              ? orderBy === "Ascending"
                                ? upArrow // Ascending icon
                                : downArrow // Descending icon
                              : updownarrow // Default up-down icon
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
          <tbody {...getTableBodyProps()} className="bg-[#FFFFFF]">
            {rows.map((row) => {
              prepareRow(row);
              const isSelected = selectedRows.includes(row.id);

              return (
                <tr {...row.getRowProps()} className="border-b">
                  {row.cells.map((cell) => {
                    if (
                      cell.column.Header.toLowerCase() === "description" ||
                      seeMoreColumns.includes(cell.column.Header)
                    ) {
                      // Custom rendering for the description cell
                      return (
                        <td
                          {...cell.getCellProps()}
                          className="py-4 text-[14px] text-[#1E1E1E] min-w-[150px] w-[150px] px-4"
                        >
                          <DescriptionCell content={cell.value} />
                        </td>
                      );
                    }
                    return (
                      <td
                        {...cell.getCellProps()}
                        className={`px-0 py-4 text-[14px] text-[#1E1E1E] px-4`}
                      >
                        {cell.value !== undefined && cell.value !== null
                          ? cell.render("Cell")
                          : cell.column.Header.toLowerCase() === "actions"
                          ? cell.render("Cell")
                          : "-"}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        {pagination && (
          <div className="self-end flex-wrap mt-16 pr-10 pb-2 sticky bottom-0 bg-white flex items-center justify-end gap-8">
            <div className="flex items-center gap-4 whitespace-nowrap">
              <span className="text-[13px] text-[#000000]">
                Items per page:
              </span>
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
                className="w-[76px]"
              />
            </div>
            <span className="text-[13px] text-[#000000] whitespace-nowrap">
              {(page - 1) * pageSize + 1} -{" "}
              {Math.min(page * pageSize, totalCount)} of {totalCount}
            </span>
            <div className="flex items-center gap-7">
              <button
                onClick={handleFirstPage}
                disabled={page === 1}
                className="disabled:opacity-50"
              >
                <img src={doubleArrow} alt="First Page" />
              </button>
              <button
                onClick={handlePrevPage}
                disabled={page === 1}
                className="disabled:opacity-50"
              >
                <img src={singleArrow} alt="Previous Page" />
              </button>
              <button
                onClick={handleNextPage}
                disabled={page === totalPages}
                className="disabled:opacity-50"
              >
                <img src={nextArrow} alt="Next Page" />
              </button>
              <button
                onClick={handleLastPage}
                disabled={page === totalPages}
                className="disabled:opacity-50"
              >
                <img src={lastArrow} alt="Last Page" />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MyTable;

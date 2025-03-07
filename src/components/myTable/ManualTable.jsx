import { useTable } from "react-table";

const ManualTable = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  return (
    <>
      <div className="table-height">
        <table
          {...getTableProps()}
          className="w-full text-sm text-left rtl:text-right text-gray-500"
        >
          <thead className="sticky top-0 text-xs text-gray-700 bg-[#f8f8f8]">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    key={index}
                    {...column.getHeaderProps()}
                    className="px-4 py-3 text-[14px] text-[#1E1E1E] opacity-[0.5] font-[600]"
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-[#FFFFFF]" {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr className="border-b" {...row.getRowProps()}>
                  {row.cells.map((cell, index) => (
                    <td
                      key={index}
                      {...cell.getCellProps()}
                      className={`px-4 py-4 text-[14px] text-[#1E1E1E]`}
                    >
                      {cell.value
                        ? cell.render("Cell")
                        : cell.column.Header.toLowerCase() === "actions"
                        ? cell.render("Cell")
                        : "-"}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManualTable;

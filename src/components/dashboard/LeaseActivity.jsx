import React from 'react'
import MyTable from '../myTable/MyTable'

const LeaseActivity = ({columns, data, page, pageSize, setPage, setPageSize}) => {
  return (
    <div className="w-full bg-white border border-[#0000001A] drop-shadow-sm rounded-lg">
          {/* Card Heading & View All Button */}
          <div className="flex p-4 justify-between items-center">
            <span className="font-semibold text-[19px]">Lease Activity</span>

            {/* View All Button */}
            <button className="flex justify-center font-medium drop-shadow-sm items-center gap-[10px] h-max text-nowrap rounded-[10px] bg-white border border-[#0000001A] p-2.5 py-1.5 text-[14px] text-[#1E1E1E] hover:bg-custom-gradient-green hover:text-white group">
              View All
            </button>
          </div>

          <div className="table-height mt-3">
            <MyTable
              columns={columns}
              data={data}
              page={page}
              pageSize={pageSize}
              setPage={setPage}
              setPageSize={setPageSize}
              totalCount={10}
              pagination={true}
            />
          </div>
        </div>
  )
}

export default LeaseActivity
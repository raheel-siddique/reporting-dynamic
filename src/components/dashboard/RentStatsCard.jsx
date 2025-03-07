import React from "react";

const RentStatsCard = ({ stat }) => {
  return (
    <div className="w-full p-4 bg-white border border-[#0000001A] drop-shadow-sm rounded-lg">
      {/* Card Heading & Export Button */}
      <div className="flex justify-between items-center">
        <span className="font-semibold mt-2 ms-1 text-[19px]">{name}</span>

        {/* Export Button */}
        <button className="flex font-medium justify-center drop-shadow-sm items-center gap-[10px] h-max text-nowrap rounded-[10px] bg-white border border-[#0000001A] p-2.5 py-1.5 text-[14px] text-[#1E1E1E] hover:bg-custom-gradient-green hover:text-white group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15.921"
            height="17.5"
            viewBox="0 0 15.921 17.5"
          >
            <g
              id="Group_145"
              data-name="Group 145"
              transform="translate(-2130.25 319.75)"
            >
              <path
                id="Path_112"
                data-name="Path 112"
                d="M14,3V6.556a.889.889,0,0,0,.889.889h3.556"
                transform="translate(2125.889 -322)"
                fill="none"
                className="group-hover:stroke-white stroke-[#1e1e1e]"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              />
              <path
                id="Path_113"
                data-name="Path 113"
                d="M5,11V4.778A1.778,1.778,0,0,1,6.778,3H13l4.444,4.444V11"
                transform="translate(2126.889 -322)"
                fill="none"
                className="group-hover:stroke-white stroke-[#1e1e1e]"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              />
              <path
                id="Path_114"
                data-name="Path 114"
                d="M6.667,16.333a1.333,1.333,0,1,0-2.667,0V19a1.333,1.333,0,0,0,2.667,0"
                transform="translate(2127 -323.333)"
                fill="none"
                className="group-hover:stroke-white stroke-[#1e1e1e]"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              />
              <path
                id="Path_115"
                data-name="Path 115"
                d="M10,19.667a.667.667,0,0,0,.667.667h1.111a.889.889,0,0,0,.889-.889v-.889a.889.889,0,0,0-.889-.889h-.889A.889.889,0,0,1,10,16.778v-.889A.889.889,0,0,1,10.889,15H12a.667.667,0,0,1,.667.667"
                transform="translate(2126.333 -323.333)"
                fill="none"
                className="group-hover:stroke-white stroke-[#1e1e1e]"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              />
              <path
                id="Path_116"
                data-name="Path 116"
                d="M16,15l1.778,5.333L19.556,15"
                transform="translate(2125.667 -323.333)"
                fill="none"
                className="group-hover:stroke-white stroke-[#1e1e1e]"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              />
            </g>
          </svg>
          Export
        </button>
      </div>

      <div className="w-full ">
        {/* Revenue Heading And Value Section */}

        {stat &&
          stat.map((building) => (
            <>
              <div className="flex justify-between ps-1 items-center">
                <span className="font-semibold mt-2 text-[19px]">
                  {building.buildingName}
                </span>
              </div>
              <div className="mt-1 mb-4 w-full rounded-lg border border-dashed border-[#0000001A] p-2">
                <div className="grid mt-4 lg:grid-cols-2 gap-4">
                  <div className="flex flex-col w-full border-r-2">
                    <div className="flex items-center gap-1">
                      <span className="h-[13px] w-[13px] block bg-white border-[#23ae24] rounded-full border-[3px]"></span>
                      <span className="text-[#23ae24] text-[13px]">
                        Total Acutal Rent
                      </span>
                    </div>
                    <span className="text-[16px] font-semibold">
                      AED {building.totalActualRent}
                    </span>
                  </div>

                  <div className="flex flex-col w-full">
                    <div className="flex items-center gap-1">
                      <span className="h-[13px] w-[13px] block bg-white border-[#777777] rounded-full border-[3px]"></span>
                      <span className="text-[#777777] text-[13px]">
                        Total Contract Rent
                      </span>
                    </div>
                    <span className="text-[16px] font-semibold">
                      AED {building.totalContractRent}
                    </span>
                  </div>
                </div>
              </div>
            </>
          ))}
      </div>
    </div>
  );
};

export default RentStatsCard;

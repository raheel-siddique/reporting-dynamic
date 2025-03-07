import React from "react";

const TotalTenants = ({stat}) => {
  return (
    <div className="w-full h-[70px] flex justify-between items-center px-4 bg-white border border-[#0000001A] drop-shadow-sm rounded-lg">
      {/* Svg Icon and Mini Stats Name Section */}
      <div className="flex gap-2 items-center">
        <div className="flex justify-center items-center h-[30px] w-[30px] rounded-lg border border-[#0000001A] drop-shadow-sm bg-white">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15.5"
            height="15.5"
            viewBox="0 0 15.5 15.5"
          >
            <g
              id="Group_23382"
              data-name="Group 23382"
              transform="translate(-151.25 -259.25)"
            >
              <path
                id="Path_13"
                data-name="Path 13"
                d="M13.543,3.656l2.8,2.8a2.238,2.238,0,0,1,0,3.165l-2.056,2.056a2.238,2.238,0,0,1-3.165,0l-.234-.234-5.1,5.1a1.556,1.556,0,0,1-.964.45L4.689,17H3.778a.778.778,0,0,1-.772-.687L3,16.222v-.912a1.556,1.556,0,0,1,.363-1l.093-.1.322-.322H5.333V12.333H6.889V10.778L8.557,9.11l-.234-.234a2.238,2.238,0,0,1,0-3.165l2.056-2.056a2.238,2.238,0,0,1,3.165,0Z"
                transform="translate(149 257)"
                fill="none"
                stroke="#1e1e1e"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              />
              <path
                id="Path_14"
                data-name="Path 14"
                d="M15,9h.008"
                transform="translate(146.333 255.667)"
                fill="none"
                stroke="#1e1e1e"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              />
            </g>
          </svg>
        </div>
        <h4 className="text-[16px]">{stat.name}</h4>
      </div>

      {/* Mini Stats Up And Down Arrow, profit or loss rate and according to their background color Section  */}
      <div className="flex gap-2 items-center">
        <span className="text-[19px] font-semibold">{stat.value}</span>

        <div
          className={`${
            stat.is_profit ? "bg-[#e9f7e9]" : "bg-[#fbe9e9]"
          } h-[17px] gap-1 flex items-center px-1`}
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14.121"
              height="8.899"
              viewBox="0 0 16.121 9.899"
              className={stat.is_profit ? "" : "rotate-180 flip-x"}
            >
              <g
                id="Group_23390"
                data-name="Group 23390"
                transform="translate(-217.939 -313.939)"
              >
                <path
                  id="Path_38381"
                  data-name="Path 38381"
                  d="M3,14.778l4.667-4.667,3.111,3.111L17,7"
                  transform="translate(216 308)"
                  fill="none"
                  stroke={stat.is_profit ? "#23ae24" : "#ff0000"}
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
                <path
                  id="Path_38382"
                  data-name="Path_38382"
                  d="M14,7h5.444v5.444"
                  transform="translate(213.556 308)"
                  fill="none"
                  stroke={stat.is_profit ? "#23ae24" : "#ff0000"}
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
              </g>
            </svg>
          </span>

          <span
            className={`${
              stat.is_profit ? "text-[#35b536]" : "text-[#d82323]"
            } text-[12px]`}
          >
            {(stat.is_profit ? "+" : "-") + stat.rate + "%"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TotalTenants;

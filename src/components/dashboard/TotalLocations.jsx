import React from 'react'

const TotalLocations = ({stat}) => {
  return (
    <div className="w-full h-[70px] flex justify-between items-center px-4 bg-white border border-[#0000001A] drop-shadow-sm rounded-lg">
      {/* Svg Icon and Mini Stats Name Section */}
      <div className="flex gap-2 items-center">
        <div className="flex justify-center items-center h-[30px] w-[30px] rounded-lg border border-[#0000001A] drop-shadow-sm bg-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="13.618"
          height="15.637"
          viewBox="0 0 13.618 15.637"
        >
          <g
            id="Group_23385"
            data-name="Group 23385"
            transform="translate(-291.25 -307.25)"
          >
            <path
              id="Path_38278"
              data-name="Path 38278"
              d="M9,10.1A2.1,2.1,0,1,0,11.1,8,2.1,2.1,0,0,0,9,10.1"
              transform="translate(286.959 303.925)"
              fill="none"
              stroke="#1e1e1e"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
            />
            <path
              id="Path_38279"
              data-name="Path 38279"
              d="M14.344,13.344,11.13,16.557a1.515,1.515,0,0,1-2.141,0L5.775,13.344a6.059,6.059,0,1,1,8.569,0Z"
              transform="translate(288 305)"
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
  )
}

export default TotalLocations
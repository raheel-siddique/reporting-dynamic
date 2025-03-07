import React from "react";

const TotalBuildings = ({ stat }) => {
  return (
    <div className="w-full h-[70px] flex justify-between items-center px-4 bg-white border border-[#0000001A] drop-shadow-sm rounded-lg">
      {/* Svg Icon and Mini Stats Name Section */}
      <div className="flex gap-2 items-center">
        <div className="flex justify-center items-center h-[30px] w-[30px] rounded-lg border border-[#0000001A] drop-shadow-sm bg-white">
          
          <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15.5"
                    height="14.722"
                    viewBox="0 0 15.5 14.722"
                  >
                    <g
                      id="Group_23387"
                      data-name="Group 23387"
                      transform="translate(-712.25 -289.25)"
                    >
                      <path
                        id="Path_38354"
                        data-name="Path 38354"
                        d="M4,17.222V5.556A1.673,1.673,0,0,1,5.556,4H9.444A1.673,1.673,0,0,1,11,5.556V17.222"
                        transform="translate(709.778 286)"
                        fill="none"
                        stroke="#1e1e1e"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                      />
                      <path
                        id="Path_38355"
                        data-name="Path 38355"
                        d="M16,8h1.556a1.673,1.673,0,0,1,1.556,1.556v8.556"
                        transform="translate(707.111 285.111)"
                        fill="none"
                        stroke="#1e1e1e"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                      />
                      <path
                        id="Path_38356"
                        data-name="Path 38356"
                        d="M3,21H17"
                        transform="translate(710 282.222)"
                        fill="none"
                        stroke="#1e1e1e"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                      />
                      <path
                        id="Path_38357"
                        data-name="Path 38357"
                        d="M10,12h0"
                        transform="translate(708.444 284.222)"
                        fill="none"
                        stroke="#1e1e1e"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                      />
                      <path
                        id="Path_38358"
                        data-name="Path 38358"
                        d="M10,16h0"
                        transform="translate(708.444 283.333)"
                        fill="none"
                        stroke="#1e1e1e"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                      />
                      <path
                        id="Path_38359"
                        data-name="Path 38359"
                        d="M10,8h0"
                        transform="translate(708.444 285.111)"
                        fill="none"
                        stroke="#1e1e1e"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                      />
                      <path
                        id="Path_38360"
                        data-name="Path 38360"
                        d="M7,12H7"
                        transform="translate(709.111 284.222)"
                        fill="none"
                        stroke="#1e1e1e"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                      />
                      <path
                        id="Path_38361"
                        data-name="Path 38361"
                        d="M7,16H7"
                        transform="translate(709.111 283.333)"
                        fill="none"
                        stroke="#1e1e1e"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                      />
                      <path
                        id="Path_38362"
                        data-name="Path 38362"
                        d="M7,8H7"
                        transform="translate(709.111 285.111)"
                        fill="none"
                        stroke="#1e1e1e"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                      />
                      <path
                        id="Path_38363"
                        data-name="Path 38363"
                        d="M17,12h0"
                        transform="translate(706.889 284.222)"
                        fill="none"
                        stroke="#1e1e1e"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                      />
                      <path
                        id="Path_38364"
                        data-name="Path 38364"
                        d="M17,16h0"
                        transform="translate(706.889 283.333)"
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

export default TotalBuildings;

import React from "react";

const PlusIcon = ({ className = "", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15.5"
    height="15.5"
    viewBox="0 0 15.5 15.5"
    className={className}
    {...props}
  >
    <g
      id="Group_23168"
      data-name="Group 23168"
      transform="translate(-1103.25 -12.25)"
    >
      <path
        id="Path_38297"
        data-name="Path 38297"
        d="M12,5V19"
        transform="translate(1099 8)"
        fill="none"
        className="group-hover:stroke-white stroke-[#1E1E1E]"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        id="Path_38298"
        data-name="Path 38298"
        d="M5,12H19"
        transform="translate(1099 8)"
        fill="none"
        className="group-hover:stroke-white stroke-[#1E1E1E]"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </g>
  </svg>
);

export default PlusIcon;

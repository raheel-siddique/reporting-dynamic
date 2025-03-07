import React from "react";

export const CustomDropdown = ({
  defaultSelectedOptionText,
  optionsData,
  onChange,
  defaultSelectedOptionValue = null,
  isdefaultOption = true,
}) => {
  return (
    <select
      className="w-[170px] px-3 py-1.5 rounded-lg select-sm border border-custom-gray hover:border-custom-green text-black placeholder:text-[#959595] focus-visible:outline-custom-green placeholder:text-[14px] text-[14px]"
      onChange={(e) => onChange(e)}
      value={defaultSelectedOptionValue}
    >
      {isdefaultOption && (
        <option value={null}>{defaultSelectedOptionText}</option>
      )}
      {optionsData &&
        optionsData.length > 0 &&
        optionsData.map((data, index) => (
          <option key={index} value={data.id}>
            {data.name}
          </option>
        ))}
    </select>
  );
};

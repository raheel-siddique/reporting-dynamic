import React, { useState } from "react";
import PropTypes from "prop-types";

function Dropdownfield({
  label,
  items = [],
  onSelect,
  placeholder = "Select options",
  className,
  initialValue = [],
  style,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState(initialValue);

  const handleSelect = (item) => {
    const isSelected = selectedItems.some(
      (selectedItem) => selectedItem.label === item.label
    );
    let updatedSelectedItems;

    if (isSelected) {
      updatedSelectedItems = selectedItems.filter(
        (selectedItem) => selectedItem.label !== item.label
      );
    } else {
      updatedSelectedItems = [...selectedItems, item];
    }

    setSelectedItems(updatedSelectedItems);
    if (onSelect) onSelect(updatedSelectedItems);
  };

  return (
    <div className={`relative w-full top-1 ${className}`}>
      {label && (
        <label className={`block text-[13px] text-[#1E1E1E]  ${style}`}>
          {label}
        </label>
      )}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className={`w-full mt-[10px] select-m p-3 rounded-lg border border-[#1E1E1E1A] hover:border-custom-green text-black placeholder:text-[#959595] focus-visible:outline-custom-green placeholder:text-[14px] text-[14px] relative`}
      >
        <span className="text-[14px] flex text-[#1E1E1E]">
          {selectedItems.length > 0
            ? `${selectedItems.length} ${
                selectedItems.length > 1 ? "items" : "item"
              } selected`
            : placeholder}
        </span>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-[14px] h-[18px] text-gray-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </button>

      {isDropdownOpen && (
        <div className="z-10 absolute right-0 mt-[10px] select-m w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          <ul className="py-1">
            {items.length === 0 ? (
              <li className="px-4 py-2 text-[12px] text-[#1E1E1E]">
                No options available
              </li>
            ) : (
              items.map((item, index) => (
                <li key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox ml-4 accent-[#00A383] border-gray-300 rounded"
                    checked={selectedItems.some(
                      (selectedItem) => selectedItem.label === item.label
                    )}
                    onChange={() => handleSelect(item)}
                  />
                  <p className="block px-4 py-2 text-[1.2rem] text-[#000000] hover:bg-gray-100">
                    {item.label}
                  </p>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

Dropdownfield.propTypes = {
  label: PropTypes.string,
  items: PropTypes.array.isRequired,
  onSelect: PropTypes.func,
  placeholder: PropTypes.string,
  initialValue: PropTypes.array,
  className: PropTypes.string,
  style: PropTypes.string,
};

Dropdownfield.defaultProps = {
  label: "",
  items: [],
  placeholder: "Select options",
  initialValue: [],
  onSelect: null,
  className: "",
  style: "",
};

export default Dropdownfield;

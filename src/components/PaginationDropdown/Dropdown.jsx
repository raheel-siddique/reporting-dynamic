import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import vector from "../../assets/vector.svg";

function Dropdown({ 
  label, 
  items = [], 
  onSelect, 
  placeholder = "Select an option", 
  className, 
  initialValue, 
  style 
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(initialValue || null);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      closeDropdown();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (item) => {
    setSelectedItem(item);
    setIsDropdownOpen(false);
    if (onSelect) onSelect(item);
  };

  return (
    <div ref={dropdownRef}  className={`relative w-full ${className}`} style={style}>
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">
          {label}
        </label>
      )}
      <button
        ref={dropdownRef}
        onClick={toggleDropdown}
        className="relative flex items-center justify-between px-4 py-2 w-full text-gray-700 border border-gray-300 rounded-lg bg-white "
      >
        <span className="text-sm">
          {selectedItem ? selectedItem.label : placeholder}
        </span>
        <img 
          src={vector} 
          alt="Dropdown icon" 
          className={`ml-2 w-[11px] h-[8px] transform transition-transform ${
            isDropdownOpen ? "rotate-180" : "rotate-0"
          }`} 
        />
      </button>

      {isDropdownOpen && (
        <div className="z-10 absolute right-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg top-[-171px]">
          <ul className="py-1">
            {items.length === 0 ? (
              <li className="px-4 py-2 text-sm">
                No options available
              </li>
            ) : (
              items.map((item, index) => (
                <li
                  key={index}
                  className="block px-4 py-2 text-sm text-gray-700 dark:hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelect(item)}
                >
                  {item.label}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

Dropdown.propTypes = {
  label: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  onSelect: PropTypes.func,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  initialValue: PropTypes.object,
  style: PropTypes.object,
};

export default Dropdown;

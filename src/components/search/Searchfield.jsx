import React, { useState } from "react";
import { searchIcon } from "../../utils/constant/image";

function SearchField({
  placeholder = "Search...",
  searchQuery,
  handleSearchChange,
}) {
  return (
    <div>
      <form className="relative max-w-md flex-1">
        <label
          htmlFor="default-search"
          className="mb-2 pl-3 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
            <img src={searchIcon} />
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-[250px] px-[10px] py-[6px] ps-[40px] outline-none border rounded-lg border-[#1E1E1E1A] hover:border-[#23AE24] text-black placeholder:text-[#959595] placeholder:text-[14px] text-[14px]"
            placeholder={placeholder}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </form>
    </div>
  );
}

export default SearchField;

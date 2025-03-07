import React from "react";
import ReusableButton from "../form-elements/button/ReusableButton";

const ReusableModal = ({ title, description, onClose, onConfirm, ownFrom }) => {
  return (
    <div className="fixed top-0 bg-[#1E1E1E33] left-0 right-0 z-50 w-full p-3 overflow-x-hidden overflow-y-auto flex justify-center items-center h-screen">
      <div className="relative w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-4 border-b border-custom-gray rounded-t-[10px]">
            <div></div>
            <h3 className="text-base font-semibold text-[#1E1E1E]">{title}</h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-sm inline-flex justify-center items-centers"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-5">{ownFrom}</div>
          <div className="flex justify-center items-center p-4 gap-4 border-t border-custom-gray rounded-[10px]">
            <button
              type="button"
              onClick={onClose}
              className="text-sm w-[66px] border border-custom-gray text-[#1E1E1E] hover:text-white hover:bg-custom-gradient-red group cursor-pointer py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              type="button"
              className="text-sm w-[66px] cursor-pointer p-2 rounded-md border text-white bg-custom-gradient-green active:bg-custom-gradient-green"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReusableModal;

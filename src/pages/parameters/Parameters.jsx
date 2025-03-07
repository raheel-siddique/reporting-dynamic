import { useCallback, useEffect, useState } from "react";

import AddFlatTypeModal from "../../components/Parameters/AddFlatTypeModal";

import AddExpenseTypeModal from "../../components/Parameters/expense/AddExpenseTypeModal";
import ExpenseTypeListing from "./expense/ExpenseTypeListing";
import BankTypeListing from "./bank/BankTypeListing";
import { useBankType } from "../../hooks/useBankType";
import { parameterTypes } from "../../utils/format";
import AddBankTypeModal from "../../components/Parameters/bank/AddBankTypeModal";
import PayeeTypeListing from "./payee/PayeeTypeListing";
import { usePayee } from "../../hooks/usePayee";
import AddPayeeTypeModal from "../../components/Parameters/payee/AddPayeeTypeModal";
import FlatsTypeListing from "./FlatsTypeListing";
import { useDebounce } from "use-debounce";

const Parameters = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeType, setActiveType] = useState("Flat Type");
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const handleEdit = (data) => {
    setSelectedItem(data);
    openModal();
  };

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-[315px] h-full flex-col flex justify-between bg-white border-r-[1px] border-br-border">
        <div className="flex flex-col gap-3 scroll calc-height py-[20px] px-[15px] pr-[10px]">
          {parameterTypes.map((parameter) => (
            <div
              key={parameter.id}
              onClick={() => {
                setActiveType(parameter.name);
              }}
              className={`group flex gap-3 justify-between items-center cursor-pointer py-1.5 px-3 rounded-md ${
                activeType === parameter.name
                  ? "bg-custom-gradient-green text-white"
                  : "hover:bg-custom-gradient-green"
              }`}
            >
              <span className="group-hover:text-white"> {parameter.name} </span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-5 w-full wrapper-height">
        <div className="my-4 flex items-center justify-end">
          <button
            onClick={openModal}
            className="flex gap-3 text-nowrap justify-between items-center cursor-pointer p-2.5 py-1.5 text-[14px] rounded-md border bg-custom-gradient-green active:bg-custom-gradient-green"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15.5"
              height="15.5"
              viewBox="0 0 15.5 15.5"
            >
              <g transform="translate(-1103.25 -12.25)">
                <path
                  d="M12,5V19"
                  transform="translate(1099 8)"
                  fill="none"
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
                <path
                  d="M5,12H19"
                  transform="translate(1099 8)"
                  fill="none"
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </g>
            </svg>
            <h2 className="text-[14px] text-white">Add {activeType}</h2>
          </button>
        </div>

        {showModal && activeType === "Flat Type" && (
          <AddFlatTypeModal
            onClose={closeModal}
            selectedFlatType={selectedItem}
          />
        )}

        {showModal && activeType === "Expense Type" && (
          <AddExpenseTypeModal
            onClose={closeModal}
            selectedFlatType={selectedItem}
          />
        )}

        {showModal && activeType === "Bank Name" && (
          <AddBankTypeModal
            onClose={closeModal}
            selectedFlatType={selectedItem}
          />
        )}

        {showModal && activeType === "Payee" && (
          <AddPayeeTypeModal
            onClose={closeModal}
            selectedFlatType={selectedItem}
          />
        )}

        {/* Render table based on selected type */}
        {activeType == "Flat Type" && (
          <FlatsTypeListing handleEdit={handleEdit} />
        )}
        {activeType == "Expense Type" && (
          <ExpenseTypeListing handleEdit={handleEdit} />
        )}

        {activeType == "Bank Name" && (
          <BankTypeListing handleEdit={handleEdit} />
        )}

        {activeType == "Payee" && <PayeeTypeListing handleEdit={handleEdit} />}
      </div>
    </div>
  );
};

export default Parameters;

import React from "react";
import { googleIcon } from "../../../utils/constant/image";

function ReusableButton({
  btnText,
  bgColor = "",
  ownStyle,
  onClick,
  showGoogleIcon = false,
  isLoading = false, // New prop for loader state
  className = "",
  disabled = false, // New prop for button disabled state
}) {
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={disabled || isLoading} // Disable button if loading or explicitly disabled
      className={`flex items-center justify-center gap-2 text-[#242424] text-center font-semibold md:py-3 pl-[1rem] pr-[1rem] py-1  md:px-4 md:pt-[0.4rem] md:pb-[0.4rem] text-[14px] md:text-[14px] tracking-[0px] opacity-100 shadow-[0px_0px_10px_rgba(0,0,0,0.03)] rounded-[21px] transition-transform duration-200 ease-in-out transform ${
        disabled || isLoading ? "opacity-50 cursor-not-allowed" : "hover:scale-105 hover:shadow-lg"
      } ${bgColor} ${ownStyle}`}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="loader w-4 h-4 border-2 border-t-transparent border-gray-500 rounded-full animate-spin"></div>
          <span>Processing...</span>
        </div>
      ) : (
        <>
          {showGoogleIcon && <img src={googleIcon} alt="Google Icon" />}
          {btnText}
        </>
      )}
    </button>
  );
}

export default ReusableButton;

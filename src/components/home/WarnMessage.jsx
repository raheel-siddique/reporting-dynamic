import { warnIcon } from "@/utils/constant/image";
import React, { useState, useEffect } from "react";
import  remove  from "../../assets/remove.svg";
const WarnMessage = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check sessionStorage to determine visibility
    const dismissed = sessionStorage.getItem("warnMessageDismissed");
    setIsVisible(dismissed !== "true"); // If not dismissed, show the warning
  }, []);

  const handleDismiss = () => {
    setIsVisible(false); // Hide the warning
    sessionStorage.setItem("warnMessageDismissed", "true"); // Mark as dismissed in sessionStorage
  };

  if (!isVisible) return null; // Don't render if dismissed

  return (
    <div className="absolute top-4 warn-sec w-[calc(100%-2rem)] max-w-[400px] mx-auto left-0 right-0">
      <div className="flex items-center gap-2 bg-[#FFA8A5] shadow-md rounded-[18px] px-3 py-2 relative">
        <img
          width={18}
          height={18}
          src={warnIcon}
          alt="Warning"
          className="cursor-pointer"
        />
        <h1 className="text-[#242424] font-normal text-[10px] md:text-[13px] leading-[20px] flex-1">
          hyder.ai can make mistakes as it is still in training mode.
        </h1>
        <button
          onClick={handleDismiss}
          className="absolute top-1/2 right-[1rem] transform -translate-y-1/2 text-[#242424] text-lg font-bold hover:text-[#000]"
        >
          <img src={remove}/>
        </button>
      </div>
    </div>
  );
};

export default WarnMessage;

import React, { useState } from "react";
import { createPortal } from "react-dom";

const Tooltip = ({ text, children, position = "top" }) => {
  const [coords, setCoords] = useState(null);

  return (
    <div
      className="relative flex items-center group"
      onMouseEnter={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setCoords({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
          height: rect.height,
        });
      }}
      onMouseLeave={() => setCoords(null)}
    >
      {children}

      {coords &&
        createPortal(
          <div
            className="btn-gradient-green z-50 px-3 py-2 text-xs text-white bg-gray-800 rounded-lg shadow-md transition-opacity duration-300"
            style={{
              top:
                position === "top"
                  ? coords.top - 40
                  : position === "bottom"
                  ? coords.top + coords.height + 5
                  : coords.top + coords.height / 2, // Center vertically for right

              left:
                position === "right"
                  ? coords.left + coords.width - 10 // Tooltip appears to the right
                  : coords.left + coords.width / 2, // Default center horizontally

              transform:
                position === "right"
                  ? "translateY(-50%)" // Adjust for right positioning
                  : "translateX(-50%)",

              position: "absolute",
              whiteSpace: "nowrap",
            }}
          >
            {text}
          </div>,
          document.body
        )}
    </div>
  );
};

export default Tooltip;

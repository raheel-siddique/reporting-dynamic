import React, { useState } from "react";

const DescriptionCell = ({ content }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpansion = () => setIsExpanded(!isExpanded);

  const maxLength = 15; // Set the maximum length of the description to display
  const displayContent = content?.trim() || "-"; // Default to "-" if content is empty or only whitespace

  return (
    <div>
      <p className={`text-sm text-gray-600 ${displayContent.trim() === '-' ? 'text-center' : ''}`}>
        {isExpanded
          ? displayContent
          : displayContent.length > maxLength
          ? `${displayContent.slice(0, maxLength)}...`
          : displayContent}
      </p>
      {displayContent.length > maxLength && (
        <button
          onClick={toggleExpansion}
          className="mt-1 text-blue-500 hover:underline text-xs"
        >
          {isExpanded ? "See Less" : "See More"}
        </button>
      )}
    </div>
  );
};

export default DescriptionCell;

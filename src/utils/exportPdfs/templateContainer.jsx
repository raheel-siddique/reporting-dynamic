import React from "react";
import ExpenseReceiptTemplate from "./templates/ExpenseTemplate";

const TemplateContainer = ({ templatetype, data }) => {
  return (
    <div
      style={{ visibility: "visible", position: "absolute", top: "-9999px" }}
    >
      {templatetype === "Expense" ? (
        <div id="hidden-template-container">
          <ExpenseReceiptTemplate
            data={data}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default TemplateContainer;

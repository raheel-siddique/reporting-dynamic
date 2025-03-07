import React from "react";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

function DatePickerField({
  field = {}, // Default to empty object if field is not provided
  form,
  labelClassName = "",
  label,
  className,
  formInput = true,
  onDateChange,
  dateValue = null,
  minDate = null, // Add minDate prop
  maxDate = null, // Add maxDate prop
  readOnly = false,
  showDisabledClasses = false,
}) {
  const { name, value } = field; // Access field name and value from Formik (if provided)

  const handleChange = (date) => {
    if (name && form) {
      form.setFieldValue(name, date); // Update Formik state
      form.setFieldTouched(name, true); // Mark the field as touched

      // Only modify the endDate if it's a startDate field and the value is valid
      if (name.includes("startDate") && date) {
        const index = name.split(".")[1]; // Extract index from field name (leases.0.startDate -> 0)
        const endDateField = `leases.${index}.endDate`; // Construct the endDate field name using the index
        const endDate = new Date(date);

        endDate.setFullYear(endDate.getFullYear() + 1); // Add 1 year first
        endDate.setDate(endDate.getDate() - 1); // Subtract 1 day

        // Set the corresponding endDate field
        form.setFieldValue(endDateField, endDate);
      }
    }
  };

  return (
    <div>
      {label && (
        <label
          className={`block text-[13px] text-[#1E1E1E] mt-[3px] ${labelClassName}`}
        >
          {label}
        </label>
      )}
      <DatePicker
        onChange={formInput ? handleChange : onDateChange}
        value={value || dateValue || null} // Ensure the value is set correctly
        format="dd-MM-yyyy"
        minDate={minDate} // Set minimum selectable date
        maxDate={maxDate} // Set maximum selectable date
        className={`w-full mt-[10px] select-m p-3 py-2.5 rounded-lg border border-[#1E1E1E1A] hover:border-custom-green text-black placeholder:text-[#959595] focus-visible:outline-custom-green placeholder:text-[14px] text-[14px] relative ${
          readOnly && showDisabledClasses
            ? "!border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed"
            : ""
        } ${className}`}
        calendarIcon={
          !readOnly && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15.722"
              height="17.5"
              viewBox="0 0 15.722 17.5"
            >
              <g
                id="Group_23267"
                data-name="Group 23267"
                transform="translate(-404.25 -917.25)"
              >
                <path
                  id="Path_38314"
                  data-name="Path 38314"
                  d="M4,6.778A1.778,1.778,0,0,1,5.778,5H16.444a1.778,1.778,0,0,1,1.778,1.778V17.444a1.778,1.778,0,0,1-1.778,1.778H5.778A1.778,1.778,0,0,1,4,17.444Z"
                  transform="translate(401 914.778)"
                  fill="none"
                  stroke="#1e1e1e"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
                <path
                  id="Path_38315"
                  data-name="Path 38315"
                  d="M16,3V6.556"
                  transform="translate(399.667 915)"
                  fill="none"
                  stroke="#1e1e1e"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
                <path
                  id="Path_38316"
                  data-name="Path 38316"
                  d="M8,3V6.556"
                  transform="translate(400.556 915)"
                  fill="none"
                  stroke="#1e1e1e"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
                <path
                  id="Path_38317"
                  data-name="Path 38317"
                  d="M4,11H18.222"
                  transform="translate(401 914.111)"
                  fill="none"
                  stroke="#1e1e1e"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </g>
            </svg>
          )
        }
        clearIcon={
          readOnly || !value ? null : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4 text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )
        }
        disableCalendar={readOnly}
        // This prevents typing in the field
        onFocus={(e) => e.target.blur()}
      />
    </div>
  );
}

export default DatePickerField;

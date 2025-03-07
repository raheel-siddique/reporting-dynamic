import React from "react";
import Select, { components } from "react-select";

// Custom styles for flat status colors
const customStyles = {
  option: (provided, { data }) => ({
    ...provided,
    color: data.statusColor || "black", // Set text color based on the flat status
  }),
};

// Custom `Option` component for more control
const CustomOption = (props) => {
  const { data, children, innerRef, innerProps } = props;
  return (
    <div
      ref={innerRef}
      {...innerProps}
      style={{
        display: "flex",
        alignItems: "center",
        padding: "10px",
        color: data.statusColor || "black", // Color for text
      }}
    >
      {children}
    </div>
  );
};

export const CustomSelect = ({
  options,
  field,
  form,
  onCustomAction,
  isMulti = false, // Default is single select, set `isMulti` to true for multiple selection
  ...props
}) => {
  // Handling single or multiple selections
  const onChange = (selectedOption) => {
    if (isMulti) {
      // For multiple selection, save an array of values
      form.setFieldValue(
        field.name,
        selectedOption ? selectedOption.map((option) => option.value) : []
      );
    } else {
      // For single selection, save just one value
      form.setFieldValue(
        field.name,
        selectedOption ? selectedOption.value : ""
      );
    }
  };

  // Find the selected options for multiple selection
  const selectedOptions = isMulti
    ? options?.filter((option) => field.value.includes(option.value))
    : options?.find((option) => option.value === field.value);

  // Trigger your custom action to get the ID (this would be for single selection)
  if (onCustomAction && selectedOptions && !isMulti) {
    onCustomAction(selectedOptions.value); // Pass the ID to your custom handler
  }

  return (
    <Select
      options={options}
      value={selectedOptions || (isMulti ? [] : null)} // Handle selected options for multi or single
      onChange={onChange}
      className="react-select-container"
      classNamePrefix="react-select"
      placeholder="Select Option"
      isClearable
      isMulti={isMulti} // Set to true for multiple selection
      styles={customStyles} // Apply custom styles
      components={{ Option: CustomOption }} // Use the custom `Option` component
      {...props}
    />
  );
};

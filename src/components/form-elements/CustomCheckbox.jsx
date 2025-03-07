// Custom checkbox component for Formik
import { Field } from "formik";

const CustomCheckbox = ({ name, label, ...props }) => {
  return (
    <div className="flex items-center">
      {/* Field component to handle the checkbox */}
      <Field
        type="checkbox"
        name={name}
        className="w-4 h-4 cursor-pointer mr-2 accent-custom-green"
        {...props}
      />

      {/* Label */}
      <label htmlFor={name} className="text-[15px] text-[#1E1E1E] font-medium">
        {label}
      </label>
    </div>
  );
};

export default CustomCheckbox;

import { Field } from "formik";

const CustomRadioButtons = ({ name, options, label, className = "" }) => {
  return (
    <div className={`radio-group ${className}`}>
      {label && <label className="text-sm font-medium">{label}</label>}
      <div className="flex items-center gap-4 mt-2">
        {options.map((option) => (
          <label key={option.value} className="flex items-center gap-2">
            <Field
              type="radio"
              name={name}
              value={option.value}
              className="form-radio"
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default CustomRadioButtons;

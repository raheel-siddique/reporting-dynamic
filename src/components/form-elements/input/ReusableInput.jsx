import { Field } from "formik";

const ReusableInput = ({
  inpType,
  inpName,
  inpPlaceholder,
  readOnly = false,
  showDisabledClasses = true,
}) => {
  return (
    <Field
      type={inpType}
      name={inpName}
      placeholder={inpPlaceholder}
      readOnly={readOnly}
      className={`w-full mt-[10px] select-m p-3 rounded-lg border 
        ${
          readOnly && showDisabledClasses
            ? "!border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed"
            : "border-[#1E1E1E1A] hover:border-custom-green text-black focus-visible:outline-custom-green"
        } 
        placeholder:text-[#959595] placeholder:text-[14px] text-[14px]`}
    />
  );
};

export default ReusableInput;

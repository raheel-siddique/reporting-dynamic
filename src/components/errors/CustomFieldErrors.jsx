import { ErrorMessage } from "formik";

const CustomFieldErrors = ({ name }) => {
  return (
    <>
      <ErrorMessage
        name={name}
        component="p"
        className="text-red-500 text-sm mt-1"
      />
    </>
  );
};
export default CustomFieldErrors;

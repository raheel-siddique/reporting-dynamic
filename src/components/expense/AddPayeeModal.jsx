import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import ReusableInput from "../form-elements/input/ReusableInput";
// import { payeeSchema } from "../../schemas/expenseSchema";
import CustomFieldErrors from "../../components/errors/CustomFieldErrors";

const AddPayeeModal = ({ title, onClose, addPayeeMutation }) => {
  let initialValues = {
    name: "",
  };

  const handleSubmit = (formValues) => {
    try {
      addPayeeMutation([formValues]);
      onClose();
    } catch {
      console.log("error");
    }
  };

  const validationPayeeSchema = Yup.object().shape({
    name: Yup.string().required("payee is required"),
  });
  return (
    <div className="fixed top-0 bg-[#1E1E1E33] left-0 right-0 z-50 w-full p-3 overflow-x-hidden overflow-y-auto flex justify-center items-center h-screen">
      <div className="relative w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-4 border-b border-custom-gray rounded-t-[10px]">
            <div></div>
            <h3 className="text-base font-semibold text-[#1E1E1E]">{title}</h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-sm inline-flex justify-center items-center"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationPayeeSchema}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form>
                  <div>
                    <div className="p-5">
                      <label
                        htmlFor="payeeName"
                        className="text-[13px] text-[#1E1E1E] font-medium"
                      >
                        Payee Name
                      </label>

                      <ReusableInput
                        inpType="text"
                        inpName="name"
                        inpPlaceholder="Enter Payee"
                      />

                      <CustomFieldErrors name={"name"} />
                    </div>
                    <div className="p-5 flex justify-center items-center gap-4 border-t border-custom-gray rounded-[10px]">
                      <button
                        onClick={onClose}
                        type="button"
                        className="text-sm w-[66px] border border-custom-gray text-[#1E1E1E] hover:text-white hover:bg-custom-gradient-red group cursor-pointer py-2 rounded-md"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="text-sm w-[66px] cursor-pointer p-2 rounded-md border text-white bg-custom-gradient-green active:bg-custom-gradient-green"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPayeeModal;

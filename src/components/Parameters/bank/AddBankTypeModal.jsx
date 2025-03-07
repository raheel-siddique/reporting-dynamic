import { Formik, Form, Field, ErrorMessage } from "formik";
// import { useMyLocations } from "../../hooks/useMyLocations";

import * as Yup from "yup";
import ReusableInput from "../../../components/form-elements/input/ReusableInput";
import { useExpenseType } from "../../../hooks/useExpenseType";
import { useBankType } from "../../../hooks/useBankType";
// import CustomRadioButtons from "../../components/form-elements/CustomRadioButtons";

const AddBankTypeModal = ({ title, onClose, selectedFlatType }) => {
  const { addBankTypeMutation, updateBankTypeMutation } = useBankType();

  const handleSubmit = (formValues) => {
    if (!selectedFlatType) {
      addBankTypeMutation(formValues);
    } else {
      let payload = {
        id: selectedFlatType.id,
        ...formValues,
      };
      updateBankTypeMutation(payload);
    }

    onClose();
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Bank name is required"),
  });

  const initialValues = {
    name: selectedFlatType?.name || "",
  };

  return (
    <>
      <div className="fixed top-0 bg-[#1E1E1E33] left-0 right-0 z-50 w-full p-3 overflow-x-hidden overflow-y-auto flex justify-center items-center h-screen">
        <div className="relative w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow">
            <div className="flex items-center justify-between p-4 border-b border-custom-gray rounded-t-[10px]">
              <div></div>
              <h3 className="text-base font-semibold text-[#1E1E1E]">
                {selectedFlatType ? "Edit Flat Type" : title}
              </h3>
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
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
              >
                {() => (
                  <Form>
                    <div>
                      <div className="p-5">
                        <label
                          htmlFor="name"
                          className="text-[13px] text-[#1E1E1E] font-medium"
                        >
                          Bank Name
                        </label>

                        <ReusableInput
                          inpType="text"
                          inpName="name"
                          inpPlaceholder="Enter Expense Type Name"
                        />

                        <ErrorMessage
                          name="name"
                          component="p"
                          className="text-red-500 text-sm mt-1"
                        />
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
                          {selectedFlatType ? "Update" : "Add"}
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
    </>
  );
};

export default AddBankTypeModal;

import { Formik, Form, Field, ErrorMessage } from "formik";
// import { useMyLocations } from "../../hooks/useMyLocations";

import * as Yup from "yup";
import ReusableInput from "../../../components/form-elements/input/ReusableInput";
import { usePayee } from "../../../hooks/usePayee";
import PhoneInputField from "../../../components/form-elements/input/PhoneInputField";
import { useState } from "react";
// import CustomRadioButtons from "../../components/form-elements/CustomRadioButtons";

const AddPayeeTypeModal = ({ title, onClose, selectedFlatType }) => {
  const { addPayeeMutation, updatePayeeTypeMutation } = usePayee();
  const [dialCode, setDialCode] = useState(null);

  const handleSubmit = (formValues) => {
    if (!selectedFlatType) {
      addPayeeMutation({
        ...formValues,
        phoneCountryCode: dialCode,
      });
    } else {
      let payload = {
        id: selectedFlatType.id,
        phoneCountryCode: dialCode,

        ...formValues,
      };
      updatePayeeTypeMutation(payload);
    }

    onClose();
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Payee name is required"),
    email: Yup.string().email("Invalid email address"),
    phone: Yup.number().typeError("Phone must be a number"),
    trn: Yup.string(),
  });

  const initialValues = {
    name: selectedFlatType?.name || "",
    email: selectedFlatType?.email || "",
    phone: selectedFlatType?.phone || "",
    trn: selectedFlatType?.trn || "",
  };

  return (
    <>
      <div className="fixed top-0 bg-[#1E1E1E33] left-0 right-0 z-50 w-full p-3 overflow-x-hidden overflow-y-auto flex justify-center items-center h-screen">
        <div className="relative w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow">
            <div className="flex items-center justify-between p-4 border-b border-custom-gray rounded-t-[10px]">
              <div></div>
              <h3 className="text-base font-semibold text-[#1E1E1E]">
                {selectedFlatType ? "Edit Payee" : "Add Payee"}
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
                {({ values, setFieldValue }) => (
                  <Form>
                    <div>
                      <div className="flex gap-4 px-5 pt-4">
                        <div className="">
                          <label
                            htmlFor="name"
                            className="text-[13px] text-[#1E1E1E] font-medium"
                          >
                            Payee Name
                          </label>

                          <ReusableInput
                            inpType="text"
                            inpName="name"
                            inpPlaceholder="Enter Payee Name"
                          />

                          <ErrorMessage
                            name="name"
                            component="p"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>
                        <div className="">
                          <label
                            htmlFor="email"
                            className="text-[13px] text-[#1E1E1E] font-medium"
                          >
                            Payee Email
                          </label>

                          <ReusableInput
                            inpType="text"
                            inpName="email"
                            inpPlaceholder="Enter Payee Email"
                          />

                          <ErrorMessage
                            name="email"
                            component="p"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>
                      </div>

                      <div className="flex gap-4 px-5 py-4">
                        <PhoneInputField
                          value={values.phone}
                          onChange={(phone, countryData) => {
                            setFieldValue("phone", phone);
                            setDialCode(countryData.countryCode);
                          }}
                        />
                        <div className="">
                          <label
                            htmlFor="trn"
                            className="text-[13px] text-[#1E1E1E] font-medium"
                          >
                            Payee TRN
                          </label>

                          <ReusableInput
                            inpType="text"
                            inpName="trn"
                            inpPlaceholder="Enter Payee TRN"
                          />

                          <ErrorMessage
                            name="trn"
                            component="p"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>
                      </div>

                      <div className=" flex justify-center items-center gap-4 border-t border-custom-gray rounded-[10px] py-3">
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

export default AddPayeeTypeModal;

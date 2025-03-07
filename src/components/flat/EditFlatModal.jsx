import React from "react";
import ReusableInput from "../../components/form-elements/input/ReusableInput";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { useFlats } from "../../hooks/useFlats";

const EditFlatModal = ({
  title,
  activeBuilding,
  flatTypesData,
  singleFlatData,
  setShowEditModal,
}) => {
  // Edit Flat Mutation
  const { editFlatsMutation } = useFlats();

  const validationSchema = Yup.object({
    number: Yup.string().required("Flat number is required"),
    description: Yup.string().required("Flat description is required"),
    flatTypeId: Yup.number()
      .typeError("Flat Type ID must be a number")
      .required("Flat type ID is required"),
  });

  const handleSubmit = (formValues) => {
    const payload = {
      ...formValues,
      buildingId: activeBuilding,
      flatStatus: 1, // Optional: Maintain or update the flat's status as needed
    };

    editFlatsMutation({ id: singleFlatData.id, ...payload }); // Call the editFlat API
    setShowEditModal(false);
  };

  const onClose = () => {
    setShowEditModal(false);
  };

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
              initialValues={singleFlatData}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form>
                  <div className="p-5">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label
                          htmlFor="number"
                          className="text-[13px] text-[#1E1E1E] font-medium"
                        >
                          Flat #
                        </label>
                        <ReusableInput
                          inpType="text"
                          inpName="number"
                          inpPlaceholder="01"
                        />
                        <ErrorMessage
                          name="number"
                          component="p"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="flatTypeId"
                          className="text-[13px] text-[#1E1E1E] font-medium"
                        >
                          Flat Type
                        </label>
                        <div className="custom-select">
                          <Field
                            as="select"
                            name="flatTypeId"
                            className="w-full mt-[10px] select-m border border-gray-300 rounded-md py-[11px] px-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                          >
                            <option value="">Select Flat Type</option>
                            {flatTypesData.map((type) => (
                              <option key={type.id} value={type.id}>
                                {type.name}
                              </option>
                            ))}
                          </Field>
                        </div>
                        <ErrorMessage
                          name="flatTypeId"
                          component="p"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="description"
                          className="text-[13px] text-[#1E1E1E] font-medium"
                        >
                          Description
                        </label>
                        <ReusableInput
                          inpType="text"
                          inpName="description"
                          inpPlaceholder="Flat description"
                        />
                        <ErrorMessage
                          name="description"
                          component="p"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="sewerageAccountId"
                          className="text-[13px] text-[#1E1E1E] font-medium"
                        >
                          Sewerage ID
                        </label>
                        <ReusableInput
                          inpType="text"
                          inpName="sewerageAccountId"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="fewaAccountId"
                          className="text-[13px] text-[#1E1E1E] font-medium"
                        >
                          FEWA ID
                        </label>
                        <ReusableInput inpType="text" inpName="fewaAccountId" />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center items-center p-4 gap-4 border-t border-custom-gray rounded-[10px]">
                    <button
                      onClick={onClose}
                      type="button"
                      className="text-sm w-[66px] border border-custom-gray text-[#1E1E1E] hover:text-white hover:bg-custom-gradient-red py-2 rounded-md"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="text-sm w-[auto] bg-custom-gradient-green text-white py-2 px-3 rounded-md"
                    >
                      Update
                    </button>
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

export default EditFlatModal;

import React from "react";
import ReusableInput from "../../components/form-elements/input/ReusableInput";
import { Formik, Form, FieldArray, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { useFlats } from "../../hooks/useFlats";
const AddFlatModal = ({
  title,
  onClose,
  activeBuilding,
  flatTypesData,
  singleFlatData,
}) => {
  // addFlatsMutation
  const { addFlatsMutation } = useFlats();
  const validationSchema = Yup.object({
    flats: Yup.array()
      .of(
        Yup.object().shape({
          number: Yup.string().required("Flat number is required"),
          description: Yup.string().required("Flat description is required"),
          flatTypeId: Yup.number()
            .typeError("Flat Type ID must be a number")
            .required("Flat type ID is required"),
        })
      )
      .min(1, "At least one flat must be added"),
  });
  const handleSubmit = (formValues) => {
    let payload = formValues.flats.map((values) => {
      return {
        ...values,
        buildingId: activeBuilding,
        flatStatus: 1,
      };
    });
    addFlatsMutation(payload); // Call the addLocation API
    onClose();
  };
  return (
    <>
      <div className="fixed top-0 bg-[#1E1E1E33] left-0 right-0 z-50 w-full p-3 overflow-x-hidden overflow-y-auto flex justify-center items-center h-screen">
        <div className="md:w-[670px] relative max-h-full">
          <div className="relative bg-white rounded-lg shadow">
            <div className="flex items-center justify-between p-4 border-b border-custom-gray rounded-t-[10px]">
              <div></div>
              <h3 className="text-base font-semibold text-[#1E1E1E]">
                {title}
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-sm inline-flex justify-center items-centers"
              >
                <svg
                  class="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            <div>
              <Formik
                initialValues={{
                  flats: [
                    {
                      number: "",
                      description: "",
                      flatTypeId: "",
                      sewerageAccountId: "",
                      fewaAccountId: "",
                    },
                  ],
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ values }) => (
                  <Form>
                    <div className="p-5 add-flat-modal">
                      <FieldArray name="flats">
                        {({ push, remove }) => (
                          <>
                            {values.flats.map((flat, index) => (
                              <div
                                key={index}
                                className="border p-4 mb-4 rounded-md"
                              >
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <div>
                                    <label
                                      htmlFor={`flats.${index}.number`}
                                      className="text-[13px] text-[#1E1E1E] font-medium"
                                    >
                                      Flat #
                                    </label>
                                    <ReusableInput
                                      inpType="text"
                                      inpName={`flats.${index}.number`}
                                      inpPlaceholder="01"
                                    />
                                    <ErrorMessage
                                      name={`flats.${index}.number`}
                                      component="p"
                                      className="text-red-500 text-sm mt-1"
                                    />
                                  </div>
                                  <div>
                                    <label
                                      htmlFor={`flats.${index}.flatTypeId`}
                                      className="text-[13px] text-[#1E1E1E] font-medium"
                                    >
                                      Flat Type
                                    </label>
                                    {/* <ReusableInput
                                      inpType="text"
                                      inpName={`flats.${index}.flatTypeId`}
                                      inpPlaceholder="Studio"
                                    /> */}
                                    <div className="custom-select">
                                      <Field
                                        as="select"
                                        name={`flats.${index}.flatTypeId`}
                                        className="w-full  p-3 pr-5 rounded-lg border border-[#1E1E1E1A] hover:border-custom-green text-black placeholder:text-[#959595] focus-visible:outline-custom-green placeholder:text-[14px] text-[14px] mt-[10px]  select-m"
                                      >
                                        <option value="">
                                          Select Flat Type
                                        </option>
                                        {flatTypesData.map((type) => (
                                          <option key={type.id} value={type.id}>
                                            {type.name}
                                          </option>
                                        ))}
                                      </Field>
                                    </div>
                                    <ErrorMessage
                                      name={`flats.${index}.flatTypeId`}
                                      component="p"
                                      className="text-red-500 text-sm mt-1"
                                    />
                                  </div>
                                </div>
                                <div className="pt-[20px]">
                                  <label
                                    htmlFor={`flats.${index}.description`}
                                    className="text-[13px] text-[#1E1E1E] font-medium"
                                  >
                                    Description
                                  </label>
                                  <ReusableInput
                                    inpType="text"
                                    inpName={`flats.${index}.description`}
                                    inpPlaceholder="Flat description"
                                  />
                                  <ErrorMessage
                                    name={`flats.${index}.description`}
                                    component="p"
                                    className="text-red-500 text-sm mt-1"
                                  />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-[20px]">
                                  <div>
                                    <label
                                      htmlFor={`flats.${index}.sewerageAccountId`}
                                      className="text-[13px] text-[#1E1E1E] font-medium"
                                    >
                                      Sewerage ID
                                    </label>
                                    <ReusableInput
                                      inpType="text"
                                      inpName={`flats.${index}.sewerageAccountId`}
                                      inpPlaceholder=""
                                    />
                                  </div>

                                  <div>
                                    <label
                                      htmlFor={`flats.${index}.fewaAccountId`}
                                      className="text-[13px] text-[#1E1E1E] font-medium"
                                    >
                                      FEWA ID
                                    </label>
                                    <ReusableInput
                                      inpType="text"
                                      inpName={`flats.${index}.fewaAccountId`}
                                      inpPlaceholder=""
                                    />
                                  </div>
                                </div>
                                <div className="flex justify-end mt-2">
                                  {values.flats.length > 1 && (
                                    <button
                                      type="button"
                                      onClick={() => remove(index)}
                                      className="flex mt-2 gap-2 items-center text-sm text-red-500 hover:underline"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="12.121"
                                        height="12.121"
                                        viewBox="0 0 12.121 12.121"
                                      >
                                        <g
                                          id="Group_23361"
                                          data-name="Group 23361"
                                          transform="translate(-720.939 -167.939)"
                                        >
                                          <path
                                            id="Path_38328"
                                            data-name="Path 38328"
                                            d="M16,6,6,16"
                                            transform="translate(716 163)"
                                            fill="none"
                                            stroke="#d82323"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="1.5"
                                          />
                                          <path
                                            id="Path_38329"
                                            data-name="Path 38329"
                                            d="M6,6,16,16"
                                            transform="translate(716 163)"
                                            fill="none"
                                            stroke="#d82323"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="1.5"
                                          />
                                        </g>
                                      </svg>
                                      Remove
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={() =>
                                push({
                                  number: "",
                                  description: "",
                                  flatTypeId: "",
                                  sewerageAccountId: "",
                                  fewaAccountId: "",
                                })
                              }
                              className="m-auto bg-white flex justify-center items-center gap-[10px] w-auto rounded-[10px] border border-custom-gray p-2.5 py-1.5 text-[14px] text-[#1E1E1E] hover:bg-custom-gradient-green hover:text-white group"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="15.5"
                                height="15.5"
                                viewBox="0 0 15.5 15.5"
                              >
                                <g
                                  id="Group_23192"
                                  data-name="Group 23192"
                                  transform="translate(-1103.25 -12.25)"
                                >
                                  <path
                                    className="group-hover:stroke-white stroke-[#1E1E1E]"
                                    id="Path_38297"
                                    data-name="Path 38297"
                                    d="M12,5V19"
                                    transform="translate(1099 8)"
                                    fill="none"
                                    stroke="#1e1e1e"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="1.5"
                                  />
                                  <path
                                    className="group-hover:stroke-white stroke-[#1E1E1E]"
                                    id="Path_38298"
                                    data-name="Path 38298"
                                    d="M5,12H19"
                                    transform="translate(1099 8)"
                                    fill="none"
                                    stroke="#1e1e1e"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="1.5"
                                  />
                                </g>
                              </svg>
                              Add Another Flat
                            </button>
                          </>
                        )}
                      </FieldArray>
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
                        className="text-sm w-[66px] bg-custom-gradient-green text-white py-2 px-3 rounded-md"
                      >
                        Add
                      </button>
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
export default AddFlatModal;

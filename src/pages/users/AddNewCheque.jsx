import ReusableInput from "../../components/form-elements/input/ReusableInput";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import DatePickerField from "../../components/DatePicker/DatePickerField";

const AddNewCheque = () => {
  const validationSchema = Yup.object({
    cheques: Yup.array()
      .of(
        Yup.object().shape({
          bank: Yup.string().required("Bank name is required"),
          chequeNo: Yup.string().required("Cheque number is required"),
          amount: Yup.number()
            .typeError("Amount must be a number")
            .required("Cheque amount is required"),
          date: Yup.date().nullable().required("Cheque date is required"), // Allow null initially but require a value
          note: Yup.string(),
        })
      )
      .min(1, "At least one cheque must be added"),
  });

  const handleSubmit = (formValues) => {};

  return (
    <div className="p-5">
      <div className="mb-4 p-5 bg-white border border-custom-gray rounded-[10px]">
        <h2 className="text-xl leading-5 text-black font-semibold mb-6">
          Cheques
        </h2>

        <Formik
          initialValues={{
            cheques: [
              {
                bank: "",
                chequeNo: "",
                amount: "",
                date: null,
                note: "",
              },
            ],
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form>
              <div className="p-5 add-cheque-modal">
                <FieldArray name="cheques">
                  {({ push, remove }) => (
                    <>
                      {values.cheques.map((cheque, index) => (
                        <div key={index} className="border p-4 mb-4 rounded-md">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Bank Name */}
                            <div>
                              <label
                                htmlFor={`cheques.${index}.bank`}
                                className="text-[13px] text-[#1E1E1E] font-medium"
                              >
                                Bank Name
                              </label>

                              <ReusableInput
                                inpType="text"
                                inpName={`cheques.${index}.bank`}
                                inpPlaceholder="Enter Bank Name"
                              />
                              <ErrorMessage
                                name={`cheques.${index}.bank`}
                                component="p"
                                className="text-red-500 text-sm mt-1"
                              />
                            </div>

                            {/* Cheque No */}
                            <div>
                              <label
                                htmlFor={`cheques.${index}.chequeNo`}
                                className="text-[13px] text-[#1E1E1E] font-medium"
                              >
                                Cheque No.
                              </label>

                              <ReusableInput
                                inpType="text"
                                inpName={`cheques.${index}.chequeNo`}
                                inpPlaceholder="Enter Bank Name"
                              />
                              <ErrorMessage
                                name={`cheques.${index}.chequeNo`}
                                component="p"
                                className="text-red-500 text-sm mt-1"
                              />
                            </div>

                            {/* Cheque Amount */}
                            <div>
                              <label
                                htmlFor={`cheques.${index}.amount`}
                                className="text-[13px] text-[#1E1E1E] font-medium"
                              >
                                Cheque Amount
                              </label>

                              <ReusableInput
                                inpType="number"
                                inpName={`cheques.${index}.amount`}
                                inpPlaceholder="Enter Bank Name"
                              />
                              <ErrorMessage
                                name={`cheques.${index}.amount`}
                                component="p"
                                className="text-red-500 text-sm mt-1"
                              />
                            </div>

                            {/* Cheque Date */}
                            <div>
                              <label
                                htmlFor={`cheques.${index}.date`}
                                className="text-[13px] text-[#1E1E1E] font-medium"
                              >
                                Cheque Date
                              </label>
                              <Field
                                name={`cheques.${index}.date`}
                                component={DatePickerField}
                                placeholderText="Select a date"
                                className="border-[#E8E7E7] hover:border-[#03047B]"
                              />
                              <ErrorMessage
                                name={`cheques.${index}.date`}
                                component="p"
                                className="text-red-500 text-sm mt-1"
                              />
                            </div>

                            {/* Note */}
                            <div className="col-span-2">
                              <label
                                htmlFor={`cheques.${index}.note`}
                                className="text-[13px] text-[#1E1E1E] font-medium"
                              >
                                Note
                              </label>

                              <ReusableInput
                                inpType="text"
                                inpName={`cheques.${index}.note`}
                                inpPlaceholder="Enter note"
                              />
                              <ErrorMessage
                                name={`cheques.${index}.note`}
                                component="p"
                                className="text-red-500 text-sm mt-1"
                              />
                            </div>
                          </div>

                          {/* Remove Button */}
                          <div className="flex justify-end mt-2">
                            {values.cheques.length > 1 && (
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className="text-sm text-red-500 hover:underline"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        </div>
                      ))}

                      {/* Add Another Cheque Button */}
                      <button
                        type="button"
                        onClick={() =>
                          push({
                            bank: "",
                            chequeNo: "",
                            amount: "",
                            date: null,
                            note: "",
                          })
                        }
                        className="m-auto bg-white flex justify-center items-center gap-[10px] w-auto rounded-[10px] border border-custom-gray p-2.5 py-1.5 text-[14px] text-[#1E1E1E] hover:bg-custom-gradient-green hover:text-white group"
                      >
                        Add Another Cheque
                      </button>
                    </>
                  )}
                </FieldArray>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center items-center p-4 gap-4 border-t border-custom-gray rounded-[10px]">
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
  );
};

export default AddNewCheque;

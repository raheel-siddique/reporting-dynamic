import DatePickerField from "../../../components/DatePicker/DatePickerField";
import ReusableInput from "../../../components/form-elements/input/ReusableInput";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import { chequesStatus } from "../../../utils/format";
import * as Yup from "yup";
import CustomRadioButtons from "../../../components/form-elements/CustomRadioButtons";
import CustomCheckbox from "../../../components/form-elements/CustomCheckbox";
import { useState } from "react";
import CustomFieldErrors from "../../../components/errors/CustomFieldErrors";
import { ChequeStatuses, DatedOrOpen, DepositType } from "../../../utils/enums";
import { useBankType } from "../../../hooks/useBankType";

const AddSecurityModal = ({
  onClose,
  onSave,
  title,
  initialValues,
  editingCheque,
  tenantId,
}) => {
  const { bankTypesData } = useBankType(1, 100000);

  const validationSchema = Yup.object({
    cheques: Yup.array()
      .of(
        Yup.object().shape({
          // chequeNo: Yup.string().required("Cheque number is required"),
          amount: Yup.number()
            .required("Amount is required")
            .positive("Amount must be positive"),
          //   date: Yup.date().required("Date is required"),
          note: Yup.string(),
          // bank: Yup.string().required("Bank name is required"),
          // status: Yup.string()
          //   .required("Status is required")
          //   .oneOf(
          //     chequesStatus.map((type) => type.name),
          //     "Invalid status selected"
          //   ),
          vat: Yup.number().when("isVat", {
            is: true, // When isVat is true
            then: (schema) =>
              schema
                .required("VAT is required")
                .positive("VAT must be a positive number"), // Enforce positive integers
            otherwise: (schema) => schema.nullable(), // VAT can be null when isVat is false
          }),
          discount: Yup.number()
            .positive("Discount must be positive")
            .nullable(),
        })
      )
      .min(1, "At least one cheque must be added"),
  });

  let datedOrOpenExists = null;
  if (initialValues) {
    const { datedOrOpen } = initialValues;
    datedOrOpenExists = datedOrOpen;
  }

  return (
    <div className="fixed top-0 bg-[#1E1E1E33] left-0 right-0 z-50 w-full p-3 overflow-x-hidden overflow-y-auto flex justify-center items-center h-screen">
      <div className="md:w-[870px] relative max-h-full">
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
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
          <div>
            <Formik
              initialValues={{
                cheques: [
                  {
                    chequeNo: "",
                    amount: "",
                    date: null,
                    note: "",
                    bankId: "",
                    depositBankId: "",
                    statusText: ChequeStatuses.PDC.label,
                    amountTypeText: "cheque", // Default to cheque
                    isVat: false,
                    vat: null,
                    discount: null,
                    depositType: DepositType.Security.value,
                    ...initialValues, // Spread existing initialValues (if editing an existing cheque)
                    datedOrOpen: datedOrOpenExists
                      ? datedOrOpenExists === 1
                        ? DatedOrOpen.Dated.label
                        : DatedOrOpen.Open.label
                      : DatedOrOpen.Open.label,
                  },
                ],
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => onSave(values.cheques)}
              enableReinitialize
            >
              {({ values }) => (
                <Form>
                  <div className="p-5 add-flat-modal">
                    <FieldArray name="cheques">
                      {({ push, remove }) => (
                        <>
                          {values.cheques.map((cheque, index) => {
                            console.log({ cheque });
                            return (
                              <div
                                key={index}
                                className="border p-4 mb-4 rounded-md"
                              >
                                {/* <h4 className="text-lg font-bold mb-6 text-center">
                                  {cheque.amountTypeText.toLowerCase() ==
                                  "cheque"
                                    ? "Cheque"
                                    : "Cash"}
                                </h4> */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  {/* Amount Type (Cheque/Cash) */}
                                  {editingCheque === null && (
                                    <CustomRadioButtons
                                      name="cheques.0.amountTypeText"
                                      label="Amount Type"
                                      options={[
                                        { label: "Cheque", value: "cheque" },
                                        { label: "Cash", value: "cash" },
                                      ]}
                                    />
                                  )}

                                  <div className="flex mt-3 items-center">
                                    <CustomRadioButtons
                                      name={`cheques.${index}.datedOrOpen`}
                                      label="Dated/Open"
                                      options={[
                                        {
                                          label: DatedOrOpen.Dated.label,
                                          value: DatedOrOpen.Dated.label,
                                        },
                                        {
                                          label: DatedOrOpen.Open.label,
                                          value: DatedOrOpen.Open.label,
                                        },
                                      ]}
                                    />
                                  </div>
                                  {/* DatedOrOpen */}
                                  {cheque.datedOrOpen ===
                                    DatedOrOpen.Dated.label && (
                                    <>
                                      {/* Date */}
                                      <div>
                                        <label
                                          htmlFor={`cheques.${index}.date`}
                                          className="text-sm font-medium"
                                        >
                                          Date
                                        </label>
                                        <Field
                                          name={`cheques.${index}.date`}
                                          component={DatePickerField}
                                          placeholderText="Select a date"
                                        />
                                        {/* <ErrorMessage
                                 name={`cheques.${index}.date`}
                                 component="p"
                                 className="text-red-500 text-sm mt-1"
                               /> */}
                                      </div>
                                    </>
                                  )}

                                  {/* Amount */}
                                  <div>
                                    <label
                                      htmlFor={`cheques.${index}.amount`}
                                      className="text-sm font-medium"
                                    >
                                      Amount
                                    </label>
                                    <ReusableInput
                                      inpType="number"
                                      inpName={`cheques.${index}.amount`}
                                      inpPlaceholder="Enter Amount"
                                    />
                                    <ErrorMessage
                                      name={`cheques.${index}.amount`}
                                      component="p"
                                      className="text-red-500 text-sm mt-1"
                                    />
                                  </div>

                                  {/* Conditionally Render Cheque Number */}
                                  {values.cheques[
                                    index
                                  ].amountTypeText.toLowerCase() ==
                                    "cheque" && (
                                    <div>
                                      <label
                                        htmlFor={`cheques.${index}.chequeNo`}
                                        className="text-sm font-medium"
                                      >
                                        Cheque Number
                                      </label>
                                      <ReusableInput
                                        inpType=""
                                        inpName={`cheques.${index}.chequeNo`}
                                        inpPlaceholder="Enter Cheque Number"
                                      />
                                      <ErrorMessage
                                        name={`cheques.${index}.chequeNo`}
                                        component="p"
                                        className="text-red-500 text-sm mt-1"
                                      />
                                    </div>
                                  )}

                                  {/* Bank Name */}
                                  {/* Conditionally Render Cheque Number */}

                                  {values.cheques[
                                    index
                                  ].amountTypeText.toLowerCase() ==
                                    "cheque" && (
                                    <div>
                                      <label
                                        htmlFor={`cheques.${index}.bankId`}
                                        className="text-sm font-medium"
                                      >
                                        Bank Name
                                      </label>

                                      <div className="custom-select relative">
                                        <Field
                                          as="select"
                                          name={`cheques.${index}.bankId`}
                                          className="w-full cursor-pointer mt-[10px] select-m p-3 rounded-lg border border-[#1E1E1E1A] hover:border-custom-green text-black placeholder:text-[#959595] focus-visible:outline-custom-green placeholder:text-[14px] text-[14px]"
                                        >
                                          <option
                                            disabled
                                            value=""
                                            label="Select Bank Name"
                                          />
                                          {bankTypesData &&
                                            bankTypesData.map((option) => (
                                              <option
                                                key={option.id}
                                                value={option.id}
                                              >
                                                {option.name}
                                              </option>
                                            ))}
                                        </Field>

                                        <CustomFieldErrors
                                          name={`cheques.${index}.bankId`}
                                        />
                                        {/* {getErrorMessageField({ name: "expenseType" })} */}
                                      </div>
                                    </div>
                                  )}

                                  {values.cheques[
                                    index
                                  ].amountTypeText.toLowerCase() ==
                                    "cheque" && (
                                    <div>
                                      <label
                                        htmlFor={`cheques.${index}.depositBankId`}
                                        className="text-sm font-medium"
                                      >
                                        Deposit Bank Name
                                      </label>

                                      <div className="custom-select relative">
                                        <Field
                                          as="select"
                                          name={`cheques.${index}.depositBankId`}
                                          className="w-full cursor-pointer mt-[10px] select-m p-3 rounded-lg border border-[#1E1E1E1A] hover:border-custom-green text-black placeholder:text-[#959595] focus-visible:outline-custom-green placeholder:text-[14px] text-[14px]"
                                        >
                                          <option
                                            disabled
                                            value=""
                                            label="Select Deposit Bank Name"
                                          />
                                          {bankTypesData &&
                                            bankTypesData.map((option) => (
                                              <option
                                                key={option.id}
                                                value={option.id}
                                              >
                                                {option.name}
                                              </option>
                                            ))}
                                        </Field>

                                        <CustomFieldErrors
                                          name={`cheques.${index}.depositBankId`}
                                        />
                                      </div>
                                    </div>
                                  )}
                                  {/* Cheque Status */}
                                  {values.cheques[
                                    index
                                  ].amountTypeText.toLowerCase() ==
                                    "cheque" && (
                                    <div>
                                      <label
                                        htmlFor={`cheques.${index}.statusText`}
                                        className="text-sm font-medium"
                                      >
                                        Cheque Status
                                      </label>
                                      <div className="custom-select">
                                        <Field
                                          as="select"
                                          name={`cheques.${index}.statusText`}
                                          className="w-full  p-3 pr-5 rounded-lg border border-[#1E1E1E1A] hover:border-custom-green text-black placeholder:text-[#959595] focus-visible:outline-custom-green placeholder:text-[14px] text-[14px] mt-[10px]  select-m"
                                          defaultValue={
                                            ChequeStatuses.PDC.label
                                          } // Set default value to "PDC"
                                        >
                                          {chequesStatus.map((type, idx) => (
                                            <option key={idx} value={type.name}>
                                              {type.name}
                                            </option>
                                          ))}
                                        </Field>
                                      </div>
                                      <ErrorMessage
                                        name={`cheques.${index}.statusText`}
                                        component="p"
                                        className="text-red-500 text-sm mt-1"
                                      />
                                    </div>
                                  )}

                                  <div className="pt-[45px]">
                                    <CustomCheckbox
                                      name={`cheques[${index}].isVat`}
                                      label="VAT"
                                    />
                                  </div>
                                  {/* VAT */}
                                  {cheque.isVat && (
                                    <div className="col-span-2 w-[50%]">
                                      <label
                                        htmlFor={`cheques.${index}.vat`}
                                        className="text-sm font-medium"
                                      >
                                        VAT
                                      </label>
                                      <ReusableInput
                                        inpType="number"
                                        inpName={`cheques.${index}.vat`}
                                        inpPlaceholder="Enter VAT"
                                      />
                                      <CustomFieldErrors
                                        name={`cheques.${index}.vat`}
                                      />
                                    </div>
                                  )}

                                  {/* Discount */}
                                  <div>
                                    <label
                                      htmlFor={`cheques.${index}.discount`}
                                      className="text-sm font-medium"
                                    >
                                      Discount
                                    </label>
                                    <ReusableInput
                                      inpType="number"
                                      inpName={`cheques.${index}.discount`}
                                      inpPlaceholder="Enter Discount"
                                    />
                                  </div>

                                  {/* Note */}
                                  <div className="col-span-2">
                                    <label
                                      htmlFor={`cheques.${index}.note`}
                                      className="text-sm font-medium"
                                    >
                                      Note
                                    </label>
                                    <ReusableInput
                                      inpType="text"
                                      inpName={`cheques.${index}.note`}
                                      inpPlaceholder="Enter Note"
                                    />
                                    <ErrorMessage
                                      name={`cheques.${index}.note`}
                                      component="p"
                                      className="text-red-500 text-sm mt-1"
                                    />
                                  </div>
                                </div>

                                {/* Remove Button */}
                                {values.cheques.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="flex ms-auto mt-2 gap-2 items-center text-sm text-red-500 hover:underline"
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
                            );
                          })}

                          {/* Add Another Cheque */}
                          {editingCheque === null && (
                            <button
                              type="button"
                              onClick={() =>
                                push({
                                  chequeNo: "",
                                  amount: "",
                                  date: null,
                                  note: "",
                                  bankId: "",
                                  depositBankId: "",
                                  statusText: ChequeStatuses.PDC.label,
                                  amountTypeText: "cheque", // Default to cheque
                                  datedOrOpen: DatedOrOpen.Open.label,
                                })
                              }
                              className="m-auto bg-white flex justify-center items-center gap-[10px] w-auto rounded-[10px] border border-custom-gray p-2.5 py-1.5 text-[14px] text-[#1E1E1E] hover:bg-custom-gradient-green hover:text-white group"
                            >
                              Add Another Cheque/Cash
                            </button>
                          )}
                        </>
                      )}
                    </FieldArray>
                  </div>
                  {/* Submit Button */}
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
                      className="text-sm bg-custom-gradient-green text-white py-2 px-3 rounded-md"
                    >
                      {editingCheque !== null
                        ? "Update Cheques/Cash"
                        : "Add Cheques/Cash"}
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

export default AddSecurityModal;

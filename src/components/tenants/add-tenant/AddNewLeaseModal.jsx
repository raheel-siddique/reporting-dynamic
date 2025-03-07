import { leaseStatus } from "../../../utils/format";
import DatePickerField from "../../../components/DatePicker/DatePickerField";
import ReusableInput from "../../../components/form-elements/input/ReusableInput";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { LeaseStatuses } from "../../../utils/enums";

// const dateCheckedArr = [
//   { name: "Yes", value: true },
//   { name: "No", value: false },
// ];

// const rentCheckedArr = [
//   { name: "Yes", value: true },
//   { name: "No", value: false },
// ];
const AddNewLeaseModal = ({
  onClose,
  onSave,
  title,
  initialValues,
  editingCheque,
}) => {
  const validationSchema = Yup.object({
    leases: Yup.array()
      .of(
        Yup.object().shape({
          startDate: Yup.date()
            .required("Contract Start date is required")
            .typeError("Contract Start date must be a valid date"),
          endDate: Yup.date()
            .required("Contract End date is required")
            .typeError("Contract End date must be a valid date")
            .min(Yup.ref("startDate"), "End date must be after the start date"),

          // gracePeriodStartDate: Yup.date()
          //   .required("grace Period Date  is required")
          //   .typeError("grace Period Date must be a valid date"),
          note: Yup.string().nullable(), // Optional note
          annualRentAsPerContract: Yup.number()
            .required("Annual rent as per contract is required")
            .positive("Annual rent as per contract must be positive"),
          noOfdays: Yup.number()
            .required(" no Of days is required")
            .positive("no Of days must be positive"),
          actualRent: Yup.number()
            .required("Actual rent is required")
            .positive("Actual rent must be positive"),
          leaseStatusText: Yup.string()
            .required("Lease status text is required")
            .min(2, "Lease status text must be at least 2 characters"),
        })
      )
      .min(1, "At least one lease must be added"),
  });

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
                leases: [
                  {
                    ...initialValues,
                    leaseStatusText:
                      initialValues?.leaseStatusText ||
                      LeaseStatuses.Pending.label,
                    // startDate: new Date(),
                    // endDate: new Date(),
                    // transferDate: new Date(),
                  } || {
                    startDate: null,
                    endDate: null,
                    gracePeriodStartDate: null,
                    gracePeriodEndDate: null,

                    noOfDays: 0,
                    // noOfDays: 0,
                    // dateChecked: true,
                    // transferDate: new Date(),
                    annualRentAsPerContract: 0,
                    actualRent: 0,
                    leaseStatusText: LeaseStatuses.Pending.label,

                    // rentChecked: true,
                    // rentPerDay: 0,
                    // sellerUseDays: 0,
                    // sellerRent: 0,
                    // buyerDays: 0,
                    // buyerRent: 0,
                    // totalYearlyRent: 0,
                  },
                ],
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => onSave(values.leases)}
              enableReinitialize
            >
              {({ values }) => (
                <Form>
                  <div className="add-flat-modal p-4">
                    <FieldArray name="leases">
                      {({ push, remove }) => (
                        <>
                          {values.leases.map((lease, index) => (
                            <div
                              key={index}
                              className="border p-4 mb-4 rounded-md"
                            >
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <label
                                    htmlFor={`leases.${index}.startDate`}
                                    className="text-sm font-medium"
                                  >
                                    Contract Start Date
                                  </label>
                                  <Field
                                    name={`leases.${index}.startDate`}
                                    component={DatePickerField}
                                    placeholderText="Contract Start Date"
                                  />
                                  <ErrorMessage
                                    name={`leases.${index}.startDate`}
                                    component="p"
                                    className="text-red-500 text-sm mt-1"
                                  />
                                </div>

                                <div>
                                  <label
                                    htmlFor={`leases.${index}.endDate`}
                                    className="text-sm font-medium"
                                  >
                                    Contract End Date
                                  </label>
                                  <Field
                                    name={`leases.${index}.endDate`}
                                    component={DatePickerField}
                                    placeholderText="Contract End Date"
                                  />
                                  <ErrorMessage
                                    name={`leases.${index}.endDate`}
                                    component="p"
                                    className="text-red-500 text-sm mt-1"
                                  />
                                </div>
                                <div>
                                  <label
                                    htmlFor={`leases.${index}.gracePeriodStartDate`}
                                    className="text-sm font-medium"
                                  >
                                    Grace Period Start Date
                                  </label>
                                  <Field
                                    name={`leases.${index}.gracePeriodStartDate`}
                                    component={DatePickerField}
                                    placeholderText="Lease Grace Period Start Date"
                                  />
                                  <ErrorMessage
                                    name={`leases.${index}.gracePeriodStartDate`}
                                    component="p"
                                    className="text-red-500 text-sm mt-1"
                                  />
                                </div>
                                <div>
                                  <label
                                    htmlFor={`leases.${index}.gracePeriodEndDate`}
                                    className="text-sm font-medium"
                                  >
                                    Grace Period End Date
                                  </label>
                                  <Field
                                    name={`leases.${index}.gracePeriodEndDate`}
                                    component={DatePickerField}
                                    placeholderText="Lease Grace Period End Date"
                                  />
                                  <ErrorMessage
                                    name={`leases.${index}.gracePeriodEndDate`}
                                    component="p"
                                    className="text-red-500 text-sm mt-1"
                                  />
                                </div>
                                <div>
                                  <label
                                    htmlFor={`leases.${index}.annualRentAsPerContract`}
                                    className="text-sm font-medium"
                                  >
                                    Annual Rent As Per Contract
                                  </label>
                                  <ReusableInput
                                    inpType="number"
                                    inpName={`leases.${index}.annualRentAsPerContract`}
                                    inpPlaceholder="Enter Annual Rent"
                                  />
                                  <ErrorMessage
                                    name={`leases.${index}.annualRentAsPerContract`}
                                    component="p"
                                    className="text-red-500 text-sm mt-1"
                                  />
                                </div>

                                <div>
                                  <label
                                    htmlFor={`leases.${index}.noOfdays`}
                                    className="text-sm font-medium"
                                  >
                                    No of Days
                                  </label>
                                  <ReusableInput
                                    inpType="number"
                                    inpName={`leases.${index}.noOfdays`}
                                    inpPlaceholder="Enter Annual Rent"
                                  />
                                  <ErrorMessage
                                    name={`leases.${index}.noOfdays`}
                                    component="p"
                                    className="text-red-500 text-sm mt-1"
                                  />
                                </div>

                                <div>
                                  <label
                                    htmlFor={`leases.${index}.leaseStatusText`}
                                    className="text-sm font-medium"
                                  >
                                    Lease Status
                                  </label>
                                  <div className="custom-select">
                                    <Field
                                      as="select"
                                      name={`leases.${index}.leaseStatusText`}
                                      className="w-full  p-3 pr-5 rounded-lg border border-[#1E1E1E1A] hover:border-custom-green text-black placeholder:text-[#959595] focus-visible:outline-custom-green placeholder:text-[14px] text-[14px] mt-[10px]  select-m"
                                      defaultValue={LeaseStatuses.Pending.label} // Setting default value to "Pending"
                                    >
                                      <option value="">
                                        Select lease Status
                                      </option>
                                      {leaseStatus.map((type, idx) => (
                                        <option key={idx} value={type.name}>
                                          {type.name}
                                        </option>
                                      ))}
                                    </Field>
                                  </div>
                                  <ErrorMessage
                                    name={`leases.${index}.leaseStatusText`}
                                    component="p"
                                    className="text-red-500 text-sm mt-1"
                                  />
                                </div>

                                <div>
                                  <label
                                    htmlFor={`leases.${index}.actualRent`}
                                    className="text-sm font-medium"
                                  >
                                    Actual Rent
                                  </label>
                                  <ReusableInput
                                    inpType="number"
                                    inpName={`leases.${index}.actualRent`}
                                    inpPlaceholder="Enter Rent Per Day"
                                  />
                                  <ErrorMessage
                                    name={`leases.${index}.actualRent`}
                                    component="p"
                                    className="text-red-500 text-sm mt-1"
                                  />
                                </div>
                              </div>
                              {/* Remove Button */}
                              {values.leases.length > 1 && (
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
                          ))}

                          {/* Add Another Cheque */}
                          {editingCheque === null ? (
                            <button
                              type="button"
                              onClick={() =>
                                push({
                                  startDate: null,
                                  endDate: null,
                                  //   noOfDays: 0,
                                  //   dateChecked: true,
                                  //   transferDate: null,
                                  annualRentAsPerContract: 0,
                                  //   rentChecked: true,
                                  actualRent: 0,
                                  leaseStatusText: LeaseStatuses.Pending.label,

                                  //   sellerUseDays: 0,
                                  //   sellerRent: 0,
                                  //   buyerDays: 0,
                                  //   buyerRent: 0,
                                  //   totalYearlyRent: 0,
                                })
                              }
                              className="m-auto bg-white flex justify-center items-center gap-[10px] w-auto rounded-[10px] border border-custom-gray p-2.5 py-1.5 text-[14px] text-[#1E1E1E] hover:bg-custom-gradient-green hover:text-white group"
                            >
                              {" "}
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
                              Add Another Lease
                            </button>
                          ) : (
                            ""
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
                      {editingCheque !== null ? "Update Lease" : "Add Lease"}
                    </button>
                  </div>
                  {/* <div className="flex justify-end mt-4">
                    <button
                      type="submit"
                      className="bg-green-500 text-white py-2 px-4 rounded-md"
                    >
                      Save Leases
                    </button>
                  </div> */}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewLeaseModal;

import React, { useEffect, useState } from "react";
import * as Yup from "yup";

import ReusableInput from "../form-elements/input/ReusableInput";
import { Formik, Form, Field, ErrorMessage } from "formik";
import CloseIcon from "../../icons/CloseIcon";
import { CustomSelect } from "../Common/CustomSelect";
import { toast } from "react-toastify";
import AddPayeeModal from "./AddPayeeModal";
import { useFlats } from "../../hooks/useFlats";
import { usePayee } from "../../hooks/usePayee";
import CustomFieldErrors from "../../components/errors/CustomFieldErrors";
import { useImages } from "../../hooks/useImages";
import CustomImageUploader from "../../components/img/CustomImageUploader";
import { validationExpenseSchema } from "../../schemas/expenseSchema";
import {
  expenseTypeOptions,
  formatDateForBackend,
  paymentModeOptions,
} from "../../utils/format";
import { useExpenseType } from "../../hooks/useExpenseType";
import DatePickerField from "../../components/DatePicker/DatePickerField";
import CustomCheckbox from "../../components/form-elements/CustomCheckbox";
import { useBankType } from "../../hooks/useBankType";
import TemplateContainer from "../../utils/exportPdfs/templateContainer";
import { exportToPDF } from "../../utils/exportPdfs/exportPDF";
const AddExpenseModal = ({
  title,
  onClose,
  addExpenseMutation,
  selectedExpense,
}) => {
  const [addPayeeModal, setAddPayeeModal] = useState(false);
  const [buildingId, setBuildingId] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const { expenseTypesData } = useExpenseType(1, 100000);
  const [isPrintingExpense, setIsPrintingExpense] = useState(false);
  const [buildingName, setBuildingName] = useState("");

  const openModal = (img) => {
    setSelectedImage(img);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalOpen(false);
  };
  const { buildingsDataOwn, flatsData } = useFlats(
    1,
    100000,
    buildingId ? buildingId : null,
    null,
    null
  );

  const { payeeData, addPayeeMutation } = usePayee(1, 100000);
  const {
    uploadImageMutation,
    deleteIdImg,
    fetchedImages,
    imagePaths,
    uploadingImages,
  } = useImages(null);
  const { bankTypesData } = useBankType(1, 100000);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);

    const file = e.target.files[0];
    const folder = "expenses/BillAttachments";
    if (file) {
      uploadImageMutation(file, folder);
      e.target.value = "";
    } else {
      toast.error("No file selected!");
    }
  };

  const handleSubmit = (formValues) => {
    // Find the selected expenseType object
    const selectedExpenseType = expenseTypesData?.find(
      (type) => type.name === formValues.expenseType
    );

    const expenseTypeId = selectedExpenseType ? selectedExpenseType.id : null;

    // Check if it's a building expense
    const isBuildingExpense =
      formValues.expenseType === "Building" ||
      formValues.expenseType === "BuildingName";

    if (!isBuildingExpense) {
      delete formValues.buildingId;
      delete formValues.flatId;
    }

    try {
      let body = {
        ...formValues,
        expenseTypeId, // Send expenseTypeId instead of name
        buildingId: isBuildingExpense ? Number(formValues.buildingId) : null, // Convert to number if applicable
        billAttachments: imagePaths.join(","),
        date: formatDateForBackend(formValues.date),
      };

      let payload = [body];
      addExpenseMutation(payload);
      onClose();
    } catch (err) {
      toast.error("Error submitting expense", err);
    }
  };

  let initialValues = {
    expenseType: selectedExpense ? selectedExpense.expenseTypeText : "",
    buildingId: selectedExpense ? selectedExpense.buildingId : "",
    flatId: selectedExpense ? selectedExpense.flatId : "",
    payeeId: selectedExpense ? selectedExpense.payeeId : "",
    totalAmount: selectedExpense ? selectedExpense.totalAmount : "",
    description: selectedExpense ? selectedExpense.description : "",
    paymentMode: selectedExpense ? selectedExpense.paymentMode : "",
    chequeNumber: selectedExpense ? selectedExpense.chequeNumber : "",
    date: selectedExpense ? selectedExpense.date : "",
    isVat: selectedExpense ? selectedExpense.isVat : false,
    vatPercentage: selectedExpense ? selectedExpense.vatPercentage : null,
    vatAmount: selectedExpense ? selectedExpense.vatAmount : "",
    bankId: selectedExpense ? selectedExpense.bankId : "",
    invoiceNumber: selectedExpense ? selectedExpense.invoiceNumber : "",
  };
  const [exportValues, setExportValues] = useState(initialValues);

  const flatOptions = flatsData
    ? flatsData.map((flat) => ({
        value: flat.id,
        label: flat.flatType.name
          ? `#${flat.number}-${flat.flatType.name} - ${flat.flatStatusText}`
          : `#${flat.number}`,
        statusColor: flat.flatStatusText === "Occupied" ? "red" : "black", // Text color
      }))
    : [];

  const payeeOptions = payeeData
    ? payeeData.map((payee) => ({
        value: payee.id,
        label: payee.name,
      }))
    : [];

  const handleFlatSelect = (flatId) => {
    const flatName =
      flatOptions?.find((b) => b.value === Number(flatId))?.label || "N/A";
    exportValues.flatname = flatName;
  };

  const handleBankSelect = (bankId) => {
    const bankName =
      bankTypesData?.find((b) => b.id === Number(bankId))?.name || "N/A";
    exportValues.bankname = bankName;
  };

  const handlePayeeSelect = (payeeId) => {
    const payeeName =
      payeeOptions?.find((b) => b.value === Number(payeeId))?.label || "N/A";
    exportValues.payeename = payeeName;
  };

  const handleBuildingChange = (e, setFieldValue) => {
    const selectedBuildingId = e.target.value;
    setBuildingId(selectedBuildingId); // Update locationId state if needed
    setFieldValue("buildingId", selectedBuildingId);

    const buildingName =
      buildingsDataOwn?.find((b) => b.id === Number(selectedBuildingId))
        ?.name || "N/A";
    setBuildingName(buildingName);
  };

  const areRequiredFieldsFilled = (values) => {
    exportValues.date = values.date;
    exportValues.paymentMode = values.paymentMode;
    exportValues.totalAmount = values.totalAmount;
    exportValues.expenseType = values.expenseType;
    exportValues.buildingname = buildingName;
    return (
      exportValues.expenseType &&
      exportValues.buildingname &&
      exportValues.flatname &&
      exportValues.payeename &&
      exportValues.totalAmount &&
      exportValues.paymentMode &&
      exportValues.date &&
      exportValues.bankname
    );
  };

  const closePayeeModal = () => {
    setAddPayeeModal(false);
  };

  const handleExport = () => {
    try {
      setIsPrintingExpense(true); // Start loader
      exportToPDF(); // Assuming this is an async function that triggers the export
    } catch (error) {
      console.error("Error printing receipt:", error);
    } finally {
      setIsPrintingExpense(false); // Stop loader
    }
  };

  return (
    <>
      <div className="fixed top-0 bg-[#1E1E1E33] left-0 right-0 z-50 w-full p-3 overflow-x-hidden overflow-y-auto flex justify-center items-center h-screen">
        <div className="relative w-full md:w-[800px] max-h-full">
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
                <CloseIcon />
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div>
              <Formik
                initialValues={initialValues}
                validationSchema={validationExpenseSchema}
                onSubmit={handleSubmit}
              >
                {({ values, setFieldValue, handleChange }) => {
                  // Automatically calculate vatAmount when totalAmount or VAT changes
                  useEffect(() => {
                    setExportValues(values);
                    if (values.vatAmount) {
                      if (values.isVat && values.vatPercentage) {
                        const vatValue =
                          (values.vatAmount * values.vatPercentage) / 100;
                        setFieldValue(
                          "totalAmount",
                          values.vatAmount + vatValue
                        );
                      } else {
                        setFieldValue("totalAmount", values.vatAmount);
                      }
                    }
                  }, [
                    values.vatAmount,
                    values.vatPercentage,
                    values.isVat,
                    setFieldValue,
                  ]);
                  return (
                    <Form>
                      <div className="max-h-[74vh] overflow-y-auto w-full">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 ">
                          {/* Date and Expense Type Fields */}

                          <div className="w-full">
                            <label
                              htmlFor="expenseType"
                              className="text-[13px] text-[#1E1E1E] font-medium"
                            >
                              Expense Type
                            </label>
                            <div className="custom-select relative">
                              <Field
                                as="select"
                                name="expenseType"
                                className="w-full cursor-pointer mt-[10px] select-m p-3 rounded-lg border border-[#1E1E1E1A] hover:border-custom-green text-black placeholder:text-[#959595] focus-visible:outline-custom-green placeholder:text-[14px] text-[14px]"
                              >
                                <option
                                  disabled
                                  value=""
                                  label="Select Expense Type"
                                />
                                {expenseTypesData &&
                                  expenseTypesData.map((option) => (
                                    <option key={option.id} value={option.name}>
                                      {option.name}
                                    </option>
                                  ))}
                              </Field>

                              <CustomFieldErrors name={"expenseType"} />
                              {/* {getErrorMessageField({ name: "expenseType" })} */}
                            </div>
                          </div>

                          {/* Flat and Payment To Fields */}
                          {/* Flat */}
                          {/* Flat and Payment To Fields */}
                          {/* Show fields if expenseType is "Building" OR "BuildingName" */}
                          {(values.expenseType == "Building" ||
                            values.expenseType == "BuildingName") && (
                            <>
                              <div>
                                <label className="text-[13px] text-[#1E1E1E] font-medium">
                                  Building
                                </label>
                                <div className="custom-select">
                                  <Field
                                    name="buildingId"
                                    as="select"
                                    className="w-full mt-[10px] select-m p-3 rounded-lg border border-[#1E1E1E1A] hover:border-custom-green text-black placeholder:text-[#959595] focus-visible:outline-custom-green placeholder:text-[14px] text-[14px]"
                                    value={values.buildingId || ""}
                                    onChange={(e) =>
                                      handleBuildingChange(e, setFieldValue)
                                    }
                                  >
                                    <option value="" label="Select Building" />
                                    {buildingsDataOwn &&
                                      buildingsDataOwn.map(
                                        (building, index) => (
                                          <option
                                            key={index}
                                            value={building.id}
                                          >
                                            {building.name}
                                          </option>
                                        )
                                      )}
                                  </Field>
                                  <CustomFieldErrors name={"buildingId"} />
                                </div>
                              </div>

                              <div>
                                <label className="text-[13px] text-[#1E1E1E] font-medium">
                                  Flat
                                </label>
                                <div>
                                  <Field
                                    name="flatId"
                                    component={CustomSelect}
                                    options={flatOptions}
                                    className="w-full mt-[10px] text-[14px]"
                                    onCustomAction={handleFlatSelect} // Pass the custom handler
                                  />
                                </div>
                                <CustomFieldErrors name={"flatId"} />
                              </div>
                            </>
                          )}

                          {/* Payment To */}

                          {/* Total Amount and Description */}

                          <div className="w-full">
                            <label
                              htmlFor="description"
                              className="text-[13px] text-[#1E1E1E] font-medium"
                            >
                              Description
                            </label>
                            <ReusableInput
                              inpName="description"
                              inpType="text"
                              className="w-full mt-[10px] p-3 rounded-lg border"
                            />
                            <CustomFieldErrors name={"description"} />

                            {/* {getErrorMessageField({ name: "description" })} */}
                          </div>

                          {/* Payment To */}

                          <div className="w-full">
                            <label
                              htmlFor="paymentTo"
                              className="text-[13px] text-[#1E1E1E] font-medium"
                            >
                              Payment To
                            </label>

                            <div className="custom-select">
                              <Field
                                name="payeeId"
                                component={CustomSelect}
                                options={payeeOptions}
                                className="w-full mt-[10px] text-[14px]"
                                onCustomAction={handlePayeeSelect} // Pass the custom handler
                              />
                              <div className="flex items-center justify-between">
                                <div className="min-w-[1px] flex-1">
                                  {/* Ensures space is maintained even when there's no error */}
                                  <CustomFieldErrors
                                    name="payeeId"
                                    className="invisible peer-invalid:visible"
                                  />
                                </div>
                                {/* <button
                                  onClick={() => {
                                    setAddPayeeModal(true);
                                  }}
                                  type="button"
                                  className="mt-1 underline text-gray-700 text-[11px]"
                                >
                                  Add new payee
                                </button> */}
                              </div>
                            </div>
                          </div>

                          <div className="w-full">
                            <label
                              htmlFor="vatAmount"
                              className="text-[13px] text-[#1E1E1E] font-medium"
                            >
                              Expense Amount
                            </label>
                            <ReusableInput
                              inpName="vatAmount"
                              inpType="number"
                              className="w-full mt-[10px] p-3 rounded-lg border"
                            />
                            <CustomFieldErrors name={"vatAmount"} />
                          </div>

                          {/* Payment Mode and Cheque Number */}
                          <div className="w-full">
                            <label
                              htmlFor="paymentMode"
                              className="text-[13px] text-[#1E1E1E] font-medium"
                            >
                              Payment Mode
                            </label>
                            <div className="custom-select">
                              <Field
                                as="select"
                                name="paymentMode"
                                className="w-full mt-[10px] cursor-pointer select-m p-3 rounded-lg border border-[#1E1E1E1A] hover:border-custom-green text-black placeholder:text-[#959595] focus-visible:outline-custom-green placeholder:text-[14px] text-[14px]"
                                onChange={(e) => {
                                  const selectedValue = e.target.value;
                                  setFieldValue("paymentMode", selectedValue); // Ensure Formik updates the value
                                }}
                              >
                                <option
                                  disabled
                                  value=""
                                  label="Select Payment Mode"
                                />
                                {paymentModeOptions.map((option, index) => (
                                  <option key={index} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </Field>
                              <CustomFieldErrors name={"paymentMode"} />

                              {/* {getErrorMessageField({ name: "paymentMode" })} */}
                            </div>
                          </div>

                          {values.paymentMode === "Cheque" && (
                            <div className="w-full">
                              <label
                                htmlFor="chequeNumber"
                                className="text-[13px] text-[#1E1E1E] font-medium"
                              >
                                Cheque Number
                              </label>
                              <ReusableInput
                                inpName="chequeNumber"
                                inpType="text"
                                className="w-full mt-[10px] p-3 rounded-lg border"
                              />
                              <CustomFieldErrors name={"chequeNumber"} />

                              {/* {getErrorMessageField({ name: "chequeNumber" })} */}
                            </div>
                          )}

                          <div>
                            <label
                              htmlFor={`date`}
                              className="text-sm font-medium"
                            >
                              Date
                            </label>
                            <Field
                              name={`date`}
                              component={DatePickerField}
                              placeholderText="Lease Start Date"
                            />
                            <ErrorMessage
                              name={`date`}
                              component="p"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>

                          {/* Total Amount and Description */}
                          <div className="w-full">
                            <label
                              htmlFor="totalAmount"
                              className="text-[13px] text-[#1E1E1E] font-medium"
                            >
                              Total Amount
                            </label>
                            <ReusableInput
                              inpName="totalAmount"
                              inpType="number"
                              className="w-full mt-[10px] p-3 rounded-lg border"
                              readOnly
                            />
                            <CustomFieldErrors name={"totalAmount"} />

                            {/* {getErrorMessageField({ name: "totalAmount" })} */}
                          </div>
                          <div>
                            <label
                              htmlFor={`bankId`}
                              className="text-sm font-medium"
                            >
                              Bank Name
                            </label>
                            <div className="custom-select relative">
                              <Field
                                as="select"
                                name="bankId"
                                className="w-full cursor-pointer mt-[10px] select-m p-3 rounded-lg border border-[#1E1E1E1A] hover:border-custom-green text-black placeholder:text-[#959595] focus-visible:outline-custom-green placeholder:text-[14px] text-[14px]"
                                onChange={(e) => {
                                  handleChange(e);
                                  handleBankSelect(e.target.value);
                                }}
                              >
                                <option
                                  disabled
                                  value=""
                                  label="Select Bank Name"
                                />
                                {bankTypesData &&
                                  bankTypesData.map((option) => (
                                    <option key={option.id} value={option.id}>
                                      {option.name}
                                    </option>
                                  ))}
                              </Field>

                              <CustomFieldErrors name={`bankId`} />
                              {/* {getErrorMessageField({ name: "expenseType" })} */}
                            </div>
                          </div>

                          <div className="w-full">
                            <label
                              htmlFor="invoiceNumber"
                              className="text-[13px] text-[#1E1E1E] font-medium"
                            >
                              Invoice Number
                            </label>
                            <ReusableInput
                              inpName="invoiceNumber"
                              inpType="text"
                              className="w-full mt-[10px] p-3 rounded-lg border"
                            />
                            <CustomFieldErrors name={"invoiceNumber"} />

                            {/* {getErrorMessageField({ name: "description" })} */}
                          </div>

                          <div className="flex mt-3 items-center">
                            <CustomCheckbox
                              name={`isVat`}
                              label="Check to enter applicable VAT %"
                            />
                          </div>
                          {/* VAT */}
                          {values.isVat && (
                            <div className="col-span-2 w-[49%]">
                              <label
                                htmlFor={`vatPercentage`}
                                className="text-sm font-medium"
                              >
                                VAT
                              </label>
                              <ReusableInput
                                inpType="number"
                                inpName={`vatPercentage`}
                                inpPlaceholder="Enter VAT Percentage"
                              />
                              <CustomFieldErrors name={`vatPercentage`} />
                            </div>
                          )}
                        </div>

                        <div className="w-full grid sm:grid-cols-2 gap-4 py-5 px-1">
                          <div>
                            <CustomImageUploader
                              handleFileChange={handleFileChange}
                              fetchedImages={fetchedImages}
                              uploadingImages={uploadingImages}
                              modalOpen={modalOpen}
                              openModal={openModal}
                              closeModal={closeModal}
                              selectedImage={selectedImage}
                              deleteIdImg={deleteIdImg}
                              postionImages={"bottom"}
                              btnText={"Upload Bill Image"}
                              imageWidth={"150px"}
                            />
                          </div>

                          <div>
                            <TemplateContainer
                              templatetype={"Expense"}
                              data={exportValues}
                            />
                            {/* <button
                              type="button"
                              onClick={() => {
                                if (areRequiredFieldsFilled(values)) {
                                  handleExport();
                                } else {
                                  toast.error("Please fill all required fields before exporting.", {
                                    position: "top-center",
                                  });
                                }
                              }}
                              disabled={isPrintingExpense}
                              className="text-sm flex gap-2 flex-nowrap py-2 px-4 my-4 mx-4 md:mx-0 rounded-md border text-white bg-custom-gradient-green"
                            >
                              {isPrintingExpense ? (
                                <div className="flex items-center gap-2">
                                  <div className="loader"></div>{" "}
                                  Printing...
                                </div>
                              ) : (
                                <>
                                  {" "}
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14.833"
                                    height="17.5"
                                    viewBox="0 0 14.833 17.5"
                                  >
                                    <g
                                      id="Group_25506"
                                      data-name="Group 25506"
                                      transform="translate(-7354.25 322.75)"
                                    >
                                      <path
                                        id="Path_38703"
                                        data-name="Path 38703"
                                        d="M14,3V6.556a.889.889,0,0,0,.889.889h3.556"
                                        transform="translate(7349 -325)"
                                        fill="none"
                                        stroke="#fff"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="1.5"
                                      />
                                      <path
                                        id="Path_38704"
                                        data-name="Path 38704"
                                        d="M5,11V4.778A1.778,1.778,0,0,1,6.778,3H13l4.444,4.444V11"
                                        transform="translate(7350 -325)"
                                        fill="none"
                                        stroke="#fff"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="1.5"
                                      />
                                      <path
                                        id="Path_38705"
                                        data-name="Path 38705"
                                        d="M5,17.667H6.333a1.333,1.333,0,1,0,0-2.667H5v5.333"
                                        transform="translate(7350 -326.333)"
                                        fill="none"
                                        stroke="#fff"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="1.5"
                                      />
                                      <path
                                        id="Path_38706"
                                        data-name="Path 38706"
                                        d="M17,18h1.778"
                                        transform="translate(7348.667 -326.667)"
                                        fill="none"
                                        stroke="#fff"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="1.5"
                                      />
                                      <path
                                        id="Path_38707"
                                        data-name="Path 38707"
                                        d="M19.667,15H17v5.333"
                                        transform="translate(7348.667 -326.333)"
                                        fill="none"
                                        stroke="#fff"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="1.5"
                                      />
                                      <path
                                        id="Path_38708"
                                        data-name="Path 38708"
                                        d="M11,15v5.333h.889a1.778,1.778,0,0,0,1.778-1.778V16.778A1.778,1.778,0,0,0,11.889,15Z"
                                        transform="translate(7349.333 -326.333)"
                                        fill="none"
                                        stroke="#fff"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="1.5"
                                      />
                                    </g>
                                  </svg>
                                  Print Expense
                                </>
                              )}
                            </button> */}
                          </div>
                        </div>
                      </div>
                      {/* Buttons */}
                      <div className="flex justify-center items-center p-5 gap-4 border-t border-custom-gray rounded-[10px]">
                        <button
                          type="button"
                          onClick={onClose}
                          className="text-sm w-[66px] border border-custom-gray text-[#1E1E1E] hover:text-white hover:bg-custom-gradient-red group cursor-pointer py-2 rounded-md"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="text-sm w-[66px] p-2 rounded-md border text-white bg-custom-gradient-green"
                        >
                          Add
                        </button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
              {addPayeeModal && (
                <AddPayeeModal
                  title="Add New Payee"
                  onClose={closePayeeModal}
                  addPayeeMutation={addPayeeMutation}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddExpenseModal;

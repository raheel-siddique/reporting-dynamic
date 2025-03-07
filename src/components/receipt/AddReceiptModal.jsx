import React, { useEffect, useState } from "react";
import ReusableInput from "../form-elements/input/ReusableInput";
import { Formik, Form, Field, ErrorMessage } from "formik";
import CloseIcon from "../../icons/CloseIcon";
import { CustomSelect } from "../Common/CustomSelect";
import { toast } from "react-toastify";
import AddPayeeModal from "./AddPayeeModal";
import { usePayee } from "../../hooks/usePayee";
import CustomFieldErrors from "../../components/errors/CustomFieldErrors";
import { useImages } from "../../hooks/useImages";
import CustomImageUploader from "../../components/img/CustomImageUploader";
import { validationReceiptSchema } from "../../schemas/receiptSchema";
import { formatDateForBackend, paymentModeOptions } from "../../utils/format";
import DatePickerField from "../../components/DatePicker/DatePickerField";
import CustomCheckbox from "../../components/form-elements/CustomCheckbox";
import { useBankType } from "../../hooks/useBankType";
import CustomRadioButtons from "../../components/form-elements/CustomRadioButtons";
import { ReceiptType } from "../../utils/enums";

const AddReceiptModal = ({
  title,
  onClose,
  addReceiptMutation,
  selectedReceipt,
}) => {
  const [addPayeeModal, setAddPayeeModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const openModal = (img) => {
    setSelectedImage(img);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalOpen(false);
  };

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
    const folder = "receipts/BillAttachments";
    if (file) {
      uploadImageMutation(file, folder);
      e.target.value = "";
    } else {
      toast.error("No file selected!");
    }
  };

  const handleSubmit = (formValues) => {
    try {
      let body = {
        ...formValues,
        billAttachments: imagePaths.join(","),
        date: formatDateForBackend(formValues.date),
      };

      let payload = [body];
      addReceiptMutation(payload);
      onClose();
    } catch (err) {
      toast.error("Error submitting receipt", err);
    }
  };

  let initialValues = {
    receiptType: ReceiptType.Receipt.label, // Default to cheque
    payeeId: selectedReceipt ? selectedReceipt.payeeId : "",
    totalAmount: selectedReceipt ? selectedReceipt.totalAmount : "",
    description: selectedReceipt ? selectedReceipt.description : "",
    paymentMode: selectedReceipt ? selectedReceipt.paymentMode : "",
    chequeNumber: selectedReceipt ? selectedReceipt.chequeNumber : "",
    date: selectedReceipt ? selectedReceipt.date : "",
    isVat: selectedReceipt ? selectedReceipt.isVat : false,
    vatPercentage: selectedReceipt ? selectedReceipt.vatPercentage : null,
    vatAmount: selectedReceipt ? selectedReceipt.vatAmount : "",
    bankId: selectedReceipt ? selectedReceipt.bankId : "",
    receiptNumber: selectedReceipt ? selectedReceipt.receiptNumber : "",
  };

  const payeeOptions = payeeData
    ? payeeData.map((payee) => ({
        value: payee.id,
        label: payee.name,
      }))
    : [];

  const handlePayeeSelect = (payeeId) => {};

  const closePayeeModal = () => {
    setAddPayeeModal(false);
  };

  return (
    <>
      <div className="fixed top-0 bg-[#1E1E1E33] left-0 right-0 z-50 w-full p-3 overflow-x-hidden overflow-y-auto flex justify-center items-center h-screen">
        <div className="relative w-full md:w-[650px] max-h-full">
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
                validationSchema={validationReceiptSchema}
                onSubmit={handleSubmit}
              >
                {({ values, setFieldValue }) => {
                  // Automatically calculate vatAmount when totalAmount or VAT changes
                  useEffect(() => {
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
                      <div className="max-h-[450px] overflow-y-auto w-full">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 ">
                          {/* Date and Expense Type Fields */}

                          <div className="flex mt-3 items-center">
                            <CustomRadioButtons
                              name={`receiptType`}
                              label="Receipt Type"
                              options={[
                                {
                                  label: ReceiptType.Receipt.label,
                                  value: ReceiptType.Receipt.label,
                                },
                                {
                                  label: ReceiptType.Deposit.label,
                                  value: ReceiptType.Deposit.label,
                                },
                              ]}
                            />
                          </div>

                          {values.receiptType === ReceiptType.Receipt.label && (
                            <div className="w-full">
                              <label
                                htmlFor="receiptNumber"
                                className="text-[13px] text-[#1E1E1E] font-medium"
                              >
                                Receipt Number
                              </label>
                              <ReusableInput
                                inpName="receiptNumber"
                                inpType="text"
                                className="w-full mt-[10px] p-3 rounded-lg border"
                              />
                              <CustomFieldErrors name={"receiptNumber"} />

                              {/* {getErrorMessageField({ name: "chequeNumber" })} */}
                            </div>
                          )}

                          {/* Payment To */}

                          <div className="w-full">
                            <label
                              htmlFor="paymentTo"
                              className="text-[13px] text-[#1E1E1E] font-medium"
                            >
                              Received From
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

                          <div className="w-full">
                            <label
                              htmlFor="vatAmount"
                              className="text-[13px] text-[#1E1E1E] font-medium"
                            >
                              Amount Received
                            </label>
                            <ReusableInput
                              inpName="vatAmount"
                              inpType="number"
                              className="w-full mt-[10px] p-3 rounded-lg border"
                            />
                            <CustomFieldErrors name={"vatAmount"} />
                          </div>

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
                                name={`bankId`}
                                className="w-full cursor-pointer mt-[10px] select-m p-3 rounded-lg border border-[#1E1E1E1A] hover:border-custom-green text-black placeholder:text-[#959595] focus-visible:outline-custom-green placeholder:text-[14px] text-[14px]"
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
                            </div>
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

                        <div className="w-full  p-5">
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

export default AddReceiptModal;

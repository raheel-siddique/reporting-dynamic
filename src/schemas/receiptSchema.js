import * as Yup from "yup";

export const validationReceiptSchema = Yup.object().shape({
  payeeId: Yup.string().required("Payee is required"),
  description: Yup.string().required("Description is required"),
  paymentMode: Yup.string().required("Payment mode is required"),
  chequeNumber: Yup.string().when("paymentMode", {
    is: "Cheque",
    then: (schema) => schema.required("Cheque Number is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  vatPercentage: Yup.number().when("isVat", {
    is: true, // When isVat is true
    then: (schema) =>
      schema
        .required("VAT is required")
        .positive("VAT must be a positive number"), // Enforce positive integers
    otherwise: (schema) => schema.nullable(), // VAT can be null when isVat is false
  }),
  vatAmount: Yup.number()
    .typeError("Expense Amount must be a number")
    .required("Expense Amount is required")
    .positive("Expense Amount must be greater than zero"),
});

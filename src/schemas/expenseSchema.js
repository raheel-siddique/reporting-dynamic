import * as Yup from "yup";

export const validationExpenseSchema = Yup.object().shape({
  expenseType: Yup.string().required("Expense type is required"),
  // buildingId: Yup.string().when("expenseType", {
  //   is: (value) => value !== "General",
  //   then: (schema) => schema.required("Building is required"),
  //   otherwise: (schema) => schema.notRequired(),
  // }),
  // flatId: Yup.string().when("expenseType", {
  //   is: (value) => value !== "General",
  //   then: (schema) => schema.required("Flat is required"),
  //   otherwise: (schema) => schema.notRequired(),
  // }),
  payeeId: Yup.string().required("Payee is required"),
  // totalAmount: Yup.number()
  //   .typeError("Total Amount must be a number")
  //   .required("Total Amount is required")
  //   .positive("Total Amount must be greater than zero"),
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

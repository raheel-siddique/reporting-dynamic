import * as Yup from "yup";

export const validationTenantSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  // sewerageAccountNoGeneral: Yup.string().required(
  //   "Sewerage Account No is required"
  // ),
  // fewaAccountNoGeneral: Yup.string().required("FEWA Account No is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  flatId: Yup.string().required("Flat is required"),
  phone: Yup.string()
    .min(7, "Phone number must be at least 7 digits")
    .max(15, "Phone number cannot exceed 15 digits")
    .required("Phone number is required"),
});

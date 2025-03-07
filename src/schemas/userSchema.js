import * as Yup from "yup";

// Define the common fields
const baseUserSchema = {
  fullName: Yup.string().required("Name is required"),
  email: Yup.string().email("Enter valid email").required("Email is required"),
  phoneNumber: Yup.string().required("Phone No. is required"),
  roles: Yup.array()
    .of(Yup.string())
    .min(1, "Roles must have at least one element")
    .required("Roles is required"),
};

// Add User Schema (extends base and adds password)
export const addUserSchema = Yup.object({
  ...baseUserSchema,
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one digit")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
});

// Edit User Schema (extends base and removes password)
export const editUserSchema = Yup.object({
  ...baseUserSchema,
});

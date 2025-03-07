import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import openeye from "../../../assets/openeye.svg";
import closeeye from "../../../assets/closeeye.svg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// import { auth } from "./firebase/firebase";
import { toast, ToastContainer } from "react-toastify";
import ReusableButton from "../../../components/form-elements/button/ReusableButton";



const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = ()=> {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (formValues) => {
    const { email, password } = formValues;
    toast.success(
      "Sign-up successful! Please check your email for verification.",
      {
        position: "top-center",
      }
    );
  };


  return (
    <>
      <section className="auth-parent p-[1rem]">
        <div className="flex justify-center ">
          {/* <HyderAiLogoSvg ownWidth="150" ownHeight="32" /> */}
        </div>
        <div className="w-full max-w-[462px] p-8 dark:bg-[#393939] bg-white shadow-md border border-[#24242412] rounded-[30px]">
          <h2 className="text-[2rem] dark:text-[#FFFFFF] font-bold text-[#242424] font-inter text-left mb-4">
            Sign Up
          </h2>
          <p className="text-[1rem] dark:text-[#FFFFFF]  text-[#242424] font-inter text-left mb-6">
            Please enter your email and password below to log in into your
            account.
          </p>

          <Formik
            initialValues={{
              // firstName: "",
              // lastName: "",
              email: "",
              password: "",
              // confirmPassword: "",
            }}
            validationSchema={Yup.object({
              // firstName: Yup.string()
              //   .required("First Name is required")
              //   .matches(/^[a-zA-Z]+$/, "First Name must contain only letters"),
              // lastName: Yup.string()
              //   .required("Last Name is required")
              //   .matches(/^[a-zA-Z]+$/, "Last Name must contain only letters"),
              email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
              password: Yup.string()
                .min(6, "Password must be at least 6 characters")
                .required("Password is required"),
              // confirmPassword: Yup.string()
              //   .oneOf([Yup.ref("password"), null], "Passwords must match")
              //   .required("Confirm Password is required"),
            })}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <Form>
                <div className="flex gap-4 mb-4">
                  {/* <div className="flex-1">
                    <Field
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      className="w-full p-3 dark:bg-[#2E2E2E] dark:text-[#FFFFFF] outline-none bg-[#24242412] rounded-[30px] focus:ring-primary-600 focus:border-primary-600 text-gray-900 placeholder-gray-400"
                    />
                    <ErrorMessage
                      name="firstName"
                      component="p"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div> */}
                  {/* <div className="flex-1">
                    <Field
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      className="w-full p-3 dark:text-[#FFFFFF] dark:bg-[#2E2E2E] outline-none bg-[#24242412] rounded-[30px] focus:ring-primary-600 focus:border-primary-600 text-gray-900 placeholder-gray-400"
                    />
                    <ErrorMessage
                      name="lastName"
                      component="p"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div> */}
                </div>
                <div className="mb-4">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full p-3 dark:text-[#FFFFFF] dark:bg-[#2E2E2E] outline-none bg-[#24242412] rounded-[30px] focus:ring-primary-600 focus:border-primary-600 text-gray-900 placeholder-gray-400"
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Password Field */}
                <div className="relative mb-4">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className="w-full p-3 dark:text-[#FFFFFF] outline-none dark:bg-[#2E2E2E] bg-[#24242412] rounded-[30px] focus:ring-primary-600 focus:border-primary-600 text-gray-900 placeholder-gray-400"
                  />
                  <span
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                  >
                    <img
                      src={showPassword ? closeeye : openeye}
                      alt={showPassword ? "Hide Password" : "Show Password"}
                      className="w-6 h-6"
                    />
                  </span>
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Confirm Password Field */}
                {/* <div className="relative mb-4">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="w-full p-3 dark:text-[#FFFFFF] dark:bg-[#2E2E2E] outline-none bg-[#24242412] rounded-[30px] focus:ring-primary-600 focus:border-primary-600 text-gray-900 placeholder-gray-400"
                  />
                  <span
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                  >
                    <img
                      src={showPassword ? closeeye : openeye}
                      alt={showPassword ? "Hide Password" : "Show Password"}
                      className="w-6 h-6"
                    />
                  </span>
                  <ErrorMessage
                    name="confirmPassword"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div> */}

                <div className="mt-[2rem]">
                  <ReusableButton btnText="Sign Up" ownStyle="w-full" />
                </div>
                <div className="flex items-center mb-[2rem] mt-[2rem]">
                  <div className="flex-grow border-t dark:border-[#FFFFFF]"></div>
                  <span className="mx-4 text-[#242424] text-[16px] font-inter dark:text-[#FFFFFF]">
                    Or
                  </span>
                  <div className="flex-grow border-t dark:border-[#FFFFFF]"></div>
                </div>
              </Form>
            )}
          </Formik>
          <div>
            <ReusableButton
              // onClick={handleGoogleSignIn}
              btnText="Sign up with Google"
              bgColor="bg-white"
              ownStyle="w-full"
              showGoogleIcon
            />
          </div>
        </div>
        <div>
          <p className="text-center text-[16px] text-[#242424]">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="underline text-[#242424]"
            >
              Log In
            </Link>{" "}
          </p>
        </div>
      </section>
    </>
  );
};

export default Signup;

import { Form, Formik } from "formik";
import { useState } from "react";
import badamilogo from "../../../assets/badamilogo.svg";
import passeye1 from "../../../assets/passeye1.svg";
import passeye2 from "../../../assets/passeye2.svg";
import CustomFieldErrors from "../../../components/errors/CustomFieldErrors";
import ReusableButton from "../../../components/form-elements/button/ReusableButton";
import ReusableInput from "../../../components/form-elements/input/ReusableInput";
import CustomImage from "../../../components/img/CustomImage";
import { useAuth } from "../../../hooks/useAuth";
import { validationLoginSchema } from "../../../schemas/loginSchema";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loginMutate, isLoading } = useAuth(); // Correctly access useAuth hook

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (formValues) => {
    loginMutate(formValues);
  };

  return (
    <>
      <div className="absolute top-[30px] left-[30px]">
        <CustomImage src={badamilogo} alt="Badami-Logo" />
      </div>
      <section className="auth-bg flex flex-col gap-12 items-center justify-center p-[1rem] ">
        <div className="flex justify-center "></div>
        <div className="w-full max-w-[462px] p-8 bg-white shadow-md border border-[#24242412] rounded-[20px]">
          <h2 className="text-[20px] font-bold text-[#1E1E1E] font-inter text-left mb-2">
            Log In
          </h2>
          <p className="text-[14px] text-[#1E1E1E] font-inter text-left mb-4">
            Please enter yours email and password to log in into your account
          </p>

          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={validationLoginSchema}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <Form>
                <div className="mb-4">
                  <label
                    htmlFor="Email"
                    className="text-[13px] text-[#1E1E1E] font-[600]"
                  >
                    Email
                  </label>

                  <ReusableInput
                    inpType="email"
                    inpName="email"
                    inpPlaceholder="Enter Email"
                  />
                  <CustomFieldErrors name={"email"} />
                </div>
                <div className="relative mb-4">
                  <label
                    htmlFor="Password"
                    className="text-[13px] text-[#1E1E1E] font-[600]"
                  >
                    Password
                  </label>
                  <ReusableInput
                    inpType={showPassword ? "text" : "password"}
                    inpName="password"
                    inpPlaceholder="Enter Password"
                  />

                  <span
                    onClick={togglePasswordVisibility}
                    className="absolute top-[3rem] right-3 flex items-center cursor-pointer"
                  >
                    <img
                      src={showPassword ? passeye2 : passeye1}
                      alt={showPassword ? "Hide Password" : "Show Password"}
                      className="w-6 h-6"
                    />
                  </span>
                  <CustomFieldErrors name={"password"} />
                </div>
                <div className="flex justify-between items-center mb-[2rem] mt-[1.5rem]">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      className="w-4 h-4 mr-2 accent-custom-green "
                    />
                    <label
                      htmlFor="rememberMe"
                      className="text-[15px] text-[#1E1E1E] font-inter"
                    >
                      Remember Me
                    </label>
                  </div>
                </div>

                <div>
                  {" "}
                  <ReusableButton
                    disabled={isLoading}
                    isLoading={isLoading}
                    btnText="Log In"
                    ownStyle="w-full text-[14px] text-[#FFFFFF] rounded-[8px] btn-gradient-green"
                  />{" "}
                </div>
                <div className="flex items-center mb-[20px] mt-[20px] justify-center">
                  <span className="mx-4 text-[#1E1E1E] text-[13px] font-inter">
                    Forgot password?
                  </span>
                </div>
              </Form>
            )}
          </Formik>

          <div>
            {" "}
            <ReusableButton
              btnText="Reset Password"
              ownStyle="w-full text-[14px] hover:text-white hover:bg-gradient-to-b hover:from-[#23AE24] hover:to-[#179318] hover:no-repeat text-[#1E1E1E] rounded-lg bg-white shadow-[0px_0px_10px_rgba(0,0,0,0.05)] border border-[#1E1E1E1A] opacity-100"
            />{" "}
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;

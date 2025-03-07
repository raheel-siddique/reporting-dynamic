import React, { useState } from "react";
import ReusableInput from "../form-elements/input/ReusableInput";
import { Formik, Form, Field, ErrorMessage } from "formik";
import CloseIcon from "../../icons/CloseIcon";
import { addUserSchema, editUserSchema } from "../../schemas/userSchema";
import CustomCheckbox from "../../components/form-elements/CustomCheckbox";
import { CustomSelect } from "../../components/Common/CustomSelect";
import { toast } from "react-toastify";
import PhoneInputField from "../../components/form-elements/input/PhoneInputField";

const UserModal = ({
  title,
  onClose,
  addUserMutation,
  editUserMutation,
  selectedUser,
  setSelectedUser,
}) => {
  const [dialCode, setDialCode] = useState(null);

  const handleSubmit = (formValues) => {
    try {
      if (selectedUser) {
        editUserMutation({
          ...formValues,
          id: selectedUser.id,

          phoneCountryCode: dialCode,
        });
        setSelectedUser(null);
      } else {
        addUserMutation({
          ...formValues,

          phoneCountryCode: dialCode,
        });
      }
      onClose();
    } catch (err) {
      toast.error("error", err);
    }
    // addBuildingMutation(payload); // Call the addBuilding API
    // onClose();
  };

  let initialValues = {
    fullName: selectedUser ? selectedUser.fullName : "",
    email: selectedUser ? selectedUser.email : "",
    phoneNumber: selectedUser ? selectedUser.phoneNumber : "",
    roles: selectedUser ? [...selectedUser.roles] : [],
    isActive: selectedUser ? selectedUser.isActive : true,
  };

  if (!selectedUser) {
    initialValues = {
      ...initialValues,
      password: selectedUser ? selectedUser.password : "",
    };
  }

  const getErrorMessageField = ({
    name,
    component = "p",
    className = "text-red-500 text-sm mt-1",
  }) => {
    return (
      <ErrorMessage name={name} component={component} className={className} />
    );
  };

  const options = [
    { value: "Admin", label: "Admin" },
    { value: "User", label: "User" },
  ];

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
                validationSchema={selectedUser ? editUserSchema : addUserSchema}
                onSubmit={handleSubmit}
              >
                {({ values, errors, touched, isSubmitting, setFieldValue }) => (
                  <Form>
                    <div>
                      {/* Two fields in one line */}
                      <div className="flex gap-4 p-5">
                        {/* Full Name */}
                        <div className="w-1/2">
                          <label
                            htmlFor="fullName"
                            className="text-[13px] text-[#1E1E1E] font-medium"
                          >
                            Full Name
                          </label>
                          <ReusableInput
                            inpType="text"
                            inpName="fullName"
                            inpPlaceholder="Enter Full Name"
                          />
                          {getErrorMessageField({ name: "fullName" })}
                        </div>

                        {/* Email */}
                        <div className="w-1/2">
                          <label
                            htmlFor="email"
                            className="text-[13px] text-[#1E1E1E] font-medium"
                          >
                            Email
                          </label>
                          <ReusableInput
                            inpType="email"
                            inpName="email"
                            inpPlaceholder="Enter Email Address"
                          />
                          {getErrorMessageField({ name: "email" })}
                        </div>
                      </div>

                      {/* Phone & Password Fields Here */}
                      <div className="flex gap-4 p-5 pt-0">
                        {/* Phone */}
                        <div className="w-1/2">
                          <PhoneInputField
                            name="phoneNumber"
                            value={values.phoneNumber}
                            onChange={(phoneNumber, countryData) => {
                              setFieldValue("phoneNumber", phoneNumber);
                              setDialCode(countryData.countryCode);
                            }}
                          />
                        </div>

                        {/* Password */}
                        {!selectedUser && (
                          <div className="w-1/2">
                            <label
                              htmlFor="password"
                              className="text-[13px] text-[#1E1E1E] font-medium"
                            >
                              Password
                            </label>
                            <ReusableInput
                              inpType="password"
                              inpName="password"
                              inpPlaceholder="Enter Password"
                            />
                            {getErrorMessageField({ name: "password" })}
                          </div>
                        )}
                      </div>

                      <hr />

                      <div className="flex flex-col p-5">
                        <span className="font-semibold">Assign Role</span>

                        <div className="custom-select mt-5 relative">
                          <Field
                            name="roles"
                            component={CustomSelect}
                            options={options}
                            isMulti={true} // Enabling multiple selections
                          />
                          {/* Displaying Errors */}
                          {errors.roles && touched.roles && (
                            <div className="text-red-500 text-sm mt-1">
                              {errors.roles}
                            </div>
                          )}
                        </div>

                        <div className="flex mt-3 items-center">
                          <CustomCheckbox name="isActive" label="Active" />
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="flex justify-center items-center p-5 gap-4 border-t border-custom-gray rounded-[10px]">
                        <button
                          onClick={onClose}
                          type="button"
                          className="text-sm w-[66px] border border-custom-gray text-[#1E1E1E] hover:text-white hover:bg-custom-gradient-red group cursor-pointer py-2 rounded-md"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          // disabled={isSubmitting}
                          className="text-sm w-[66px] cursor-pointer p-2 rounded-md border text-white bg-custom-gradient-green active:bg-custom-gradient-green"
                        >
                          {selectedUser ? "Update" : "Add"}
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserModal;

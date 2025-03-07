import { useState } from "react";
import ReusableModal from "../../components/modal/ReusableModal";
import ReusableInput from "../../components/form-elements/input/ReusableInput";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// import Dropdown from "components/PaginationDropdown/Dropdown";
import Dropdownfield from "../../components/DropdownField/Dropdownfield.jsx";
import DatePickerField from "../../components/DatePicker/DatePickerField";
const AddNewLease = () => {
  const handleDateChange = (date) => {
  };
  const [showLoginModal, setShowLoginModal] = useState(false);
  const closeModal = () => setShowLoginModal(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  return (
    <div className="p-5">
      <div className="mb-4 flex justify-between">
        <ul className="flex items-center">
          <li className="inline-flex items-center">
            <a
              href="#"
              className="text-[#898989] hover:text-custom-green text-sm"
            >
              Tenants
            </a>
            <span className="mx-1.5 h-auto text-[#898989] font-medium">/</span>
          </li>
          <li className="inline-flex items-center">
            <a
              href="#"
              className="text-[#898989] hover:text-custom-green text-sm"
            >
              Add New Tenant
            </a>
            <span className="mx-1.5 h-auto text-[#898989] font-medium">/</span>
          </li>
          <li className="inline-flex items-center">
            <a href="#" className="text-custom-green text-sm">
              Add New Lease
            </a>
          </li>
        </ul>
        <div className="flex justify-center items-center gap-4">
          <button
            type="button"
            className="text-sm w-[66px] bg-white border border-custom-gray text-[#1E1E1E] hover:text-white hover:bg-custom-gradient-red group cursor-pointer py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            type="button"
            className="text-sm w-[66px] cursor-pointer p-2 rounded-md border text-white bg-custom-gradient-green active:bg-custom-gradient-green"
          >
            Add
          </button>
        </div>
      </div>
      <div className="mb-4 p-5 bg-white border border-custom-gray rounded-[10px]">
        <h2 className="text-xl leading-5 text-black font-semibold mb-6">
        Lease (1)
        </h2>
        {/* Formik form */}
        <Formik
          initialValues={{ email: "admin@example.com", password: "Admin@123" }}
          validationSchema={validationSchema}
        >
          {({ values }) => (
            <Form>
              <div className="grid grid-cols-4 gap-4">
                <div>
                 <DatePickerField 
                  label={'Lease Start Date'}
                  onDateChange={handleDateChange}
                  inputClassName='border-[#E8E7E7] dark:border-gray-800 hover:border-[#03047B] bg-white' 
                />
                </div>
                <div>
                 <DatePickerField 
                  label={'Lease End Date'}
                  onDateChange={handleDateChange}
                  inputClassName='border-[#E8E7E7] dark:border-gray-800 hover:border-[#03047B] bg-white' 
                />
                </div>
                <div>
                 <DatePickerField 
                  label={'No. Of Days'}
                  onDateChange={handleDateChange}
                  inputClassName='border-[#E8E7E7] dark:border-gray-800 hover:border-[#03047B] bg-white' 
                />
                </div>
                <div>
                  <Dropdownfield label="Location" placeholder="Date Checked" />
                </div>
                <div>
                 <DatePickerField 
                  label={'Transfer Date'}
                  onDateChange={handleDateChange}
                  inputClassName='border-[#E8E7E7] dark:border-gray-800 hover:border-[#03047B] bg-white' 
                />
                </div>
                <div>
                  <label
                    htmlFor="Email"
                    className="text-[13px] text-[#1E1E1E] font-medium"
                  >
                    Annual Rent
                  </label>

                  <ReusableInput
                    inpType="id"
                    inpName="id"
                    inpPlaceholder="Enter ID # (Optional)"
                  />

                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <Dropdownfield
                    label="Rent Checked"
                    placeholder="Enter Rent Checked"
                  />
                </div>
                <div>
                  <label
                    htmlFor="Email"
                    className="text-[13px] text-[#1E1E1E] font-medium"
                  >
                    Rent Per Day
                  </label>

                  <ReusableInput
                    inpType="id"
                    inpName="id"
                    inpPlaceholder="Enter Rent Per Day"
                  />

                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="Email"
                    className="text-[13px] text-[#1E1E1E] font-medium"
                  >
                    Seller Use Days
                  </label>

                  <ReusableInput
                    inpType="id"
                    inpName="id"
                    inpPlaceholder="Enter Use Days"
                  />

                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="Email"
                    className="text-[13px] text-[#1E1E1E] font-medium"
                  >
                    Seller Rent
                  </label>

                  <ReusableInput
                    inpType="id"
                    inpName="id"
                    inpPlaceholder="Enter Seller Rent"
                  />

                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="Email"
                    className="text-[13px] text-[#1E1E1E] font-medium"
                  >
                    Buyer Days
                  </label>

                  <ReusableInput
                    inpType="id"
                    inpName="id"
                    inpPlaceholder="Enter Buyer Days"
                  />

                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="Email"
                    className="text-[13px] text-[#1E1E1E] font-medium"
                  >
                    Buyer Rent
                  </label>

                  <ReusableInput
                    inpType="id"
                    inpName="id"
                    inpPlaceholder="Enter Buyer Rent"
                  />

                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="Email"
                    className="text-[13px] text-[#1E1E1E] font-medium"
                  >
                    Total Yearly Rent
                  </label>

                  <ReusableInput
                    inpType="id"
                    inpName="id"
                    inpPlaceholder="Enter Total Yearly Rent"
                  />

                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <button
          onClick={() => {
            navigate("/tenants/addnewlease");
          }}
        className="m-auto bg-white flex justify-center items-center gap-[10px] w-auto rounded-[10px] border border-custom-gray p-2.5 py-1.5 text-[14px] text-[#1E1E1E] hover:bg-custom-gradient-green hover:text-white group"
      >
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
        Add Another
      </button>
    </div>
  );
};

export default AddNewLease;

import { useEffect, useState } from "react";
import { useMyLocations } from "../../hooks/useMyLocations";
import ReusableInput from "../form-elements/input/ReusableInput";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";

const AddNewBuildingForm = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(100);
  const { locationsData } = useMyLocations(page, pageSize);

  const [buildings, setBuildings] = useState([]);

  const handleSubmit = (formValues) => {
    signInMutation.mutate(formValues);
  };

  const closeModal = () => setShowLoginModal(false);
  const openModal = () => setShowLoginModal(true);

  const validationSchema = Yup.object({
    locationName: Yup.string().required("Location name is required"), // Add required validation with a custom error message
  });

  return (
    <>
      {/* Formik form */}
      <Formik
        initialValues={{ locationName: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form>
            <div>
           <div className="p-5">
           <label
                htmlFor="Email"
                className="text-[13px] text-[#1E1E1E] font-medium"
              >
                Location Name
              </label>

              <ReusableInput
                inpType="text"
                inpName="locationName"
                inpPlaceholder="Enter Location Name"
              />

              <ErrorMessage
                name="locationName"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
           </div>

              <div className="p-5 flex justify-center items-center gap-4 border-t border-custom-gray rounded-[10px]">
                <button
                  onClick={closeModal}
                  type="button"
                  className="text-sm w-[66px] border border-custom-gray text-[#1E1E1E] hover:text-white hover:bg-custom-gradient-red group cursor-pointer py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-sm w-[66px] cursor-pointer p-2 rounded-md border text-white bg-custom-gradient-green active:bg-custom-gradient-green"
                >
                  Add
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddNewBuildingForm;

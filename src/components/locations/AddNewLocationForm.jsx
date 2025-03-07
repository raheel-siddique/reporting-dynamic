import { useEffect, useState } from "react";
import { useMyLocations } from "../../hooks/useMyLocations";
import ReusableInput from "../form-elements/input/ReusableInput";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";

const AddNewLocationForm = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(100);
  const { locationsData } = useMyLocations(page, pageSize);

  const [activeLocation, setActiveLocation] = useState(null);
  const [activeBuilding, setActiveBuilding] = useState(null);
  const [singleLocation, setSingleLocation] = useState(null);

  const [buildings, setBuildings] = useState([]);

  const handleSubmit = (formValues) => {
    signInMutation.mutate(formValues);
  };

  useEffect(() => {
    if (locationsData && locationsData.length > 0) {
      let locFirstData = locationsData[0].id;
      setActiveLocation(locFirstData);
      setSingleLocation(locationsData[0]);
      setBuildings(locationsData[0].buildings || []);
    }
  }, [locationsData]);

  useEffect(() => {
    if (buildings) {
      let buildFirstData = buildings[0]?.id;
      setActiveBuilding(buildFirstData);
    }
  }, [buildings]);

  const handleLocationClick = (location) => {
    setActiveLocation(location.id);
    setSingleLocation(location);
    setBuildings(location.buildings || []);
  };

  const handleBuildingClick = (building) => {
    setActiveBuilding(building.id);
  };
  const closeModal = () => setShowLoginModal(false);
  const openModal = () => setShowLoginModal(true);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  return (
    <>
      {/* Formik form */}
      <Formik
        initialValues={{ email: "admin@example.com", password: "Admin@123" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form>
            <div>
              <label
                htmlFor="Email"
                className="text-[13px] text-[#1E1E1E] font-medium"
              >
                Building name
              </label>

              <ReusableInput
                inpType="name"
                inpName="name"
                inpPlaceholder="Enter Building Name"
              />

              <ErrorMessage
                name="name"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddNewLocationForm;

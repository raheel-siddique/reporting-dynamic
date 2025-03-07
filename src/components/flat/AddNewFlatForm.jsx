import { useEffect, useState } from "react";
import { useMyLocations } from "../../hooks/useMyLocations";
import ReusableInput from "../form-elements/input/ReusableInput";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import AddBuildingBtn from "../../components/buildings/AddBuildingBtn";

const AddNewFlatForm = () => {
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
            <div className="flex justify-end items-center space-x-2 relative top-[1.4rem]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12.121"
                height="12.121"
                viewBox="0 0 12.121 12.121"
              >
                <g
                  id="Group_23361"
                  data-name="Group 23361"
                  transform="translate(-720.939 -167.939)"
                >
                  <path
                    id="Path_38328"
                    data-name="Path 38328"
                    d="M16,6,6,16"
                    transform="translate(716 163)"
                    fill="none"
                    stroke="#d82323"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                  <path
                    id="Path_38329"
                    data-name="Path 38329"
                    d="M6,6,16,16"
                    transform="translate(716 163)"
                    fill="none"
                    stroke="#d82323"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </g>
              </svg>

              <h1 className="text-[13px] text-[#D82323]">Remove</h1>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="Flat #"
                  className="text-[13px] text-[#1E1E1E] font-medium"
                >
                  Flat #
                </label>

                <ReusableInput
                  inpType="name"
                  inpName="name"
                  inpPlaceholder="01"
                />

                <ErrorMessage
                  name="name"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <label
                  htmlFor="Email"
                  className="text-[13px] text-[#1E1E1E] font-medium"
                >
                  Flat Type
                </label>

                <ReusableInput
                  inpType="name"
                  inpName="name"
                  inpPlaceholder="Studio"
                />

                <ErrorMessage
                  name="name"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>

            <div className="pt-[20px]">
              <label
                htmlFor="Email"
                className="text-[13px] text-[#1E1E1E] font-medium"
              >
                Description
              </label>

              <ReusableInput
                inpType="name"
                inpName="name"
                inpPlaceholder="Lorem Ipsum is simply dummy text of the printing."
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
      <div className="flex justify-center items-center border-t w-full border-custom-gray mt-5 pt-5">
        <AddBuildingBtn />
      </div>
    </>
  );
};

export default AddNewFlatForm;

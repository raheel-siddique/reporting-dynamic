import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";

import ReusableInput from "../../components/form-elements/input/ReusableInput";
import { CustomSelect } from "../../components/Common/CustomSelect";
import { useCloudConfig } from "../../hooks/useCloudConfig";
import { useUser } from "../../hooks/useUser";

export default function CloudConfiguration() {
  const { createCloudConfig, providersData, isAddingConfig, regionsData } = useCloudConfig();

  const { users } = useUser({});

  const initialValues = {
    providerId: "",
    userId: "",
    region: "",
    accessKey: "",
    secretKey: "",
  };

  console.log('regionsData::', regionsData)

  const providerOptions = providersData?.map((providers) => ({
    value: providers?.name,
    label: providers?.name,
  }));

console.log('userss',users)

  const userOptions = users?.map((u) => ({
    value: u.id,
    label: u.username,
  }));

  // const regionOptions = regionsData?.map((r) => ({
  //   value: r?.name,
  //   label: r?.displayName,
  // }));

  const regionOptions = [
    { value: "us-east-1", label: "US East (N. Virginia)" },
    { value: "us-west-1", label: "US West (N. California)" },
    { value: "ap-south-1", label: "Asia Pacific (Mumbai)" },
    { value: "eu-central-1", label: "Europe (Frankfurt)" },
  ];

  const validationSchema = Yup.object({
    provider: Yup.string().required("Provider is required"),
    userId: Yup.string().required("User is required"),
    region: Yup.string().required("Region is required"),
    accessKey: Yup.string()
      .trim()
      .min(4, "Access key must be at least 4 characters")
      .required("Access key is required"),
    secretKey: Yup.string()
      .trim()
      .min(4, "Secret key must be at least 4 characters")
      .required("Secret key is required"),
  });

  const handleSubmit =  (values, { resetForm }) => {
    try {
       createCloudConfig(values);
      resetForm();
    } catch (err) {
      toast.error("Failed to save configuration");
    }
  };

  const getErrorMessageField = ({
    name,
    component = "p",
    className = "text-red-500 text-sm mt-1",
  }) => (
    <ErrorMessage name={name} component={component} className={className} />
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Configure Cloud Access
        </h2>

        <Formik
  validationSchema={validationSchema}
  initialValues={initialValues}
  onSubmit={handleSubmit}
>
  {() => (
    <Form className="space-y-6">
      {/* Row 1: Provider & User */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Provider */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Provider
          </label>
          <Field
            name="provider"
            component={CustomSelect}
            options={providerOptions}
          />
          {getErrorMessageField({ name: "provider" })}
        </div>

        {/* User */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select User
          </label>
          <Field
            name="userId"
            component={CustomSelect}
            options={userOptions}
          />
          {getErrorMessageField({ name: "userId" })}
        </div>
      </div>

      {/* Row 2: Region & Access Key */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Region */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Region
          </label>
          <Field
            name="region"
            component={CustomSelect}
            options={regionOptions}
          />
          {getErrorMessageField({ name: "region" })}
        </div>

        {/* Access Key */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Access Key
          </label>
          <ReusableInput
            inpType="text"
            inpName="accessKey"
            inpPlaceholder="Enter Access Key"
          />
          {getErrorMessageField({ name: "accessKey" })}
        </div>
      </div>

      {/* Row 3: Secret Key */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Secret Key
        </label>
        <ReusableInput
          inpType="password"
          inpName="secretKey"
          inpPlaceholder="Enter Secret Key"
        />
        {getErrorMessageField({ name: "secretKey" })}
      </div>

      {/* Submit */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isAddingConfig}
          className="px-6 py-2.5 bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg hover:opacity-95 transition shadow-md disabled:opacity-50"
        >
          {isAddingConfig ? (
            <div className="flex items-center gap-2">
              <div className="loader w-4 h-4 border-2 border-t-transparent border-gray-500 rounded-full animate-spin"></div>
              <span>Processing...</span>
            </div>
          ) : (
            "Save Configuration"
          )}
        </button>
      </div>
    </Form>
  )}
</Formik>

      </div>
    </div>
  );
}

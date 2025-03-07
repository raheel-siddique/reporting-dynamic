import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import CustomFieldErrors from "../../../components/errors/CustomFieldErrors";

const PhoneInputField = ({
  label = "Phone",
  value,
  name = "phone",
  onChange,
  country = "ae",
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="text-[13px] text-[#1E1E1E] font-medium">
          {label}
        </label>
      )}

      <PhoneInput
        enableSearch
        country={country}
        value={value}
        onChange={(phone, countryData) => {
          if (onChange) {
            onChange(phone, countryData);
          }
        }}
        inputProps={{
          name: name,
          autoFocus: false,
        }}
        inputClass="rounded-lg border border-[#1E1E1E1A] hover:border-custom-green text-black placeholder:text-[#959595] focus-visible:!outline-custom-green placeholder:text-[14px] text-[14px]"
      />

      <CustomFieldErrors name={name} />
    </div>
  );
};

export default PhoneInputField;

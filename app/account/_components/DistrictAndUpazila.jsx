"use client";

import Select from "react-select";

export default function DistrictAndUpazila({
  setAddress,
  value,
  options,
  ...props
}) {
  const customFilter = (option, inputValue) => {
    if (!inputValue) return true;

    const search = inputValue?.toLowerCase();
    return option.value.name?.toLowerCase()?.includes(search);
  };
  return (
    <>
      <Select
        {...props}
        value={value}
        onChange={setAddress}
        filterOption={customFilter}
        options={options}
        noOptionsMessage={() => "কোন অপশন খুঁজে পাওয়া যাইনি"}
      />
    </>
  );
}

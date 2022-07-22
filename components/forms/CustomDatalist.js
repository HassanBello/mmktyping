import React from "react";

export default function CustomDataList ({
  value,
  change,
  title,
  id,
  listName,
  options,
  inputType,
  ...others
}) {
  return (
    <div className="w-full flex flex-col p-3 border border-purple-500 bg-white rounded-md">
      <label className="text-base font-600 capitalize" htmlFor={id}>{title}</label>
      <input
        className="w-full border-0 outline-none focus:outline-none active:outline-none text-base text-black"
        list={listName}
        id={id}
        type={inputType}
        onChange={(e)=> change(e.target.value)}
        {...others}
      />
      <datalist id={listName}>
        {options.map((option, index) => (
          <option value={option} key={index}>option</option>
        ))}
      </datalist>
      
    </div>
  );
};
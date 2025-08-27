import React from "react";

interface InputProps {
  name: string;
  onChange: any;
  onBlur?: any;
  value: string;
  label: string;
  type?: string;
}

const Input: React.FC<InputProps> = ({
  name,
  onChange,
  onBlur,
  value,
  label,
  type,
}) => {
  return (
    <div className="relative">
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        type={type || "text"}
        className="block mt-6 w-80 rounded-md border justify-center border-black/20 bg-white px-6 pt-6 pb-1 text-md text-black appearance-none focus:outline-none focus:ring-0 peer"
        placeholder=" "
      />
      <label
        htmlFor={name}
        className="absolute text-md text-gray-500 duration-150 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
      >
        {label}
      </label>
    </div>
  );
};

export default Input;

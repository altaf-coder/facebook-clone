import React from "react";
interface Props {
  changer: "login" | "signup";
  label: string;
  type: string;
}
const Button: React.FC<Props> = ({ changer, label, type }) => {
  return (
    <button
      className={`w-full mt-6 text-white font-semibold py-2 rounded-md shadow-md transition 
        ${
          changer === "login"
            ? "bg-[#1877F2] hover:bg-[#166FE5]"
            : "bg-[#42b72a] hover:bg-[#36a420]"
        }`}
      type="submit"
    >
      {label}
    </button>
  );
};

export default Button;

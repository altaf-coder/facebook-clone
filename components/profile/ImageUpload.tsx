"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface ImageUploadProps {
  onChange: (base64: string) => void;
  value?: string;
  label?: string;
  disabled?: boolean;
  variant?: "profile" | "cover";
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  value,
  label,
  disabled,
  variant,
}) => {
  const { data: user } = useCurrentUser();
  const [base64, setBase64] = useState(value);
  const handleChange = useCallback(
    (base64: string) => {
      onChange(base64);
    },
    [onChange]
  );
  const handleDrop = useCallback(
    (files: any) => {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event: any) => {
        setBase64(event.target.result);
        handleChange(event.target.result);
      };
      reader.readAsDataURL(file);
    },
    [handleChange]
  );
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    disabled,
    onDrop: handleDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });
  return (
    <div
      {...getRootProps({
        className:
          "w-full p-4 text-white text-center rounded-md border-neutral-700",
      })}
    >
      <input {...getInputProps()} />
      {base64 ? (
        <div className="flex justify-center items-center">
          <Image
            src={base64}
            height={variant === "profile" ? 100 : 50}
            width={variant === "profile" ? 100 : 50}
            alt="Uploaded Image"
          />
        </div>
      ) : (
        <img
          src={
            variant === "profile"
              ? user?.profileImage || "/images/profile.webp"
              : user?.coverImage || "No cover Image"
          }
          alt=""
        />
      )}
    </div>
  );
};

export default ImageUpload;

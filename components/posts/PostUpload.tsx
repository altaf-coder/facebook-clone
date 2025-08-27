"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { MdPhotoCamera } from "react-icons/md";
interface ImageUploadProps {
  onChange: (base64: string) => void;
  value?: string;
  label?: string;
  disabled?: boolean;
}

const PostUpload: React.FC<ImageUploadProps> = ({
  onChange,
  value,
  label,
  disabled,
}) => {
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
          <Image src={base64} height={130} width={130} alt="Uploaded Image" />
        </div>
      ) : (
        <div className="flex items-center justify-center flex-col">
          <MdPhotoCamera className="w-10 h-10 text-gray-600 text-center" />
          <p className="text-black font-semibold text-xl">{label}</p>
        </div>
      )}
    </div>
  );
};

export default PostUpload;

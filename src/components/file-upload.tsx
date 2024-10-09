"use client";
import React from "react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { FaFilePdf } from "react-icons/fa";

interface FileUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

export const FileUpload = ({
  disabled,
  onChange,
  onRemove,
  value,
}: FileUploadProps) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="sm"
              >
                <Trash className=" w-4 h-4" />
              </Button>
            </div>
            <Image fill src={url} alt="image" className="object-cover" />
          </div>
        ))}
      </div>

      <CldUploadWidget
        onSuccess={onUpload}
        signatureEndpoint="/api/cloudinary-sign-image"
      >
        {({ open }) => {
          const onClick = () => {
            open();
          };
          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={onClick}
              className="text-sm"
            >
              <FaFilePdf className="w-4 h-4 mr-2" />
              Upload a pdf file
            </Button>
          );
        }}
      </CldUploadWidget>
    </>
  );
};

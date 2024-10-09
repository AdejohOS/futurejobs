"use client";
import React from "react";
import {
  CldUploadWidget,
  CldImage,
  type CloudinaryUploadWidgetInfo,
} from "next-cloudinary";

import { useState } from "react";
import { Button } from "./ui/button";
import { FaFilePdf } from "react-icons/fa";
import { Trash } from "lucide-react";

interface FileUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (result: string) => void;
  value: string[];
}

export default function Uploader(props: {}) {
  const [result, setResult] = useState<CloudinaryUploadWidgetInfo>();

  return (
    <>
      <div className="mb-4 flex items-center gap-4">
        {result ? (
          <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => {}}
                variant="destructive"
                size="sm"
              >
                <Trash className=" w-4 h-4" />
              </Button>
            </div>
            <CldImage
              src={result.public_id}
              alt="Uploaded Image"
              fill
              className="object-cover"
            />
          </div>
        ) : null}
      </div>
      <CldUploadWidget
        signatureEndpoint="/api/cloudinary-sign-image"
        onSuccess={(result) => {
          if (typeof result.info === "string") return;
          setResult(result.info);
        }}
      >
        {({ open }) => (
          <Button variant="secondary" onClick={() => open()} type="button">
            <FaFilePdf className="w-4 h-4 mr-2" />
            Upload an image
          </Button>
        )}
      </CldUploadWidget>
    </>
  );
}

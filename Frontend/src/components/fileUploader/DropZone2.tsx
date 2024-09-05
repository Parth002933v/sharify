import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useUploadFileMutation } from "@/features/file/fileApi";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

export default function DropZone2() {
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const [uploadFile, { isLoading, isSuccess, data }] =
    useUploadFileMutation();

  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setFile(file);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files?.[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        console.log(formData, "handleUpload");

        await uploadFile(formData);
        toast({
          description: "File uploaded successfully!",
        });
      } catch (err) {
        toast({
          description: "Error uploading file",
          variant: "destructive",
        });
      }
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(data?.data.secureUrl || "")
      .then(() => {
        toast({
          description: "Link copied to clipboard!",
        });
      })
      .catch((error) => {
        console.error("Failed to copy link:", error);
      });
  };

  useEffect(() => {
    if (isSuccess == true) {
      setFile(null);
    }
  }, [isSuccess]);
  return (
    <div
      className={`relative rounded-lg border-2 border-dashed bg-gray-100 p-6 ${file ? "bg-blue-50" : "bg-gray-100"}`}
      onDrop={handleFileDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      {!file ? (
        // bfore file delection
        <div className="flex flex-col items-center justify-center">
          <p className="text-gray-600">
            Drag and drop a file here, or click to select a file
          </p>
          <Input
            type="file"
            className="hidden"
            onChange={handleFileSelect}
            id="fileInput"
          />
          <label
            htmlFor="fileInput"
            className="cursor-pointer rounded bg-blue-500 p-2 text-white"
          >
            Choose File
          </label>
        </div>
      ) : (
        // after file select
        <div className="text-center">
          <p className="text-lg font-semibold">Selected file: {file.name}</p>
          <p className="text-lg">
            Size: {(file.size / (1024 * 1024)).toFixed(2)} MB
          </p>
          <button
            className={`mt-4 rounded bg-green-500 p-2 text-white ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
            onClick={handleUpload}
            disabled={isLoading}
          >
            {/* Upload */}
            {isLoading ? "Uploading..." : "Upload"}
          </button>
        </div>
      )}

      {data && (
        <div className="mt-4 text-center">
          <p className="text-lg font-semibold">File Uploaded Successfully</p>
          <div>
            <Link
              target="_blank"
              to={data.data.secureUrl}
              className="mt-2 break-words text-blue-500"
            >
              {data.data.secureUrl}
            </Link>
          </div>
          <button
            className="mt-2 rounded bg-gray-500 p-2 text-white"
            onClick={copyToClipboard}
          >
            Copy Link
          </button>
        </div>
      )}
    </div>
  );
}

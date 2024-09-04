import Benefits from "@/components/fileUploader/Benefits";
import HowtoUse from "@/components/fileUploader/HowtoUse";
import React, { useState } from "react";
import DropZone from "@/components/fileUploader/DropZone";
import DropZone2 from "@/components/fileUploader/DropZone2";

export default function FileUploader() {
  const [file, setFile] = useState(null);

  return (
    <main className="flex flex-col items-center justify-center py-12">
      {/* Drop Zone Section with Background Image */}
      <div className="relative flex w-full flex-col items-center">
        <div className="relative flex w-full items-center justify-center">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{
              backgroundImage: "url('https://via.placeholder.com/1920x1080')",
            }}
          ></div>
          {/* <DropZone setFile={setFile} /> */}
          <DropZone2 />
        </div>

        <blockquote className="mt-6 border-l-4 border-indigo-600 bg-white p-4 italic text-gray-800">
          "Sharing files should be as simple and secure as possible."
        </blockquote>
      </div>

      {/* {file && ( */}
      {/* <div className="mt-4">
        <p className="text-lg text-gray-700">Selected file: file.name</p>
      </div> */}
      {/* )} */}

      {/* How to Use Section */}
      <HowtoUse />

      {/* Benefits Section */}
      <Benefits />
    </main>
  );
}

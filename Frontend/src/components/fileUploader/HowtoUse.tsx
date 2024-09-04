import React from "react";

export default function HowtoUse() {
  return (
    <section className="mt-12 w-4/5 rounded-lg bg-white p-8 shadow-md">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">
        How to Use Sharify
      </h2>
      <div className="flex flex-col gap-8 md:flex-row">
        {/* Part 1 of Usage */}
        <div className="flex-1 text-gray-600">
          <h3 className="mb-2 text-xl font-semibold">Upload Files</h3>
          <p>
            Sharify allows you to upload files quickly. Simply drag and drop
            your file into the designated area or click to open your file
            explorer and choose a file from your device.
          </p>
          <img
            src="https://via.placeholder.com/300x150"
            alt="Upload Files"
            className="w-300 h-150 mx-auto mt-4 object-cover shadow-lg"
          />
        </div>
        {/* Part 2 of Usage */}
        <div className="flex-1 text-gray-600">
          <h3 className="mb-2 text-xl font-semibold">
            Generate Shareable Link
          </h3>
          <p>
            Once your file is uploaded, Sharify generates a secure, shareable
            link. You can copy the link and share it with anyone to allow them
            access to the file.
          </p>
          <img
            src="https://via.placeholder.com/300x150"
            alt="Generate Link"
            className="w-300 h-150 mx-auto mt-4 object-cover shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}

import React, { useState } from "react";

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
        </div>
        <blockquote className="mt-6 border-l-4 border-indigo-600 bg-white p-4 italic text-gray-800">
          "Sharing files should be as simple and secure as possible."
        </blockquote>
      </div>

      {/* {file && (
        <div className="mt-4">
          <p className="text-lg text-gray-700">Selected file: {file.name}</p>
        </div>
      )} */}

      {/* How to Use Section */}
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

      {/* Benefits Section */}
      <section className="mt-12 w-4/5 rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          Benefits of Using Sharify
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Benefit 1 */}
          <div className="text-gray-600">
            <h3 className="mb-2 text-xl font-semibold">Fast Sharing</h3>
            <p>Quickly upload and share files with just a few clicks.</p>
            <img
              src="https://via.placeholder.com/150"
              alt="Fast Sharing"
              className="mt-4 h-40 w-full object-cover shadow-lg"
            />
          </div>
          {/* Benefit 2 */}
          <div className="text-gray-600">
            <h3 className="mb-2 text-xl font-semibold">Secure Links</h3>
            <p>
              Sharify generates secure links ensuring your files are shared
              safely.
            </p>
            <img
              src="https://via.placeholder.com/150"
              alt="Secure Links"
              className="mt-4 h-40 w-full object-cover shadow-lg"
            />
          </div>
          {/* Benefit 3 */}
          <div className="text-gray-600">
            <h3 className="mb-2 text-xl font-semibold">Cloud Storage</h3>
            <p>
              Files are stored in the cloud, so you can access them from
              anywhere.
            </p>
            <img
              src="https://via.placeholder.com/150"
              alt="Cloud Storage"
              className="mt-4 h-40 w-full object-cover shadow-lg"
            />
          </div>
          {/* Benefit 4 */}
          <div className="text-gray-600">
            <h3 className="mb-2 text-xl font-semibold">Easy to Use</h3>
            <p>
              An intuitive and easy-to-use interface simplifies file sharing.
            </p>
            <img
              src="https://via.placeholder.com/150"
              alt="Easy to Use"
              className="mt-4 h-40 w-full object-cover shadow-lg"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

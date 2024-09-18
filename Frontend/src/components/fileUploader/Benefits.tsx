import React from "react";

import cloud from "@/Assets/cloud.jpeg";
import secureImg from "@/Assets/securImg.jpg";
import shareLink from "@/Assets/shareLink.jpg";
import easy from "@/Assets/easy.jpg";
import link from "@/Assets/file-upload.png";

export default function Benefits() {
  return (
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
            src={shareLink}
            alt="Fast Sharing"
            className="mt-4 h-40 w-full rounded-lg object-cover shadow-lg"
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
            src={secureImg}
            alt="Secure Links"
            className="mt-4 h-40 w-full rounded-lg object-cover shadow-lg"
          />
        </div>
        {/* Benefit 3 */}
        <div className="text-gray-600">
          <h3 className="mb-2 text-xl font-semibold">Cloud Storage</h3>
          <p>
            Files are stored in the cloud, so you can access them from anywhere.
          </p>
          <img
            src={cloud}
            alt="Cloud Storage"
            className="mt-4 h-40 w-full rounded-lg object-cover shadow-lg"
          />
        </div>
        {/* Benefit 4 */}
        <div className="text-gray-600">
          <h3 className="mb-2 text-xl font-semibold">Easy to Use</h3>
          <p>An intuitive and easy-to-use interface simplifies file sharing.</p>
          <img
            src={easy}
            alt="Easy to Use"
            className="mt-4 h-40 w-full rounded-lg object-cover shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}

import { Button } from "../components/ui/button";
import { useHashID } from "@/hooks/useHashID";
import { useNavigate } from "react-router-dom";
import richImg from "../Assets/richText.png";
import plainText from "../Assets/plainText.jpeg";
import fileUpload from "../Assets/file-upload.png";
import { RICHTEXT_PATH, UPLOAD_FILE_PATH } from "@/common/routeConstant.ts";

export default function Dashboard() {
  const navigate = useNavigate();
  const { generateAndSetHash } = useHashID();

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-r from-blue-50 via-purple-100 to-indigo-200 text-gray-800">
      <main className="flex flex-grow flex-col items-center justify-center p-8">
        <h1 className="mb-8 text-center text-6xl font-extrabold text-gray-900">
          Welcome to <span className="text-teal-600">Sharify</span>!
        </h1>
        <p className="mb-16 max-w-4xl text-center text-xl text-gray-700">
          Share your content effortlessly and securely with our versatile
          editors and file uploader. Simple, fast, and intuitive.
        </p>
        <div className="mx-auto mb-16 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
          {/* Plain Text Editor Card */}
          <div className="transform overflow-hidden rounded-lg bg-white shadow-lg transition-transform hover:scale-105">
            <img
              src={plainText}
              alt="Plain Text Editor"
              className="h-48 w-full object-cover"
            />
            <div className="p-6 text-center">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                Plain Text Editor
              </h2>
              <p className="mb-4 text-base text-gray-600">
                Paste and share text easily without formatting. Ideal for quick,
                straightforward content sharing.
              </p>
              <Button
                variant="default"
                className="transform rounded-full bg-teal-500 px-6 py-2 text-white transition-transform hover:scale-105 hover:bg-teal-600"
                onClick={() => generateAndSetHash()}
              >
                Get Started
              </Button>
            </div>
          </div>

          {/* Rich Text Editor Card */}
          <div className="transform overflow-hidden rounded-lg bg-white shadow-lg transition-transform hover:scale-105">
            <img
              src={richImg}
              alt="Rich Text Editor"
              className="h-48 w-full object-cover"
            />
            <div className="p-6 text-center">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                Rich Text Editor
              </h2>
              <p className="mb-4 text-base text-gray-600">
                Customize and format your text with rich editing features.
                Perfect for detailed and styled content.
              </p>
              <Button
                variant="default"
                className="transform rounded-full bg-green-500 px-6 py-2 text-white transition-transform hover:scale-105 hover:bg-green-600"
                onClick={() => navigate(RICHTEXT_PATH)}
              >
                Get Started
              </Button>
            </div>
          </div>

          {/* File Upload Card */}
          <div className="transform overflow-hidden rounded-lg bg-white shadow-lg transition-transform hover:scale-105">
            <img
              src={fileUpload}
              alt="File Upload"
              className="h-48 w-full object-cover"
            />
            <div className="p-6 text-center">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                File Upload
              </h2>
              <p className="mb-4 text-base text-gray-600">
                Upload files and get a unique link to access them anytime,
                anywhere. Simple and secure file sharing.
              </p>
              <Button
                variant="default"
                className="transform rounded-full bg-purple-500 px-6 py-2 text-white transition-transform hover:scale-105 hover:bg-purple-600"
                onClick={() => navigate(UPLOAD_FILE_PATH)}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* New Features & Advantages div */}
      <div className="mx-auto mb-12 w-full max-w-6xl rounded-lg bg-white px-8 py-12 shadow-lg">
        <h2 className="mb-12 text-center text-4xl font-bold text-gray-800">
          Why Choose Sharify?
        </h2>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Feature 1 */}
          <div className="rounded-lg bg-blue-100 p-8 shadow-md">
            <h3 className="mb-4 text-2xl font-semibold text-blue-600">
              Effortless Content Sharing
            </h3>
            <p className="mb-4 text-gray-700">
              With Sharify, you can quickly share text, images, and files with
              just a few clicks. Our editors make it easy to create content and
              generate a shareable link instantly.
            </p>
            <ul className="list-inside list-disc text-gray-600">
              <li>Fast and reliable sharing</li>
              <li>One-click link generation</li>
              <li>No complicated setup required</li>
            </ul>
          </div>

          {/* Feature 2 */}
          <div className="rounded-lg bg-green-100 p-8 shadow-md">
            <h3 className="mb-4 text-2xl font-semibold text-green-600">
              Rich Editing Features
            </h3>
            <p className="mb-4 text-gray-700">
              Our Rich Text Editor gives you the tools you need to create
              beautifully formatted documents. Add bold text, bullet points,
              links, and more with ease.
            </p>
            <ul className="list-inside list-disc text-gray-600">
              <li>Bold, Italic, and Underline options</li>
              <li>Bullet points and numbered lists</li>
              <li>Hyperlinks for external content</li>
            </ul>
          </div>

          {/* Feature 3 */}
          <div className="rounded-lg bg-purple-100 p-8 shadow-md">
            <h3 className="mb-4 text-2xl font-semibold text-purple-600">
              Secure File Sharing
            </h3>
            <p className="mb-4 text-gray-700">
              Upload your files securely and generate unique, password-protected
              links to ensure that only the intended recipients can access your
              content.
            </p>
            <ul className="list-inside list-disc text-gray-600">
              <li>Encrypted file storage</li>
              <li>Password-protected links</li>
              <li>Access from any device</li>
            </ul>
          </div>

          {/* Feature 4 */}
          <div className="rounded-lg bg-indigo-100 p-8 shadow-md">
            <h3 className="mb-4 text-2xl font-semibold text-indigo-600">
              Mobile-Friendly Design
            </h3>
            <p className="mb-4 text-gray-700">
              Whether you're on a desktop, tablet, or smartphone, Sharify adapts
              seamlessly to your device, ensuring an optimal user experience.
            </p>
            <ul className="list-inside list-disc text-gray-600">
              <li>Responsive design for all devices</li>
              <li>Optimized for mobile and tablet use</li>
              <li>Fast loading times</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

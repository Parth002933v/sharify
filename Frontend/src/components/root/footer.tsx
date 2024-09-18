// export default function Footer() {
//   return (
//     <footer className="border-t bg-gray-800 p-4 text-center text-white">
//       <p>&copy; 2024 Sharify. All rights reserved.</p>
//     </footer>
//   );
// }

import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="border-t bg-gray-900 p-6 text-white">
      <div className="container mx-auto flex flex-col items-center justify-between md:flex-row">
        {/* Logo and Copyright */}
        <div className="mb-4 text-center md:mb-0 md:text-left">
          <h1 className="text-2xl font-bold text-teal-400">Sharify</h1>
          <p>&copy; 2024 Sharify. All rights reserved.</p>
        </div>

        {/* Navigation Links */}
        <div className="mb-4 flex space-x-6 md:mb-0">
          <a href="#about" className="transition-colors hover:text-teal-400">
            About Us
          </a>
          <a href="#features" className="transition-colors hover:text-teal-400">
            Features
          </a>
          <Link to="/faq" className="transition-colors hover:text-teal-400">
            FAQ
          </Link>{" "}
          {/* FAQ Link */}
          <a href="#contact" className="transition-colors hover:text-teal-400">
            Contact
          </a>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="transition-colors hover:text-teal-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.92 4.92 0 002.165-2.717 9.86 9.86 0 01-3.127 1.195 4.916 4.916 0 00-8.384 4.482 13.95 13.95 0 01-10.125-5.14 4.917 4.917 0 001.523 6.573 4.9 4.9 0 01-2.229-.616v.06a4.917 4.917 0 003.946 4.827 4.902 4.902 0 01-2.224.084 4.917 4.917 0 004.59 3.417 9.865 9.865 0 01-6.1 2.105c-.395 0-.785-.023-1.17-.068a13.945 13.945 0 007.557 2.212c9.055 0 14.009-7.503 14.009-14.008 0-.213-.005-.425-.015-.636A10.02 10.02 0 0024 4.557z" />
            </svg>
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="transition-colors hover:text-teal-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path d="M22.676 0H1.324C.593 0 0 .592 0 1.324v21.352C0 23.407.593 24 1.324 24h11.495v-9.294H9.689v-3.622h3.13v-2.672c0-3.1 1.892-4.792 4.656-4.792 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.503 0-1.793.715-1.793 1.762v2.308h3.586l-.467 3.622h-3.119V24h6.116C23.407 24 24 23.407 24 22.676V1.324C24 .593 23.407 0 22.676 0z" />
            </svg>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition-colors hover:text-teal-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path d="M22.225 0H1.771C.792 0 0 .772 0 1.729V22.27C0 23.227.792 24 1.771 24h20.452C23.208 24 24 23.227 24 22.27V1.729C24 .772 23.208 0 22.225 0zM7.082 20.451H3.653V9.426h3.429v11.025zm-1.715-12.68a1.99 1.99 0 110-3.979 1.99 1.99 0 010 3.979zm15.35 12.68h-3.43v-5.776c0-1.376-.027-3.144-1.916-3.144-1.918 0-2.212 1.496-2.212 3.037v5.883h-3.429V9.426h3.29v1.507h.048c.458-.87 1.575-1.789 3.244-1.789 3.47 0 4.109 2.287 4.109 5.259v6.048z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

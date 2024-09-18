// import React from "react";
// import { Link } from "react-router-dom";

// export default function Header() {
//   return (
//     <header className="left-0 top-0 w-full bg-indigo-600 p-4 text-white backdrop-blur-[8px]">
//       <div className="mx-auto flex items-center justify-between">
//         <h1 className="container text-2xl font-bold">
//           <Link to="/">Sharify</Link>
//         </h1>
//         {/* <nav>
//                     <Link to="/" className="mx-2">Home</Link>
//                     <Link to="/profile" className="mx-2">Profile</Link>
//                     <div className=" inline-block"> */}
//         {/* <button
//                 onClick={() => setShowOptions(!showOptions)}
//                 className="mx-2 px-4 py-2 bg-blue-700 rounded hover:bg-blue-800"
//               >
//                 Create
//               </button> */}
//         {/* {showOptions && (
//                             <div className="absolute right-0 mt-2 bg-white text-black border border-gray-300 rounded shadow-lg">
//                                 <Link
//                                     to="/editor"
//                                     className="block px-4 py-2 hover:bg-gray-200"
//                                     onClick={() => setShowOptions(false)}
//                                 >
//                                     Rich Text
//                                 </Link>
//                                 <Link
//                                     to="/simple-txt"
//                                     className="block px-4 py-2 hover:bg-gray-200"
//                                     onClick={() => setShowOptions(false)}
//                                 >
//                                     Normal Text
//                                 </Link>
//                             </div>
//                         )} */}
//         {/* </div> */}
//         {/* </nav> */}
//       </div>
//     </header>
//   );
// }

import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="left-0 top-0 w-full bg-gradient-to-r from-blue-400 to-indigo-700 p-4 text-black backdrop-blur-[8px]">
      <div className="mx-auto flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-600">
          <Link to="/" className="transition-colors hover:text-blue-700">
            Sharify
          </Link>
        </h1>

        {/* Navigation */}
        <nav className="space-x-6 text-lg font-medium">
          <Link to="/" className="transition-colors hover:text-blue-500">
            Plain Text Editor
          </Link>
          <Link to="/rich" className="transition-colors hover:text-green-500">
            Rich Text Editor
          </Link>
          <Link
            to="/file-upload"
            className="transition-colors hover:text-purple-500"
          >
            File Upload
          </Link>
        </nav>

        {/* Optional Button for Creating */}
        <Link to="/get-started">
          <button className="ml-4 rounded-full bg-blue-600 px-4 py-2 text-white shadow transition hover:bg-blue-700">
            Get Started
          </button>
        </Link>
      </div>
    </header>
  );
}
    
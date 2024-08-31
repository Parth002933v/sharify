import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="left-0 top-0 w-full bg-blue-500 p-4 text-white backdrop-blur-[8px]">
      <div className="mx-auto flex items-center justify-between">
        <h1 className="container text-2xl font-bold">
          <Link to="/">Sharify</Link>
        </h1>
        {/* <nav>
                    <Link to="/" className="mx-2">Home</Link>
                    <Link to="/profile" className="mx-2">Profile</Link>
                    <div className=" inline-block"> */}
        {/* <button
                onClick={() => setShowOptions(!showOptions)}
                className="mx-2 px-4 py-2 bg-blue-700 rounded hover:bg-blue-800"
              >
                Create
              </button> */}
        {/* {showOptions && (
                            <div className="absolute right-0 mt-2 bg-white text-black border border-gray-300 rounded shadow-lg">
                                <Link
                                    to="/editor"
                                    className="block px-4 py-2 hover:bg-gray-200"
                                    onClick={() => setShowOptions(false)}
                                >
                                    Rich Text
                                </Link>
                                <Link
                                    to="/simple-txt"
                                    className="block px-4 py-2 hover:bg-gray-200"
                                    onClick={() => setShowOptions(false)}
                                >
                                    Normal Text
                                </Link>
                            </div>
                        )} */}
        {/* </div> */}
        {/* </nav> */}
      </div>
    </header>
  );
}

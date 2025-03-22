import { Link } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaNewspaper } from "react-icons/fa6";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-blue-100 shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-blue-700 text-3xl">
          <FaNewspaper />
        </Link>

        {/* Menu Icon for Mobile */}
        <div className="md:hidden">
          {isOpen ? (
            <FiX
              className="w-8 h-8 text-blue-700 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            />
          ) : (
            <FiMenu
              className="w-8 h-8 text-blue-700 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            />
          )}
        </div>

        {/* Menu Links */}
        <div
          className={`md:flex md:items-center md:space-x-8 absolute md:static bg-blue-100 md:bg-transparent left-0 w-full md:w-auto transition-all duration-300 ease-in ${
            isOpen ? "top-16 opacity-100" : "top-[-490px] opacity-0 md:opacity-100"
          }`}
        >
          {/* <Link
            to="/"
            className="block px-4 py-2 text-blue-700 font-normal text-lg hover:text-blue-900"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link> */}
          <Link
            to="/history"
            className="block px-4 py-2 text-blue-700 font-normal text-lg hover:text-blue-900"
            onClick={() => setIsOpen(false)}
          >
            History
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

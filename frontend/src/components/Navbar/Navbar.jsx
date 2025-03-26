import { Link } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX, FiSun, FiMoon, FiUser, FiLogOut } from "react-icons/fi";
import { FaNewspaper } from "react-icons/fa6";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from '../../contexts/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <nav className={`w-full ${darkMode ? "bg-dark-800" : "bg-white/80 backdrop-blur-md"} shadow-sm fixed top-0 left-0 z-50 border-b ${darkMode ? "border-dark-700" : "border-blue-100"}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link 
          to="/" 
          className={`${darkMode ? "text-blue-400" : "text-blue-700"} text-3xl hover:${darkMode ? "text-blue-300" : "text-blue-800"} transition-all duration-300`}
        >
          <FaNewspaper />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/history"
            className={`${darkMode ? "text-blue-400 hover:bg-dark-700" : "text-blue-700 hover:bg-blue-50"} font-medium text-lg hover:${darkMode ? "text-blue-300" : "text-blue-900"} rounded-lg transition-all duration-300 px-4 py-2`}
          >
            History
          </Link>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className={`flex items-center space-x-2 ${darkMode ? "text-blue-400 hover:bg-dark-700" : "text-blue-700 hover:bg-blue-50"} p-2 rounded-full transition-all duration-300`}
              >
                <FiUser className="w-5 h-5" />
                <span className="font-medium">{user.username}</span>
              </button>
              
              {showDropdown && (
                <div 
                  className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg ${darkMode ? "bg-dark-700 border-dark-600" : "bg-white border-gray-200"} border z-50`}
                  onMouseLeave={() => setShowDropdown(false)}
                >
                  <button
                    onClick={logout}
                    className={`block w-full text-left px-4 py-2 ${darkMode ? "text-red-400 hover:bg-dark-600" : "text-red-600 hover:bg-red-50"} flex items-center space-x-2`}
                  >
                    <FiLogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className={`${darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"} text-white font-medium px-4 py-2 rounded-lg transition-all duration-300`}
            >
              Login
            </Link>
          )}

          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${darkMode ? "text-blue-400 hover:bg-dark-700" : "text-blue-700 hover:bg-blue-50"} transition-all duration-300`}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <FiSun className="w-6 h-6" /> : <FiMoon className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${darkMode ? "text-blue-400 hover:bg-dark-700" : "text-blue-700 hover:bg-blue-50"} transition-all duration-300`}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <FiSun className="w-6 h-6" /> : <FiMoon className="w-6 h-6" />}
          </button>

          {isOpen ? (
            <FiX
              className={`w-8 h-8 ${darkMode ? "text-blue-400" : "text-blue-700"} cursor-pointer hover:${darkMode ? "text-blue-300" : "text-blue-800"} transition-all duration-300`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Close menu"
            />
          ) : (
            <FiMenu
              className={`w-8 h-8 ${darkMode ? "text-blue-400" : "text-blue-700"} cursor-pointer hover:${darkMode ? "text-blue-300" : "text-blue-800"} transition-all duration-300`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Open menu"
            />
          )}
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute ${darkMode ? "bg-dark-800" : "bg-white/80 backdrop-blur-md"} left-0 w-full transition-all duration-300 ease-in-out ${
            isOpen ? "top-16 opacity-100" : "top-[-490px] opacity-0"
          }`}
        >
          <Link
            to="/history"
            className={`block px-4 py-3 ${darkMode ? "text-blue-400 hover:bg-dark-700" : "text-blue-700 hover:bg-blue-50"} font-medium text-lg hover:${darkMode ? "text-blue-300" : "text-blue-900"} transition-all duration-300`}
            onClick={() => setIsOpen(false)}
          >
            History
          </Link>

          {user ? (
            <>
              <div className={`px-4 py-3 ${darkMode ? "text-blue-400" : "text-blue-700"} font-medium`}>
                Hello, {user.username}
              </div>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 ${darkMode ? "text-red-400 hover:bg-dark-700" : "text-red-600 hover:bg-red-50"} font-medium flex items-center space-x-2`}
              >
                <FiLogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className={`block px-4 py-3 ${darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"} text-white font-medium text-center`}
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
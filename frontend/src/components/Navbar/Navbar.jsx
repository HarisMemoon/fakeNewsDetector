import { Link } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX, FiSun, FiMoon, FiUser, FiLogOut } from "react-icons/fi";
import { FaNewspaper } from "react-icons/fa6";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from '../../contexts/ThemeContext';
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();

  const menuVariants = {
    open: { 
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: { 
      opacity: 0,
      y: -20,
      transition: { duration: 0.2 }
    }
  };

  return (
    <nav className={`w-full ${darkMode ? "bg-dark-800/90" : "bg-white/90"} backdrop-blur-md shadow-sm fixed top-0 left-0 z-50 border-b ${darkMode ? "border-dark-700" : "border-slate-200"}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo with gradient */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center"
        >
          <Link to="/" className="flex items-center space-x-2">
            <FaNewspaper className={`text-3xl ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
            <span className={`text-xl font-bold ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
              FakeGuard
            </span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              to="/history"
              className={`${darkMode ? "text-slate-300 hover:text-blue-400" : "text-slate-700 hover:text-blue-600"} font-medium px-4 py-2 transition-nav`}
            >
              History
            </Link>
          </motion.div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setShowDropdown(!showDropdown)}
                  className={`flex items-center gap-2 ${darkMode ? "text-slate-300 hover:text-blue-400" : "text-slate-700 hover:text-blue-600"} p-2 rounded-full transition-nav`}
                >
                  <FiUser className="w-5 h-5" />
                  <span className="font-medium">{user.username}</span>
                </motion.button>

                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial="closed"
                      animate="open"
                      exit="closed"
                      variants={menuVariants}
                      className={`absolute right-0 mt-2 w-48 rounded-lg shadow-xl ${darkMode ? "bg-dark-700" : "bg-white"} border ${
                        darkMode ? "border-dark-600" : "border-slate-200"
                      }`}
                    >
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={logout}
                        className={`w-full px-4 py-3 text-left flex items-center gap-2 ${
                          darkMode 
                            ? "text-red-400 hover:bg-dark-600" 
                            : "text-red-600 hover:bg-red-50"
                        } transition-nav`}
                      >
                        <FiLogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  to="/login"
                  className={`bg-gradient-to-r ${darkMode ? "from-blue-600 to-green-600" : "from-blue-500 to-green-500"} text-white px-6 py-2 rounded-xl font-medium shadow-md transition-nav`}
                >
                  Login
                </Link>
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${darkMode ? "text-blue-400" : "text-blue-600"} transition-nav`}
              aria-label={darkMode ? "Light mode" : "Dark mode"}
            >
              {darkMode ? <FiSun className="w-6 h-6" /> : <FiMoon className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${darkMode ? "text-blue-400" : "text-blue-600"}`}
          >
            {darkMode ? <FiSun className="w-6 h-6" /> : <FiMoon className="w-6 h-6" />}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 ${darkMode ? "text-blue-400" : "text-blue-600"}`}
          >
            {isOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`md:hidden fixed inset-x-0 top-16 ${darkMode ? "bg-dark-800" : "bg-white"} shadow-xl border-b ${
                darkMode ? "border-dark-700" : "border-slate-200"
              }`}
            >
              <div className="p-4 space-y-2">
                <Link
                  to="/history"
                  className={`block p-3 rounded-lg ${
                    darkMode 
                      ? "text-slate-300 hover:bg-dark-700" 
                      : "text-slate-700 hover:bg-slate-100"
                  } transition-nav`}
                  onClick={() => setIsOpen(false)}
                >
                  History
                </Link>

                {user ? (
                  <>
                    <div className={`p-3 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                      Signed in as {user.username}
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={logout}
                      className={`w-full p-3 rounded-lg flex items-center gap-2 ${
                        darkMode 
                          ? "text-red-400 hover:bg-dark-700" 
                          : "text-red-600 hover:bg-red-50"
                      } transition-nav`}
                    >
                      <FiLogOut className="w-5 h-5" />
                      Logout
                    </motion.button>
                  </>
                ) : (
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Link
                      to="/login"
                      className={`block p-3 text-center rounded-lg bg-gradient-to-r ${
                        darkMode 
                          ? "from-blue-600 to-green-600" 
                          : "from-blue-500 to-green-500"
                      } text-white font-medium`}
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Link>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
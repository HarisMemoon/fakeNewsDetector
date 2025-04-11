import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiTrash2,
  FiInfo,
  FiShare,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";
import HistoryDetailsModal from "../assets/Modals/HistoryDetailsModal";

const HistoryPage = ({ darkMode }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const itemsPerPage = 5;

  // Mock data - replace with real data from your API
  const historyData = [
    {
      id: 1,
      text: "Breaking: Major scientific discovery reveals...",
      date: "2024-03-15",
      credibility: 92,
      status: "real",
      source: "trustednews.com",
      analysisTime: "2.4s",
    },
    {
      id: 2,
      text: "Celebrity scandal involving political figure...",
      date: "2024-03-14",
      credibility: 34,
      status: "fake",
      source: "unknown-blog.com",
      analysisTime: "1.8s",
    },
    // Add more mock data...
  ];

  const filteredData = historyData.filter(
    (item) =>
      item.text.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedFilter === "all" || item.status === selectedFilter)
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-dark-900" : "bg-gradient-to-br from-blue-50 to-indigo-50"
      } pt-24 p-4 sm:p-8 transition-colors duration-300`}
    >
      <div className="max-w-6xl mx-auto py-10">
        <div className="mb-8">
          <h2
            className={`text-3xl font-bold ${
              darkMode ? "text-blue-400" : "text-blue-800"
            } mb-2`}
          >
            Detection History
          </h2>
          <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Review your previous analysis results and insights
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <FiSearch
              className={`absolute left-3 top-3 ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            />
            <input
              type="text"
              placeholder="Search history..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-lg ${
                darkMode
                  ? "bg-dark-800 border-dark-700 text-gray-300"
                  : "bg-white border-gray-200 text-gray-700"
              } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          <div className="flex gap-2">
            {["all", "real", "fake"].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedFilter === filter
                    ? `${darkMode ? "bg-blue-600" : "bg-blue-500 text-white"}`
                    : `${
                        darkMode
                          ? "bg-dark-800 hover:bg-dark-700"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* History List */}
        <div className="space-y-4">
          <AnimatePresence>
            {paginatedData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`group relative p-6 rounded-xl ${
                  darkMode
                    ? "bg-dark-800 border-dark-700 hover:border-blue-500"
                    : "bg-white border-gray-200 hover:border-blue-400"
                } border-2 transition-all duration-300 shadow-sm`}
              >
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          darkMode ? "bg-dark-700" : "bg-blue-100"
                        }`}
                      >
                        {item.status === "real" ? (
                          <FaRegCheckCircle className="text-2xl text-green-500" />
                        ) : (
                          <FaRegTimesCircle className="text-2xl text-red-500" />
                        )}
                      </div>
                      <div>
                        <h3
                          className={`font-medium ${
                            darkMode ? "text-gray-300" : "text-gray-800"
                          }`}
                        >
                          {item.text.slice(0, 80)}...
                        </h3>
                        <p
                          className={`text-sm ${
                            darkMode ? "text-gray-500" : "text-gray-600"
                          }`}
                        >
                          Analyzed on {item.date} • Source: {item.source}
                        </p>
                      </div>
                    </div>

                    {/* Credibility Meter */}
                    <div className="flex items-center gap-4 mt-4">
                      <div className="relative w-24 h-24">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          <circle
                            className={`${
                              darkMode ? "text-dark-700" : "text-gray-200"
                            }`}
                            strokeWidth="8"
                            stroke="currentColor"
                            fill="transparent"
                            r="44"
                            cx="50"
                            cy="50"
                          />
                          <circle
                            className={`${
                              item.credibility > 70
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                            strokeWidth="8"
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="transparent"
                            r="44"
                            cx="50"
                            cy="50"
                            strokeDasharray={`${
                              (item.credibility / 100) * 276
                            } 276`}
                            transform="rotate(-90 50 50)"
                          />
                        </svg>
                        <span
                          className={`absolute inset-0 flex items-center justify-center text-lg font-bold ${
                            darkMode ? "text-gray-300" : "text-gray-800"
                          }`}
                        >
                          {item.credibility}%
                        </span>
                      </div>
                      <div
                        className={`space-y-1 text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        <p>Analysis time: {item.analysisTime}</p>
                        <p>
                          Source reliability:{" "}
                          {item.status === "real" ? "High" : "Low"}
                        </p>
                        <p>Key phrases detected: 5</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex sm:flex-col gap-2">
                    <button
                      className={`p-2 rounded-lg ${
                        darkMode ? "hover:bg-dark-700" : "hover:bg-gray-100"
                      }`}
                    >
                      <FiShare className="w-5 h-5" />
                    </button>
                    <button
                      className={`p-2 rounded-lg ${
                        darkMode ? "hover:bg-dark-700" : "hover:bg-gray-100"
                      }`}
                    >
                      <FiTrash2 className="w-5 h-5 text-red-500" />
                    </button>
                    <button
                      onClick={() => setSelectedItem(item)}
                      className={`p-2 rounded-lg ${
                        darkMode ? "hover:bg-dark-700" : "hover:bg-gray-100"
                      }`}
                    >
                      <FiInfo className="w-5 h-5 text-blue-500" />
                    </button>
                  </div>
                </div>

                {/* Hover Effect */}
                <div
                  className={`absolute inset-0 rounded-xl border-2 pointer-events-none transition-all duration-300 ${
                    darkMode
                      ? "border-blue-500/20 group-hover:border-blue-500/40"
                      : "border-blue-400/20 group-hover:border-blue-400/40"
                  }`}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8 gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`p-2 rounded-lg ${
              darkMode ? "hover:bg-dark-700" : "hover:bg-gray-100"
            }`}
          >
            <FiChevronLeft className="w-6 h-6" />
          </button>

          {[...Array(Math.ceil(filteredData.length / itemsPerPage))].map(
            (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === i + 1
                    ? `${darkMode ? "bg-blue-600" : "bg-blue-500 text-white"}`
                    : `${darkMode ? "hover:bg-dark-700" : "hover:bg-gray-100"}`
                }`}
              >
                {i + 1}
              </button>
            )
          )}

          <button
            onClick={() =>
              setCurrentPage((p) =>
                Math.min(p + 1, Math.ceil(filteredData.length / itemsPerPage))
              )
            }
            disabled={
              currentPage === Math.ceil(filteredData.length / itemsPerPage)
            }
            className={`p-2 rounded-lg ${
              darkMode ? "hover:bg-dark-700" : "hover:bg-gray-100"
            }`}
          >
            <FiChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Empty State */}
        {filteredData.length === 0 && (
          <div
            className={`text-center py-16 ${
              darkMode ? "text-gray-500" : "text-gray-600"
            }`}
          >
            <p className="text-xl mb-4">No analysis history found</p>
            <p className="text-sm">Your analyzed articles will appear here</p>
          </div>
        )}
      </div>
      {selectedItem && (
        <HistoryDetailsModal
          item={selectedItem}
          darkMode={darkMode}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
};

export default HistoryPage;

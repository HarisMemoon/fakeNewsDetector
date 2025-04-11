import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiExternalLink, FiCopy } from "react-icons/fi";
import { FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";

const HistoryDetailsModal = ({ item, darkMode, onClose }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(item.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal Content */}
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          className={`relative max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-xl shadow-xl ${
            darkMode ? "bg-dark-800" : "bg-white"
          }`}
        >
          {/* Modal Header */}
          <div
            className={`sticky top-0 flex items-center justify-between p-4 border-b ${
              darkMode ? "border-dark-700" : "border-gray-200"
            }`}
          >
            <div className="flex items-center gap-3">
              {item.status === "real" ? (
                <FaRegCheckCircle className="text-2xl text-green-500" />
              ) : (
                <FaRegTimesCircle className="text-2xl text-red-500" />
              )}
              <h3
                className={`text-xl font-semibold ${
                  darkMode ? "text-gray-300" : "text-gray-800"
                }`}
              >
                Analysis Details
              </h3>
            </div>
            <button
              onClick={onClose}
              className={`p-1 rounded-full ${
                darkMode ? "hover:bg-dark-700" : "hover:bg-gray-100"
              }`}
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 space-y-6">
            {/* Content Section */}
            <div>
              <h4
                className={`text-sm font-medium mb-2 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                ANALYZED CONTENT
              </h4>
              <div
                className={`p-4 rounded-lg ${
                  darkMode ? "bg-dark-700" : "bg-gray-100"
                }`}
              >
                <p
                  className={`${darkMode ? "text-gray-300" : "text-gray-800"}`}
                >
                  {item.text}
                </p>
              </div>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={copyToClipboard}
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm ${
                    darkMode ? "hover:bg-dark-700" : "hover:bg-gray-100"
                  }`}
                >
                  <FiCopy className="w-4 h-4" />
                  {copied ? "Copied!" : "Copy"}
                </button>
                <a
                  href={item.sourceUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm ${
                    darkMode ? "hover:bg-dark-700" : "hover:bg-gray-100"
                  }`}
                >
                  <FiExternalLink className="w-4 h-4" />
                  Visit Source
                </a>
              </div>
            </div>

            {/* Analysis Results */}
            <div>
              <h4
                className={`text-sm font-medium mb-2 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                ANALYSIS RESULTS
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  className={`p-4 rounded-lg ${
                    darkMode ? "bg-dark-700" : "bg-gray-100"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Credibility Score
                    </span>
                    <span
                      className={`font-medium ${
                        item.credibility > 70
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {item.credibility}%
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-gray-300 dark:bg-dark-600 overflow-hidden">
                    <div
                      className={`h-full ${
                        item.credibility > 70 ? "bg-green-500" : "bg-red-500"
                      }`}
                      style={{ width: `${item.credibility}%` }}
                    />
                  </div>
                </div>

                <div
                  className={`p-4 rounded-lg ${
                    darkMode ? "bg-dark-700" : "bg-gray-100"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Source Reliability
                    </span>
                    <span
                      className={`font-medium ${
                        item.status === "real"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {item.status === "real" ? "High" : "Low"}
                    </span>
                  </div>
                  <div className="text-sm">
                    {item.source || "Unknown source"}
                  </div>
                </div>
              </div>
            </div>

            {/* Key Indicators */}
            <div>
              <h4
                className={`text-sm font-medium mb-2 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                KEY INDICATORS
              </h4>
              <div className="space-y-3">
                {[
                  { label: "Emotional Language", value: "High", isRisk: true },
                  {
                    label: "Factual Consistency",
                    value: "Medium",
                    isRisk: false,
                  },
                  {
                    label: "Source Reputation",
                    value: item.status === "real" ? "Good" : "Poor",
                    isRisk: item.status !== "real",
                  },
                  {
                    label: "Similar Fact-checks",
                    value: "3 found",
                    isRisk: false,
                  },
                ].map((indicator, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span
                      className={`text-sm ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {indicator.label}
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        indicator.isRisk ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {indicator.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Details */}
            <div>
              <h4
                className={`text-sm font-medium mb-2 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                TECHNICAL DETAILS
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p
                    className={`text-xs ${
                      darkMode ? "text-gray-500" : "text-gray-600"
                    }`}
                  >
                    Analysis Date
                  </p>
                  <p
                    className={`${
                      darkMode ? "text-gray-300" : "text-gray-800"
                    }`}
                  >
                    {item.date}
                  </p>
                </div>
                <div>
                  <p
                    className={`text-xs ${
                      darkMode ? "text-gray-500" : "text-gray-600"
                    }`}
                  >
                    Processing Time
                  </p>
                  <p
                    className={`${
                      darkMode ? "text-gray-300" : "text-gray-800"
                    }`}
                  >
                    {item.analysisTime}
                  </p>
                </div>
                <div>
                  <p
                    className={`text-xs ${
                      darkMode ? "text-gray-500" : "text-gray-600"
                    }`}
                  >
                    Model Version
                  </p>
                  <p
                    className={`${
                      darkMode ? "text-gray-300" : "text-gray-800"
                    }`}
                  >
                    v2.4.1
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div
            className={`sticky bottom-0 p-4 border-t ${
              darkMode
                ? "border-dark-700 bg-dark-800"
                : "border-gray-200 bg-white"
            }`}
          >
            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className={`px-4 py-2 rounded-lg ${
                  darkMode ? "hover:bg-dark-700" : "hover:bg-gray-100"
                }`}
              >
                Close
              </button>
              <button
                className={`px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700`}
              >
                View Full Report
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default HistoryDetailsModal;

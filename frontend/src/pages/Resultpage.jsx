import { Link } from "react-router-dom";

const ResultPage = ({ darkMode, result = "Fake", confidence = "85" }) => {
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${darkMode ? "bg-dark-900" : "bg-gray-50"} pt-24 px-6`}>
      <div className={`max-w-xl w-full ${darkMode ? "bg-dark-800" : "bg-white"} rounded-lg shadow-lg p-8`}>
        <h1 className={`text-3xl font-bold text-center ${darkMode ? "text-blue-400" : "text-blue-800"} mb-6`}>Analysis Result</h1>
        <div className="text-center mb-4">
          <p className={`text-lg font-semibold ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            Status:{" "}
            <span
              className={`${
                result === "Fake"
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {result}
            </span>
          </p>
          <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Confidence Score: {confidence}%</p>
        </div>

        <div className="flex flex-col space-y-4 mt-6">
          <Link
            to="/"
            className={`text-center ${darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-700 hover:bg-blue-800"} text-white py-2 rounded-md transition`}
          >
            Analyze Another
          </Link>
          <Link
            to="/history"
            className={`text-center border ${darkMode ? "border-blue-600 text-blue-600 hover:bg-dark-700" : "border-blue-700 text-blue-700 hover:bg-blue-100"} py-2 rounded-md transition`}
          >
            View History
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
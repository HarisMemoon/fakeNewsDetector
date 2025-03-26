const HistoryPage = ({ darkMode }) => {
  return (
    <div className={`min-h-screen ${darkMode ? "bg-dark-900 text-gray-300" : "bg-gray-100 text-gray-800"} pt-24 p-8`}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Detection History</h2>
        <p className="text-lg text-center">
          All your past fake news detection results will appear here.
        </p>
      </div>
    </div>
  );
};

export default HistoryPage;
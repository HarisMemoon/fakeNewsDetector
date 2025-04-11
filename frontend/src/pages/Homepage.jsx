import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Line, Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const HomePage = ({ darkMode }) => {
  const articleRef = useRef(null);
  const [inputText, setInputText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Mock analysis data
  const analysisData = {
    credibility: 82,
    emotionalLanguage: 35,
    sourceReputation: 68,
    history: [65, 59, 80, 81, 82],
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollToArticle = () => {
    articleRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 2500);
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 0,
    },
    plugins: {
      legend: { display: false },
    },
    // scales: {
    //   x: {
    //     grid: {
    //       display: false,
    //       drawBorder: false,
    //     },
    //     ticks: {
    //       padding: 0,
    //     },
    //   },
    //   y: {
    //     grid: {
    //       color: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
    //       drawBorder: false,
    //     },
    //     ticks: {
    //       padding: 0,
    //     },
    //   },
    // },
  };

  const credibilityChart = {
    data: {
      datasets: [
        {
          data: [analysisData.credibility, 100 - analysisData.credibility],
          backgroundColor: [
            darkMode ? "#3b82f6" : "#2563eb",
            darkMode ? "#1e293b" : "#f0f4ff",
          ],
          borderWidth: 0,
          reverse: true,
        },
      ],
    },
    options: {
      ...chartOptions,
      cutout: "75%",
    },
  };
  const lineChart = {
    data: {
      labels: ["1m ago", "45s ago", "30s ago", "15s ago", "Now"],
      datasets: [
        {
          label: "Credibility Score",
          data: analysisData.history,
          borderColor: darkMode ? "#3b82f6" : "#2563eb",
          backgroundColor: darkMode
            ? "rgba(59, 130, 246, 0.1)"
            : "rgba(37, 99, 235, 0.1)",
          borderWidth: 2,
          tension: 0.4,
          fill: true,
        },
      ],
    },
  };

  return (
    <div
      className={`${
        darkMode ? "bg-dark-900" : "bg-gradient-to-br from-blue-50 to-indigo-50"
      } font-sans transition-colors duration-300`}
    >
      {/* Hero Section */}
      <section
        className={`min-h-screen flex flex-col justify-center items-center text-center px-6 pt-24 ${
          darkMode
            ? "bg-dark-900"
            : "bg-gradient-to-br from-blue-50 to-indigo-50"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto"
        >
          <h1
            className={`text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r ${
              darkMode
                ? "from-blue-400 to-green-400"
                : "from-blue-600 to-indigo-600"
            } bg-clip-text text-transparent font-poppins`}
          >
            Fake News Detector
          </h1>
          <p
            className={`text-xl md:text-2xl mb-8 ${
              darkMode ? "text-gray-300" : "text-slate-700"
            } font-light max-w-3xl mx-auto`}
          >
            Combating misinformation with AI-powered analysis and real-time
            credibility assessment
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToArticle}
              className={`bg-gradient-to-r ${
                darkMode
                  ? "from-blue-600 to-green-600"
                  : "from-blue-500 to-indigo-500"
              } text-white px-8 py-4 rounded-xl shadow-lg font-medium`}
            >
              Start Analysis
            </motion.button>
          </div>
        </motion.div>

        {/* Animated Demo Graph - Now with proper responsive container */}
        <motion.div
          className="mt-24 w-[80%] px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div
            className={`p-6 rounded-2xl ${
              darkMode ? "bg-dark-800" : "bg-white"
            } shadow-lg border ${
              darkMode ? "border-dark-700" : "border-slate-200"
            }`}
          >
            <div className="w-full h-64 relative">
              <Line data={lineChart.data} options={chartOptions} />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2
            className={`text-4xl font-bold text-center mb-16 ${
              darkMode ? "text-blue-400" : "text-blue-800"
            }`}
          >
            Why Choose Our Detector?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "⚡ Instant Analysis",
                desc: "Real-time scanning with our optimized AI engine delivers results in seconds.",
                icon: "M13 10V3L4 14h7v7l9-11h-7z",
              },
              {
                title: "🔍 Deep Verification",
                desc: "Cross-references multiple sources for comprehensive fact-checking.",
                icon: "M19 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
              },
              {
                title: "📊 Insightful Reports",
                desc: "Detailed breakdowns of credibility factors and risk indicators.",
                icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H5a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v8a2 2 0 01-2 2z",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className={`${
                  darkMode
                    ? "bg-dark-800 border-dark-700"
                    : "bg-white border-slate-200"
                } p-8 rounded-2xl border hover:shadow-xl transition-all duration-300`}
              >
                <div
                  className={`${
                    darkMode ? "bg-dark-700" : "bg-blue-100"
                  } w-14 h-14 rounded-xl flex items-center justify-center mb-6`}
                >
                  <svg
                    className={`w-6 h-6 ${
                      darkMode ? "text-blue-400" : "text-blue-600"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={feature.icon}
                    />
                  </svg>
                </div>
                <h3
                  className={`font-semibold text-2xl ${
                    darkMode ? "text-blue-400" : "text-blue-800"
                  } mb-4`}
                >
                  {feature.title}
                </h3>
                <p
                  className={`${
                    darkMode ? "text-gray-300" : "text-slate-600"
                  } font-light`}
                >
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Analysis Section */}
      <section
        ref={articleRef}
        className={`w-full py-20 ${
          darkMode
            ? "bg-dark-800"
            : "bg-gradient-to-br from-blue-50 to-indigo-50"
        }`}
      >
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ scale: 0.95 }}
            whileInView={{ scale: 1 }}
            className={`p-8 rounded-3xl ${
              darkMode ? "bg-dark-700" : "bg-white"
            } shadow-2xl border ${
              darkMode ? "border-dark-600" : "border-slate-200"
            }`}
          >
            <div className="flex flex-col md:flex-row gap-8">
              {/* Input Section */}
              <div className="flex-1">
                <h2
                  className={`text-3xl font-bold mb-4 ${
                    darkMode ? "text-blue-400" : "text-blue-800"
                  }`}
                >
                  Analyze Content
                </h2>

                <div
                  className={`relative border-2 ${
                    darkMode ? "border-dark-600" : "border-slate-200"
                  } rounded-xl mb-6 transition-all duration-300 hover:border-blue-400`}
                >
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className={`w-full h-64 p-4 bg-transparent resize-none focus:outline-none ${
                      darkMode ? "text-gray-300" : "text-slate-700"
                    } placeholder-slate-400`}
                    placeholder="Paste article text or URL..."
                    maxLength="2000"
                  />
                  <div
                    className={`absolute bottom-4 right-4 text-sm ${
                      darkMode ? "text-gray-500" : "text-slate-500"
                    }`}
                  >
                    {inputText.length}/2000
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startAnalysis}
                  disabled={isAnalyzing}
                  className={`w-full py-4 rounded-xl font-medium ${
                    isAnalyzing
                      ? "bg-blue-400"
                      : "bg-gradient-to-r from-blue-500 to-indigo-500"
                  } text-white transition-all`}
                >
                  {isAnalyzing ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white rounded-full animate-spin" />
                      Analyzing...
                    </div>
                  ) : (
                    "Start Analysis"
                  )}
                </motion.button>
              </div>

              {/* Live Analysis Preview */}
              <div className="md:w-80 flex flex-col gap-6">
                <div
                  className={`p-6 rounded-xl ${
                    darkMode ? "bg-dark-600" : "bg-slate-100"
                  }`}
                >
                  <h3
                    className={`text-sm font-medium mb-3 ${
                      darkMode ? "text-gray-400" : "text-slate-600"
                    }`}
                  >
                    Credibility Score
                  </h3>
                  <div className="relative w-full h-64">
                    <Doughnut
                      key={`doughnut-chart-${windowSize.width}`}
                      data={credibilityChart.data}
                      options={credibilityChart.options}
                    />
                    <div
                      className={`absolute inset-0 flex items-center justify-center text-2xl font-bold ${
                        darkMode ? "text-blue-400" : "text-blue-800"
                      }`}
                    >
                      {analysisData.credibility}%
                    </div>
                  </div>
                </div>

                <div
                  className={`p-6 rounded-xl ${
                    darkMode ? "bg-dark-600" : "bg-slate-100"
                  }`}
                >
                  <h3
                    className={`text-sm font-medium mb-3 ${
                      darkMode ? "text-gray-400" : "text-slate-600"
                    }`}
                  >
                    Risk Indicators
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Emotional Language</span>
                      <span
                        className={`font-medium ${
                          analysisData.emotionalLanguage > 40
                            ? "text-red-400"
                            : "text-green-400"
                        }`}
                      >
                        {analysisData.emotionalLanguage}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Source Reputation</span>
                      <span
                        className={`font-medium ${
                          analysisData.sourceReputation < 50
                            ? "text-red-400"
                            : "text-green-400"
                        }`}
                      >
                        {analysisData.sourceReputation}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

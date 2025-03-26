import { useRef } from "react";
import { Link } from "react-router-dom";

const HomePage = ({ darkMode }) => {
  const articleRef = useRef(null);

  const scrollToArticle = () => {
    articleRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={`${darkMode ? "bg-dark-900" : "bg-gradient-to-br from-blue-50 to-blue-100"} font-sans`}>
      {/* Hero Section - Full width and height */}
      <section className={`min-h-screen w-full flex flex-col justify-center items-center text-center p-6 ${darkMode ? "bg-dark-900" : "bg-gradient-to-br from-blue-50 to-blue-100"}`}>
        <div className="max-w-5xl mx-auto">
          <h1 className={`text-6xl md:text-7xl font-bold mb-6 ${darkMode ? "text-blue-400" : "text-blue-900"} font-poppins`}>
            Fake News Detector
          </h1>
          <p className={`text-xl md:text-2xl mb-8 ${darkMode ? "text-gray-300" : "text-gray-700"} font-light max-w-3xl mx-auto`}>
            Instantly verify the authenticity of news articles using advanced AI technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={scrollToArticle}
              className={`${darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-600 hover:bg-blue-700"} text-white px-8 py-4 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 font-medium`}
            >
              Try It Now
            </button>
            <Link
              to="/about"
              className={`${darkMode ? "bg-dark-700 hover:bg-dark-600" : "bg-white hover:bg-blue-50"} ${darkMode ? "text-gray-300" : "text-blue-800"} px-8 py-4 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 font-medium border ${darkMode ? "border-dark-600" : "border-blue-100"}`}
            >
              Learn More
            </Link>
          </div>
        </div>
        
        {/* Animated scroll indicator */}
        <div className="mt-24 animate-bounce">
          <svg 
            className={`w-8 h-8 ${darkMode ? "text-blue-500" : "text-blue-600"}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className={`text-4xl font-bold text-center mb-16 ${darkMode ? "text-blue-400" : "text-blue-900"}`}>
            Why Choose Our Detector?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "⚡ Fast Analysis", 
                desc: "Quickly scan articles and detect misinformation with our optimized AI engine.",
                icon: "M13 10V3L4 14h7v7l9-11h-7z"
              },
              { 
                title: "🔒 Reliable Results", 
                desc: "Trained on millions of data points to ensure high accuracy and trustworthy results.",
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              },
              { 
                title: "👌 Easy to Use", 
                desc: "No signups, no hassle. Just paste your content and get instant verification.",
                icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              },
            ].map((feature, index) => (
              <div 
                key={index} 
                className={`${darkMode ? "bg-dark-800 border-dark-700" : "bg-white border-blue-100"} p-8 rounded-xl border hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2`}
              >
                <div className={`${darkMode ? "bg-dark-700" : "bg-blue-100"} w-14 h-14 rounded-full flex items-center justify-center mb-6`}>
                  <svg 
                    className={`w-6 h-6 ${darkMode ? "text-blue-400" : "text-blue-600"}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                  </svg>
                </div>
                <h3 className={`font-semibold text-2xl ${darkMode ? "text-blue-400" : "text-blue-800"} mb-4`}>{feature.title}</h3>
                <p className={`${darkMode ? "text-gray-300" : "text-gray-700"} font-light`}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Article Input Section */}
      <section 
        ref={articleRef} 
        className={`w-full py-20 ${darkMode ? "bg-dark-800" : "bg-blue-50"}`}
      >
        <div className="max-w-3xl mx-auto px-6">
          <div className={`${darkMode ? "bg-dark-700 border-dark-600" : "bg-white border-blue-100"} p-8 md:p-10 rounded-2xl shadow-sm border`}>
            <h2 className={`text-3xl font-bold ${darkMode ? "text-blue-400" : "text-blue-900"} mb-2`}>Check News Authenticity</h2>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} mb-8`}>
              Paste any news article below to analyze its credibility
            </p>
            
            <textarea
              className={`w-full h-56 p-5 rounded-xl border-2 ${darkMode ? "border-dark-600 bg-dark-600 text-gray-300" : "border-gray-200 bg-white text-gray-700"} focus:outline-none focus:ring-2 focus:ring-blue-500 mb-8 resize-none transition-all duration-300 placeholder-gray-400`}
              placeholder="Paste your news article here..."
            ></textarea>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/result"
                className={`${darkMode ? "bg-green-600 hover:bg-green-700" : "bg-green-500 hover:bg-green-600"} px-8 py-4 rounded-lg text-white text-lg shadow-md transition-all duration-300 hover:scale-105 font-medium text-center flex-1`}
              >
                Analyze Now
              </Link>
              <button
                className={`${darkMode ? "bg-dark-600 hover:bg-dark-500" : "bg-blue-100 hover:bg-blue-200"} ${darkMode ? "text-gray-300" : "text-blue-800"} px-8 py-4 rounded-lg text-lg shadow-md transition-all duration-300 hover:scale-105 font-medium border ${darkMode ? "border-dark-500" : "border-blue-200"} flex-1`}
              >
                Upload File
              </button>
            </div>
            
            <p className={`text-sm mt-4 ${darkMode ? "text-gray-500" : "text-gray-600"}`}>
              By submitting, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
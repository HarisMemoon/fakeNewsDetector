import { useRef } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const articleRef = useRef(null);

  const scrollToArticle = () => {
    articleRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center text-center p-6">
      
      {/* Intro Section */}
      <section className="max-w-5xl mt-16 mb-12">
        <h1 className="text-5xl font-extrabold mb-4 text-blue-800">Fake News Detector</h1>
        <p className="text-lg mb-6 text-gray-700">
          Instantly verify the authenticity of news articles using AI.
        </p>
        <button
          onClick={scrollToArticle}
          className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-lg shadow-md transition duration-300"
        >
          Try It Now
        </button>
      </section>

      {/* Features Section */}
      <section className="flex flex-wrap justify-center gap-8 mb-16">
        <div className="bg-white shadow-xl p-6 rounded-lg w-64 border border-blue-100">
          <h3 className="font-bold text-xl text-blue-700 mb-2">⚡ Fast Analysis</h3>
          <p>Quickly scan articles and detect misinformation.</p>
        </div>
        <div className="bg-white shadow-xl p-6 rounded-lg w-64 border border-blue-100">
          <h3 className="font-bold text-xl text-blue-700 mb-2">🔒 Reliable Results</h3>
          <p>Trained on a large dataset to ensure high accuracy.</p>
        </div>
        <div className="bg-white shadow-xl p-6 rounded-lg w-64 border border-blue-100">
          <h3 className="font-bold text-xl text-blue-700 mb-2">👌 Easy to Use</h3>
          <p>No signups, no hassle. Paste & check.</p>
        </div>
      </section>

      {/* Article Input Section */}
      <section ref={articleRef} className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-lg border border-blue-100 mb-20">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Paste Your Article:</h2>
        <textarea
          className="w-full h-48 p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6 resize-none"
          placeholder="Paste your news article here..."
        ></textarea>
        <Link
          to="/result"
          className="bg-green-500 hover:bg-green-600 px-8 py-3 rounded-lg text-white text-lg shadow-md transition"
        >
          Analyze Now
        </Link>
      </section>
    </div>
  );
};

export default Home;

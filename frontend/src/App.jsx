import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import HistoryPage from './pages/Historypage';
import ResultPage from './pages/Resultpage';

function App() {
  return (
    <>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

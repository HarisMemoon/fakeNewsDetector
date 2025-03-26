import { Routes, Route } from 'react-router-dom'
import { useTheme } from './contexts/ThemeContext'
import Navbar from './components/Navbar/Navbar'
import HomePage from './pages/HomePage'
import LoginPage from './components/Auth/Login'
import RegisterPage from './components/Auth/RegisterForm'
import HistoryPage from './pages/HistoryPage'
import ResultPage from './pages/ResultPage'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  const { darkMode } = useTheme()

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-dark-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Navbar darkMode={darkMode} />
      
      <main className="container mx-auto px-4 py-8">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage darkMode={darkMode} />} />
          <Route path="/login" element={<LoginPage darkMode={darkMode} />} />
          <Route path="/register" element={<RegisterPage darkMode={darkMode} />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/history" element={<HistoryPage darkMode={darkMode} />} />
            <Route path="/result" element={<ResultPage darkMode={darkMode} />} />
          </Route>
        </Routes>
      </main>
    </div>
  )
}
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Features from './pages/Features'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import ConfirmSignup from './pages/ConfirmSignup'
import Dashboard from './pages/Dashboard'
import Upload from './pages/Upload'

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-500 hover:text-blue-400 transition-colors">ScoutVision</Link>
        <nav>
          <ul className="flex gap-6">
            <li><Link to="/about" className="hover:text-blue-400 transition-colors">About</Link></li>
            <li><Link to="/features" className="hover:text-blue-400 transition-colors">Features</Link></li>
          </ul>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/confirm-signup" element={<ConfirmSignup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </main>
    </div>
  )
}

export default App

import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Toaster } from "react-hot-toast"
import LandingPage from './pages/LandingPage'
import { Home } from './pages/Home'
import { Dashboard } from './pages/Dashboard'
import { Account } from './pages/Account'
import CreateSublink from './pages/CreateSublink'
export const API_URL = 'https://sublinks.onrender.com'

function App() {
  return (
    <Router>
      <div><Toaster/></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreateSublink />} />
        <Route path="/account" element={<Account />} />
        {/* <Route path="/demo" element={<Demo />} /> */}
      </Routes>
    </Router>
  )
}

export default App

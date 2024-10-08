import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './home'
import Form from './form'
import TestPage from './pages/TestPage'
import FileUploadForm from './pages/fire'
import CreateBlink from './pages/CreateBlink'

function App() {
  return (
    <Router>
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/create" element={<CreateBlink />} />
        <Route path="/fire" element={<FileUploadForm />} />
      </Routes>
    </Router>
  )
}

export default App;
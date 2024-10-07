import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './home'
import Form from './form'
function App() {
  return (

    <Router>
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </Router>
  )
}

export default App;
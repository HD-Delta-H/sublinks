import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { OktoProvider, BuildType } from 'okto-sdk-react';
import Home2 from './home'
import Form from './form'
import TestPage from './pages/TestPage'
import FileUploadForm from './pages/fire'
import CreateBlink from './pages/CreateBlink'
import { Home } from './pages/Home';

const OKTO_CLIENT_API_KEY = import.meta.env.VITE_OKTO_CLIENT_API_KEY;
export const API_URL = 'http://localhost:3000';

function App() {
  return (
    <Router>
      <OktoProvider apiKey={OKTO_CLIENT_API_KEY} buildType={BuildType.SANDBOX}>
      <Routes >
        <Route path="/" element={<Home2 />} />
        <Route path="/home" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/create" element={<CreateBlink />} />
        <Route path="/fire" element={<FileUploadForm />} />
      </Routes>
      </OktoProvider>
    </Router>
  )
}

export default App;
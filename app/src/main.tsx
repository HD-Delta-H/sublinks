import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CivicAuthProvider } from '@civic/auth-web3/react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CivicAuthProvider clientId={import.meta.env.VITE_CIVIC_CLIENT_ID}>
      <App />
    </CivicAuthProvider>
  </StrictMode>,
)

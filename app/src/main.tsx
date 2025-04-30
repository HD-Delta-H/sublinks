import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CivicAuthProvider, } from '@civic/auth-web3/react'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CivicAuthProvider clientId={import.meta.env.VITE_CIVIC_CLIENT_ID} onSignOut={async () => {
        console.log('Signed out');
        window.location.href = '/';
        return Promise.resolve();
      }}>
        <App />
      </CivicAuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Toaster
      toastOptions={{
        className: '',
        style: {
          backgroundColor: '#161D2F',
          border: '1px solid #5A698F',
          padding: '16px',
          color: '#ffffff',
        },
      }}
    />
  </StrictMode>
);

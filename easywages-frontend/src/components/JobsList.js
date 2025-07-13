import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // ✅ Import Router
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

// ✅ Create root using React 18 method
const root = ReactDOM.createRoot(document.getElementById('root'));

// ✅ Render App wrapped with Router
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Optional performance monitoring
reportWebVitals();

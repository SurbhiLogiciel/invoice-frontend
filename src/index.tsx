import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './app/context/AuthContext';
import AppRoutes from './routes/appRoutes';
import { CompanyProvider } from './app/context/CompanyContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* Wrap both AuthProvider and CompanyProvider */}
      <AuthProvider>
        <CompanyProvider>
          <AppRoutes />
        </CompanyProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();

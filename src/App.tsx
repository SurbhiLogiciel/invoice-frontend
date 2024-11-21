import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

import AppRoutes from './routes/appRoutes';

// Adjusted import path if needed
import './index.css';
import { CompanyProvider } from './app/context/CompanyContext';

const App: React.FC = () => {
  return (
    <Router>
      <CompanyProvider>
        <AppRoutes />
      </CompanyProvider>
    </Router>
  );
};

export default App;

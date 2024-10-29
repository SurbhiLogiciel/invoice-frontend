import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

import AppRoutes from './routes/appRoutes';

// Adjusted import path if needed
import './index.css';

const App: React.FC = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;

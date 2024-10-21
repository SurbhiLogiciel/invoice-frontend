import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import AppRoutes from './routes/userRoutes';

// Adjusted import path if needed
import './index.css';

const App: React.FC = () => {
  return (
    <Router>
      <Link to="/"></Link>
      <Link to="/registerEmail"></Link>
      <Link to="/verifyOtp"></Link>
      <Link to="/registerProfile"></Link>
      <Link to="/registerCompanyProfile"></Link>
      <div>
        <AppRoutes />
      </div>
    </Router>
  );
};

export default App;

import React from 'react';
import './App.css';
// import { Login } from './layouts/login';
// import { RegisterEmail } from './layouts/register';
// import { Input } from './core-ui/input/input';
import SelectableContainer from './core-ui/choosePlan';

import './index.css';

const App: React.FC = () => {
  return (
    <div className="p-10">
      <SelectableContainer heading='FREE' description='This is a free plan' planPrice='67'/>
    </div>
  );
};

export default App;

import React from 'react';
import './App.css';

import './index.css';
import SelectableContainer from './core-ui/choosePlan';

const App: React.FC = () => {
  return (
    <SelectableContainer heading='FREE' description='this is a free plan' planPrice='$120' children/>
  );
};

export default App;

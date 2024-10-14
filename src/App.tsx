import React from 'react';
import './App.css';
// import MainComponent from './components/invoice';
import SelectableContainer from './core-ui/choosePlan';
import './index.css';

const App: React.FC = () => {
  return (
    <SelectableContainer outline color="secondary" size="large" disabled={false}>
        Danger Large Container
      </SelectableContainer>
  );
};

export default App;

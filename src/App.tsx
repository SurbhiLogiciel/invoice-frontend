import React from 'react';
import { Button } from './core-ui/button';

import './index.css'; 

const App: React.FC = () => {
  return (
   <Button size='medium' color='primary' onClick={() => alert("Button Clicked")} children="Sign-In" />
  );
};

export default App;

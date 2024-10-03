import React from 'react';
// import { Button } from './core-ui/button';
import { PaidChip } from './core-ui/chips';

import './index.css'; 

const App: React.FC = () => {
  return (
    <>
      <PaidChip outline size="small" color="danger" onClick={() => console.log('clicked')}>
        Invoice Paid
      </PaidChip>
    </>
  );
};

export default App;

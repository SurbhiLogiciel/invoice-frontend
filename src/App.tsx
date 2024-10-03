// src/core-ui/Invoice-data/index.tsx
import React from 'react';
import { PaidChip } from './core-ui/chips'; // Ensure this path is correct
import './index.css'; 

const App: React.FC = () => {
  return (
    <>
      <PaidChip
        outline={true} // Explicitly set to true, or you can leave it out if default
        size="small"
        color="danger"
        onClick={() => alert('yes')}
      >
        Paid
      </PaidChip>
    </>
  );
};

export default App;

import React from 'react';
import './App.css';

import './index.css';
// import { Login } from './layouts/login';
// import { RegisterEmail } from './layouts/register';
// import { VerifyOTP } from './layouts/verifyOTP';
// import { Login } from './layouts/login';
// import { RegisterEmail } from './layouts/register';
import { UserProfile } from './layouts/Profile/userProfile';

const App: React.FC = () => {
  return (
    <>
      {/* <VerifyOTP />
      <Login />
      <RegisterEmail /> */}
      <UserProfile />
    </>
  );
};

export default App;

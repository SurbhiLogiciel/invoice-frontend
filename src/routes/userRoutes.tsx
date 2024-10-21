import { Route, Routes } from 'react-router-dom';
import { Login } from '../app/login/login';
import { RegisterEmail } from '../app/Registration/register';
import { VerifyOTP } from '../app/Registration/verifyOTP';
import { UserProfile } from '../app/Profile/userProfile';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registerEmail" element={<RegisterEmail />} />
      <Route path="/verifyOtp" element={<VerifyOTP />} />
      <Route path="/registerProfile" element={<UserProfile />} />
    </Routes>
  );
};
export default AppRoutes;

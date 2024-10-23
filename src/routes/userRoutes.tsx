import { Route, Routes } from 'react-router-dom';
import { Login } from '../app/login/login';
import { RegisterEmail } from '../app/Registration/register';
import { VerifyOTP } from '../app/Registration/verifyOTP';
import { UserProfile } from '../app/Profile/userProfile';
import { RegisterCompanyProfile } from '../app/Registration/registerCompanyProfile';
import { ChoosePlan } from '../app/Plan/choosePlan';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registerEmail" element={<RegisterEmail />} />
      <Route path="/verifyOtp/:userId" element={<VerifyOTP />} />
      <Route path="/registerUserProfile/:userId" element={<UserProfile />} />

      <Route
        path="/registerCompanyProfile"
        element={<RegisterCompanyProfile />}
      />
      <Route path="/choosePlan" element={<ChoosePlan />} />
    </Routes>
  );
};
export default AppRoutes;

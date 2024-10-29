import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '../app/login/login';
import { RegisterEmail } from '../app/Registration/register';
import { VerifyOTP } from '../app/Registration/verifyOTP';
import { UserProfile } from '../app/Profile/userProfile';
import { RegisterCompanyProfile } from '../app/Registration/registerCompanyProfile';
import { ChoosePlan } from '../app/Plan/choosePlan';
import Layout from '../app/layouts';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="login" replace />} />
        <Route path="login" element={<Login />} />
        <Route path="/registerEmail" element={<RegisterEmail />} />
        <Route path="/verifyOtp/:userId" element={<VerifyOTP />} />
        <Route
          path="/registerCompanyProfile/:userId"
          element={<RegisterCompanyProfile />}
        />
        <Route path="/registerUserProfile/:userId" element={<UserProfile />} />
        <Route path="/choosePlan" element={<ChoosePlan />} />
      </Route>
    </Routes>
  );
};
export default AppRoutes;

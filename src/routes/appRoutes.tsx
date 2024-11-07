// src/routes/AppRoutes.tsx

import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '../app/login/login';
import { RegisterEmail } from '../app/Registration/register';
import { VerifyOTP } from '../app/Registration/verifyOTP';
import { UserProfile } from '../app/Profile/userProfile';
import { RegisterCompanyProfile } from '../app/Registration/registerCompanyProfile';
import { ChoosePlan } from '../app/Plan/choosePlan';
import Layout from '../app/layouts';
import ProtectedRoute from '../app/components/protectedRouteComponent';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="login" replace />} />
        <Route path="login" element={<Login />} />
        <Route path="/registerEmail" element={<RegisterEmail />} />

        {/* Protected routes */}
        <Route
          path="/verifyOtp/:userId"
          element={
            <ProtectedRoute>
              <VerifyOTP />
            </ProtectedRoute>
          }
        />
        <Route
          path="/registerCompanyProfile/:userId"
          element={
            <ProtectedRoute>
              <RegisterCompanyProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/registerUserProfile/:userId"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/choosePlan/:userId"
          element={
            <ProtectedRoute>
              <ChoosePlan />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

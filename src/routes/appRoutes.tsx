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
import { DataContainer } from '../core-ui/DataContainer';
import InvoiceLayout from '../app/invoiceLayouts';
import ParentComponent from '../core-ui/invoice/invoiceData';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="login" replace />} />
        <Route path="/login" element={<Login />} />

        <Route path="/registerEmail" element={<RegisterEmail />} />

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
        <Route
          path="/login/:userId"
          element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="/invoiceLayout/:userId" element={<InvoiceLayout />}>
        <Route element={<Navigate to="DataContainer" replace />} />
        <Route path="invoiceData" element={<DataContainer children />} />
      </Route>
    </Routes>
  );
};
export default AppRoutes;

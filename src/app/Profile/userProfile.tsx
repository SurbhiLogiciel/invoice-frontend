import React, { useState } from 'react';
import { Button } from '../../core-ui/button';
import { Input } from '../../core-ui/input/input';
import { useNavigate, useParams } from 'react-router-dom';
import { registerUserProfile } from '../../services/apiService';
import { useCompany } from '../context/CompanyContext';

export const UserProfile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { companyId } = useCompany();
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegisterUserProfile = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!userId) {
      setErrorMessage('User ID is required.');
      return;
    }
    if (!companyId) {
      setErrorMessage('Company ID is required.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await registerUserProfile(
        userId,
        companyId,
        fullName,
        phoneNumber,
        password,
        confirmPassword
      );

      if (response.status === 200) {
        navigate('/choosePlan');
      } else {
        setErrorMessage('Unexpected response. Please try again.');
      }
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message ||
          'Error submitting the profile. Please try again.'
      );
    }
  };

  return (
    <div>
      <form onSubmit={handleRegisterUserProfile} method="post">
        <div className="font-bold mt-8 text-4xl text-white">
          Set Up Your Profile
        </div>
        <div className="text-gray text-lg">Let's Meet</div>
        <div className="mt-10 text-white w-full">
          <Input
            label="Full Name"
            size="large"
            placeholder="Alex Bream"
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            required
          />
        </div>
        <div className="mt-[38px] text-white w-full">
          <Input
            label="Phone Number"
            type="tel"
            size="large"
            placeholder="+234 000 000 0000"
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phoneNumber}
            required
          />
        </div>
        <div className="mt-[38px] text-white w-full">
          <Input
            label="Create Password"
            type="password"
            size="large"
            placeholder="***********"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            hasIcon
          />
        </div>
        <div className="mt-[38px] text-white w-full">
          <Input
            label="Confirm Password"
            type="password"
            size="large"
            placeholder="***********"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            hasIcon
          />
        </div>
        <div className="mt-[38px] w-full">
          <Button
            size="large"
            color="primary"
            fullWidth="true"
            children="Continue"
            type="submit"
          />
        </div>
        <div className="mt-2.5 w-full">
          <Button
            size="large"
            outline="primary"
            fullWidth="true"
            children="Back"
          />
        </div>
      </form>
    </div>
  );
};

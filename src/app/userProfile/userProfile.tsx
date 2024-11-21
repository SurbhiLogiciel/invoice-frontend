import React, { useState } from 'react';
import { Button } from '../../core-ui/button';
import { Input } from '../../core-ui/input/input';
import { useNavigate, useParams } from 'react-router-dom';
import { registerUserProfile } from '../../services/apiService';

export const UserProfile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [fullName, setFullName] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegisterUserProfile = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const response = await registerUserProfile(
        userId!,
        companyId,
        fullName,
        phoneNumber,
        password,
        confirmPassword
      );

      if (response.status === 200) {
        navigate('/registerCompanyProfile');
      } else {
        alert('Unexpected response. Please try again.');
      }
    } catch (error: any) {
      console.error('Error occured');
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
          />
        </div>
        <div className="mt-[38px] text-white w-full">
          <Input
            label="Confirm Password"
            type="password"
            size="large"
            placeholder="***********"
            onChange={(e) => setConfirmPassword(e.target.value)} // Update confirmPassword state
            value={confirmPassword}
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

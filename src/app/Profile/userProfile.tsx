import React, { useState } from 'react';
import { Button } from '../../core-ui/button';
import { Input } from '../../core-ui/input/input';
import axios from 'axios';
import Layout from '../layouts';
import { useNavigate,useParams } from 'react-router-dom';
import { UserProfileProps } from './userProfileTypes';

export const UserProfile: React.FC = () => {
  const userId = useParams<{userId:string}>();
  const [companyId, setCompanyId] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

const handleRegisterUserProfile = async(e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if(password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
  }

  try{
    const response = await axios.post(
      `http://127.0.0.1:3001/api/register/userProfile/${userId}`,
      {
        companyId,
        fullName,
        phoneNumber,
        password,
      });
       if (response.status === 200) {

        navigate('/registerCompanyProfile');
      } else {
        alert('Unexpected response. Please try again.');
      }
    
    }catch(error: any) {
      setErrorMessage('Error submitting the profile. Please try again.');
      console.error('Profile submission error:', error);
}
};

  return (
    <Layout>
      <form onSubmit={handleRegisterUserProfile} method='post'>
        <div className="">
          <div className="font-bold mt-8 text-4xl text-white">
            Set Up Your Profile
          </div>
          <div className="text-gray text-lg">Let's Meet</div>
          <div className="mt-10 text-white w-full">
            <Input
              label="Company Id"
              size="large"
              placeholder="123455668980908976867"
              onChange={(e) => setCompanyId(e.target.value)}
              value={companyId}
              required
            />
          </div>
          <div className="mt-[38px] text-white w-full">
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
            />
          </div>
          <div className="mt-[38px] text-white w-full">
            <Input
              label="Confirm Password"
              type="password"
              size="large"
              placeholder="***********"
              isConfirmPassword={true}
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
        </div>
      </form>
    </Layout>
  );
};

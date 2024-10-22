import React, { useState } from 'react';
import { Button } from '../../core-ui/button';
import { Input } from '../../core-ui/input/input';
import Layout from '../layouts';
import { Link } from 'react-router-dom';
import { UserProfileProps } from './userProfileTypes';

export const UserProfile: React.FC = () => {
  const [formData, setFormData] = useState<UserProfileProps>({
    fullName: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });
  const handleInputChange =
    (name: keyof UserProfileProps) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormData({
        ...formData,
        [name]: event.target.value,
      });
    };

  return (
    <Layout>
      <div className="">
        <div className="font-bold mt-8 text-4xl text-white">
          Set Up Your Profile
        </div>
        <div className="text-gray text-lg">Let's Meet</div>
        <div className="mt-10 text-white w-full">
          <Input
            label="Full Name"
            size="large"
            placeholder="Alex Bream"
            value={formData.fullName}
            required
            onChange={handleInputChange('fullName')}
          />
        </div>
        <div className="mt-[38px] text-white w-full">
          <Input
            label="Phone Number"
            type="tel"
            size="large"
            placeholder="+234 000 000 0000"
            value={formData.phoneNumber}
            onChange={handleInputChange('phoneNumber')}
          />
        </div>
        <div className="mt-[38px] text-white w-full">
          <Input
            label="Create Password"
            type="password"
            size="large"
            placeholder="***********"
            value={formData.password}
            onChange={handleInputChange('password')}
          />
        </div>
        <div className="mt-[38px] text-white w-full">
          <Input
            label="Confirm Password"
            type="password"
            size="large"
            placeholder="***********"
            value={formData.confirmPassword}
            onChange={handleInputChange('confirmPassword')}
            passwordValue={formData.password}
            isConfirmPassword={true}
          />
        </div>

        <div className="mt-[38px] w-full">
          <Link to="/registerCompanyProfile">
            <Button
              size="large"
              color="primary"
              fullWidth="true"
              children="Continue"
              type="submit"
            />
          </Link>
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
    </Layout>
  );
};

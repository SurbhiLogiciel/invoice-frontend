import React, { useState } from 'react';
import axios from 'axios';

import { Button } from '../../core-ui/button';
import { Input } from '../../core-ui/input/input';
import Layout from '../layouts';
import { useNavigate } from 'react-router-dom';

export const RegisterEmail: React.FC = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleRegisterEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://127.0.0.1:3001/api/register/userEmail',
        { email }
      );

      if (response.status === 201) {
        alert('Registration successful!');
        navigate('/verifyOtp');
      }
    } catch (error) {
      console.error('Error during registration:', error); // Log the error for debugging
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <Layout>
      <form onSubmit={handleRegisterEmail} method="post">
        <div className="flex font-bold mt-10 text-[36px] text-white text-center">
          Register as Company
        </div>
        <div className="flex text-gray text-custom text-[18px] text-center">
          Let's Meet
        </div>
        <div className="mt-10 text-white">
          <Input
            label="E-mail"
            size="large"
            onChange={(e) => setEmail(e.target.value)}
            value={email} // Controlled input
          />
        </div>
        <div className="mt-[35px]">
          <Button type="submit" size="large" color="primary" fullWidth="true">
            Verify Email
          </Button>
        </div>
        <div className="mt-[35px]">
          <Button
            size="large"
            color="primary"
            outline="primary"
            fullWidth="true"
          >
            Sign In
          </Button>
        </div>
      </form>
    </Layout>
  );
};

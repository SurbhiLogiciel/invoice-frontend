import React, { useState } from 'react';
import { Button } from '../../core-ui/button';
import { Input } from '../../core-ui/input/input';
import IIcon from '../svg/i-icon';
import { registerUserEmail } from '../../services/apiService';

import { useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  // const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const HandleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setIsLoading(true);
    setErrorMessage(''); 

    try {
      const response = await registerUserEmail(email);

      if (response.status === 200 && response.data.token) {
        localStorage.setItem('token', response.data.token); 
        navigate('/dashboard'); 
      } else {
        setErrorMessage('Login failed. Please check your credentials.');
      }
    } catch (error: any) {
    setErrorMessage('Login failed. Please check your credentials.');
    console.error('Login error:', error.response ? error.response.data : error);
    }
  };

  return (
  <div>
 <div className="flex font-bold mt-8 text-3xl text-white">Welcome</div>
      <div className="flex text-gray text-custom text-lg">
        We are glad to see you
      </div>

        <div className="mt-[38px]">
          <Input
            label="Email"
            type="email"
            size="large"
            placeholder="youremail@example.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className="mt-5">
          <Input
            label="Password"
            size="large"
            required
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            hasIcon
          />
        </div>

        {errorMessage && <div className="text-red-500">{errorMessage}</div>}

        <div className="flex items-center mt-5">
          <input
            type="checkbox"
            className="h-5 w-5 bg-secondary text-white border-gray-500 focus:ring-0"
          />
          <label className="text-white">Remember me</label>
        </div>

        <div className="mt-[30px]">
          <Button
            type="submit"
            size="large"
            color="primary"
            fullWidth="true"
            // disabled={isLoading}
            children="Sign-In"
          />
        </div>

        <div className="font-roboto text-center mt-5 text-white font-bold">
          Forgot password?
        </div>

        <hr className="mt-10 text-white/10" />

        <div className="text-gray mt-8 text-[18px]">Don't have an account?</div>
        <div className="mt-[30px]">
          <Button size="large" outline="primary" fullWidth="true">
            Registration
          </Button>
        </div>

        <hr className="mt-[30px] text-white/10" />
      <div className="mt-[30px] text-white text-[18px]">
        Do you need help? Contact technical support
      </div>
      <div className="flex text-white mt-[27px]">
        <IIcon />
        &nbsp; support@invoice.com
      </div>
  </div>
  );
};

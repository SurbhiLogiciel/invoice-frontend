import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../core-ui/button';
import { Input } from '../../core-ui/input/input';
import { registerUserEmail } from '../../services/apiService';
import { getErrorMessage } from '../../utils/getErrorMessages';
import { isValidEmail } from '../../utils/validations';
import { useAuth } from '../context/AuthContext';

export const RegisterEmail: React.FC = () => {
  const [email, setEmail] = useState('');
  const { registerEmail } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegisterEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setErrorMessage('Please enter a valid email.');
      return;
    }
    try {
      const response = await registerUserEmail(email);
      localStorage.setItem('userId', response.data.userId);

      if (response.status === 201) {
        registerEmail();
        navigate(`/verifyOtp/${response.data.userId}`);
      } else {
        setErrorMessage('Unexpected response. Please try again.');
      }
    } catch (error: any) {
      const errorMessage = getErrorMessage()(error.response?.status);
      setErrorMessage(errorMessage);
    }
  };

  return (
    <div>
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
            placeholder="john@logiciel.io"
            size="large"
            onChange={(e) => {
              setEmail(e.target.value);
              setErrorMessage('');
            }}
            value={email}
          />
        </div>
        {errorMessage && (
          <div className="mt-2 text-[11px] text-red-500">{errorMessage}</div>
        )}

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
            onClick={() => navigate('/login')}
          >
            Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

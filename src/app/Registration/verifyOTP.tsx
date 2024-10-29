import React, { useState } from 'react';
import { Button } from '../../core-ui/button';
import OtpInput from '../../core-ui/input/otpInput';
import { useNavigate, useParams } from 'react-router-dom';
import { verifyOtp } from '../../services/apiService'; // Updated import
import { isValidOtp } from '../../utils/validations';

export const VerifyOTP: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [otp, setOtp] = useState<string>('');

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const HandleOtpVerification = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidOtp(otp)) {
      setErrorMessage('Invalid OTP. Please enter a 6-digit number.');
      return;
    }

    if (!userId) {
      setErrorMessage('User ID is not defined.'); 
      return;
    }

    try {
      const response = await verifyOtp(userId, otp); 

      if (response.status === 200) {
        const verifiedUserId = response.data.userId;
        navigate(`/registerUserProfile/${verifiedUserId}`);
      } else {
        alert('Unexpected response. Please try again.');
      }
    } catch (error: any) {
      setErrorMessage(error.message || 'Error verifying OTP. Please try again');
    }
  };

  return (
    <div>
      <form onSubmit={HandleOtpVerification} method="post">
        <div className="flex font-bold mt-8 text-3xl text-white text-center">
          Verify OTP
        </div>
        <div className="flex mt-5 text-lg text-white text-left">
          We've sent a One-Time-Password (OTP) to your email address at
          lesh****.com. Please check your inbox to retrieve the OTP and continue
          with the process.
        </div>
        <div className="mt-10 w-full">
          <OtpInput length={6} onChange={(e) => setOtp(e)} />
          {errorMessage && (
            <div className="mt-2 text-[11px] text-red-500">{errorMessage}</div>
          )}
        </div>
        <div className="mt-[35px]">
          <Button
            type="submit"
            size="large"
            color="primary"
            fullWidth="true"
            children="Verify Email"
          />
        </div>
        <div className="mt-2.5">
          <Button
            size="large"
            outline="primary"
            fullWidth="true"
            children="Back"
            onClick={() => navigate(-1)}
          />
        </div>
      </form>
    </div>
  );
};

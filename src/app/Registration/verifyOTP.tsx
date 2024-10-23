import React, { useState } from 'react';
import { Button } from '../../core-ui/button';
import OtpInput from '../../core-ui/input/otpInput';
import Layout from '../layouts';
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';

export const VerifyOTP: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [otp, setOtp ] = useState<number | string>('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const HandleOtpVerification = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
      const response = await axios.post(
        `http://127.0.0.1:3001/api/register/verifyOtp/${userId}`,
        { otp }
      );
      if(response.status === 200) {
        navigate(`/registerProfile/${userId}`);
      }else{
        alert('Unexpected response. Please try again.');
      }
    }catch(error: any) {
  if (error.response && error.response.status === 401) {
    setErrorMessage('Email already exists');
  } else {
    setErrorMessage('Registration failed. Please try again.');
  }
    }
  }

  return (
    <Layout>
      <form onSubmit={HandleOtpVerification} method="post">
        <div className="flex font-bold mt-8 text-3xl text-white text-center">
          Verify OTP
        </div>
        <div className="flex mt-5  text-lg text-white text-left">
          We've sent a One-Time-Password (OTP) to your email address at
          lesh****.com. Please check your inbox to retrieve the OTP and continue
          with the process
        </div>
        <div className="mt-10  w-full">
          <OtpInput length={6} onChange={(e) => setOtp(e)} />
        </div>
        <div className="mt-[35px]">
          {/* <Link to="/registerProfile"> */}
          <Button
            type="submit"
            size="large"
            color="primary"
            fullWidth="true"
            children="Verify Email"
          />
          {/* </Link> */}
        </div>
        <div className="mt-2.5">
          <Button
            size="large"
            outline="primary"
            fullWidth="true"
            children="Back"
          />
        </div>
      </form>
    </Layout>
  );
};

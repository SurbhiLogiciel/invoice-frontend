import React from 'react';
import { Button } from '../../core-ui/button';
import OtpInput from '../../core-ui/input/otpInput';
import Layout from '../layouts';

export const VerifyOTP: React.FC = () => {
  return (
    <Layout>
      <div className="flex font-bold mt-8 text-3xl text-white text-center">
        Verify OTP
      </div>
      <div className="flex mt-5  text-lg text-white text-left">
        We've sent a One-Time-Password (OTP) to your email address at
        lesh****.com. Please check your inbox to retrieve the OTP and continue
        with the process
      </div>
      <div className="mt-10  w-full">
        <OtpInput onChange={() => alert('dfhdhf')} length={6} />
      </div>
      <div className="mt-[35px]">
        <Button
          size="large"
          color="primary"
          fullWidth="true"
          children="Verify Email"
        />
      </div>
      <div className="mt-2.5">
        <Button
          size="large"
          // color="secondary"
          outline="primary"
          fullWidth="true"
          children="Back"
        />
      </div>
    </Layout>
  );
};

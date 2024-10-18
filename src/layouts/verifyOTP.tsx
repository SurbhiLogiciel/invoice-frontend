import React from 'react';
import { Button } from '../core-ui/button';
import { Input } from '../core-ui/input/input';
import image1 from '../assets/1.png';
import image3 from '../assets/3.png';
import OtpInput from '../core-ui/input/otpInput';

export const VerifyOTP: React.FC = () => {
  return (
    <div className="flex bg-secondary bg-contain bg-no-repeat h-screen bg-right bg-[url('./assets/2.png')]">
      <div className="flex mx-auto py-8 justify-center max-h-full  w-full max-w-[1200px] gap-20">
        <div className="mx-auto max-h-full w-full p-4">
          <img
            src={image3}
            alt="logo"
            className="w-full max-w-[251.49px] h-14"
          />
          <div className="flex font-bold mt-8 text-3xl text-white text-center">
            Verify OTP
          </div>
          <div className="flex mt-5  max-h-[104px] text-lg text-white text-left">
            We've sent a One-Time-Password (OTP) to your email address at
            lesh****.com. Please check your inbox to retrieve the OTP and
            continue with the process
          </div>
          <div className="mt-10 w-full">
            <OtpInput onChange={() => alert('dfhdhf')} length={6} />
          </div>

          {/* <Button
            size="large"
            color="primary"
            outline="primary"
            fullWidth="true"
          >
            Sign In
          </Button> */}
        </div>
        <div className="mx-auto w-full max-h-[950px] max-w-[540px] rounded-lg hidden lg:block">
          <div className="flex h-full justify-center px-[16px] items-center bg-primary mx-auto py-[22px] rounded-xl">
            <img
              src={image1}
              alt="Layout Image"
              className="w-full max-w-[300px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

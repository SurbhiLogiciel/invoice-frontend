import React from 'react';
import { Button } from '../core-ui/button';
import { Input } from '../core-ui/input/input';
import image1 from '../assets/1.png';
import image3 from '../assets/3.png';
import image4 from '../assets/4.png';
import IIcon from '../svg/i-icon';

export const Login: React.FC = () => {
  return (
    <div className="flex bg-secondary bg-contain bg-no-repeat h-screen bg-right bg-[url('./assets/2.png')]">
      <div className="flex mx-auto py-8 justify-center max-h-full  w-full max-w-[1200px] gap-20">
        <div className="mx-auto max-h-full w-full max-w-[390px]">
          <img src={image3} alt="logo" className="w-full max-w-[250px] h-14" />
          <div className="flex font-bold mt-8 text-3xl text-white text-center">
            Welcome
          </div>
          <div className="flex text-gray text-custom text-lg text-center">
            We glad to see you
          </div>
          <div className="mt-10 text-white">
            <Input label="Email" size="large" />
          </div>
          <div className="mt-5 text-white">
            <Input label="Password" size="large" />
          </div>
          <input
            type="checkbox"
            className="h-5 mt-5 w-5 bg-secondary text-white border-gray-500 focus:ring-0"
          />
          &apos;
          <span className="mt-[25px] text-white">Remember me</span>
          <div className="mt-[35px]">
            <Button size="large" color="primary" fullWidth="true">
              Sign In
            </Button>
          </div>
          <div className="font-roboto text-center mt-5 text-white font-bold">
            Forgot password?
          </div>
          <hr className="mt-10 mb-8 text-white/10"></hr>
          <div className="text-gray text-[18px]">Don't have an account?</div>
          <div className="mt-[30px]">
            <Button size="large" outline="primary" fullWidth="true">
              Registration
            </Button>
          </div>
          <hr className="mt-[30px] text-white/10"></hr>
          <div className="mt-[30px] text-white text-[18px]">
            Do you need help? Contact techincal support
          </div>
          <div className="flex text-white mt-[27px]">
            <IIcon />
            &nbsp; support@invoice.com
          </div>
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

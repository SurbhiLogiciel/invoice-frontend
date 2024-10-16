import React from 'react';
import { Button } from '../core-ui/button';
import { Input } from '../core-ui/input/input';
import image1 from '../assets/1.png';
import image3 from '../assets/3.png';
import image4 from '../assets/4.png';
import IIcon from '../svg/i-icon';

export const Login: React.FC = () => {
  return (
    <div className="flex bg-secondary bg-contain bg-no-repeat max-h-screen bg-right bg-[url('./assets/2.png')]">
    <div className="flex mx-auto my-[62px] justify-center max-h-screen  w-full max-w-[1200px]">
      <div className="mx-auto min-h-screen w-full p-4">
        <img
          src={image3}
          alt="logo"
          className="w-full max-w-[251.49px] h-14"
        />
        <div className="flex font-bold mt-10 text-[36px] text-white text-center">
          Welcome
        </div>
        <div className="flex text-gray text-custom text-[18px] text-center">
        We glad to see you 
        </div>
        <div className="mt-10 text-white">
          <Input label="Email" />
        </div>
        <div className="mt-5 text-white">
          <Input label="Password" />
        </div>
        <input type="checkbox" className="h-5 mt-5 w-5 bg-secondary text-white border-gray-500 focus:ring-0"/>&apos;
        <span className="mt-[25px] text-white">Remember me</span>
        <div className="mt-[35px]">
          <Button size="large" color="primary" fullWidth="true">
            Sign In
          </Button>
        </div>
        <div className="font-roboto text-center mt-5 text-white font-bold">Forgot password?</div>
        <hr className='mt-[50px] text-white/10'></hr>
        <div className=" mt-[30px] text-gray text-[18px]">
          Don't have an account?
        </div>
        <div className="mt-[30px]">
          <Button size="large" outline="primary" fullWidth="true">
            Registration
          </Button>
        </div>
        <hr className='mt-[30px] text-white/10'></hr>
        <div className="mt-[30px] text-white text-[18px]">
          Do you need help? Contact techincal support
        </div>
        <div className="flex text-white mt-[27px]">
          <IIcon />&nbsp; support@invoice.com</div>
      </div>
      <div className="mx-auto w-full p-4 rounded-lg hidden lg:block">
        <div className="flex h-full max-h-[810px] justify-center px-[16px] items-center bg-primary mx-auto py-[22px] rounded-xl">
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

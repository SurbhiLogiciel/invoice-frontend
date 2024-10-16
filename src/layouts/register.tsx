import React from 'react';
import { Button } from '../core-ui/button';
import { Input } from '../core-ui/input/input';
import image1 from '../assets/1.png';
import image3 from '../assets/3.png';
import image4 from '../assets/4.png';
import IIcon from '../svg/i-icon';

export const RegisterEmail: React.FC = () => {
  return (
    <div className="flex bg-secondary bg-contain bg-no-repeat max-h-full bg-right bg-[url('./assets/2.png')]">
    <div className="flex mx-auto my-[62px] justify-center max-h-full  w-full max-w-[1200px]">
    <div className="mx-auto max-h-full w-full p-4">
        <img
          src={image3}
          alt="logo"
          className="w-full max-w-[251.49px] h-14"
        />
        <div className="flex font-bold mt-10 text-[36px] text-white text-center">
          Register as Company
        </div>
        <div className="flex text-gray text-custom text-[18px] text-center">
        Let's Meet 
        </div>
        <div className="mt-10 text-white">
          <Input label="E-mail" size='lg'/>
        </div>
        <div className="mt-[35px]">
          <Button size="large" color="primary" fullWidth="true">
            Verify Email
          </Button>
        </div>
      </div>	
      <div className="mx-auto w-full max-h-full p-4 rounded-lg hidden lg:block">
        <div className="flex h-full max-h-full justify-center px-[16px] items-center bg-primary mx-auto py-[22px] rounded-xl">
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

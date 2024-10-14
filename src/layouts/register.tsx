import React from 'react';
import { Button } from '../core-ui/button';
import image1 from '../assets/1.png';
import image3 from '../assets/3.png';
// import image4 from '../assets/4.png';

export const RegisterEmail: React.FC = () => {
  return (
    <div className="flex bg-secondary bg-contain bg-no-repeat max-h-screen bg-right bg-[url('./assets/2.png')]">
      <div className="flex mx-auto my-[62px] justify-center max-h-screen  w-full max-w-[1200px]">
        <div className="mx-auto min-h-screen w-full p-4">
          <img
            src={image3}
            alt="logo"
            className="w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px]"
          />
          <div className="flex font-bold mt-10 text-[36px] text-white text-center sm:text-[40px] md:text-[44px] lg:text-[36px]">
            Register as Company
          </div>
          <div className="flex text-gray text-custom text-[18px] text-center sm:text-[12px] md:text-[14px] lg:text-[18px]">
            Let's Meet
          </div>
          <div className="mt-10 text-white">
            Email:
            <div className="mt-[10px] w-full">
              <input
                type="text"
                className="h-10 w-full rounded-lg sm:w-[80%] md:w-[70%] lg:w-[60%]"
              />
            </div>
          </div>
          <div className="mt-[35px]">
            <Button size="medium" color="primary" fullWidth="true">
              Sign-In
            </Button>
          </div>
          <div className="mt-[30px]">
            <Button size="medium" outline="primary" fullWidth="true">
              Registration
            </Button>
          </div>
        </div>
        <div className="mx-auto w-full p-4 rounded-lg hidden lg:block">
          <div className="flex h-full justify-center px-[16px] items-center bg-primary mx-auto h-full py-[22px] rounded-xl">
            <img
              src={image1}
              alt="Layout Image"
              className="w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[450px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

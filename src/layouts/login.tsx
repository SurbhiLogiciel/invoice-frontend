import React from 'react';
import { Button } from '../core-ui/button';
import image1 from "../assets/1.png";
import image2 from "../assets/3.png";

export const Layout: React.FC = () => {
  return (
    <div className="flex bg bg-secondary">
      <div className="flex mx-auto my-[62px] justify-center w-full max-w-[1200px]">
        <div className="mx-auto w-full p-4">
          <img src={image2} alt="logo" className="w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px]" />
          <div className="flex font-bold mt-10 text-[36px] text-white text-center sm:text-[40px] md:text-[44px] lg:text-[48px]">
            Welcome
          </div>
          <div className="flex text-custom text-[18px] text-center sm:text-[20px] md:text-[22px] lg:text-[24px]">
            We glad to see you
          </div>
          <div className="mt-10 text-white">
            Email:
            <div className="mt-[10px]">
              <input type="text" className="h-10 w-96 rounded-lg sm:w-[80%] md:w-[70%] lg:w-[60%]" />
            </div>
            <div className="mt-5">
              Password:
              <div className="mt-[10px]">
                <input type="text" className="h-10 w-96 rounded-lg sm:w-[80%] md:w-[70%] lg:w-[60%]" />
              </div>
            </div>
          </div>
          <div className="mt-5 text-white">
            <input type="checkbox" className="rounded" name="" id="" /> Remember
            me
          </div>
          <div className="mt-[35px]">
            <Button size="medium" color="primary" fullWidth="true">
              Sign-In
            </Button>
          </div>
          <div className="mt-5 text-white text-center font-bold">
            Forgot password
          </div>
          <div className="mt-[50px]">
            <hr />
          </div>
          <div className="mt-[30px] text-white text-[18px] text-center">
            Don't have an account?
          </div>
          <div className="mt-[30px]">
            <Button size="medium" outline="primary" fullWidth="true">
              Registration
            </Button>
          </div>
          <div className="mt-[30px]">
            <hr />
          </div>
          <div className="text-white mt-[30px] text-center">
            Do you need help? Contact technical support.
          </div>
          <div className="mt-[27px] text-white text-center">
            <i className="fas fa-info-circle" aria-hidden="true"></i>
            support@invoice.com
          </div>
        </div>
        <div className="bg-secondary mx-auto w-full p-4 rounded-lg">
          <div className="flex justify-center px-[16px] items-center bg-primary mx-auto h-full py-[22px] rounded-xl">
            <img src={image1} alt="Layout Image" className="w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[450px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

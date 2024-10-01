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
          <div className="mt-5 text-white text-[14px] text-center font-bold">
            Forgot password?
          </div>
          <div className="mt-[50px]">
            <hr />
          </div>
          <div className="mt-[30px] text-white text-[18px]">
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
          <div className="text-white text-[18px] mt-[30px]">
            Do you need help? Contact technical support.
          </div>
          <div className="mt-[27px] text-white flex">
            <span className="mr-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.0005 16H14.5005C14.7766 16 15.0005 16.2239 15.0005 16.5C15.0005 16.7761 14.7766 17 14.5005 17H10.5005C10.2243 17 10.0005 16.7761 10.0005 16.5C10.0005 16.2239 10.2243 16 10.5005 16H12.0005V11H10.5005C10.2243 11 10.0005 10.7761 10.0005 10.5C10.0005 10.2239 10.2243 10 10.5005 10H12.5005C12.7766 10 13.0005 10.2239 13.0005 10.5V16ZM12.0005 22C6.47764 22 2.00049 17.5228 2.00049 12C2.00049 6.47715 6.47764 2 12.0005 2C17.5233 2 22.0005 6.47715 22.0005 12C22.0005 17.5228 17.5233 22 12.0005 22ZM12.0005 21C16.9711 21 21.0005 16.9706 21.0005 12C21.0005 7.02944 16.9711 3 12.0005 3C7.02993 3 3.00049 7.02944 3.00049 12C3.00049 16.9706 7.02993 21 12.0005 21ZM11.5005 7H12.5005C12.7766 7 13.0005 7.22386 13.0005 7.5V8.5C13.0005 8.77614 12.7766 9 12.5005 9H11.5005C11.2243 9 11.0005 8.77614 11.0005 8.5V7.5C11.0005 7.22386 11.2243 7 11.5005 7Z" fill="#FF5E85"/>
              </svg>
            </span>
            <span>support@invoice.com</span>
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

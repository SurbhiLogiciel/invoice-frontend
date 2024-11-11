import React, { ReactNode } from 'react';
import image1 from './assets/1.png';
import logo from './assets/logo.png';
import { Outlet } from 'react-router-dom';



const Layout: React.FC = ({  }) => {
  return (
    <div className="flex bg-secondary bg-contain bg-no-repeat min-h-screen bg-right">
      <div className="flex mx-auto py-8  max-h-full  w-full max-w-[1010px] gap-20">
        <div className="flex flex-col w-full max-w-[390px]">
          <div className="max-h-full">
            <img src={logo} alt="logo" className="w-full max-w-[250px] h-14" />
          </div>
          <Outlet />
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

export default Layout;

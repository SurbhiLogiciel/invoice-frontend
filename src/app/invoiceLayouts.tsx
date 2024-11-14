import React, { useState } from 'react';
import avatar from './assets/avtar.png';
import { Button } from '../core-ui/button';
import invoiceLogo from './assets/5.png';
import { Outlet } from 'react-router-dom';
import { InvoiceDrawer } from './Invoice/generateInvoiceForm';

interface InvoiceLayoutProps {}
export const InvoiceLayout: React.FC<InvoiceLayoutProps> = ({}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };
  return (
    <div className="flex h-screen bg-secondary">
      <div className="flex flex-col bg-violet items-center  py-5">
        <div className="px-2 sm:px-2 md:px-3 lg:px-4">
          <img src={invoiceLogo} alt="Logo" className="w-16 h-15" />
        </div>
        <div className="flex-grow"></div>
        <hr className="w-full border border-lightGray mb-4" />
        <div className="px-2 sm:px-2 md:px-3 lg:px-4">
          <img
            src={avatar}
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </div>
      <div className="w-full mx-auto  max-w-[1400px]">
        <div className="flex w-full justify-between items-center ">
          <div className="">
            <h1 className="text-white text-2xl sm:text-3xl mt-12 font-roboto">
              Invoices
            </h1>
            <p className="text-gray  font-roboto">No Invoices</p>
          </div>
          <div className="relative top-5 justify-between items-center ">
            <Button size="medium" color="primary" onClick={handleOpenDrawer}>
              New Invoice
            </Button>
          </div>
        </div>
        <div className="mt-12 flex">
          <Outlet />
        </div>
        <InvoiceDrawer open={isDrawerOpen} onClose={handleCloseDrawer} />
      </div>
    </div>
  );
};
export default InvoiceLayout;

import React, { useState } from 'react';
import avatar from './assets/avtar.png';
import { Button } from '../core-ui/button';
import { InvoiceDrawer } from './Inovice/generateInvoice';
import invoiceLogo from './assets/5.png';
import { Outlet } from 'react-router-dom';

interface InvoiceLayoutProps {
  // children: ReactNode;
}
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
      <div className="flex flex-col bg-violet h-full  justify-between items-center py-5 rounded-tr-lg rounded-br-lg">
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
      {/* Main Content */}
      <div className="flex flex-col max-w-[1200px] m-auto ">
        <div className="text-left ">
          <h1 className="text-white text-2xl sm:text-3xl font-roboto">
            Invoices
          </h1>
          <p className="text-gray  font-roboto">No Invoices</p>
        </div>
        <div className="mt-12 flex ">
          <Outlet />
        </div>
        <Button size="medium" color="primary" onClick={handleOpenDrawer}>
          New Invoice
        </Button>
      </div>
      <InvoiceDrawer open={isDrawerOpen} onClose={handleCloseDrawer} />
    </div>
  );
};
export default InvoiceLayout;

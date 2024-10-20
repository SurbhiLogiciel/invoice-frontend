import React, { ReactNode } from 'react';
import image3 from './assets/3.png';
import avatar from './assets/avtar.png';
import { Button } from '../core-ui/button';

interface InvoiceLayoutProps {
  children: ReactNode;
}

export const InvoiceLayout: React.FC<InvoiceLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-secondary">
      <div className="flex flex-col bg-violet h-full w-20 justify-between items-center py-5 rounded-tr-lg rounded-br-lg">
        <div className="px-2 sm:px-2 md:px-3 lg:px-4">
          <img src={image3} alt="Logo" className="w-16 h-15" />
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

      <div className="flex flex-col flex-grow p-4 sm:p-6 md:p-8 lg:p-10 relative">
        <div className="text-left ml-6 sm:ml-8 md:ml-[100px] lg:ml-[120px]">
          <h1 className="text-white text-2xl sm:text-3xl mb-2 font-roboto">
            Invoices
          </h1>
          <p className="text-gray py-1 text-sm sm:text-base font-roboto">
            No Invoices
          </p>
        </div>

        <div className="mt-12 flex justify-center items-center ml-6 sm:ml-8 md:ml-[100px] lg:ml-[120px]">
          {children}
        </div>

        <div className="absolute top-4 sm:top-8 right-4 sm:right-10 font-roboto font-medium">
          <Button size="medium" color="primary">
            New Invoice
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceLayout;

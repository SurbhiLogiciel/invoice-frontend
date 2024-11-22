import React, { useEffect, useState } from 'react';
import avatar from './assets/avtar.png';
import { Button } from '../core-ui/button';
import invoiceLogo from './assets/5.png';
import { Outlet, useParams } from 'react-router-dom';
import { InvoiceDrawer } from './Invoice/generateInvoice';
import axios from 'axios';

interface InvoiceLayoutProps {}

export const InvoiceLayout: React.FC<InvoiceLayoutProps> = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [data, setData] = useState<any | null>(null);
  const { id } = useParams();

  const handleToggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
    console.log(`Drawer ${!isDrawerOpen ? 'Open' : 'Close'} Clicked`);
  };

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`/api/invoice/${id}`); // Use your actual API endpoint
          setData(response.data || null);
        } catch (error) {
          console.error('Error fetching data:', error);
          setData(null);
        }
      };

      fetchData();
    } else {
      console.log('Error occurred while fetching data');
    }
  }, [id]);

  return (
    <div className="flex h-screen bg-secondary">
      {/* Sidebar */}
      <div className="flex flex-col bg-violet items-center py-5">
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
      <div className="w-full mx-auto max-w-[1400px]">
        <div className="flex w-full justify-between items-center">
          <div>
            <h1 className="text-white text-2xl sm:text-3xl mt-12 font-roboto">
              Invoices
            </h1>
            <div className="mt-12 flex">
              <Outlet />
            </div>
          </div>
          <div className="relative">
            {/* Open Drawer Button */}
            <Button size="medium" color="primary" onClick={handleToggleDrawer}>
              New Invoice
            </Button>
          </div>
        </div>
      </div>

      {/* Drawer Component */}
      <InvoiceDrawer open={isDrawerOpen} onClose={handleToggleDrawer} />
    </div>
  );
};

export default InvoiceLayout;

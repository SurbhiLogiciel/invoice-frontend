import React, { useEffect, useState } from 'react';
import avatar from './assets/avtar.png';
import { Button } from '../core-ui/button';
import invoiceLogo from './assets/5.png';
import { Outlet, useParams } from 'react-router-dom';
import { InvoiceDrawer } from './Invoice/generateInvoice';
import axios from 'axios';

interface InvoiceLayoutProps {
  // children: ReactNode;
}
export const InvoiceLayout: React.FC<InvoiceLayoutProps> = ({}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [data, setData] = useState<any | null>(null);
  const { id } = useParams();
  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`/api/invoice/${id}`); // Use your actual API endpoint

          setData(response.data || null); // Set the fetched data or null if no data
        } catch (error) {
          console.error('Error fetching data:', error);
          setData(null); // Set data to null in case of an error
        }
      };

      fetchData();
    } else {
      console.log('Error occured while fetching data');

      //  setLoading(false); // No ID provided, so no need to fetch
    }
  }, [id]);

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
        <InvoiceDrawer open={isDrawerOpen} onClose={handleCloseDrawer} />
      </div>
    </div>
  );
};
export default InvoiceLayout;

import React, { useEffect, useState } from 'react';
import avatar from './assets/avtar.png';
import { Button } from '../core-ui/button';
import invoiceLogo from './assets/5.png';
import { Outlet, useParams } from 'react-router-dom';
import { InvoiceDrawer } from './Invoice/generateInvoice';
import axios from 'axios';
import { DataContainer, InvoiceType } from '../core-ui/DataContainer';
import { useNavigate } from 'react-router-dom';
import { createInvoice } from '../services/apiService';

interface InvoiceLayoutProps {}

export const InvoiceLayout: React.FC<InvoiceLayoutProps> = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [invoice, setInvoice] = useState<InvoiceType | null>(null);
  const { invoiceId } = useParams();

  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();
  const handleToggleDrawer = () => {
    setIsDrawerOpen((prev) => {
      const nextState = !prev;

      if (nextState) {
        navigate(`/invoiceLayout/${userId}`);
      } else {
        navigate(`/invoiceLayout/${userId}`);
      }

      return nextState;
    });

    console.log(`Drawer ${!isDrawerOpen ? 'Open' : 'Close'} Clicked`);
  };

  const handleSaveInvoice = async (
    updatedInvoice: InvoiceType
  ): Promise<void> => {
    if (updatedInvoice) {
      try {
        await axios.put(`/api/invoices/${updatedInvoice._id}`, updatedInvoice);
        console.log('Invoice updated successfully');
      } catch (error) {
        console.error('Failed to save invoice:', error);
      }
    }
  };
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
      <div className="w-full mx-auto max-w-[1500px]">
        <div className="flex w-full justify-between items-center mt-12">
          <h1 className="text-white text-2xl sm:text-3xl font-roboto">
            Invoices
          </h1>
          <div className="relative">
            <Button size="medium" color="primary" onClick={handleToggleDrawer}>
              New Invoice
            </Button>
          </div>
        </div>
        <div className="mt-12 flex justify-center">
          <DataContainer>
            <div></div>
          </DataContainer>
        </div>
      </div>

      <InvoiceDrawer
        open={isDrawerOpen}
        onClose={handleToggleDrawer}
        invoice={invoice}
        onSave={handleSaveInvoice}
      />
    </div>
  );
};

export default InvoiceLayout;

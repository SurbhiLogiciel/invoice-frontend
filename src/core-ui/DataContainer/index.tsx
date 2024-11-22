import React, { useEffect, useState } from 'react';
import { Container } from './types';
import { DropdownOption } from '../dropdown/types';
import Frame from '../../app/assets/Frame.png';
import { Chips } from '../chips';
import { Dropdown } from '../dropdown';
import axios from 'axios';
import { InvoiceDrawer } from '../../app/Invoice/generateInvoice';

export const DataContainer: React.FC<Container> = ({
  data,
  size = 'medium',
  color = 'purple',
  children,
}) => {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/invoiceList'
        );
        setInvoices(response.data.data); // Set the fetched invoices
      } catch (error: any) {
        console.error(error.message); // Handle any error
      }
    };

    fetchData();
  }, []);

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true); // Open the drawer
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false); // Close the drawer
  };

  const handleDelete = () => {
    alert('You clicked the delete option');
    console.log('Delete option clicked');
  };

  const options: DropdownOption[] = [
    {
      label: 'Edit',
      action: handleOpenDrawer,
      color: 'success',
    },
    { label: 'Delete', action: handleDelete, color: 'danger' },
  ];

  const sizeClasses: Record<string, string> = {
    small: 'py-4',
    medium: 'py-8 px-5 text-md',
    large: 'py-4',
  };

  const colorClasses: Record<string, string> = {
    purple: 'bg-purple',
  };

  const classNames = [
    'font-roboto rounded-md text-white lg:w-full max-w-full min-w-[900px]',
    sizeClasses[size],
    colorClasses[color],
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="flex flex-col w-full gap-y-6">
      <div className={classNames}>
        <div className="flex flex-col w-full gap-7 justify-between items-center max-w-full">
          {invoices.map((invoice) => (
            <div className="flex w-full gap-7 items-center" key={invoice._id}>
              {children}
              <div className="w-48">#INV-{invoice.email || '30202'}</div>
              <div className="w-48">
                Due {invoice.fullName || '19 Sept, 2024'}
              </div>
              <div className="w-48">{invoice.email || 'David Jonas'}</div>
              <div className="w-52">
                Created on {invoice.email || '10 Sept, 2024'}
              </div>
              <div className="w-40 font-bold text-[20px]">
                ${invoice.email || '1800'}
              </div>
              <div className="w-40 shrink-0">
                <Chips
                  onClick={() => alert('You clicked on paid chip')}
                  color="success"
                  children={invoice.email || 'Paid'}
                />
              </div>
              <div className="w-16">
                <Dropdown options={options} Image={Frame} position="right" />
              </div>
            </div>
          ))}
        </div>
        <InvoiceDrawer open={isDrawerOpen} onClose={handleCloseDrawer} />
      </div>
    </div>
  );
};

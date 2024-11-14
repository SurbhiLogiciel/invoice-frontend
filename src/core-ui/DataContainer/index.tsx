import React, { useEffect, useState } from 'react';
import { Container } from './types';
import { parseISO } from 'date-fns';
import { DropdownOption } from '../dropdown/types';
import Frame from '../../app/assets/Frame.png';
import { Chips } from '../chips';
import { Dropdown } from '../dropdown';
import { fetchInvoiceList } from '../../services/apiService';
import axios from 'axios';
import { InvoiceDrawer } from '../../app/Invoice/generateInvoiceForm';

export const DataContainer: React.FC<Container> = ({
  size = 'medium',
  color = 'purple',
  children,
}) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [invoices, setInvoices] = useState<any[]>([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/invoiceList');
      // const sortedData = response.data.data.sort((a: any, b: any) => {
      //   const dateA = parseISO(a.createdAt); // Parse using date-fns
      //   const dateB = parseISO(b.createdAt); // Parse using date-fns

      // //   // Sort in ascending order (oldest to newest)
      //   return dateA.getTime() - dateB.getTime();
      // });

      setInvoices(response.data.data); 
    } catch (error: any) {
      setError(error.message); // Handle any error
    }
  };

  fetchData();
}, []);

//  const handleOpenDrawer = () => {
//    setIsDrawerOpen(true);
//  };

  // const handleEdit = () => {
    const handleOpenDrawer = () => {
   setIsDrawerOpen(true);
 };
  // };
    const handleCloseDrawer = () => {
      setIsDrawerOpen(false);
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
          {invoices.length > 0 ? (
            invoices.map((invoice) => (
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
            ))
          ) : (
            <p>No invoices available</p>
          )}
        </div>
        <InvoiceDrawer open={isDrawerOpen} onClose={handleCloseDrawer} />
      </div>
    </div>
  );
};

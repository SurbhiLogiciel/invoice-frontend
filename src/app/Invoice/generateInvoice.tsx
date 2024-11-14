import React, { useState } from 'react';
import { Drawer } from '@mui/material';
import { Input } from '../../core-ui/input/input';
import SelectInput from '../../core-ui/input/selectInput';
import DateInput from '../../core-ui/input/dateInput';
import DeleteIcon from '../svg/deleteIcon';
import { Button } from '../../core-ui/button';
import { useParams } from 'react-router-dom';
import { createInvoice } from '../../services/apiService';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
}

export const InvoiceDrawer: React.FC<DrawerProps> = ({ open, onClose }) => {
  const { userId } = useParams<{ userId: string }>();
  const [companyName, setCompanyName] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [issueDate, setIssueDate] = useState<Date | null>(new Date());
  const [paymentTerms, setPaymentTerms] = useState('');
  const [items, setItems] = useState([
    { id: 1, itemName: '', qty: 0, price: 0 },
  ]);

  const addItemRow = () => {
    setItems([
      ...items,
      { id: items.length + 1, itemName: '', qty: 0, price: 0 },
    ]);
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setItems(updatedItems);
  };

  const handleDeleteItem = (id: number) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  const handleCreateInvoice = async () => {
    const invoiceData = {
      companyName,
      streetAddress,
      city,
      state,
      zip,
      issueDate,
      paymentTerms,
      items,
    };

    if (userId) {
      try {
        console.log('Creating invoice for userId:', userId);
        await createInvoice(userId, invoiceData);
        onClose();
      } catch (error) {
        console.error('Failed to create invoice', error);
      }
    }
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        position: 'absolute',
        left: '90px',
        width: 350,
        height: '100%',
        transition: 'transform 0.3s ease-in-out',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        '& .MuiDrawer-paper': {
          width: 550,
          boxSizing: 'border-box',
          backgroundColor: 'rgb(var(--color-secondary))',
          color: 'white',
        },
      }}
    >
      <div className="p-6">
        <h2 className="text-white font-bold text-xl font-roboto">
          New Invoice
        </h2>

        <h2 className="text-primary font-semibold text-sm mt-7 font-roboto">
          Bill To
        </h2>

        <div className="mt-2">
          <Input
            variant="secondary"
            label="Company Name"
            size="large"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
        <div className="mt-5">
          <Input
            variant="secondary"
            label="Street Address"
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
          />
        </div>
        <div className="mt-5">
          <SelectInput
            variant="secondary"
            label="City"
            placeholder="Select"
            options={['ludhiana', 'amritsar', 'jaipur', 'chandigarh']}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div className="mt-5 flex space-x-4">
          <div className="w-1/2">
            <SelectInput
              variant="secondary"
              placeholder="Select"
              label="State"
              options={['Punjab', 'Haryana', 'Karnataka']}
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>

          <div className="w-1/2">
            <SelectInput
              variant="secondary"
              placeholder="Select"
              label="Zip"
              options={['14000', '16000', '18000']}
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-5 flex space-x-4">
          <div className="w-1/2">
            <DateInput
              value={issueDate}
              onChange={(date: Date | null) => setIssueDate(date)}
            />
          </div>
          <div className="w-1/2">
            <SelectInput
              variant="secondary"
              placeholder="Select"
              label="Payment Terms"
              options={['next 30 days', 'next 60 days', 'next 90 days']}
              value={paymentTerms}
              onChange={(e) => setPaymentTerms(e.target.value)}
            />
          </div>
        </div>

        <h2 className="text-gray font-bold text-lg mt-10 font-roboto">
          Item List
        </h2>
        <div className="flex space-x-4 mt-4">
          <div className="flex-1 w-[188px]">
            <h3 className="text-sm font-roboto font-semibold">Item Name</h3>
          </div>
          <div className="w-[67px]">
            <h3 className="text-sm font-roboto font-semibold">Quantity</h3>
          </div>
          <div className="w-[100px]">
            <h3 className="text-sm font-roboto font-semibold">Price</h3>
          </div>
          <div className="w-1/5 text-center">
            <h3 className="text-sm font-roboto font-semibold">Total</h3>
          </div>
          <div className="w-6 flex justify-center items-center"></div>
        </div>

        {items.map((item, index) => (
          <div key={index} className="flex items-center space-x-4 mt-4">
            <div className="flex-1 w-[188px]">
              <Input
                variant="secondary"
                size="large"
                value={item.itemName}
                onChange={(e) =>
                  handleItemChange(index, 'itemName', e.target.value)
                }
              />
            </div>
            <div className="w-[67px]">
              <Input
                variant="secondary"
                size="large"
                value={item.qty}
                onChange={(e) =>
                  handleItemChange(index, 'qty', parseInt(e.target.value))
                }
              />
            </div>
            <div className="w-[100px]">
              <Input
                variant="secondary"
                size="large"
                value={item.price}
                onChange={(e) =>
                  handleItemChange(index, 'price', parseFloat(e.target.value))
                }
              />
            </div>
            <div className="w-1/5 text-center">
              <h3 className="text-white font-roboto font-semibold">
                ${item.qty * item.price}
              </h3>
            </div>
            <div className="w-6 flex justify-center items-center cursor-pointer">
              <DeleteIcon onClick={() => handleDeleteItem(item.id)} />
            </div>
          </div>
        ))}
        <p
          className="text-primary text-sm font-roboto cursor-pointer mt-4"
          onClick={addItemRow}
        >
          + Add More Item
        </p>
      </div>
      <div className="flex justify-end bg-purple space-x-4 p-3">
        <Button
          size="large"
          outline="primary"
          color="secondary"
          children="Cancel"
          onClick={onClose}
        />
        <Button
          size="large"
          color="primary"
          children="Save"
          onClick={handleCreateInvoice}
        />
      </div>
    </Drawer>
  );
};

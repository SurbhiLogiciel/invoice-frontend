import React, { useState } from 'react';
import { Drawer } from '@mui/material';
import { Input } from '../../core-ui/input/input';
import SelectInput from '../../core-ui/input/selectInput';
import DateInput from '../../core-ui/input/dateInput';
import DeleteIcon from '../svg/deleteIcon';
import { Button } from '../../core-ui/button';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
}

export const InvoiceDrawer: React.FC<DrawerProps> = ({ open, onClose }) => {
  const [items, setItems] = useState([{ id: 1 }, { id: 2 }, { id: 3 }]);
  const addItemRow = () => {
    setItems([...items, { id: items.length + 1 }]);
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

        {/* Input fields */}
        <div className="mt-2">
          <Input variant="secondary" label="Company Name" size="large" />
        </div>
        <div className="mt-5">
          <Input variant="secondary" label="Street Address" />
        </div>
        <div className="mt-5">
          <SelectInput
            variant="secondary"
            label="City"
            placeholder="Select"
            options={['ludhiana', 'amritsar', 'jaipur', 'chandigarh']}
          />
        </div>

        <div className="mt-5 flex space-x-4">
          <div className="w-1/2">
            <SelectInput
              variant="secondary"
              placeholder="Select"
              label="State"
              options={['Punjab', 'Haryana', 'Karnataka']}
            />
          </div>

          <div className="w-1/2">
            <SelectInput
              variant="secondary"
              placeholder="Select"
              label="Zip"
              options={['14000', '16000', '18000']}
            />
          </div>
        </div>

        <div className="mt-5 flex space-x-4">
          <div className="w-1/2">
            <DateInput />
          </div>
          <div className="w-1/2">
            <SelectInput
              variant="secondary"
              placeholder="Select"
              label="Payment Terms"
              options={['next 30 days', 'next 60 days', 'next 90 days']}
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
              <Input variant="secondary" size="large" />
            </div>
            <div className="w-[67px]">
              <Input variant="secondary" size="large" />
            </div>
            <div className="w-[100px]">
              <Input variant="secondary" size="large" />
            </div>
            <div className="w-1/5 text-center">
              <h3 className="text-white font-roboto font-semibold">$0</h3>
            </div>
            <div className="w-6 flex justify-center items-center">
              <DeleteIcon />
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
      <div className="flex justify-end bg-purple space-x-4  p-3">
        <Button
          size="large"
          outline="primary"
          color="secondary"
          children="Cancel"
          onClick={onClose}
        />
        <Button type="submit" size="large" color="primary" children="Save" />
      </div>
    </Drawer>
  );
};

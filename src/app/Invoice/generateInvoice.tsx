import React, { useState } from 'react';
import { Drawer } from '@mui/material';
import { Input } from '../../core-ui/input/input';
import SelectInput from '../../core-ui/input/selectInput';
import DateInput from '../../core-ui/input/dateInput';
import DeleteIcon from '../svg/deleteIcon';
import { Button } from '../../core-ui/button';
import { useLocation, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import {
  createInvoice,
  fetchInvoiceData,
  fetchInvoiceList,
  updateInvoice,
} from '../../services/apiService';
import { InvoiceType } from '../../core-ui/DataContainer';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  invoice: InvoiceType | null;
  onSave: (updatedInvoice: InvoiceType) => Promise<void>;
}

export const InvoiceDrawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  invoice,
  onSave,
}) => {
  const { userId } = useParams<{ userId: string }>();
  const { invoiceId } = useParams<{ invoiceId: string }>();
  const [companyName, setCompanyName] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [issueDate, setIssueDate] = useState<Date | null>(new Date());
  const [status, setStatus] = useState('');
  const [paymentTerms, setPaymentTerms] = useState('');
  const [items, setItems] = useState([
    { id: Date.now(), itemName: '', qty: 0, price: 0 },
    { id: Date.now() + 1, itemName: '', qty: 0, price: 0 },
    { id: Date.now() + 2, itemName: '', qty: 0, price: 0 },
  ]);
  const location = useLocation();

  const isEditing = location.pathname.includes(
    `/invoiceLayout/${userId}/${invoiceId}`
  );

  const addItemRow = () => {
    setItems([...items, { id: Date.now(), itemName: '', qty: 0, price: 0 }]);
  };

  const handleItemChange = (id: number, field: string, value: any) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setItems(updatedItems);
  };

  const handleDeleteItem = (id: number) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  const handleSave = async () => {
    const invoiceData = {
      companyName,
      streetAddress,
      city,
      state,
      zip,
      issueDate,
      paymentTerms,
      status,
      items,
    };

    if (userId) {
      try {
        console.log('Creating invoice for userId:', userId);
        isEditing && invoice?._id
          ? await updateInvoice(invoice._id, userId, invoiceData)
          : await createInvoice(userId, invoiceData);
        onClose();
      } catch (error) {
        console.error('Failed to create invoice', error);
      }
    }
  };

  // const drawerForm = () => {
  //   const validationSchema = Yup.object({
  //     companyName: Yup.string().companyName("").required();
  //   });
  // }

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
        {isEditing ? (
          <h2 className="text-white font-bold text-xl font-roboto">
            Update Invoice
          </h2>
        ) : (
          <h2 className="text-white font-bold text-xl font-roboto">
            New Invoice
          </h2>
        )}

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
          <div className="w-1/2">
            <SelectInput
              variant="secondary"
              placeholder="Select"
              label="Status"
              options={['PAID', 'PENDING']}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
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

        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-4 mt-4">
            <div className="flex-1 w-[188px]">
              <Input
                variant="secondary"
                size="large"
                value={item.itemName}
                onChange={(e) =>
                  handleItemChange(item.id, 'itemName', e.target.value)
                }
              />
            </div>
            <div className="w-[67px]">
              <Input
                variant="secondary"
                size="large"
                value={item.qty}
                onChange={(e) =>
                  handleItemChange(item.id, 'qty', parseInt(e.target.value))
                }
              />
            </div>
            <div className="w-[100px]">
              <Input
                variant="secondary"
                size="large"
                value={item.price}
                onChange={(e) =>
                  handleItemChange(item.id, 'price', parseFloat(e.target.value))
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

        {isEditing ? (
          <Button
            size="large"
            color="primary"
            children="Update"
            onClick={handleSave}
          />
        ) : (
          <Button
            size="large"
            color="primary"
            children="Save"
            onClick={handleSave}
          />
        )}
      </div>
    </Drawer>
  );
};

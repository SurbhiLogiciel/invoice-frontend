import React, { useState } from 'react';
import { Drawer } from '@mui/material';
import { Input } from '../../core-ui/input/input';
import SelectInput from '../../core-ui/input/selectInput';
import DateInput from '../../core-ui/input/dateInput';
import DeleteIcon from '../svg/deleteIcon';
import { Button } from '../../core-ui/button';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FieldArray, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { createInvoice, updateInvoice } from '../../services/apiService';
import { InvoiceType } from '../../core-ui/DataContainer';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  invoice: InvoiceType | null;
  onSave: (updatedInvoice: InvoiceType) => Promise<void>;
}

// interface for validation
interface DrawerForm {
  companyName: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
  issueDate: string;
  paymentTerms: string;
  status: string;
  items: {
    id: string;
    itemName: string;
    qty: number;
    price: number;
    total: number;
  }[];
}

export const InvoiceDrawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  invoice,
  onSave,
}) => {
  const { userId } = useParams<{ userId: string }>();
  const { invoiceId } = useParams<{ invoiceId: string }>();
  const [items, setItems] = useState([
    { id: Date.now(), itemName: '', qty: 0, price: 0, total: 0 },
    { id: Date.now() + 1, itemName: '', qty: 0, price: 0, total: 0 },
    { id: Date.now() + 2, itemName: '', qty: 0, price: 0, total: 0 },
  ]);
  const location = useLocation();

  const isEditing = location.pathname.includes(
    `/invoiceLayout/${userId}/${invoiceId}`
  );

  const navigate = useNavigate();
  const handleSave = async (
    values: DrawerForm,
    { setSubmitting }: FormikHelpers<DrawerForm>
  ) => {
    if (userId) {
      try {
        isEditing && invoiceId
          ? await updateInvoice(invoiceId, userId, values)
          : await createInvoice(userId, values);
        navigate(`/invoiceLayout/${userId}`);
      } catch (error) {
        console.error('Failed to create invoice', error);
      }

      onClose();
    }

    setSubmitting(false);
  };

  const validationSchema = Yup.object({
    companyName: Yup.string().required('Company Name is Required'),
    streetAddress: Yup.string().required('street is Required'),
    city: Yup.string().required('city is Required'),
    state: Yup.string().required('state is Required'),
    zip: Yup.string().required('zip is Required'),
    issueDate: Yup.string().required('issueDate is Required'),
    paymentTerms: Yup.string().required('paymentTerms is Required'),
    status: Yup.string().required('status is Required'),
    items: Yup.array()
      .of(
        Yup.object({
          itemName: Yup.string().required('Item name is required'),
          qty: Yup.number()
            .min(1, 'Quantity must be at least 1')
            .required('Quantity is required'),
          price: Yup.number()
            .min(0.01, 'Price must be greater than 0')
            .required('Price is required'),
          total: Yup.number().required('Total is required'),
        })
      )
      .required('Items are required'),
  });

  const initialValues: DrawerForm = {
    companyName: '',
    streetAddress: '',
    city: '',
    state: '',
    zip: '',
    issueDate: '',
    paymentTerms: '',
    status: '',
    items: [{ id: '1', itemName: '', qty: 1, price: 0, total: 0 }],
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        position: 'absolute',
        left: '90px',
        width: 550,
        height: '100%',
        transition: 'transform 0.3s ease-in-out',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        '& .MuiDrawer-paper': {
          width: 550,
          boxSizing: 'border-box',
          backgroundColor: 'rgb(var(--color-secondary))',
          color: 'white',
          // overflowY:'auto'
        },
      }}
    >
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, formikHelpers) => {
            handleSave(values, formikHelpers);
          }}
        >
          {({
            handleBlur,
            handleSubmit,
            values,
            handleChange,
            setFieldValue,
            errors,
          }) => {
            return (
              <form onSubmit={handleSubmit}>
                <div className="p-6 pb-24">
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
                      label="Company Name"
                      id="companyName"
                      variant="secondary"
                      size="large"
                      name="companyName"
                      value={values.companyName}
                      onChange={(e) =>
                        setFieldValue('companyName', e.target.value)
                      }
                    />
                  </div>
                  <div className="mt-5">
                    <Input
                      label="Street"
                      id="streetAddress"
                      variant="secondary"
                      size="large"
                      name="streetAddress"
                      value={values.streetAddress}
                      onChange={(e) =>
                        setFieldValue('streetAddress', e.target.value)
                      }
                    />
                  </div>
                  <div className="mt-5">
                    <SelectInput
                      id="city"
                      name="city"
                      variant="secondary"
                      label="city"
                      options={['ludhiana', 'amritsar', 'jaipur', 'chandigarh']}
                      value={values.city}
                      onChange={(e) => setFieldValue('city', e.target.value)}
                      onBlur={handleBlur}
                    />
                  </div>
                  <div className="mt-5 flex space-x-4">
                    <div className="w-1/2">
                      <SelectInput
                        id="state"
                        variant="secondary"
                        placeholder="Select"
                        label="State"
                        options={['Punjab', 'Haryana', 'Karnataka']}
                        value={values.state}
                        onChange={(e) => {
                          const value = e.target.value;
                          setFieldValue('state', value);
                        }}
                        onBlur={handleBlur}
                        name="state"
                      />
                    </div>

                    <div className="w-1/2">
                      <SelectInput
                        id="zip"
                        variant="secondary"
                        placeholder="Select"
                        label="Zip"
                        options={['14000', '16000', '18000']}
                        value={values.zip}
                        onChange={(e) => {
                          const value = e.target.value;
                          setFieldValue('zip', value);
                        }}
                        onBlur={handleBlur}
                        name="zip"
                      />
                    </div>
                  </div>

                  <div className="mt-5 flex space-x-4">
                    <div className="w-1/2">
                      <DateInput
                        id="issueDate"
                        name="issueDate"
                        value={
                          values.issueDate ? new Date(values.issueDate) : null
                        }
                        onChange={(date: Date | null) => {
                          setFieldValue('issueDate', date);
                        }}
                      />
                    </div>
                    <div className="w-1/2">
                      <SelectInput
                        id="paymentTerms"
                        variant="secondary"
                        placeholder="Select"
                        label="Payment Terms"
                        options={['Net 30', 'Net 60', 'Net 90']}
                        value={values.paymentTerms}
                        onChange={(e) => {
                          const value = e.target.value;
                          setFieldValue('paymentTerms', value);
                        }}
                        onBlur={handleBlur}
                        name="paymentTerms"
                      />
                    </div>
                    <div className="w-1/2">
                      <SelectInput
                        id="status"
                        variant="secondary"
                        placeholder="Select"
                        label="Status"
                        options={['PAID', 'PENDING']}
                        value={values.status}
                        onChange={(e) =>
                          setFieldValue('status', e.target.value)
                        }
                        onBlur={handleBlur}
                        name="status"
                      />
                    </div>
                  </div>

                  <h2 className="text-gray font-bold text-lg mt-10 font-roboto">
                    Item List
                  </h2>
                  <FieldArray name="items">
                    {({ push, remove }) => (
                      <>
                        <div className="flex space-x-4 mt-4">
                          <div className="flex-1 w-[188px]">
                            <h3 className="text-sm font-roboto font-semibold">
                              Item Name
                            </h3>
                          </div>
                          <div className="w-[67px]">
                            <h3 className="text-sm font-roboto font-semibold">
                              Quantity
                            </h3>
                          </div>
                          <div className="w-[100px]">
                            <h3 className="text-sm font-roboto font-semibold">
                              Price
                            </h3>
                          </div>
                          <div className="w-1/5 text-center">
                            <h3 className="text-sm font-roboto font-semibold">
                              Total
                            </h3>
                          </div>
                          <div className="w-6 flex justify-center items-center"></div>
                        </div>

                        {values.items.map((item, index) => (
                          <div
                            key={item.id}
                            className="flex items-center space-x-4 mt-4"
                          >
                            {/* Item Name */}
                            <div className="flex-1 w-[188px]">
                              <Input
                                id={`itemName-${index}`}
                                name={`items[${index}].itemName`}
                                value={item.itemName}
                                onChange={(e) =>
                                  setFieldValue(
                                    `items[${index}].itemName`,
                                    e.target.value
                                  )
                                }
                              />
                            </div>

                            {/* Quantity */}
                            <div className="w-[67px]">
                              <Input
                                id={`qty-${index}`}
                                name={`items[${index}].qty`}
                                value={item.qty}
                                onChange={(e) =>
                                  setFieldValue(
                                    `items[${index}].qty`,
                                    parseInt(e.target.value, 10)
                                  )
                                }
                              />
                            </div>

                            {/* Price */}
                            <div className="w-[100px]">
                              <Input
                                id={`price-${index}`}
                                name={`items[${index}].price`}
                                value={item.price}
                                onChange={(e) =>
                                  setFieldValue(
                                    `items[${index}].price`,
                                    parseFloat(e.target.value)
                                  )
                                }
                              />
                            </div>

                            {/* Total */}
                            <div className="w-1/5 text-center">
                              <h3 className="text-white font-roboto font-semibold">
                                ${item.qty * item.price}
                              </h3>
                            </div>

                            {/* Remove Item */}
                            <div className="w-6 flex justify-center items-center cursor-pointer">
                              <DeleteIcon onClick={() => remove(index)} />
                            </div>
                          </div>
                        ))}

                        {/* Add More Item */}
                        <p
                          className="text-primary text-sm font-roboto cursor-pointer mt-4"
                          onClick={() =>
                            push({
                              id: Date.now(),
                              itemName: '',
                              qty: 0,
                              price: 0,
                              total: 0,
                            })
                          }
                        >
                          + Add More Item
                        </p>
                      </>
                    )}
                  </FieldArray>
                </div>

                <div className="flex fixed w-[550px] left bottom-0 justify-end bg-purple space-x-4 p-3">
                  <Button
                    size="large"
                    outline="primary"
                    color="secondary"
                    children="Cancel"
                    onClick={onClose}
                  />

                  {isEditing ? (
                    <Button
                      type="submit"
                      size="large"
                      color="primary"
                      children="Update"
                    />
                  ) : (
                    <Button
                      type="submit"
                      size="large"
                      color="primary"
                      children="Save"
                    />
                  )}
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </Drawer>
  );
};

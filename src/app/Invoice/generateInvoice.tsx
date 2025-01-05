import React, { useState, useEffect } from 'react';
import { Drawer } from '@mui/material';
import { Input } from '../../core-ui/input/input';
import SelectInput from '../../core-ui/input/selectInput';
import DateInput from '../../core-ui/input/dateInput';
import DeleteIcon from '../svg/deleteIcon';
import { Button } from '../../core-ui/button';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FieldArray, Formik } from 'formik';
import * as Yup from 'yup';
import { createInvoice, updateInvoice, fetchInvoiceData } from '../../services/apiService';
import { InvoiceType } from '../../core-ui/DataContainer';
import { showToast } from '../../services/toastService';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  invoice: InvoiceType | null;
  onSave: (invoice: InvoiceType) => void;
}

interface DrawerForm {
  isDraft?: boolean;
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
  const location = useLocation();
  const navigate = useNavigate();

  const [editingInvoiceData, setEditingInvoiceData] = useState<DrawerForm | null>(null);
  const isEditing = location.pathname.includes(`/invoiceLayout/${userId}/${invoiceId}`);

  useEffect(() => {
    if (isEditing && userId && invoiceId) {
      fetchInvoiceData(userId, invoiceId).then((data) => {
        console.log(data);
        setEditingInvoiceData(data);
         // Ensure the entire data object is set
      });
    }
  }, [isEditing, userId, invoiceId]);

  const handleSave = async (
    values: DrawerForm,
    setSubmitting: (isSubmitting: boolean) => void,
    isDraft: boolean
  ) => {
    if (isDraft) values.status = 'DRAFT';

    try {
      let response: InvoiceType;
      if (isEditing && invoiceId) {
        response = await updateInvoice(invoiceId, userId!, values);
        showToast('Invoice updated successfully!', 'success');
      } else {
        response = await createInvoice(userId!, values);
        showToast(isDraft ? 'Draft invoice saved!' : 'Invoice created!', 'success');
      }
      onSave(response);
      navigate(`/invoiceLayout/${userId}`);
      onClose();
    } catch (error) {
      showToast('Failed to save the invoice. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object({
    companyName: Yup.string().required('Company Name is required'),
    streetAddress: Yup.string().required('Street Address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    zip: Yup.string().required('ZIP code is required'),
    issueDate: Yup.string().required('Issue Date is required'),
    paymentTerms: Yup.string().required('Payment Terms are required'),
    status: Yup.string().required('Status is required'),
    items: Yup.array()
      .of(
        Yup.object({
          itemName: Yup.string().required('Item Name is required'),
          qty: Yup.number()
            .min(1, 'Quantity must be at least 1')
            .required('Quantity is required'),
          price: Yup.number()
            .min(0.01, 'Price must be greater than 0')
            .required('Price is required'),
          total: Yup.number().required('Total is required'),
        })
      )
      .required('At least one item is required'),
  });

  const defaultValues: DrawerForm = {
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

  // Ensure full data is available before passing to Formik
  const initialValues = isEditing && editingInvoiceData
    ? {
        companyName: editingInvoiceData.companyName || '',
        streetAddress: editingInvoiceData.streetAddress || '',
        city: editingInvoiceData.city || '',
        state: editingInvoiceData.state || '',
        zip: editingInvoiceData.zip || '',
        issueDate: editingInvoiceData.issueDate || '',
        paymentTerms: editingInvoiceData.paymentTerms || '',
        status: editingInvoiceData.status || '',
        items: editingInvoiceData.items || [{ id: '1', itemName: '', qty: 1, price: 0, total: 0 }],
      }
    : defaultValues;
    console.log(editingInvoiceData);

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
        },
      }}
    >
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={(values, { setSubmitting }) =>
            handleSave(values, setSubmitting, false)
          }
        >
          {({
            handleBlur,
            handleSubmit,
            values,
            setFieldValue,
            setSubmitting,
          }) => {
            return (
              <form onSubmit={handleSubmit}>
                <div className="p-6 pb-24">
                  {isEditing ? (
                    <h2 className="text-xl font-bold text-white font-roboto">
                      Update Invoice
                    </h2>
                  ) : (
                    <h2 className="text-xl font-bold text-white font-roboto">
                      New Invoice
                    </h2>
                  )}

                  <h2 className="text-sm font-semibold text-primary mt-7 font-roboto">
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
                      label="City"
                      options={['Ludhiana', 'Amritsar', 'Jaipur', 'Chandigarh']}
                      value={values.city}
                      onChange={(e) => setFieldValue('city', e.target.value)}
                      onBlur={handleBlur}
                    />
                  </div>
                  <div className="flex mt-5 space-x-4">
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

                  <div className="flex mt-5 space-x-4">
                    <div className="w-1/2">
                      <DateInput
                        id="issueDate"
                        name="issueDate"
                        value={values.issueDate ? new Date(values.issueDate) : null}
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

                  <h2 className="mt-10 text-lg font-bold text-gray font-roboto">
                    Item List
                  </h2>
                  <FieldArray name="items">
                    {({ push, remove }) => (
                      <>
                        <div className="flex mt-4 space-x-4">
                          <div className="flex-1 w-[188px]">
                            <h3 className="text-sm font-semibold font-roboto">
                              Item Name
                            </h3>
                          </div>
                          <div className="w-[67px]">
                            <h3 className="text-sm font-semibold font-roboto">
                              Qty
                            </h3>
                          </div>
                          <div className="w-[85px]">
                            <h3 className="text-sm font-semibold font-roboto">
                              Price
                            </h3>
                          </div>
                          <div className="w-[108px]">
                            <h3 className="text-sm font-semibold font-roboto">
                              Total
                            </h3>
                          </div>
                        </div>
                        {values.items.map((item, index) => (
                          <div className="flex mt-2 space-x-4" key={item.id}>
                            <div className="flex-1">
                              <Input
                                label="Item Name"
                                name={`items[${index}].itemName`}
                                value={item.itemName}
                                onChange={(e) =>
                                  setFieldValue(
                                    `items[${index}].itemName`,
                                    e.target.value
                                  )
                                }
                                variant="secondary"
                                size="small"
                              />
                            </div>
                            <div className="w-[67px]">
                              <Input
                                label="Qty"
                                name={`items[${index}].qty`}
                                type="number"
                                value={item.qty}
                                onChange={(e) =>
                                  setFieldValue(`items[${index}].qty`, e.target.value)
                                }
                                variant="secondary"
                                size="small"
                              />
                            </div>
                            <div className="w-[85px]">
                              <Input
                                label="Price"
                                name={`items[${index}].price`}
                                type="number"
                                value={item.price}
                                onChange={(e) =>
                                  setFieldValue(`items[${index}].price`, e.target.value)
                                }
                                variant="secondary"
                                size="small"
                              />
                            </div>
                            <div className="w-[108px]">
                              <Input
                                label="Total"
                                name={`items[${index}].total`}
                                type="number"
                                value={item.total}
                                disabled
                                variant="secondary"
                                size="small"
                              />
                            </div>
                            <div className="w-[20px] flex items-center">
                              <DeleteIcon onClick={() => remove(index)} />
                            </div>
                          </div>
                        ))}
                        <div className="mt-5">
                          <Button
                            onClick={() =>
                              push({
                                id: Date.now().toString(),
                                itemName: '',
                                qty: 1,
                                price: 0,
                                total: 0,
                              })
                            }
                          >
                            Add Item
                          </Button>
                        </div>
                      </>
                    )}
                  </FieldArray>
                </div>
                <div className="flex fixed w-[550px] left bottom-0 justify-between bg-purple space-x-4 p-3">
                  <Button
                    type="submit"
                    size="large"
                    outline="secondary"
                    color="lightPurple"
                    children="Save Draft"
                    onClick={() => handleSave(values, setSubmitting, true)}
                  />

                  <div className="flex space-x-4">
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
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </Drawer>
  );
};

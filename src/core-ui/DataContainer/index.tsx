import React, { useEffect, useState } from 'react';
import { Container } from './types';
import { DropdownOption } from '../dropdown/types';
import Frame from '../../app/assets/Frame.png';
import { Dropdown } from '../dropdown';
import { InvoiceDrawer } from '../../app/Invoice/generateInvoice';
import {
  deleteInvoice,
  fetchInvoiceData,
  fetchInvoiceList,
  getUserName,
  updateInvoice,
} from '../../services/apiService';
import InvoiceComponent from '../invoice';
import { Chips } from '../chips';
import { useNavigate, useParams } from 'react-router-dom';

export interface InvoiceItemType {
  id: number;
  itemName: string;
  qty: number;
  price: number;
}

export interface InvoiceType {
  _id: string;
  invoiceNumber: string;
  fullName: string;
  amount: number;
  createdAt: string;
  issueDate: string;
  userId: string;
  paymentTerms: string;
  status: string;
  companyName: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
  items: InvoiceItemType[];
}

export const DataContainer: React.FC<Container> = ({
  size = 'medium',
  color = 'purple',
  children,
}) => {
  const [invoices, setInvoices] = useState<InvoiceType[]>([]);
  const [fullName, setFullName] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceType | null>(
    null
  );
  const { invoiceId } = useParams<{ invoiceId: string }>();
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
  });
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId') || '';

  useEffect(() => {
    const fetchUserFullName = async (userId: string) => {
      try {
        const response = await getUserName(userId);
        setFullName(response);
      } catch (error) {
        console.error('Error fetching user fullName:', error);
        setFullName('Error fetching user details');
      }
    };
    fetchUserFullName(userId);
  }, [userId]);

  const handleUpdate = async (updatedInvoice: InvoiceType) => {
    try {
      await updateInvoice(updatedInvoice._id, userId, updatedInvoice);
      console.log('Invoice updated successfully');
      setIsDrawerOpen(false);
      setInvoices(
        invoices.map((invoice) =>
          invoice._id === updatedInvoice._id ? updatedInvoice : invoice
        )
      );
      navigate(`/invoiceLayout/${userId}`);
    } catch (error) {
      console.error('Failed to update invoice', error);
    }
  };

  const calculateDueDate = (issueDate: string, paymentTerms: string) => {
    try {
      const daysMatch = paymentTerms.match(/\d+/);
      const days = daysMatch ? parseInt(daysMatch[0], 10) : 0;
      const issueDateObj = new Date(issueDate);
      issueDateObj.setDate(issueDateObj.getDate() + days);
      return issueDateObj.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    } catch (error) {
      console.error('Error calculating due date:', error);
      return 'Invalid Date';
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchInvoiceList(userId);
        setInvoices(response.data || []);
        setPagination({
          totalItems: response.data.totalItems,
          totalPages: response.data.totalPages,
          currentPage: response.data.currentPage,
        });
        setError(null);
      } catch (error: any) {
        console.error(error.message);
        setError('Failed to fetch invoices');
      }
    };

    fetchData();
  }, [userId]);

  const handleEdit = (invoice: InvoiceType) => {
    const invoiceId = invoice._id;
    navigate(`/invoiceLayout/${userId}/${invoiceId}`);
    const response = fetchInvoiceData(userId, invoiceId);

    setSelectedInvoice(invoice);
    setIsDrawerOpen(true);
  };

  const handleDelete = (invoice: InvoiceType) => {
    const response = deleteInvoice(invoice.userId, invoice._id);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    navigate(`/invoiceLayout/${userId}`);
  };

  const generateOptions = (invoice: InvoiceType): DropdownOption[] => [
    {
      label: 'Edit',
      action: () => handleEdit(invoice),
      color: 'success',
    },
    {
      label: 'Delete',
      action: () => handleDelete(invoice),
      color: 'danger',
    },
  ];

  return (
    <div className="flex flex-col w-full gap-y-6">
      <div className="bg-secondary rounded-md text-white p-8">
        <div className="flex flex-col w-full gap-[-1] justify-between items-center max-w-full overflow-auto">
          {invoices.length === 0 ? (
            <InvoiceComponent />
          ) : (
            invoices.map((invoice) => (
              <div
                className="w-full bg-purple rounded-md shadow-md p-6 mb-6"
                key={invoice._id}
              >
                <div className="flex flex-col gap-4">
                  <div className="flex gap-7 items-center">
                    {children}
                    <div className="w-48">#INV-{invoice.invoiceNumber}</div>
                    <div className="w-48">
                      Due{' '}
                      {calculateDueDate(
                        invoice.issueDate,
                        invoice.paymentTerms
                      )}
                    </div>
                    <div className="w-48">{fullName}</div>
                    <div className="w-52">
                      Created on{' '}
                      {new Date(invoice.createdAt).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </div>
                    <div className="w-40 font-bold text-[20px]">
                      ${invoice.amount}
                    </div>
                    <div className="w-40 shrink-0">
                      <Chips color="success" onClick={() => alert()}>
                        {invoice.status}
                      </Chips>
                    </div>
                    <div className="w-16">
                      <Dropdown
                        options={generateOptions(invoice)}
                        Image={Frame}
                        position="right"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <InvoiceDrawer
          open={isDrawerOpen}
          onClose={handleCloseDrawer}
          invoice={selectedInvoice}
          onSave={handleUpdate}
        />
        <div className="flex justify-between items-center mt-1 text-white">
          <span>Total Invoices: {pagination.totalItems}</span>
          <span>
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
        </div>
      </div>
    </div>
  );
};

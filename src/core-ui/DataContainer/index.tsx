import React, { useCallback, useEffect, useState } from 'react';
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
import axios from 'axios';

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
  const [isLoading, setLoading] = useState(false);
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

  const fetchData = useCallback(
    async (page: number) => {
      setLoading(true);
      try {
        const response = await fetchInvoiceList(userId, page);
        setInvoices((prevInvoices) => [...prevInvoices, ...response.data]);
        setPagination({
          totalItems: response.data.totalItems,
          totalPages: response.data.totalPages,
          currentPage: response.data.currentPage,
        });
        setError(null);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch invoices');
      } finally {
        setLoading(false);
      }
    },
    [userId]
  );

  useEffect(() => {
    fetchData(pagination.currentPage);
  }, [pagination.currentPage, fetchData]);

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const target = e.target as HTMLDivElement;
    const bottom =
      target.scrollHeight === target.scrollTop + target.clientHeight;
    if (
      bottom &&
      !isLoading &&
      pagination.currentPage < pagination.totalPages
    ) {
      setPagination((prev) => ({
        ...prev,
        currentPage: prev.currentPage + 1,
      }));
    }
  };

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
      <div
        className="bg-purple rounded-md text-white p-8 overflow-auto"
        onScroll={handleScroll}
        style={{ height: 'calc(100vh - 150px)' }}
      >
        <div className="flex flex-col w-full gap-7 justify-between items-center max-w-full">
          {invoices.length === 0 ? (
            <InvoiceComponent />
          ) : (
            invoices.map((invoice) => (
              <div className="flex w-full gap-7 items-center" key={invoice._id}>
                {children}
                <div className="w-48">#INV-{invoice.invoiceNumber}</div>
                <div className="w-48">
                  {' '}
                  Due{' '}
                  {calculateDueDate(invoice.issueDate, invoice.paymentTerms)}
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
            ))
          )}
        </div>
        <InvoiceDrawer
          open={isDrawerOpen}
          onClose={handleCloseDrawer}
          invoice={selectedInvoice}
          onSave={handleUpdate}
        />
      </div>
    </div>
  );
};

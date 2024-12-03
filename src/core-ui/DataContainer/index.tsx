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
import { useNavigate } from 'react-router-dom';

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
        const newInvoices = response.data as InvoiceType[];

        // Update the invoice list
        setInvoices((prevInvoices) => {
          const updatedInvoices = [
            ...prevInvoices,
            ...newInvoices.filter(
              (newInvoice) =>
                !prevInvoices.some(
                  (prevInvoice) => prevInvoice._id === newInvoice._id
                )
            ),
          ];

          return updatedInvoices;
        });

        // Update pagination state
        setPagination({
          totalItems: response.totalItems,
          totalPages: response.totalPages,
          currentPage: page,
        });

        setError(null);
      } catch (error) {
        console.error('Error fetching invoice data:', error);
        setError(
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred while fetching invoices.'
        );
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

    const isAtBottom =
      target.scrollHeight === target.scrollTop + target.clientHeight;

    if (
      isAtBottom &&
      !isLoading &&
      pagination.currentPage < pagination.totalPages
    ) {
      setPagination((prev) => ({
        ...prev,
        currentPage: prev.currentPage + 1,
      }));
    }
  };

  const handleEdit = async (invoice: InvoiceType) => {
    const invoiceId = invoice._id;
    navigate(`/invoiceLayout/${userId}/${invoiceId}`);

    try {
      const response = await fetchInvoiceData(userId, invoiceId);
      setSelectedInvoice(response.data);

      setIsDrawerOpen(true);
    } catch (error) {
      console.error('Error fetching invoice data:', error);
      setError('Failed to fetch invoice data');
    }
  };

  const handleDelete = async (invoice: InvoiceType) => {
    try {
      await deleteInvoice(invoice.userId, invoice._id);
      console.log('Invoice deleted successfully');
    } catch (error) {
      console.error('Error deleting invoice:', error);
      setError('Failed to delete invoice');
    }
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    navigate(`/invoiceLayout/${userId}`);
    if (error) {
      return <div>Error: {error}</div>;
    }
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
        <div
          className="flex flex-col w-full gap-[-1] justify-between items-center max-w-full overflow-auto"
          onScroll={handleScroll}
          style={{
            height: 'calc(102vh - 248px)',
            overflowY: 'scroll',
            scrollbarWidth: 'none',
          }}
        >
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

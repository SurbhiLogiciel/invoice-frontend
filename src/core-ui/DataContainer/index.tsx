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
import { Button } from '../button';

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

export const DataContainer: React.FC<Container> = ({ size = 'medium', color = 'purple', children }) => {
  const [invoices, setInvoices] = useState<InvoiceType[]>([]);
  const [fullName, setFullName] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
  });
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const userId = localStorage.getItem('userId') || '';
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [invoiceToDelete, setInvoiceToDelete] = useState<InvoiceType | null>(null);

  useEffect(() => {
    const fetchUserFullName = async (userId: string) => {
      try {
        const response = await getUserName(userId);
        setFullName(response);
      } catch (error) {
        setFullName('Error fetching user details');
      }
    };
    fetchUserFullName(userId);
  }, [userId]);

  const handleUpdate = async (updatedInvoice: InvoiceType) => {
    try {
      await updateInvoice(updatedInvoice._id, userId, updatedInvoice);
      setIsDrawerOpen(false);
      setInvoices(invoices.map((invoice) => (invoice._id === updatedInvoice._id ? updatedInvoice : invoice)));
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
      return 'Invalid Date';
    }
  };

  const sortInvoices = (invoices: InvoiceType[]): InvoiceType[] => {
    const statusPriority: { [key: string]: number } = {
      PAID: 1,
      PENDING: 2,
      DRAFT: 3,
    };
  
    return invoices
      .sort((a, b) => {
        // Sort by issueDate (soon to be breached invoices first)
        const aDate = new Date(a.issueDate).getTime();
        const bDate = new Date(b.issueDate).getTime();
  
        if (aDate !== bDate) {
          return aDate - bDate; // Sort by issueDate
        }
  
        // If dates are the same, sort by status
        return (statusPriority[a.status] ?? 999) - (statusPriority[b.status] ?? 999);
      });
  };

  const fetchData = useCallback(
    async (page: number) => {
      setLoading(true);
      try {
        const response = await fetchInvoiceList(userId, page);
        const newInvoices = response.data as InvoiceType[];

        // Update the invoice list and apply sorting
        setInvoices((prevInvoices) => {
          const updatedInvoices = [
            ...prevInvoices,
            ...newInvoices.filter(
              (newInvoice) =>
                !prevInvoices.some((prevInvoice) => prevInvoice._id === newInvoice._id)
            ),
          ];

          // Apply sorting based on date and status
          return sortInvoices(updatedInvoices);
        });

        setPagination({
          totalItems: response.totalItems,
          totalPages: response.totalPages,
          currentPage: page,
        });

        setError(null);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unexpected error occurred while fetching invoices.');
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

    const isAtBottom = target.scrollHeight === target.scrollTop + target.clientHeight;

    if (isAtBottom && !isLoading && pagination.currentPage < pagination.totalPages) {
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
      setError('Failed to fetch invoice data');
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
    setInvoiceToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (invoiceToDelete) {
      try {
        await deleteInvoice(invoiceToDelete.userId, invoiceToDelete._id);
        setInvoices(invoices.filter((i) => i._id !== invoiceToDelete._id));
        setShowDeleteConfirmation(false);
        setInvoiceToDelete(null);
      } catch (error) {
        setError('Failed to delete invoice');
      }
    }
  };

  const confirmDelete = (invoice: InvoiceType) => {
    setInvoiceToDelete(invoice);
    setShowDeleteConfirmation(true);
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
      action: () => confirmDelete(invoice),
      color: 'danger',
    },
  ];

  return (
    <div className="flex flex-col w-full gap-y-6">
      <div className="p-8 text-white rounded-md bg-secondary">
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
            invoices.map((invoice) => {
              const isDraft = invoice.status === 'DRAFT';
              const hasNoIssueDate = !invoice.issueDate;
              const hasNoPaymentTerms = !invoice.paymentTerms;
              const hasNoItems = !invoice.items || invoice.items.length === 0;

              const shouldShowDashForDate =
                isDraft && (hasNoIssueDate || hasNoPaymentTerms);
              const shouldShowDashForAmount = isDraft && hasNoItems;
              return (
                <div
                  className="w-full p-5 mb-6 rounded-md shadow-md bg-purple"
                  key={invoice._id}
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-7">
                      {children}
                      <div className="w-48">#INV-{invoice.invoiceNumber}</div>
                      <div className="flex items-center justify-center w-48">
                        {shouldShowDashForDate ? (
                          '--'
                        ) : (
                          <>
                            Due{' '}
                            {calculateDueDate(invoice.issueDate, invoice.paymentTerms)}
                          </>
                        )}
                      </div>
                      <div className="w-48 text-center">{fullName}</div>
                      <div className="w-52">
                        Created on{' '}
                        {new Date(invoice.createdAt).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </div>
                      <div className="w-40 font-bold text-[20px] text-center">
                        {shouldShowDashForAmount ? '--' : `$${invoice.amount}`}
                      </div>
                      <div className="flex items-center justify-center text-center w-28">
                        <Chips
                          color={
                            invoice.status === 'PAID'
                              ? 'success'
                              : invoice.status === 'PENDING'
                              ? 'info'
                              : 'draft'
                          }
                          onClick={() => alert()}
                        >
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
              );
            })
          )}
        </div>
        {showDeleteConfirmation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="p-8 bg-white rounded-md shadow-lg">
              <p>Are you sure you want to delete this invoice?</p>
              <div className="flex gap-4 mt-4">
                <Button onClick={handleCancelDelete} color="secondary">
                  Cancel
                </Button>
                <Button onClick={handleConfirmDelete} color="danger">
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

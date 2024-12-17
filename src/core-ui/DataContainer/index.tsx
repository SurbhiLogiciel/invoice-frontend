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
interface StatusOrder {
  [key: string]: number; 
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
  const [invoiceToDelete, setInvoiceToDelete] = useState<InvoiceType | null>(
    null
  );

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
      return 'Invalid Date';
    }
  };

  const fetchData = useCallback(
    async (page: number) => {
      setLoading(true);
      try {
        const response = await fetchInvoiceList(userId, page);
        const newInvoices = response.data as InvoiceType[];

        const updatedInvoices = [
          ...invoices,
          ...newInvoices.filter(
            (newInvoice) =>
              !invoices.some(
                (prevInvoice) => prevInvoice._id === newInvoice._id
              )
          ),
        ];

        updatedInvoices.sort((a, b) => {
          const dateA = new Date(a.issueDate).getTime();
          const dateB = new Date(b.issueDate).getTime();
          if (dateA !== dateB) return dateA - dateB;

          const statusOrder: StatusOrder = {
            PAID: 1,
            PENDING: 2,
            DRAFT: 3,
          };

          const statusA = statusOrder[a.status as keyof StatusOrder] ?? 4;
          const statusB = statusOrder[b.status as keyof StatusOrder] ?? 4;

          return statusA - statusB;
        });

        setInvoices(updatedInvoices);
        setPagination({
          totalItems: response.totalItems,
          totalPages: response.totalPages,
          currentPage: page,
        });

        setError(null);
      } catch (error) {
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
                  className="w-full bg-purple rounded-md shadow-md p-5 mb-6"
                  key={invoice._id}
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-7 items-center">
                      {children}
                      <div className="w-48">#INV-{invoice.invoiceNumber}</div>
                      <div className="w-48 flex justify-center items-center">
                        {shouldShowDashForDate ? (
                          '--'
                        ) : (
                          <>
                            Due{' '}
                            {calculateDueDate(
                              invoice.issueDate,
                              invoice.paymentTerms
                            )}
                          </>
                        )}
                      </div>
                      <div className="w-48 text-center">{fullName}</div>
                      <div className="w-52">
                        Created on{' '}
                        {new Date(invoice.createdAt).toLocaleDateString(
                          'en-GB',
                          {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          }
                        )}
                      </div>
                      <div className="w-40 font-bold text-[20px] text-center">
                        {shouldShowDashForAmount ? '--' : `$${invoice.amount}`}
                      </div>
                      <div className="w-28 flex justify-center items-center text-center">
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
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="bg-secondary/90 p-12 rounded-md shadow-lg w-1/4 text-white border border-lightGray">
              <h2 className="text-2xl font-bold mb-4 text-white">
                Confirm Delete
              </h2>
              <p className="text-sm text-gray">
                Are you sure you want to delete this invoice?
              </p>
              <div className="flex justify-end gap-4 mt-6">
                <Button
                  size="large"
                  outline="lightPurple"
                  color="gray"
                  children="Cancel"
                  onClick={handleCancelDelete}
                />
                <Button
                  size="large"
                  outline="danger"
                  color="danger"
                  children="Delete"
                  onClick={handleConfirmDelete}
                />
              </div>
            </div>
          </div>
        )}

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

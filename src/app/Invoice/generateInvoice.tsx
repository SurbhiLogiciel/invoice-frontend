import React from 'react';
import InvoiceLayout from '../invoiceLayouts';
import InvoiceComponent from '../../core-ui/invoice';

const GenerateInvoice: React.FC = () => {
  return (
    <InvoiceLayout>
      <InvoiceComponent />
    </InvoiceLayout>
  );
};

export default GenerateInvoice;

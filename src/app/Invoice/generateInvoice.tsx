import React from 'react';
import InvoiceLayout from '../invoiceLayout';
import InvoiceComponent from '../../core-ui/invoice';
// import { DataContainer } from '../../core-ui/DataContainer';

const GenerateInvoice: React.FC = () => {
  return (
    <InvoiceLayout>
      <InvoiceComponent />
      {/* <DataContainer children/> */}
    </InvoiceLayout>
  );
};

export default GenerateInvoice;

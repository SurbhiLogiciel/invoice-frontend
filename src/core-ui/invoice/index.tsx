import React from 'react';
import Invoice from '../../svg/invoice';

const InvoiceComponent: React.FC = () => {
  return (
    <div className="bg-secondary p-8 text-center mt-40 ml-0">
      <div className="mb-4 flex justify-center">
        <Invoice />
      </div>
      <h2 className="text-white text-lg font-roboto font-normal mb-2">
        There is nothing here
      </h2>
      <p className="text-gray text-base mt-4">
        Create an invoice by clicking the New Invoice button <br /> and get
        started
      </p>
    </div>
  );
};

export default InvoiceComponent;

import React from 'react';
import Invoice from '../../app/svg/invoice';

const InvoiceComponent: React.FC = () => {
  return (
    <div className="bg-secondary min-w-full text-center">
      <div className=" flex justify-center">
        <Invoice />
      </div>
      <h2 className="text-white mt-[30px] text-lg font-roboto font-normal">
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

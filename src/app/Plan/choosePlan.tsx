import React from 'react';
import { Button } from '../../core-ui/button';
import Layout from '../layouts';
import PromoCodeInput from '../../core-ui/input/promoCodeInput';
import SelectableContainer from '../../core-ui/choosePlan';

export const ChoosePlan: React.FC = () => {
  return (
    <Layout>
      <div className="">
        <div className="font-bold mt-8 text-4xl text-white">Choose Plan</div>
        <div className="text-gray text-lg">Select a Plan</div>

        <div className="mt-10 space-y-4">
          <SelectableContainer
            heading="Free"
            description="Limited features with basic functionality"
            planPrice="$0"
            outline="secondary"
            disabled={false}
            onClick={() => {}}
          />

          <SelectableContainer
            heading="Business"
            description="Unlimited features and priority support"
            planPrice="$20"
            outline="secondary"
            disabled={false}
            onClick={() => {}}
          />
        </div>

        <div className="mt-6 text-white w-full">
          <PromoCodeInput />
        </div>

        <div className="mt-6">
          <div className="text-white font-semibold mb-4">Billing Details</div>

          <div className="flex justify-between text-white font-roboto">
            <span>Business Plan</span>
            <span>$20</span>
          </div>
          <hr className="my-4 border-lightGray" />

          <div className="flex justify-between text-white font-roboto">
            <span>Promo Discount</span>
            <span>-$5</span>
          </div>
          <hr className="my-4 border-lightGray" />

          <div className="flex justify-between text-white font-roboto">
            <span>Total</span>
            <span>$15</span>
          </div>
          <hr className="my-4 border-lightGray" />
        </div>

        <div className="mt-[30px] w-full">
          <Button
            size="large"
            color="primary"
            fullWidth="true"
            children="Pay"
            type="submit"
          />
        </div>
        <div className="mt-2.5 w-full">
          <Button
            size="large"
            outline="primary"
            fullWidth="true"
            children="Back"
          />
        </div>
      </div>
    </Layout>
  );
};

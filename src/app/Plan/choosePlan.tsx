import React, { useEffect, useState } from 'react';
import { Button } from '../../core-ui/button';
import PromoCodeInput from '../../core-ui/input/promoCodeInput';
import SelectableContainer from '../../core-ui/choosePlan';
import { useNavigate, useParams } from 'react-router-dom';
import { applyPromoCode, submitUserPlan } from '../../services/apiService';

export const ChoosePlan: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [selectedPlan, setSelectedPlan] = useState('');
  const [amount, setAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [promoCode, setPromoCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedPlan === 'Free') {
      setAmount(0);
      setDiscount(0);
      setTotal(0);
    } else if (selectedPlan === 'Business') {
      setAmount(20);
      setDiscount(0);
      setTotal(20);
    }
  }, [selectedPlan]);

  const handlePlanSelect = (plan: string, price: number) => {
    setSelectedPlan(plan);
    setAmount(price);
    setDiscount(0);
    setTotal(price - discount);
  };

  const handleChoosePlan = async () => {
    if (!userId) {
      setErrorMessage('User ID is required.');
      return;
    }

    if (!selectedPlan) {
      setErrorMessage('Please select a plan.');
      return;
    }

    try {
      const response = await submitUserPlan(
        userId,
        selectedPlan,
        amount,
        discount,
        total
      );

      if (response.status === 200) {
        navigate('/login');
      } else {
        setErrorMessage('Unexpected response. Please try again.');
      }
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message ||
          'Error submitting the plan. Please try again.'
      );
    }
  };

  const handlePromoCodeApply = async () => {
    if (!promoCode) {
      setErrorMessage('Please enter a valid promo code.');
      return;
    }

    if (!userId) {
      setErrorMessage('User ID is required.');
      return;
    }

    try {
      const response = await applyPromoCode(userId, promoCode, amount);
      if (response.status === 200) {
        setDiscount(response.data.discount);
        setTotal(amount - response.data.discount);
      } else {
        setErrorMessage('Invalid promo code.');
      }
    } catch (error: any) {
      setErrorMessage('Failed to apply promo code. Please try again.');
    }
  };

  return (
    <div className="">
      <div className="font-bold mt-8 text-4xl text-white">Choose Plan</div>
      <div className="text-gray text-lg">Select a Plan</div>

      {errorMessage && (
        <div className="mt-4 text-red-500 text-base font-semibold">
          {errorMessage}
        </div>
      )}

      <div className="mt-10 space-y-4">
        <SelectableContainer
          heading="Free"
          description="Limited features with basic functionality"
          planPrice="$0"
          isSelected={selectedPlan === 'Free'}
          disabled={selectedPlan === 'Business'}
          onSelect={() => handlePlanSelect('Free', 0)}
        />

        <SelectableContainer
          heading="Business"
          description="Unlimited features and priority support"
          planPrice="$20"
          isSelected={selectedPlan === 'Business'}
          disabled={selectedPlan === 'Free'}
          onSelect={() => handlePlanSelect('Business', 20)}
        />
      </div>

      <div className="mt-6 text-white w-full">
        <PromoCodeInput
          promoCode={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          onApply={handlePromoCodeApply}
        />
      </div>

      <div className="mt-6">
        <div className="text-white font-semibold mb-4">Billing Details</div>

        {selectedPlan === 'Business' && (
          <>
            <div className="flex justify-between text-white font-roboto">
              <span>{selectedPlan} Plan</span>
              <span>${amount}</span>
            </div>
            <hr className="my-4 border-lightGray" />
            <div className="flex justify-between text-white font-roboto">
              <span>Promo Discount</span>
              <span>-${discount}</span>
            </div>
            <hr className="my-4 border-lightGray" />
          </>
        )}

        <div className="flex justify-between text-white font-roboto">
          <span>Total</span>
          <span>${total}</span>
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
          onClick={handleChoosePlan}
        />
      </div>
      <div className="mt-2.5 w-full">
        <Button
          size="large"
          outline="primary"
          fullWidth="true"
          children="Back"
          onClick={() => navigate(-1)}
        />
      </div>
    </div>
  );
};

import React, { useState, useCallback } from 'react';
import CodeCheck from '../../app/svg/codeCheck';
import Cancel from '../../app/svg/cancel';
import { PromoCodeInputProps } from './types';

const PromoCodeInput: React.FC<PromoCodeInputProps> = ({ size = 'large' }) => {
  const [promoCode, setPromoCode] = useState('');
  const [codeApplied, setCodeApplied] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleApplyClick = useCallback(() => {
    if (promoCode.trim() !== '') {
      setCodeApplied(true);
    }
  }, [promoCode]);

  const handleRemoveCode = useCallback(() => {
    setPromoCode('');
    setCodeApplied(false);
  }, []);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPromoCode(event.target.value);
    },
    []
  );

  const handleFocus = useCallback(() => setFocused(true), []);
  const handleBlur = useCallback(() => setFocused(false), []);

  const baseClasses = `w-full px-5 py-5 rounded border transition focus:ring-2 ${
    focused ? 'ring-input-border-focus' : ''
  } ${codeApplied ? 'border-lightGray' : 'border-lightGray'}`;

  const disabledClasses = codeApplied ? 'cursor-not-allowed' : 'bg-secondary';

  const sizeClasses = {
    small: 'py-2 px-2 text-xs h-[30px]',
    medium: 'py-3 px-3 text-xs h-[40px]',
    large: 'py-5 px-5 text-sm h-[50px]',
  };
  return (
    <div className="relative">
      <label
        className={`block mb-2 text-left font-roboto font-normal text-xs ${
          focused ? 'text-white' : 'text-gray'
        }`}
      >
        Apply Promo Code
      </label>

      {!codeApplied ? (
        <input
          type="text"
          value={promoCode}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`${baseClasses} ${disabledClasses} font-roboto font-normal text-sm text-white ${sizeClasses[size]}`}
        />
      ) : (
        <div
          className={`w-full px-5 py-5 rounded border transition focus:ring-2 border-lightGray bg-secondary font-roboto font-normal text-sm text-white flex items-center ${sizeClasses[size]}`}
        >
          <span className="font-roboto font-normal text-sm text-white">
            {promoCode}
          </span>
          <span className="ml-1">
            <CodeCheck />
          </span>
        </div>
      )}

      {!codeApplied ? (
        <button
          className="absolute right-3 top-2/3 transform -translate-y-2/3 cursor-pointer text-primary font-roboto font-normal"
          onClick={handleApplyClick}
        >
          Apply
        </button>
      ) : (
        <span
          className="absolute right-3 top-2/3 transform -translate-y-2/3 cursor-pointer text-lightGray"
          onClick={handleRemoveCode}
        >
          <Cancel />
        </span>
      )}
    </div>
  );
};

export default React.memo(PromoCodeInput);

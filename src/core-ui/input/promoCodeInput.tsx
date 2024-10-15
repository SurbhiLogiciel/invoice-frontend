import React, { useState, useCallback } from 'react';
import CodeCheck from '../../svg/codeCheck';
import Cancel from '../../svg/cancel';

const PromoCodeInput: React.FC = () => {
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

  return (
    <div className="relative">
      <label
        className={`block mb-2 text-left font-roboto font-normal text-xs ${
          focused ? 'text-white' : 'text-gray'
        }`}
      >
        Promo Code
      </label>

      {!codeApplied ? (
        <input
          type="text"
          value={promoCode}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`${baseClasses} ${disabledClasses} font-roboto font-normal text-sm text-white`}
        />
      ) : (
        <div
          className={`w-full px-5 py-5 rounded border transition focus:ring-2 border-lightGray bg-secondary font-roboto font-normal text-sm text-white flex items-center`}
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

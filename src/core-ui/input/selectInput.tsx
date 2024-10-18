import React, { useState } from 'react';
import { InputProps } from './types';
import InputDropdown from '../../svg/selectDropdown';

const SelectInput: React.FC<InputProps> = ({
  placeholder = '',
  onChange,
  options = [],
  label = '',
  variant = 'primary',
  size = 'large',
  size = 'large',
}) => {
  const [focused, setFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const baseClasses = `w-full rounded border transition `;

  const sizeClasses = {
    small: 'px-5 text-xs h-[30px]',
    medium: 'px-5 text-sm h-[40px]',
    large: 'px-5 py-3 text-sm h-[50px]',
  };

  const variantClasses =
    variant === 'primary'
      ? `bg-secondary text-white border ${
          focused ? 'border-lightGray' : 'border-lightGray'
        }`
      : 'bg-purple text-white border border-purple';

  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className="relative">
      {label && (
        <label
          className={`block mb-2 text-left font-roboto font-normal text-xs ${
            focused ? 'text-white' : 'text-gray'
          }`}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          className={`${baseClasses} ${variantClasses} ${
            sizeClasses[size]
          } appearance-none flex items-center cursor-pointer focus:ring-2 focus:ring-input-border-focus ${
            inputValue === '' ? 'text-gray' : 'text-white'
          } border border-lightGray`}
          value={inputValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          defaultValue=""
        >
          <option value="" disabled hidden className="text-gray">
            {placeholder}
          </option>

          {options.map((option, index) => (
            <option key={index} value={option} className="text-white">
              {option}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <InputDropdown />
        </span>
      </div>
    </div>
  );
};

export default SelectInput;

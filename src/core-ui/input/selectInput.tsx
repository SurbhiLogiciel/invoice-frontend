import React, { useState, useEffect } from 'react';
import { InputProps } from './types';
import InputDropdown from '../../app/svg/selectDropdown';

const SelectInput: React.FC<InputProps> = ({
  placeholder = '',
  onChange,
  options = [],
  label = '',
  variant = 'primary',
  size = 'large',
  required = false,
  validateOnSubmit = false,
  value = '',
}) => {
  const [focused, setFocused] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleOptionClick = (option: string) => {
    setInputValue(option);
    setDropdownOpen(false);
    if (onChange) {
      onChange({
        target: { value: option },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  useEffect(() => {
    if (validateOnSubmit && required && !inputValue) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  }, [validateOnSubmit, required, inputValue]);

  const baseClasses = `w-full rounded border transition`;

  const sizeClasses = {
    small: 'py-2 px-2 text-xs w-full h-[30px]',
    medium: 'py-3 px-3 text-md h-[50px]',
    large: 'py-3 px-3 text-sm h-[50px]',
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
        <div
          className={`${baseClasses} ${variantClasses} ${sizeClasses[size]} flex items-center justify-between cursor-pointer`}
          onClick={toggleDropdown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        >
          <option value="" disabled hidden className="text-gray">
            {placeholder}
          </option>

          {options.map((option, index) => (
            <option key={index} value={option} className="text-white">
              {option}
            </option>
          ))}
        </div>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <InputDropdown />
        </span>
      </div>

      {hasError && (
        <p className="mt-1 text-sm text-red-500">{label} is required.</p>
      )}
    </div>
  );
};

export default SelectInput;

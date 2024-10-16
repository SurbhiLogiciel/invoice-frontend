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
}) => {
  const [focused, setFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isDropdownOpen, setDropdownOpen] = useState(false);

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

  const baseClasses = `w-full px-5 py-5 rounded border transition`;

  const sizeClasses = {
    small: 'py-2 px-2 text-xs h-[30px]',
    medium: 'py-3 px-3 text-xs h-[40px]',
    large: 'py-5 px-5 text-sm h-[50px]',
  };
  const variantClasses =
    variant === 'primary'
      ? `bg-secondary text-white border ${
          focused ? 'border-lightGray' : 'border-lightGray'
        }`
      : 'bg-purple text-white border border-purple';

  const placeholderClasses = 'text-gray text-sm';
  const dropdownClasses = `absolute z-10 mt-2 w-full bg-lightGray text-white rounded-md shadow-lg left-0`;
  const optionClasses = `px-4 py-2 hover:bg-secondary hover:text-white cursor-pointer transition-colors text-left text-white font-normal text-sm`;

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
      <div className={`relative `}>
        <div
          className={`${baseClasses} ${variantClasses} ${sizeClasses[size]} flex items-center justify-between cursor-pointer`}
          onClick={toggleDropdown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        >
          <span
            className={`${
              inputValue
                ? 'font-roboto font-normal text-white text-sm'
                : placeholderClasses
            }`}
          >
            {inputValue || placeholder}
          </span>
          <span className="pointer-events-none">
            <InputDropdown />
          </span>
        </div>

        {isDropdownOpen && (
          <div className={dropdownClasses}>
            {options.map((option, index) => (
              <div
                key={index}
                className={optionClasses}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectInput;

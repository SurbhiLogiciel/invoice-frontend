import React, { useState } from 'react';
import InputDropdown from '../../svg/inputDropdownArrow';
import { InputProps } from './types';

const SelectInput: React.FC<InputProps> = ({
  placeholder = '',
  onChange,
  options = [],
  label = '',
  variant = 'primary',
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

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const baseClasses = `w-full px-5 py-5 rounded border transition text-input-text`;

  const variantClasses =
    variant === 'primary'
      ? `bg-input-bg text-input-text border ${
          focused ? 'border-input-border-focus' : 'border-input-border'
        }`
      : 'bg-secondary-input-bg text-secondary-input-text border border-secondary-input-border';

  const placeholderClasses = 'text-input-label';
  const dropdownClasses = `absolute z-10 mt-2 w-full bg-dropdown-bg text-dropdown-text rounded-md shadow-lg left-0`;
  const optionClasses = `px-4 py-2 hover:bg-dropdown-hover-bg hover:text-dropdown-hover-text cursor-pointer transition-colors text-left text-input-dropdown-text font-normal`;

  return (
    <div className="relative">
      {label && (
        <label
          className={`block mb-2 text-left font-roboto font-normal text-input-label-text ${
            focused || inputValue ? 'text-white' : 'text-input-label'
          }`}
        >
          {label}
        </label>
      )}
      <div className={`relative`}>
        <div
          className={`${baseClasses} ${variantClasses} flex items-center justify-between cursor-pointer`}
          tabIndex={0}
          onClick={toggleDropdown}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            setDropdownOpen(false);
          }}
        >
          <span
            className={`${
              inputValue
                ? 'font-roboto font-normal text-input-text'
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
          <div
            className={dropdownClasses}
            onBlur={() => setDropdownOpen(false)}
          >
            {options.map((option, index) => (
              <div
                key={index}
                className={optionClasses}
                onClick={() => handleOptionClick(option)}
                onMouseDown={(e) => e.preventDefault()}
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

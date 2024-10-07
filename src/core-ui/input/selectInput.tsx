import React, { useState } from 'react';
import InputDropdown from '../../svg/inputDropdownArrow';
import { InputProps } from './types';

const SelectInput: React.FC<InputProps> = ({
  placeholder = '',
  onChange,
  options = [],
  label = '',
  variant = 'primary',
  size = 'lg',
}) => {
  const [focused, setFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const sizeClasses = {
    sm: 'w-input-sm h-input-height',
    md: 'w-input-md h-input-height',
    lg: 'w-input-lg h-input-height',
  };

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

  const baseClasses = `w-full px-3 rounded border transition ${sizeClasses[size]}`;

  const variantClasses =
    variant === 'primary'
      ? `bg-input-bg text-input-text border ${
          focused ? 'border-input-border-focus' : 'border-input-border'
        }`
      : 'bg-input-bg text-input-text border border-input-border';

  const placeholderClasses = 'text-input-label';
  const dropdownClasses = `absolute z-10 mt-2 w-full bg-dropdown-bg text-dropdown-text rounded-md shadow-lg left-0`;
  const optionClasses = `px-4 py-2 hover:bg-dropdown-hover-bg hover:text-dropdown-hover-text cursor-pointer transition-colors text-left`;

  return (
    <div className="relative">
      {label && (
        <label
          className={`block mb-2 text-left text-input transition-colors ${
            focused || inputValue ? 'text-white' : 'text-input-label'
          }`}
        >
          {label}
        </label>
      )}
      <div className={`relative ${sizeClasses[size]}`}>
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
          <span className={inputValue ? '' : placeholderClasses}>
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

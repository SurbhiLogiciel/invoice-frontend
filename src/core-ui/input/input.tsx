import React, { useState } from 'react';
import PasswordEyeIcon from '../../svg/passwordEye';
import { InputProps } from './types';
import InputDropdown from '../../svg/inputDropdownArrow';

export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder = '',
  onChange,
  options = [],
  disabled = false,
  label = '',
  variant = 'primary',
  hasIcon = false,
  size = 'lg',
}) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const sizeClasses = {
    sm: 'w-input-sm h-[50px]', // Small size
    md: 'w-input-md h-[50px]', // Medium size
    lg: 'w-input-lg h-[50px]', // Large size
  };

  const formatPhoneNumber = (value: string) => {
    if (!value.startsWith('+')) {
      value = '+' + value;
    }

    const cleaned = value.replace(/[^\d+]/g, '');
    const match = cleaned.match(/^\+(\d{1,3})(\d{0,3})(\d{0,3})(\d{0,4})$/);

    if (match) {
      return [
        '+' + match[1],
        match[2] ? ' ' + match[2] : '',
        match[3] ? '-' + match[3] : '',
        match[4] ? '-' + match[4] : '',
      ].join('');
    }

    return value;
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let value = event.target.value;
    if (type === 'tel') {
      value = formatPhoneNumber(value);
    }
    setInputValue(value);
    if (onChange) {
      onChange(event);
    }
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

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  const baseClasses = `px-3 rounded border transition ${sizeClasses[size]}`;

  const variantClasses =
    variant === 'primary'
      ? `bg-input-bg text-input-text border ${
          focused ? 'border-input-border-focus' : 'border-input-border'
        }`
      : 'bg-input-bg text-input-text border border-input-border';

  const placeholderClasses = 'text-input-label';
  const dropdownClasses = `absolute z-10 mt-2 ${sizeClasses[size]} bg-dropdown-bg text-dropdown-text rounded-md shadow-lg left-0`;
  const optionClasses = `px-4 py-2 hover:bg-dropdown-hover-bg hover:text-dropdown-hover-text cursor-pointer transition-colors text-left`;

  return (
    <div className="relative w-[386px]">
      {label && (
        <label
          className={`block mb-2 text-left text-input transition-colors ${
            focused ? 'text-white' : 'text-input-label'
          }`}
        >
          {label}
        </label>
      )}

      {type === 'select' ? (
        <div className="relative ${sizeClasses[size]}`}">
          <div
            className={`${baseClasses} ${variantClasses} flex items-center justify-between cursor-pointer`}
            onClick={toggleDropdown}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          >
            <span className={inputValue ? '' : placeholderClasses}>
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
      ) : (
        <input
          type={showPassword && type === 'password' ? 'text' : type}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled}
          className={`${baseClasses} ${variantClasses}`}
        />
      )}

      {hasIcon && type === 'password' && (
        <span
          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          <PasswordEyeIcon />
        </span>
      )}
    </div>
  );
};

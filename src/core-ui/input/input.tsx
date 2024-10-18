import React, { useState } from 'react';
import { InputProps } from './types';
import PasswordEyeIcon from '../../svg/passwordEye';

export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder = '',
  onChange,
  disabled = false,
  label = '',
  variant = 'primary',
  hasIcon = false,
  size = 'large',
}) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState('');
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

  const baseClasses = `w-full px-5 py-3 rounded border transition `;

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
      <input
        type={showPassword && type === 'password' ? 'text' : type}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        disabled={disabled}
        className={`${baseClasses} ${variantClasses} ${sizeClasses[size]} font-roboto font-normal text-sm`}
      />
      {hasIcon && type === 'password' && (
        <span
          className="absolute right-3 top-2/3 transform -translate-y-1/2 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          <PasswordEyeIcon />
        </span>
      )}
    </div>
  );
};

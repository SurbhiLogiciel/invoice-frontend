import React, { useState } from 'react';
import PasswordEyeIcon from '../../svg/passwordEye';
import { InputProps } from './types';

export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder = '',
  onChange,
  disabled = false,
  label = '',
  variant = 'primary',
  hasIcon = false,
  size = 'lg',
}) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const sizeClasses = {
    sm: 'w-input-sm h-input-height',
    md: 'w-input-md h-input-height',
    lg: 'w-input-lg h-input-height',
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

  const baseClasses = `w-full px-3 rounded border transition ${sizeClasses[size]}`;

  const variantClasses =
    variant === 'primary'
      ? `bg-input-bg text-input-text border ${
          focused ? 'border-input-border-focus' : 'border-input-border'
        }`
      : 'bg-input-bg text-input-text border border-input-border';

  return (
    <div className="relative">
      {label && (
        <label
          className={`block mb-2 text-left text-input transition-colors ${
            focused ? 'text-white' : 'text-input-label'
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
        className={`${baseClasses} ${variantClasses}`}
      />
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

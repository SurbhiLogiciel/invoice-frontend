import React, { useState } from 'react';
import PasswordEyeIcon from '../../svg/passwordEye';

export interface InputProps {
  type?: 'text' | 'email' | 'password' | 'tel';
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  hasIcon?: boolean;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder = '',
  onChange,
  disabled = false,
  label = '',
  variant = 'primary',
  hasIcon = false,
  // value,
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    if (type === 'tel') {
      value = formatPhoneNumber(value);
    }
    setInputValue(value);
    if (onChange) {
      onChange(event);
    }
  };

  const baseClasses = 'w-full h-[50px] px-3 py-2 rounded border transition';
  const variantClasses =
    variant === 'primary'
      ? `bg-input-bg text-input-text border ${
          focused
            ? 'border-input-border-focus focus:ring-2 focus:ring-input-text'
            : 'border-input-border'
        }`
      : 'bg-input-bg text-input-text border border-input-border focus:ring focus:ring-red-500';

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative w-[386px]">
      {label && (
        <label
          htmlFor={label}
          className={`block mb-2 text-left transition-colors duration-200 ${
            focused ? 'text-white' : 'text-[var(--input-label-color)]'
          }`}
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          type={showPassword && type === 'password' ? 'text' : type}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled}
          className={`${baseClasses} ${variantClasses} ${disabledClasses}`}
        />

        {hasIcon && type === 'password' && (
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            <PasswordEyeIcon />
          </span>
        )}
      </div>
    </div>
  );
};

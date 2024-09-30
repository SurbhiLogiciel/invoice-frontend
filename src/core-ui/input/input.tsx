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

  const baseClasses = 'w-full h-[50px] px-3 py-2 rounded border transition';
  const variantClasses =
    variant === 'primary'
      ? `bg-transparent text-white border ${
          focused
            ? 'border-[var(--input-border-color-focus)] focus:ring-2 focus:ring-white'
            : 'border-[var(--input-border-color)]'
        }`
      : 'bg-transparent text-white border border-[var(--input-border-color)] focus:ring focus:ring-red-500';

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
          // value={value}
          onChange={onChange}
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

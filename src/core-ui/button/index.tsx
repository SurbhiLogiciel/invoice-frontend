import { ButtonProps } from './types';
import React from 'react';

export const Button: React.FC<ButtonProps> = ({
  size = 'medium',
  disabled = false,
  color = 'primary',
  outline = false,
  fullWidth = false,
  children,
  onClick,
  type,
}) => {
  const sizeClasses = {
    small: 'py-[11px] px-4 text-sm',
    medium: 'py-[11px] px-4 text-md',
    large: 'px-8 py-4 text-[14px] font-bold',
  };

  const colorClasses = {
    primary: outline
      ? 'border border-primary/25 text-white bg-secondary'
      : 'bg-primary text-white font-open-sans',
    secondary: outline
      ? 'border border-secondary text-primary'
      : 'bg-secondary text-white',
    danger: outline
      ? 'border border-red-600 text-red-600'
      : 'bg-red-600 text-white',
    gray: 'text-gray',
    lightPurple: 'bg-lightPurple text-white',
    purple: 'text-white bg-purple ',
  };

  const classNames = [
    'font-roboto rounded-md',
    sizeClasses[size],
    colorClasses[color],
    fullWidth ? 'w-full' : 'w-auto',
    disabled ? 'opacity-50 cursor-not-allowed' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classNames} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

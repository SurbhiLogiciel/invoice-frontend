import { ChipsProp } from './types';
import React from 'react';

export const Chips: React.FC<ChipsProp> = ({
  size = 'small',
  color = 'success',
  outline = false,
  disabled = false,
  children,
  onClick,
}) => {
  const sizeClasses = {
    small: 'pl-5 pr-[18px] py-2 w-[62px] h-[30px] text-sm',
    medium: 'px-5 py-2 text-md',
    large: 'px-5 py-2 text-lg',
  };

  const colorClasses = {
    info: ' text-lightBlue bg-lightBlue/20',
    draft: 'text-white/80 bg-lightGray/70',
    primary: outline
      ? 'border border-primary text-white bg-secondary'
      : 'bg-primary text-white',
    secondary: outline
      ? 'border border-secondary text-primary'
      : 'bg-secondary text-white',
    danger: outline
      ? 'border border-red-600 text-red-600'
      : 'bg-red-600 text-white',
    purple: outline
      ? 'border border-purple text-purple'
      : 'bg-purple text-white',
    green: 'text-success bg-green/20',
    success: 'text-success bg-green/50',
  };

  const classNames = [
    'font-roboto  rounded-md',
    sizeClasses[size],
    colorClasses[color as keyof typeof colorClasses],
    disabled ? 'opacity-50 cursor-not-allowed' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classNames} onClick={onClick}>
      {children}
    </span>
  );
};

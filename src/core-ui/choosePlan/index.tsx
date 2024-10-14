import React, { useState } from 'react';
import { SelectableContainerProps, SelectableContainerColor, SelectableContainerSize } from './types';

const SelectableContainer: React.FC<SelectableContainerProps> = ({
  outline = true,
  color = 'secondary',
  size = 'large',
  disabled = false,
  children,
}) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    if (!disabled) {
      setIsSelected(!isSelected);
    }
  };

  const colorClasses: Record<SelectableContainerColor, string> = {
    primary: 'border-primary bg-secondary',
    secondary: 'border-primary/20 bg-secondary',
    disabled: 'border-gray-400 bg-gray-200 cursor-not-allowed',
  };

  const sizeClasses: Record<SelectableContainerSize, string> = {
    small: 'p-2 text-sm',
    medium: 'p-4 text-md',
    large: 'p-6 text-lg',
  };

  const containerClasses = `
    relative rounded-md cursor-pointer mt-2 text-white transition-colors duration-300
    ${disabled ? colorClasses['disabled'] : isSelected ? colorClasses['primary'] : colorClasses[color]} 
    ${outline ? 'border-2' : ''}
    ${sizeClasses[size]}
    ${disabled ? 'opacity-50' : ''}
  `;

  return (
    <div onClick={handleClick} className={containerClasses}>
      {children}
      {isSelected && !disabled && (
        <div className="absolute top-0 right-0">
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.8125 15C2.8125 8.26875 8.26875 2.8125 15 2.8125C21.7313 2.8125 27.1875 8.26875 27.1875 15C27.1875 21.7313 21.7313 27.1875 15 27.1875C8.26875 27.1875 2.8125 21.7313 2.8125 15ZM19.5125 12.7325C19.5875 12.6326 19.6418 12.5186 19.6721 12.3974C19.7025 12.2762 19.7083 12.1502 19.6892 12.0267C19.6701 11.9032 19.6266 11.7848 19.5611 11.6784C19.4956 11.572 19.4095 11.4797 19.3078 11.4071C19.2062 11.3344 19.091 11.2828 18.9691 11.2553C18.8473 11.2278 18.7211 11.2249 18.5981 11.2468C18.4751 11.2688 18.3577 11.3151 18.2528 11.383C18.148 11.451 18.0578 11.5392 17.9875 11.6425L13.9425 17.305L11.9125 15.275C11.7348 15.1094 11.4997 15.0192 11.2568 15.0235C11.014 15.0278 10.7822 15.1262 10.6105 15.298C10.4387 15.4697 10.3403 15.7015 10.336 15.9443C10.3317 16.1872 10.4219 16.4223 10.5875 16.6L13.4 19.4125C13.4962 19.5087 13.6123 19.5827 13.74 19.6296C13.8677 19.6764 14.0041 19.6948 14.1397 19.6837C14.2753 19.6725 14.4068 19.6319 14.5252 19.5648C14.6435 19.4977 14.7458 19.4056 14.825 19.295L19.5125 12.7325Z"
              fill="#875EFF"
            />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default SelectableContainer;

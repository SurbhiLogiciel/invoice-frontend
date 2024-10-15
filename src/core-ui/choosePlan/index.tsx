import React, { useState } from 'react';
import TickIcon from '../../layouts/tickIcon';

import {
  SelectableContainerProps,
  SelectableContainerColor,
  SelectableContainerSize,
} from './types';

const SelectableContainer: React.FC<SelectableContainerProps> = ({
  heading,
  description,
  planPrice,
  outline = true,
  color = 'secondary',
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
    secondary: 'border-gray bg-secondary',
    disabled: 'border-gray-400 bg-gray-200 cursor-not-allowed',
  };

  const containerClasses = `
    relative rounded-md cursor-pointer border-gray text-white transition-colors duration-300 py-4 px-5
    ${
      disabled
        ? colorClasses['disabled']
        : isSelected
        ? colorClasses['primary']
        : colorClasses[color]
    } 
    ${outline ? 'border-2' : 'primary'}
    ${disabled ? 'opacity-50' : ''}
  `;

  return (
    <div className="relative font-roboto">
      <div onClick={handleClick} className={containerClasses}>
        {children}
        <div className="flex justify-between items-start w-full">
          <div className="flex flex-col">
            <h3 className="text-lg font-roboto font-bold mb-1">Basic Plan</h3>
            <p className="text-base text-gray-500">
              Perfect for individuals starting out
            </p>
          </div>
          <div className="text-[32px] font-bold self-center">$19/month</div>
          {isSelected && !disabled && (
            <div className="absolute -top-3.5 -right-3.5">
              <TickIcon />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectableContainer;

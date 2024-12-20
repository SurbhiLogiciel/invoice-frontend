import React from 'react';
import TickIcon from '../../app/svg/tickIcon';
import { SelectableContainerProps, SelectableContainerColor } from './types';

const SelectableContainer: React.FC<SelectableContainerProps> = ({
  heading,
  description,
  planPrice,
  outline = true,
  color = 'secondary',
  disabled = false,
  children,
  onSelect,
  isSelected,
}) => {
  const handleClick = () => {
    if (!disabled && onSelect) {
      onSelect();
    }
  };

  const colorClasses: Record<SelectableContainerColor, string> = {
    primary: 'border-primary bg-secondary',
    secondary: 'border-gray bg-secondary',
    disabled: 'border-gray-400 bg-gray-200 cursor-not-allowed',
  };

  const containerClasses = `relative rounded-lg cursor-pointer border-gray text-white transition-colors duration-300 py-4 px-5
  ${isSelected ? colorClasses['primary'] : colorClasses[color]} 
  ${outline ? 'border-2' : 'primary'}`;

  return (
    <div className="relative font-roboto">
      <div onClick={handleClick} className={containerClasses}>
        {children}
        <div className="flex justify-between items-start w-full">
          <div className="flex flex-col">
            <h3 className="text-lg font-roboto font-bold mb-1">{heading}</h3>
            <p className="text-base text-gray-500">{description}</p>
          </div>
          <div className="text-[32px] font-bold self-center">{planPrice}</div>
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

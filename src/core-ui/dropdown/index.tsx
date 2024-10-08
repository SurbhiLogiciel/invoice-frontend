import React, { useState } from 'react';
import { DropdownOption, DropdownProps } from './types';

export const Dropdown: React.FC<DropdownProps> = ({ options, Image }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  const getColorClass = (color: DropdownOption['color']) => {
    switch (color) {
      case 'success':
        return 'text-green-500'; 
      case 'danger':
        return 'text-red-500'; 
      default:
        return 'text-black'; 
    }
  };

  return (
    <div className="relative inline-block">
      <img
        src={Image}
        alt="Trigger"
        onClick={toggleDropdown}
        className="cursor-pointer"
      />

      {isOpen && (
        <ul className="absolute mt-2 w-32 bg-white shadow-lg border rounded-lg z-10">
          {options.map((option, index) => (
            <li
              key={index}
              className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${getColorClass(option.color)}`}  // Apply color class
              onClick={() => handleOptionClick(option.action)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

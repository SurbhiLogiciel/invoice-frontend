// src/ui-kit/container.tsx
import { Container } from './types';import { Dropdown } from '../dropdown';
import { DropdownOption } from '../dropdown/types';
import Frame from '../../assets/Frame.png';
import React from 'react';
import { Chips } from '../chips';

export const DataContainer: React.FC<Container> = ({
  size = 'medium', // Default value if not provided
  color = 'purple', // Default value if not provided
  fullWidth = false, // Default value for fullWidth
  children,
}) => {
  const handleEdit = () => {
    alert('you clicked edit option');
    console.log('Edit option clicked');
  };

  const handleDelete = () => {
    alert('you clicked delete option');
    console.log('Delete option clicked');
  };

  const options: DropdownOption[] = [
    // Use DropdownOption type here
    { label: 'Edit', action: handleEdit, color: 'success' },
    { label: 'Delete', action: handleDelete, color: 'danger' },
  ];
  const sizeClasses: Record<string, string> = {
    small: 'py-4 ',
    medium: 'py-8 px-5 text-md',
    large: 'py-4',
  };

  const colorClasses: Record<string, string> = {
    purple: 'bg-purple',
  };

  const classNames = [
    'overflow-x-auto font-roboto rounded-md  text-white w-[900px] lg:w-full',
    sizeClasses[size], // Accessing the size class based on the prop
    colorClasses[color], // Accessing the color class based on the prop
    fullWidth ? 'w-full' : 'w-auto',
  ]
    .filter(Boolean)
    .join(' '); // Ensure proper spacing between classes

  return (
    <div className={classNames}>
      <div className="flex w-full gap-3 justify-between items-center">
        <div className="w-[75px] shrink-0">#INV-30202</div>
        <div className="w-[109px] shrink-0">Due 19 Sept,2024</div>
        <div className="w-48 shrink-0">David Jonas</div>
        <div className="w-48 shrink-0">Created on 10 Sept,2024</div>
        <div className="w-48 shrink-0 font-bold text-[20px] ">$1800</div>
        <div className="w-48 shrink-0">
          <Chips
            onClick={() => alert('You clicked on paid chip')}
            color="success"
            children="Paid"
          />
        </div>
        <div className="w-16">
          <Dropdown options={options} Image={Frame} />
        </div>
      </div>
    </div>
  );
};

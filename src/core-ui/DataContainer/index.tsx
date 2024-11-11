import React from 'react';
import { Container } from './types';
import { DropdownOption } from '../dropdown/types';
import avtar from '../../app/assets/Frame.png';
import { Chips } from '../chips';
import { Dropdown } from '../dropdown';

export const DataContainer: React.FC<Container> = ({
  size = 'medium',
  color = 'purple',
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
    'font-roboto rounded-md  text-white lg:w-full max-w-full min-w-[900px]',
    sizeClasses[size],
    colorClasses[color],
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames}>
      {children}
      <div className="flex w-full gap-3 justify-between items-center max-w-full">
        <div className="w-48">#INV-30202</div>
        <div className="w-48">Due 19 Sept,2024</div>
        <div className="w-48">David Jonas</div>
        <div className="w-48">Created on 10 Sept,2024</div>
        <div className="w-48 font-bold text-[20px] ">$1800</div>
        <div className="shrink-0">
          <Chips
            onClick={() => alert('You clicked on paid chip')}
            color="success"
            children="Paid"
          />
        </div>
        <div className="w-16">
          <Dropdown options={options} Image={avtar} position="right" />
        </div>
      </div>
    </div>
  );
};

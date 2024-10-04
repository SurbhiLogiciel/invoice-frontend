import React from 'react';
import Select from 'react-select';
import { SelectorProps } from './types';

// export const Selector: React.FC = ({

// })

const options = [
  { value: 'a', label: 'b' },
  { value: 'c', label: 'd' },
  { value: 'e', label: 'f' },
];

const MyComponent = () => <Select options={options} />;

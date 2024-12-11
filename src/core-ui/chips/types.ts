import React from 'react';
export interface ChipsProp {
  size?: 'small' | 'medium' | 'large';
  color?:
    | 'success'
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'purple'
    | 'green'
    | 'info'
    | 'draft';
  outline?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  onClick: () => void;
}

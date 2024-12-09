import React from 'react';
export interface ChipsProp {
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'danger' | 'purple' | 'success' | 'green';
  outline?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  onClick: () => void;
}

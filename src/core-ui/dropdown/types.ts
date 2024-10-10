export type DropdownColor = 'success' | 'danger';
export type DropdownPosition = 'left' | 'right'; // Added position types

export interface DropdownOption {
  label: string;
  action: () => void;
  color: DropdownColor;
}

export interface DropdownProps {
  options: DropdownOption[];
  Image: string;
  position?: DropdownPosition; // Optional position prop
}

export type DropdownColor = 'success' | 'danger';
export type DropdownPosition = 'left' | 'right';

export interface DropdownOption {
  label: string;
  action: () => void;
  color: DropdownColor;
}

export interface DropdownProps {
  options: DropdownOption[];
  Image: string;
  position?: DropdownPosition;
  onEdit?: () => void;
}

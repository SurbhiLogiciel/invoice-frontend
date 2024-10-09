export type DropdownColor = 'success' | 'danger' ; 
export interface DropdownOption {
  label: string;
  action: () => void;
  color: DropdownColor,
}
export interface DropdownProps {
  options: DropdownOption[];
  Image: string;
}
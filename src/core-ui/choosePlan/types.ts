export type SelectableContainerColor = 'primary' | 'secondary' | 'disabled';

export type SelectableContainerSize = 'small' | 'medium' | 'large';

export interface SelectableContainerProps {
  heading: string;
  description: string;
  planPrice: string;
  outline?: string;
  color?: SelectableContainerColor;
  disabled?: boolean;
  children?: React.ReactNode;
  containerClass?: string;
  onClick?: () => void;
  onSelect?: () => void;
  isSelected?: boolean;
}

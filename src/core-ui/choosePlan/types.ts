export type SelectableContainerColor = 'primary' | 'danger';
export type SelectableContainerSize = 'small' | 'medium' | 'large';

export interface SelectableContainerProps {
  outline?: boolean;
  color?: SelectableContainerColor;
  size?: SelectableContainerSize;
  children: React.ReactNode;
}
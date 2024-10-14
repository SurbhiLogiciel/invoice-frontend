export type SelectableContainerColor = 'primary' | 'secondary' | 'disabled';

export type SelectableContainerSize = 'small' | 'medium' | 'large';

export interface SelectableContainerProps {
  outline?: boolean;
  color?: SelectableContainerColor;
  size?: SelectableContainerSize;
  disabled?: boolean;
  children: React.ReactNode;
}

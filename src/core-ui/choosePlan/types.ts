export type SelectableContainerColor = 'primary' | 'secondary' | 'disabled';

export type SelectableContainerSize = 'small' | 'medium' | 'large';

export interface SelectableContainerProps {
  heading: string,
  description: string,
  planPrice: string,
  outline?: boolean;
  color?: SelectableContainerColor;
  size?: SelectableContainerSize;
  disabled?: boolean;
  children: React.ReactNode;
}

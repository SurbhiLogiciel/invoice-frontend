export interface ButtonProps {
  size?: 'small' | 'medium' | 'large';
  type?: string;
  disabled?: boolean;
  color?:
    | 'primary'
    | 'secondary'
    | 'gray'
    | 'lightPurple'
    | 'purple'
    | 'danger';
  outline?:
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'gray'
    | 'lightPurple'
    | 'purple';
  fullWidth?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

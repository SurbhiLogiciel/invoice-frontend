export interface InputProps {
  type?: 'text' | 'email' | 'password' | 'tel';
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  hasIcon?: boolean;
}

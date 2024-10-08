export interface InputProps {
  type?: 'text' | 'email' | 'password' | 'tel' | 'select' | 'number';
  label?: string;
  placeholder?: string;
  value?: string;
  options?: string[];
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  hasIcon?: boolean;
  size?: 'lg' | 'md' | 'sm';
}

export interface OtpInputProps {
  length?: number;
  onChange: (otp: string) => void;
}

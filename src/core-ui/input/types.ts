export interface InputProps {
  type?: 'text' | 'email' | 'password' | 'tel' | 'select' | 'date';
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
  size?: 'large' | 'medium' | 'small';
  passwordValue?: string;
  isConfirmPassword?: boolean;
  error?: string;
  required?: boolean;
  validateOnSubmit?: boolean;
}

export interface OtpInputProps {
  length?: number;
  onChange: (otp: string) => void;
}

export interface PromoCodeInputProps {
  size?: 'small' | 'medium' | 'large';
}

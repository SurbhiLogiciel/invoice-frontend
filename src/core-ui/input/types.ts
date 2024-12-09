export interface InputProps {
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  name?: string;
  id?: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'select' | 'date' | 'number';
  label?: string;
  placeholder?: string;
  value?: string | number;
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
  promoCode: string;
  disabled?: boolean;
  onApply: (promoCode: string) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

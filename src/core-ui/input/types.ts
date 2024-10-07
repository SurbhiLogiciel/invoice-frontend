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
  length?: number; // Optional length for the OTP input (default 6)
  onChange: (otp: string) => void; // Callback for OTP changes
}

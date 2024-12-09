export const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const isValidOtp = (otp: string | number): boolean => {
  const otpStr = String(otp);
  if (!/^\d{6}$/.test(otpStr)) {
    return false;
  }
  return true;
};

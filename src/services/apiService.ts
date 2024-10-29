import apiClient from '../utils/http ';

export const registerUserEmail = async (email: string) => {
  return await apiClient.post('register/userEmail', { email });
};

export const verifyOtp = async (userId: string, otp: number | string) => {
  if (!userId) {
    throw new Error('userId is required');
  }
  return await apiClient.post(`/register/verifyOtp/${userId}`, { otp });
};

export const registerUserProfile = async (
  userId: string,
  fullName: string,
  phoneNumber: string,
  password: string,
  confirmPassword: string
) => {
  if(!userId){
    throw new Error('userId is required');
  }
  if(password !== confirmPassword){
    throw new Error('Password do not match');
  }
  return await apiClient.post(`/register/userProfile/${userId}`, {
    fullName,
    phoneNumber,
    password,
  });
};

export const userLogin = (email: string, password: string) => {
  return apiClient.post('/auth/login', { email, password });
};
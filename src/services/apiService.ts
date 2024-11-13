import apiClient from '../utils/http';

export const registerUserEmail = async (email: string) => {
  try {
    return await apiClient.post('register/userEmail', { email });
  } catch (error: any) {
    console.error('Error in registerUserEmail:', error);
    throw new Error(
      error.response?.data?.message || 'Failed to register user email.'
    );
  }
};

export const verifyOtp = async (userId: string, otp: number | string) => {
  if (!userId) {
    throw new Error('userId is required');
  }

  try {
    return await apiClient.post(`/register/verifyOtp/${userId}`, { otp });
  } catch (error: any) {
    console.error('Error in verifyOtp:', error);
    throw new Error(error.response?.data?.message || 'Failed to verify OTP.');
  }
};

export const registerUserProfile = async (
  userId: string,
  companyId: string,
  fullName: string,
  phoneNumber: string,
  password: string,
  confirmPassword: string
) => {
  if (!userId) {
    throw new Error('userId is required');
  }

  if (password !== confirmPassword) {
    throw new Error('Passwords do not match');
  }

  try {
    return await apiClient.post(`/register/userProfile/${userId}`, {
      companyId,
      fullName,
      phoneNumber,
      password,
      confirmPassword,
    });
  } catch (error: any) {
    console.error('Error in registerUserProfile:', error);
    throw new Error(
      error.response?.data?.message || 'Failed to register user profile.'
    );
  }
};

export const registerCompanyProfile = async (
  userId: string,
  companyName: string,
  location: string,
  city: string,
  state: string,
  zip: string
) => {
  if (!userId) {
    throw new Error('userId is required');
  }

  try {
    return await apiClient.post(`/register/companyProfile/${userId}`, {
      id: userId,
      companyName,
      location,
      city,
      state,
      zip,
    });
  } catch (error: any) {
    console.error('Error in registerCompanyProfile:', error);
    throw new Error(
      error.response?.data?.message || 'Failed to register company profile.'
    );
  }
};

export const userLogin = async (email: string, password: string) => {
  try {
    return await apiClient.post('/user/login', { email, password });
  } catch (error: any) {
    console.error('Error in userLogin:', error);
    throw new Error(error.response?.data?.message || 'Failed to log in user.');
  }
};

export const submitUserPlan = async (
  userId: string,
  plan: string,
  amount: number,
  discount: number,
  total: number
) => {
  if (!userId) {
    throw new Error('userId is required');
  }

  try {
    return await apiClient.post(`/user/selectPlan/${userId}`, {
      plan,
      amount,
      discount,
      total,
    });
  } catch (error: any) {
    console.error('Error in submitUserPlan:', error);
    throw new Error(
      error.response?.data?.message || 'Failed to submit user plan.'
    );
  }
};

export const applyPromoCode = async (
  userId: string,
  promoCode: string,
  amount: number
) => {
  if (!userId) {
    throw new Error('userId is required');
  }

  try {
    return await apiClient.post(`/user/applyPromoCode/${userId}`, {
      id: userId,
      promoCode,
      amount,
    });
  } catch (error: any) {
    console.error('Error in applyPromoCode:', error);
    throw new Error(
      error.response?.data?.message || 'Failed to apply promo code.'
    );
  }
};

interface InvoiceItem {
  itemName: string;
  qty: number;
  price: number;
}

interface CreateInvoicePayload {
  companyName: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
  issueDate: string;
  paymentTerms: string;
  items: InvoiceItem[];
}

export const createInvoice = async (
  userId: string,
  data: CreateInvoicePayload
) => {
  try {
    const response = await apiClient.post(`/invoices/${userId}`, data);
    return response.data;
  } catch (error) {
    console.error('Error creating invoice:', error);
    throw error;
  }
};

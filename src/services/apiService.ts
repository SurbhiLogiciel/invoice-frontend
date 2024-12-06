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

export const fetchInvoiceList = async (
  userId: string,
  page: number = 1,
  limit: number = 10
) => {
  try {
    if (!userId) {
      console.error('User ID not found!');
      return;
    }

    const response = await apiClient.get(`/invoiceList`, {
      params: { userId, page, limit },
    });

    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch invoices:', error);
    throw error;
  }
};

export const fetchInvoiceData = async (userId: string, invoiceId: string) => {
  try {
    if (!userId) {
      console.error('User ID not found!');
      return;
    }
    if (!invoiceId) {
      console.error('invoiceId ID not found!');
      return;
    }

    const response = await apiClient.get(
      `/invoiceData/${userId}/${invoiceId}`,
      {
        params: { userId, invoiceId },
      }
    );

    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch invoices:', error);
    throw error;
  }
};

export const updateInvoice = async (
  id: string,
  userId: string,
  updatedInvoice: object
) => {
  try {
    console.log(updatedInvoice);
    if (!id) {
      console.error('Invoice ID not found!');
      return;
    }
    console.log('ndsjjdsf');

    const response = await apiClient.put(
      `/invoices/${userId}/${id}`,
      updatedInvoice
    );
    return response.data;
  } catch (error) {
    console.error('Failed to update invoice:', error);
    throw error;
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
  issueDate: Date | null;
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

export const getUserName = async (userId: string) => {
  try {
    const response = await apiClient.get(`/userName/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting Username:', error);
    throw error;
  }
};

export const deleteInvoice = async (userId: string, invoiceId: string) => {
  try {
    const response = await apiClient.delete(
      `/deleteInvoice/${userId}/${invoiceId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error deleting Invoice:', error);
    throw error;
  }
};

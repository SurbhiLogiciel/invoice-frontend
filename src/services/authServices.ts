import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_URL;

const api = axios.create({
  baseURL: baseURL || 'http://localhost:5000', // Provide a fallback if the env variable is missing
});

export const userProfile = async ( _id: string,fullName:string, phoneNumber: Number, password: string) => {
    try { 
        const response = await api.post('register/userProfile/${_id}', {
        fullName,
        phoneNumber,
        password,
    });
    return response.data
} catch(error) {
    console.error('Error updating user profile:', error);
    throw error;
}
};
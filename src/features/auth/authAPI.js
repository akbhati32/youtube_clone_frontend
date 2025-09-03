import axiosInstance from '../../utils/axiosInstance';

// --- AUTH API FUNCTIONS ---

// Register user with form data (multipart required for file upload like profile pictures)
export const register = (formData) =>
  axiosInstance.post('/auth/register', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

// Login user with basic JSON data
export const login = (data) => axiosInstance.post('/auth/login', data);

// Fetch currently logged-in user details using stored JWT token
export const getMe = () => axiosInstance.get('/auth/me');

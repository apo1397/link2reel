import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// Add request interceptor for debugging
api.interceptors.request.use(request => {
  console.log('Starting Request:', request);
  return request;
});

// Add response interceptor for debugging
api.interceptors.response.use(
  response => {
    console.log('Response:', response);
    return response;
  },
  error => {
    console.error('API Error:', error.response || error);
    throw error;
  }
);

export const generateUSPs = async (url, useMock = false) => {
  try {
    const response = await api.post(`/api/generate-usp?mock=${useMock}`, { url });
    return response.data;
  } catch (error) {
    console.error('Generate USPs Error:', error);
    throw new Error(error.response?.data?.error || 'Failed to generate USPs');
  }
};

export const generateScript = async (url, usps, useMock = false, feedback = '') => {
  try {
    const response = await api.post(`/api/generate-script?mock=${useMock}`, { 
      url, 
      usps,
      feedback 
    });
    return response.data;
  } catch (error) {
    console.error('Generate Script Error:', error);
    throw new Error(error.response?.data?.error || 'Failed to generate script');
  }
}; 
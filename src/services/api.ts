import axios from 'axios';

// ─── Centralized Axios instance ───────────────────────────────────────────────
// All backend API calls go through this instance so the base URL is
// defined in exactly one place. To switch environments, change it here.
const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ─── Response interceptor ─────────────────────────────────────────────────────
// Normalize error messages from the backend's { success, message } envelope
// so the caller always gets a plain Error with a readable .message string.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const serverMessage =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred.';
    return Promise.reject(new Error(serverMessage));
  }
);

export default api;

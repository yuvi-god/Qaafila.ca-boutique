import axios from 'axios';
import { API_CONFIG } from '../config/constants';

const apiClient = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor with retry logic
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;
    
    if (!config || !config.retry) {
      config.retry = 0;
    }
    
    config.retry += 1;
    
    if (config.retry <= API_CONFIG.retries) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return apiClient(config);
    }
    
    return Promise.reject(error);
  }
);

export const productService = {
  getProducts: () => apiClient.get('/products'),
  getProduct: (id) => apiClient.get(`/products/${id}`),
  searchProducts: (query) => apiClient.get(`/products/search?q=${query}`),
};

export const cartService = {
  createCheckout: (cartItems) => apiClient.post('/checkout', { items: cartItems }),
  getOrderStatus: (orderId) => apiClient.get(`/orders/${orderId}`),
};

export const referralService = {
  validateReferral: (code) => apiClient.get(`/referral/${code}`),
  applyReferral: (code) => apiClient.post('/referral/apply', { code }),
};

export default apiClient;
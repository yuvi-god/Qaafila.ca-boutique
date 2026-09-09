// Performance optimization constants
export const CACHE_CONFIG = {
  imageCacheTTL: 7 * 24 * 60 * 60 * 1000, // 7 days
  productCacheTTL: 24 * 60 * 60 * 1000, // 24 hours
  maxCacheSize: 100 * 1024 * 1024, // 100MB
};

export const API_CONFIG = {
  baseURL: 'https://api.qaafila.ca',
  timeout: 5000,
  retries: 3,
};

export const THEME = {
  primary: '#FF6B6B',
  secondary: '#4CAF50',
  dark: '#333',
  light: '#f5f5f5',
  white: '#fff',
  gray: '#999',
};

export const DEEP_LINKS = {
  product: (id) => `https://qaafila.ca/product/${id}`,
  collection: (id) => `https://qaafila.ca/col/${id}`,
  referral: (code) => `https://qaafila.ca/ref/${code}`,
  checkout: (orderId) => `https://qaafila.ca/checkout/${orderId}`,
};
import { productService } from '../api/client';
import { cacheService } from '../services/cacheService';
import { CACHE_CONFIG } from '../config/constants';

export const getProductsOptimized = async () => {
  // Check cache first
  const cached = await cacheService.get('products');
  if (cached) return cached;
  
  try {
    const response = await productService.getProducts();
    // Cache for 24 hours
    await cacheService.set('products', response.data, CACHE_CONFIG.productCacheTTL);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductOptimized = async (id) => {
  const cached = await cacheService.get(`product_${id}`);
  if (cached) return cached;
  
  try {
    const response = await productService.getProduct(id);
    await cacheService.set(`product_${id}`, response.data, CACHE_CONFIG.productCacheTTL);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

export const searchProductsOptimized = async (query) => {
  const cacheKey = `search_${query}`;
  const cached = await cacheService.get(cacheKey);
  if (cached) return cached;
  
  try {
    const response = await productService.searchProducts(query);
    await cacheService.set(cacheKey, response.data, 60 * 60 * 1000); // 1 hour
    return response.data;
  } catch (error) {
    console.error('Search error:', error);
    throw error;
  }
};
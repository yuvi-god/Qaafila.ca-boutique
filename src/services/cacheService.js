import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_PREFIX = 'qaafila_cache_';

export const cacheService = {
  set: async (key, value, ttl = null) => {
    try {
      const data = {
        value,
        timestamp: Date.now(),
        ttl,
      };
      await AsyncStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(data));
    } catch (error) {
      console.error('Cache set error:', error);
    }
  },

  get: async (key) => {
    try {
      const data = await AsyncStorage.getItem(`${CACHE_PREFIX}${key}`);
      if (!data) return null;

      const cached = JSON.parse(data);
      
      if (cached.ttl && Date.now() - cached.timestamp > cached.ttl) {
        await AsyncStorage.removeItem(`${CACHE_PREFIX}${key}`);
        return null;
      }
      
      return cached.value;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  },

  remove: async (key) => {
    try {
      await AsyncStorage.removeItem(`${CACHE_PREFIX}${key}`);
    } catch (error) {
      console.error('Cache remove error:', error);
    }
  },

  clear: async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const cacheKeys = keys.filter((key) => key.startsWith(CACHE_PREFIX));
      await AsyncStorage.multiRemove(cacheKeys);
    } catch (error) {
      console.error('Cache clear error:', error);
    }
  },
};

export default cacheService;
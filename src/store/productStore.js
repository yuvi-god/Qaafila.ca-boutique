import create from 'zustand';

export const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,
  
  setProducts: (products) => set({ products }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  
  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      // Replace with actual API endpoint
      const response = await fetch('https://api.qaafila.ca/products');
      const data = await response.json();
      set({ products: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
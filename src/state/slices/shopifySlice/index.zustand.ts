import create from 'zustand';
import { Checkout, Product } from 'shopify-buy';
import { getClient } from './shopifySlice.utils';

export const fetchPosters = async (): Promise<Product[]> => {
  const client = getClient();
  const products = await client.product.fetchAll();
  return products;
};

export const createCheckout = async (): Promise<Checkout> => {
  const client = getClient();
  const checkout = await client.checkout.create();
  return checkout;
};

export const updateCheckout = async (
  checkoutId: string,
  input: any
): Promise<Checkout> => {
  const client = getClient();
  const checkout = await client.checkout.updateAttributes(checkoutId, input);
  return checkout;
};

type State = {
  posters: Product[];
  checkout: any;
  currentPoster: Product | null;
  errorMessage: string;
  loading: boolean;
  setCurrentPoster: (poster: Product) => void;
  cleanCurrentPoster: () => void;
  cleanPosters: () => void;
  cleanErrorMessage: () => void;
  fetchPosters: () => Promise<void>;
  createCheckout: () => Promise<void>;
  updateCheckout: (checkoutId: string, input: any) => Promise<void>;
};

const useStore = create<State>((set) => ({
  posters: [],
  checkout: null,
  currentPoster: null,
  errorMessage: '',
  loading: false,
  setCurrentPoster: (poster) => set({ currentPoster: poster }),
  cleanCurrentPoster: () => set({ currentPoster: null }),
  cleanPosters: () => set({ posters: [] }),
  cleanErrorMessage: () => set({ errorMessage: '' }),
  fetchPosters: async () => {
    set({ loading: true });
    try {
      const posters = await fetchPosters();
      set({ posters, loading: false, errorMessage: '' });
    } catch (error: any) {
      set({ loading: false, errorMessage: error.message });
    }
  },
  createCheckout: async () => {
    set({ loading: true });
    try {
      const checkout = await createCheckout();
      set({ checkout, loading: false });
    } catch (error: any) {
      set({ loading: false, errorMessage: error.message });
    }
  },
  updateCheckout: async (checkoutId: string, input: any) => {
    set({ loading: true });
    try {
      const checkout = await updateCheckout(checkoutId, input);
      set({ checkout, loading: false });
    } catch (error: any) {
      set({ loading: false, errorMessage: error.message });
    }
  },
}));

export default useStore;

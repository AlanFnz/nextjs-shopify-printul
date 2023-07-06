import create from 'zustand';
import { Product } from 'shopify-buy';
import {
  createCheckout,
  fetchPosters,
  updateCheckout,
} from './shopifySlice.thunks';

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
  updateCheckout: () => Promise<void>;
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
    } catch (error) {
      set({ loading: false, errorMessage: error.message });
    }
  },
  createCheckout: async () => {
    set({ loading: true });
    try {
      const checkout = await createCheckout();
      set({ checkout, loading: false });
    } catch (error) {
      set({ loading: false, errorMessage: error.message });
    }
  },
  updateCheckout: async () => {
    set({ loading: true });
    try {
      const checkout = await updateCheckout();
      set({ checkout, loading: false });
    } catch (error) {
      set({ loading: false, errorMessage: error.message });
    }
  },
}));

export default useStore;

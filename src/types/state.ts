import { Product } from '@state/shopify/api';

export type State = {
  posters: Product[];
  cart: any | null;
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
  addToCart: (variantId: string, quantity: number) => Promise<void>;
  removeFromCart: (lineItemId: string) => Promise<void>;
  updateCart: (variantId: string, quantity: number) => Promise<void>;
};

export type InitialStateType = {
  posters: Product[];
  cart: any | null;
  currentPoster: Product | null;
  errorMessage: string;
  loading: boolean;
};

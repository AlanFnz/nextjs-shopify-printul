import Client, { Checkout, Product } from 'shopify-buy';

export type InitialStateType = {
  posters: Product[];
  checkout: Checkout | null;
  currentPoster: Product | null;
  errorMessage: string;
  loading: boolean;
};

export type State = {
  posters: Product[];
  checkout: Checkout | null;
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

import Client, { Checkout, Product } from 'shopify-buy';

export type InitialStateType = {
  posters: Product[];
  checkout: Checkout | null;
  currentPoster: Product | null;
  errorMessage: string;
  loading: boolean;
};


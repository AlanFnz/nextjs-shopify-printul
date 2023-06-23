import Client, { Product } from 'shopify-buy';

export type InitialStateType = {
  posters: Product[];
  currentPoster: Product | null;
  errorMessage: string;
  loading: boolean;
};


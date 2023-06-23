import Client, { Product } from 'shopify-buy';

export type InitialStateType = {
  client: Client | null;
  posters: Product[];
  currentPoster: Product | null;
  errorMessage: string;
  loading: boolean;
};


import Client from 'shopify-buy';
import { InitialStateType } from './shopifySlice.types';

let client: Client | null = null;

export function getClient() {
  if (!client) {
    client = Client.buildClient({
      storefrontAccessToken: process.env.NEXT_PUBLIC_STOREFRONT_TOKEN!,
      domain: process.env.NEXT_PUBLIC_STORE_URL!,
      apiVersion: process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION!,
    });
  }

  return client;
}

export function setLoading(state: InitialStateType, loading: boolean) {
  state.loading = loading;
}

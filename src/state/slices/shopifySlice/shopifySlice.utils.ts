import Client from 'shopify-buy';
import { InitialStateType } from './shopifySlice.types';

export function buildClient() {
  return Client.buildClient({
    storefrontAccessToken: process.env.NEXT_PUBLIC_STOREFRONT_TOKEN!,
    domain: process.env.NEXT_PUBLIC_STORE_URL!,
    apiVersion: process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION!,
  });
}

export function setLoading(state: InitialStateType, loading: boolean) {
  state.loading = loading;
}

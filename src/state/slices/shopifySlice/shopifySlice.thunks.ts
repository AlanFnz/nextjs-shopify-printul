import { createAsyncThunk } from '@reduxjs/toolkit';
import { Checkout, Product } from 'shopify-buy';
import { RootState } from '@/state/store';
import { buildClient } from './shopifySlice.utils';

export const fetchPosters = createAsyncThunk<
  Product[],
  void,
  { state: RootState }
>('posters/fetchPrintfulPosters', async () => {
  const client = buildClient();
  const products = await client.product.fetchAll();
  return products;
});

export const createCheckout = createAsyncThunk<
  Checkout,
  void,
  { state: RootState }
>('shopify/createCheckout', async () => {
  const client = buildClient();
  const checkout = await client.checkout.create();
  return checkout;
});

export const updateCheckout = createAsyncThunk<
  Checkout,
  { checkoutId: string; input: any },
  { state: RootState }
>('shopify/updateCheckout', async ({ checkoutId, input }) => {
  const client = buildClient();
  const checkout = await client.checkout.updateAttributes(checkoutId, input);
  return checkout;
});

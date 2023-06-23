import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import Client, { Product } from 'shopify-buy';
import { RootState } from '../store';

type initialState = {
  client: any;
  posters: Product[];
  currentPoster: any;
  errorMessage: string | undefined;
  loading: boolean;
};

const initialState: initialState = {
  client: null,
  posters: [],
  currentPoster: null,
  errorMessage: '',
  loading: false,
};

export const createShopifyClient = createAsyncThunk(
  'posters/createClient',
  async () => {
    return Client.buildClient({
      storefrontAccessToken: process.env.NEXT_PUBLIC_STOREFRONT_TOKEN,
      domain: process.env.NEXT_PUBLIC_STORE_URL,
      apiVersion: process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION,
    });
  }
);

export const fetchPosters = createAsyncThunk<
  Product[],
  void,
  { state: RootState }
>('posters/fetchPrintfulPosters', async (_, { getState }) => {
  const client = Client.buildClient({
    storefrontAccessToken: process.env.NEXT_PUBLIC_STOREFRONT_TOKEN,
    domain: process.env.NEXT_PUBLIC_STORE_URL,
    apiVersion: process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION,
  });
  const products = await client.product.fetchAll();
  return products;
});

const shopifySlice = createSlice({
  name: 'posters',
  initialState,
  reducers: {
    setCurrentPoster: (state, action: PayloadAction<Product>) => {
      state.currentPoster = action.payload;
    },
    cleanCurrentPoster: (state) => {
      state.currentPoster = initialState.currentPoster;
    },
    cleanPostersReducer: () => initialState,
    cleanClient: (state) => {
      state.client = initialState.client;
    },
    cleanErrorMessage: (state) => {
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createShopifyClient.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createShopifyClient.fulfilled, (state, action) => {
      state.loading = false;
      state.client = action.payload;
      state.errorMessage = '';
    });
    builder.addCase(createShopifyClient.rejected, (state, action) => {
      state.loading = false;
      state.errorMessage = action.error.message;
    });
    builder.addCase(fetchPosters.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPosters.fulfilled, (state, action) => {
      state.loading = false;
      state.posters = action.payload;
      state.errorMessage = '';
    });
    builder.addCase(fetchPosters.rejected, (state, action) => {
      state.loading = false;
      state.errorMessage = action.error.message;
    });
  },
});

const { actions, reducer } = shopifySlice;

export const {
  setCurrentPoster,
  cleanCurrentPoster,
  cleanPostersReducer,
  cleanErrorMessage,
} = actions;

export default reducer;

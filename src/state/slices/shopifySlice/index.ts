import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import Client, { Product } from 'shopify-buy';
import { RootState } from '../../store';

type InitialStateType = {
  client: Client | null;
  posters: Product[];
  currentPoster: Product | null;
  errorMessage: string;
  loading: boolean;
};

const initialState: InitialStateType = {
  client: null,
  posters: [],
  currentPoster: null,
  errorMessage: '',
  loading: false,
};

function buildClient() {
  return Client.buildClient({
    storefrontAccessToken: process.env.NEXT_PUBLIC_STOREFRONT_TOKEN!,
    domain: process.env.NEXT_PUBLIC_STORE_URL!,
    apiVersion: process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION!,
  });
}

export const createShopifyClient = createAsyncThunk(
  'posters/createClient',
  async () => {
    return buildClient();
  }
);

export const fetchPosters = createAsyncThunk<
  Product[],
  void,
  { state: RootState }
>('posters/fetchPrintfulPosters', async () => {
  const client = buildClient();
  const products = await client.product.fetchAll();
  return products;
});

function setLoading(state: InitialStateType, loading: boolean) {
  state.loading = loading;
}

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
    cleanPosters: (state) => {
      state.posters = initialState.posters;
    },
    cleanClient: (state) => {
      state.client = initialState.client;
    },
    cleanErrorMessage: (state) => {
      state.errorMessage = initialState.errorMessage;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createShopifyClient.pending, (state) => {
      setLoading(state, true);
    });
    builder.addCase(createShopifyClient.fulfilled, (state, action) => {
      setLoading(state, false);
      state.client = action.payload;
      state.errorMessage = initialState.errorMessage;
    });
    builder.addCase(createShopifyClient.rejected, (state, action) => {
      setLoading(state, false);
      state.errorMessage = action.error.message || '';
    });
    builder.addCase(fetchPosters.pending, (state) => {
      setLoading(state, true);
    });
    builder.addCase(fetchPosters.fulfilled, (state, action) => {
      setLoading(state, false);
      state.posters = action.payload;
      state.errorMessage = initialState.errorMessage;
    });
    builder.addCase(fetchPosters.rejected, (state, action) => {
      setLoading(state, false);
      state.errorMessage = action.error.message || '';
    });
  },
});

const { actions, reducer } = shopifySlice;

export const {
  setCurrentPoster,
  cleanCurrentPoster,
  cleanPosters,
  cleanClient,
  cleanErrorMessage,
} = actions;

export default reducer;

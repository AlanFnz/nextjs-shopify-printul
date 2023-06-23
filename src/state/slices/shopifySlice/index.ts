import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product } from 'shopify-buy';
import { RootState } from '../../store';
import { buildClient, setLoading } from './shopifySlice.utils';
import { InitialStateType } from './shopifySlice.types';

const initialState: InitialStateType = {
  posters: [],
  currentPoster: null,
  errorMessage: '',
  loading: false,
};

export const fetchPosters = createAsyncThunk<
  Product[],
  void,
  { state: RootState }
>('posters/fetchPrintfulPosters', async () => {
  const client = buildClient();
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
    cleanPosters: (state) => {
      state.posters = initialState.posters;
    },
    cleanErrorMessage: (state) => {
      state.errorMessage = initialState.errorMessage;
    },
  },
  extraReducers: (builder) => {
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
  cleanErrorMessage,
} = actions;

export default reducer;

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product } from 'shopify-buy';
import { setLoading } from './shopifySlice.utils';
import { InitialStateType } from './shopifySlice.types';
import { createCheckout, fetchPosters, updateCheckout } from './shopifySlice.thunks';

const initialState: InitialStateType = {
  posters: [],
  checkout: null,
  currentPoster: null,
  errorMessage: '',
  loading: false,
};

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
    builder.addCase(createCheckout.pending, (state) => {
      setLoading(state, true);
    });
    builder.addCase(createCheckout.fulfilled, (state, action) => {
      setLoading(state, false);
      state.checkout = action.payload;
    });
    builder.addCase(createCheckout.rejected, (state, action) => {
      setLoading(state, false);
      state.errorMessage = action.error.message || '';
    });
    builder.addCase(updateCheckout.pending, (state) => {
      setLoading(state, true);
    });
    builder.addCase(updateCheckout.fulfilled, (state, action) => {
      setLoading(state, false);
      state.checkout = action.payload;
    });
    builder.addCase(updateCheckout.rejected, (state, action) => {
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

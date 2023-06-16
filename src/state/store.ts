import { configureStore } from '@reduxjs/toolkit';
import shopifyReducer from './slices/shopify';

const store = configureStore({
  reducer: {
    shopify: shopifyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

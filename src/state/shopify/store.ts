import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CheckoutLineItem } from 'shopify-buy';

import { saveCheckoutToLocalStorage } from './utils';
import { State } from '@src/types/.';

import {
  addToCart,
  createCheckout,
  fetchPosters,
  removeFromCart,
  updateCart,
  updateCheckout,
} from './api';

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      posters: [],
      checkout: null,
      currentPoster: null,
      errorMessage: '',
      loading: false,
      setCurrentPoster: (poster) => set({ currentPoster: poster }),
      cleanCurrentPoster: () => set({ currentPoster: null }),
      cleanPosters: () => set({ posters: [] }),
      cleanErrorMessage: () => set({ errorMessage: '' }),
      fetchPosters: async () => {
        set({ loading: true });
        try {
          const posters = await fetchPosters();
          set({ posters, loading: false, errorMessage: '' });
        } catch (error: any) {
          set({ loading: false, errorMessage: error.message });
        }
      },
      createCheckout: async () => {
        set({ loading: true });
        try {
          const checkout = await createCheckout();
          saveCheckoutToLocalStorage(checkout);
          set({ checkout, loading: false });
        } catch (error: any) {
          set({ loading: false, errorMessage: error.message });
        }
      },
      updateCheckout: async (checkoutId: string, input: any) => {
        set({ loading: true });
        try {
          const checkout = await updateCheckout(checkoutId, input);
          saveCheckoutToLocalStorage(checkout);
          set({ checkout, loading: false });
        } catch (error: any) {
          set({ loading: false, errorMessage: error.message });
        }
      },
      addToCart: async (variantId: string, quantity: number = 1) => {
        set({ loading: true });
        try {
          const currentState = get();
          let checkout = currentState.checkout;

          if (!checkout) {
            checkout = await createCheckout();
            set({ checkout });
          }

          const lineItems = [{ variantId, quantity }];
          checkout = await addToCart(checkout.id, lineItems);
          saveCheckoutToLocalStorage(checkout);
          set({ checkout, loading: false });
        } catch (error: any) {
          set({ loading: false, errorMessage: error.message });
        }
      },
      removeFromCart: async (lineItemId: string) => {
        set({ loading: true });
        try {
          const currentState = get();
          let checkout = currentState.checkout;

          if (!checkout) {
            set({ loading: false, errorMessage: 'No checkout available' });
            return;
          }

          checkout = await removeFromCart(checkout.id, [lineItemId]);
          saveCheckoutToLocalStorage(checkout);
          set({ checkout, loading: false });
        } catch (error: any) {
          set({ loading: false, errorMessage: error.message });
        }
      },
      updateCart: async (variantId: string, quantity: number) => {
        set({ loading: true });
        try {
          const currentState = get();
          let checkout = currentState.checkout;

          if (!checkout) {
            set({ loading: false, errorMessage: 'No checkout available' });
            return;
          }

          const lineItemsToUpdate = checkout.lineItems
            .map((item: CheckoutLineItem) => {
              if (item.variant && item.variant.id === variantId) {
                return { id: item.id, variantId: item.variant.id, quantity };
              }
              return {
                id: item.id,
                variantId: item.variant?.id || '',
                quantity: item.quantity,
              };
            })
            .filter((item) => item.variantId !== '');

          checkout = await updateCart(checkout.id, lineItemsToUpdate);
          saveCheckoutToLocalStorage(checkout);
          set({ checkout, loading: false });
        } catch (error: any) {
          set({ loading: false, errorMessage: error.message });
        }
      },
    }),
    {
      name: 'shopify-store',
      partialize: (state) => ({ checkout: state.checkout }),
    }
  )
);

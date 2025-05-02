import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import {
  createCart,
  addToCart,
  removeFromCart,
  updateCartLine,
} from './cart-api';
import { fetchPosters } from './api';
import { saveCartToLocalStorage } from './utils';
import { State } from '@src/types/.';

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      posters: [],
      cart: null,
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
          const cart = await createCart();
          saveCartToLocalStorage(cart);
          set({ cart, loading: false });
        } catch (error: any) {
          set({ loading: false, errorMessage: error.message });
        }
      },

      updateCheckout: async () => {
        console.warn('updateCheckout is not used with Storefront API Cart.');
      },

      addToCart: async (variantId: string, quantity: number = 1) => {
        set({ loading: true });
        try {
          let { cart } = get();

          if (!cart) {
            cart = await createCart();
            set({ cart });
          }

          const updatedCart = await addToCart(cart.id, variantId, quantity);
          console.log("🚀 ~ addToCart: ~ updatedCart:", updatedCart)
          saveCartToLocalStorage(updatedCart);
          set({ cart: updatedCart, loading: false });
        } catch (error: any) {
          console.log('Error adding to cart:', error);
          set({ loading: false, errorMessage: error.message });
        }
      },

      removeFromCart: async (lineItemId: string) => {
        set({ loading: true });
        try {
          const { cart } = get();

          if (!cart) {
            set({ loading: false, errorMessage: 'No cart available' });
            return;
          }

          const updatedCart = await removeFromCart(cart.id, [lineItemId]);
          saveCartToLocalStorage(updatedCart);
          set({ cart: updatedCart, loading: false });
        } catch (error: any) {
          set({ loading: false, errorMessage: error.message });
        }
      },

      updateCart: async (variantId: string, quantity: number) => {
        set({ loading: true });
        try {
          const { cart } = get();

          if (!cart) {
            set({ loading: false, errorMessage: 'No cart available' });
            return;
          }

          const line = cart.lines.edges.find(
            (edge: any) => edge.node.merchandise.id === variantId
          );

          if (!line) {
            set({ loading: false, errorMessage: 'Item not found in cart' });
            return;
          }

          const updatedCart = await updateCartLine(
            cart.id,
            line.node.id,
            quantity
          );
          saveCartToLocalStorage(updatedCart);
          set({ cart: updatedCart, loading: false });
        } catch (error: any) {
          set({ loading: false, errorMessage: error.message });
        }
      },
    }),
    {
      name: 'shopify-store',
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);

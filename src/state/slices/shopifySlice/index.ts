import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  Checkout,
  CheckoutLineItem,
  CheckoutLineItemInput,
  Product,
} from 'shopify-buy';
import { getClient, saveCheckoutToLocalStorage } from './shopifySlice.utils';

const initialCheckout = JSON.parse(localStorage.getItem('checkout') || 'null');

export const fetchPosters = async (): Promise<Product[]> => {
  const client = getClient();
  const products = await client.product.fetchAll();
  return products;
};

export const createCheckout = async (): Promise<Checkout> => {
  const client = getClient();
  const checkout = await client.checkout.create();
  return checkout;
};

export const updateCheckout = async (
  checkoutId: string,
  input: any
): Promise<Checkout> => {
  const client = getClient();
  const checkout = await client.checkout.updateAttributes(checkoutId, input);
  return checkout;
};

export const addToCart = async (
  checkoutId: string,
  lineItems: CheckoutLineItemInput[]
): Promise<Checkout> => {
  const client = getClient();
  const checkout = await client.checkout.addLineItems(checkoutId, lineItems);
  return checkout;
};

export const removeFromCart = async (
  checkoutId: string,
  lineItemIdsToRemove: string[]
): Promise<Checkout> => {
  const client = getClient();
  const checkout = await client.checkout.removeLineItems(
    checkoutId,
    lineItemIdsToRemove
  );
  return checkout;
};

export const updateCart = async (
  checkoutId: string,
  lineItemsToUpdate: CheckoutLineItemInput[]
): Promise<Checkout> => {
  const client = getClient();
  const checkout = await client.checkout.updateLineItems(
    checkoutId,
    lineItemsToUpdate
  );
  return checkout;
};

type State = {
  posters: Product[];
  checkout: Checkout | null; // Use the appropriate type if available
  currentPoster: Product | null;
  errorMessage: string;
  loading: boolean;
  setCurrentPoster: (poster: Product) => void;
  cleanCurrentPoster: () => void;
  cleanPosters: () => void;
  cleanErrorMessage: () => void;
  fetchPosters: () => Promise<void>;
  createCheckout: () => Promise<void>;
  updateCheckout: (checkoutId: string, input: any) => Promise<void>;
  addToCart: (variantId: string, quantity: number) => Promise<void>;
  removeFromCart: (lineItemId: string) => Promise<void>;
  updateCart: (variantId: string, quantity: number) => Promise<void>;
};

const useStore = create<State>()(
  devtools((set, get) => ({
    posters: [],
    checkout: initialCheckout,
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
  }))
);

export default useStore;

import { getClient } from './utils';
import { Product, Checkout, CheckoutLineItemInput } from 'shopify-buy';

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

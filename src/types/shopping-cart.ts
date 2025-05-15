import { Product, ProductVariant } from 'shopify-buy';

export interface CartLineItem extends Product {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    price: { amount: string };
  };
}

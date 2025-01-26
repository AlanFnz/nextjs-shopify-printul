import { Product, ProductVariant } from 'shopify-buy';

export interface CartLineItem extends Product {
  name: string;
  category: string | null;
  subcategory: string | null;
  quantity?: number;
  storeName: string | null;
  price: number;
  variant: ProductVariant;
}

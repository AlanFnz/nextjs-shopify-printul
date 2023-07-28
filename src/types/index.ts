import { Icons } from '@/components/icons';
import { Product, ProductVariant } from 'shopify-buy';

export type Poster = {
  id: number;
  printfulId: number;
  order: number;
  title: string;
  description?: string;
  src: string;
  printUrl?: string;
  instagramUrl?: string;
  visible: boolean;
  printable: boolean;
  downloadable: boolean;
  dateCreated: number;
  lastUpdate: number;
};

export type NavItem = {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
};

export type NavItemWithChildren = NavItem & {
  items: NavItemWithChildren[];
};

export type NavItemWithOptionalChildren = NavItem & {
  items?: NavItemWithChildren[];
};

export type MainNavItem = NavItemWithOptionalChildren;

export type Link = {
  id: string;
  title: string;
  url: string;
  visible: boolean;
  dateCreated: string;
  lastUpdate: string | null;
  type: string;
  svg: {
    xmlns: string;
    viewBox: string;
    fill: string;
    d: string;
  };
};

export interface CartLineItem extends Product {
  name: string;
  category: string | null;
  subcategory: string | null;
  quantity?: number;
  storeName: string | null;
  price: number;
  variant: ProductVariant;
}

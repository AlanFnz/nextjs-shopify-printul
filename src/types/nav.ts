import { Icons } from '@components/icons';

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

import type { MainNavItem } from '@/types';

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'nextjs-shopify-printful',
  description: 'Posters on demand',
  url: 'https://#',
  ogImage: 'https://#',
  mainNav: [
    {
      title: 'Home',
    },
  ] satisfies MainNavItem[],
  links: {
    instagram: 'https://instagram.com/',
    twitter: 'https://twitter.com/',
  },
};

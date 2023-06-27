import type { MainNavItem } from '@/types';

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'MP',
  description: 'Posters printed on demand via Printful and Shopify',
  url: 'https://#',
  ogImage: 'https://#',
  mainNav: [
    {
      title: 'Home',
      items: [
        {
          title: 'Posters',
          href: '/posters',
          description: 'Posters.',
          items: [],
        },
        {
          title: 'Music',
          href: '/music',
          description: 'Releases.',
          items: [],
        },
        {
          title: 'Contact',
          href: '/contact',
          description: 'Get in touch.',
          items: [],
        },
      ],
    },
  ] satisfies MainNavItem[],
  links: {
    instagram: 'https://instagram.com/',
    twitter: 'https://twitter.com/',
  },
};


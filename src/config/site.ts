import type { MainNavItem } from '@/types';

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'Metallic Monks',
  description: 'Posters, music and literature',
  url: 'https://#',
  ogImage: 'https://#',
  mainNav: [
    {
      title: 'Home',
    },
    {
      title: 'Posters',
      href: '/posters',
      description: 'Posters',
    },
    {
      title: 'Music',
      href: '/music',
      description: 'Releases',
    },
    {
      title: 'Contact',
      href: '/contact',
      description: 'Get in touch',
    },
  ] satisfies MainNavItem[],
  links: {
    instagram: 'https://instagram.com/',
    twitter: 'https://twitter.com/',
  },
};


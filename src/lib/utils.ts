import { clsx, type ClassValue } from 'clsx';
import { Product } from 'shopify-buy';
import { twMerge } from 'tailwind-merge';

type setOpenState = (state: { isOpen: boolean }) => void;

export function outsideDismiss(
  e: React.FocusEvent<HTMLElement>,
  setOpenState: setOpenState,
  delay: number = 0
): void {
  const parent = e.currentTarget.parentNode;
  const isDescendant = parent
    ? parent.contains(e.relatedTarget as Node)
    : false;

  if (!isDescendant) {
    setTimeout(() => {
      setOpenState({ isOpen: false });
    }, delay);
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  price: number | string,
  currency: 'USD' | 'EUR' | 'GBP' | 'BDT' = 'USD',
  notation: 'compact' | 'engineering' | 'scientific' | 'standard' = 'standard'
) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    notation,
  }).format(Number(price));
}

export function serializePosters(posters: Product[]) {
  return posters.map((poster) => ({
    id: poster.id,
    title: poster.title,
    images: poster.images.map((image) => ({
      src: image.src,
      alt: image.altText || '',
      url: image.url,
      originalSrc: image.originalSrc,
      transformedSrc: image.transformedSrc,
    })),
    availableForSale: poster.availableForSale,
    compareAtPriceRange: poster.compareAtPriceRange,
    createdAt: poster.createdAt,
    description: poster.description,
    descriptionHtml: poster.descriptionHtml,
    featuredImage: poster.featuredImage,
    isGiftCard: poster.isGiftCard,
    requiresSellingPlan: poster.requiresSellingPlan,
    sellingPlanGroups: poster.sellingPlanGroups,
    seo: poster.seo,
    totalInventory: poster.totalInventory,
    handle: poster.handle,
    onlineStoreUrl: poster.onlineStoreUrl,
    options: poster.options,
    priceRange: poster.priceRange,
    productType: poster.productType,
    publishedAt: poster.publishedAt,
    tags: poster.tags,
    updatedAt: poster.updatedAt,
    vendor: poster.vendor,
    collections: poster.collections,
    media: poster.media,
    variants: poster.variants,
    metafields: poster.metafields,
  }));
}

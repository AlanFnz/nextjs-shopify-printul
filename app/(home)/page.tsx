import { PosterGrid } from '@features/posters/poster-grid';
import { PosterOnGrid } from '@src/types/poster';
import { fetchPosters } from '@state/shopify/api';
import { Product } from 'shopify-buy';

export default async function IndexPage() {
  const posters = await fetchPosters();

  const serializedPosters = posters.map((poster) => ({
    id: poster.id,
    title: poster.title,
    images: poster.images.map((image) => ({
      src: image.src,
      alt: image.altText || '',
    })),
  })) as unknown as Product[]; // TODO: improve typing

  return (
    <main style={{ height: '100vh' }}>
      <div style={{ width: '100%', padding: '30px 5vw' }}>
        <PosterGrid posters={serializedPosters} />
      </div>
    </main>
  );
}

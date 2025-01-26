import { PosterGrid } from '@features/posters/poster-grid';

export default async function IndexPage() {
  return (
    <main style={{ height: '100vh', width: '100%', padding: '30px 5vw' }}>
      <PosterGrid />
    </main>
  );
}

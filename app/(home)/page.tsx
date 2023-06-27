import PosterGrid from '@/features/posters/PosterGrid';

export default function IndexPage() {
  return (
    <main style={{ height: '100vh' }}>
      <div style={{ width: '100%', padding: '30px 5vw' }}>
        <PosterGrid />
      </div>
    </main>
  );
}


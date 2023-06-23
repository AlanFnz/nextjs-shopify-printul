import styles from './page.module.css';
import PosterGrid from '@/features/posters/PosterGrid';

export default function Home() {
  return (
    <main className={styles.app}>
      <div style={{ width: '100%', padding: '30px 5vw' }}>
        <PosterGrid />
      </div>
    </main>
  );
}


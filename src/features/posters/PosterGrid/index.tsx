'use client';

import { useCallback, useEffect } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { Product } from 'shopify-buy';

import useStore from '@/state/slices/shopifySlice';

import Poster from '@/features/posters/Poster';
import { columnsCountBreakPoints, masonryGutter } from './PosterGrid.styles';
import { DialogTrigger } from '@/components/ui/Dialog';

const PosterGrid = () => {
  const posters = useStore((state) => state.posters);
  const fetchPosters = useStore((state) => state.fetchPosters);
  const setCurrentPoster = useStore((state) => state.setCurrentPoster);

  // TODO: get posters server side
  useEffect(() => {
    fetchPosters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setPoster = useCallback(
    (poster: Product) => {
      setCurrentPoster(poster);
    },
    [setCurrentPoster]
  );
  return (
    <ResponsiveMasonry columnsCountBreakPoints={columnsCountBreakPoints}>
      <Masonry gutter={masonryGutter}>
        {posters.map((poster) => (
          <DialogTrigger key={poster.id}>
            <Poster
              title={poster.title}
              src={poster.images[0].src}
              setPoster={() => setPoster(poster)}
            />
          </DialogTrigger>
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default PosterGrid;

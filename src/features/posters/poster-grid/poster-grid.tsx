'use client';

import { useCallback, useEffect } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { Product } from 'shopify-buy';

import { Poster } from '@features/posters/poster';
import { columnsCountBreakPoints, masonryGutter } from './poster-grid.styled';
import { DialogTrigger } from '@components/ui/dialog';
import { useStore } from '@state/shopify/store';

export const PosterGrid = () => {
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

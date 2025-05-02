'use client';

import { useCallback, useEffect } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { Product } from '@state/shopify/api';

import { Poster } from '@features/posters/poster';
import { columnsCountBreakPoints, masonryGutter } from './poster-grid.styled';
import { DialogTrigger } from '@components/ui/dialog';
import { useStore } from '@state/shopify/store';

export const PosterGrid = () => {
  const posters = useStore((state) => state.posters);
  const fetchPosters = useStore((state) => state.fetchPosters);
  const setCurrentPoster = useStore((state) => state.setCurrentPoster);

  const setPoster = useCallback(
    (poster: Product) => {
      setCurrentPoster(poster);
    },
    [setCurrentPoster]
  );

  useEffect(() => {
    fetchPosters();
  }, [fetchPosters]);

  return (
    <ResponsiveMasonry columnsCountBreakPoints={columnsCountBreakPoints}>
      <Masonry gutter={masonryGutter}>
        {posters?.map((poster: Product) => {
          return (
            <DialogTrigger key={poster.id}>
              <Poster
                title={poster.title}
                src={poster.featuredImage?.url}
                setPoster={() => setPoster(poster)}
              />
            </DialogTrigger>
          );
        })}
      </Masonry>
    </ResponsiveMasonry>
  );
};

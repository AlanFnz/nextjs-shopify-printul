'use client';

import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { Product } from 'shopify-buy';

import { AppDispatch, RootState } from '@/state/store';
import { setCurrentPoster } from '@/state/slices/shopifySlice';
import { fetchPosters } from '@/state/slices/shopifySlice/shopifySlice.thunks';

import Poster from '@/features/posters/Poster';
import { columnsCountBreakPoints, masonryGutter } from './PosterGrid.styles';

const PosterGrid = () => {
  const dispatch = useDispatch<AppDispatch>();
  const posters = useSelector((state: RootState) => state.shopify.posters);

  useEffect(() => {
    dispatch(fetchPosters());
    // dispatch dependency is not needed here
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setPoster = useCallback(
    (poster: Product) => {
      dispatch(setCurrentPoster(poster));
    },
    [dispatch]
  );
  return (
    <ResponsiveMasonry columnsCountBreakPoints={columnsCountBreakPoints}>
      <Masonry gutter={masonryGutter}>
        {posters.map((poster) => (
          <Poster
            key={poster.id}
            title={poster.title}
            src={poster.images[0].src}
            setPoster={() => setPoster(poster)}
          />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default PosterGrid;

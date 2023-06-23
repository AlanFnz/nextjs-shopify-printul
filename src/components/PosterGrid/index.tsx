"use client"

import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import { AppDispatch, RootState } from '@/state/store';
import { fetchPosters, setCurrentPoster } from '@/state/slices/shopify';

import Poster from '@/components/Poster';
import { Product } from 'shopify-buy';

const columnsCountBreakPoints = { 350: 1, 750: 2, 900: 3 };

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
      <Masonry gutter={'6px'}>
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

import React, { useState } from 'react';

import { PosterContainer, PosterImage } from './poster.styled';
import { useImagePosition } from '@hooks/.';

interface Props {
  title: string;
  src: string;
  setPoster: () => void;
}

export const Poster = ({ title, src, setPoster }: Props) => {
  const [useFallback, setUseFallback] = useState(false);
  const { getPaddingTop, paddingTop } = useImagePosition();

  return (
    <PosterContainer onClick={setPoster} title={title}>
      {useFallback ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={title} style={{ width: '100%', height: 'auto' }} />
      ) : (
        <PosterImage
          alt={title}
          src={src}
          //fill // FIXME: it doesn't load without static dimensions
          width={500}
          height={500}
          unoptimized // FIXME: why it doesn't load without this flag?
          onLoad={getPaddingTop}
          onError={() => setUseFallback(true)}
        />
      )}{' '}
    </PosterContainer>
  );
};

import React, { useState } from 'react';

import { PosterContainer, PosterImage } from './poster.styled';

interface Props {
  title: string;
  src: string | undefined;
  setPoster: () => void;
}

export const Poster = ({ title, src, setPoster }: Props) => {
  const [useFallback, setUseFallback] = useState(false);

  return (
    <PosterContainer onClick={setPoster} title={title}>
      {useFallback ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={title} style={{ width: '100%', height: 'auto' }} />
      ) : (
        <PosterImage
          alt={title}
          src={src}
          width={400}
          height={400}
          onError={() => setUseFallback(true)}
        />
      )}{' '}
    </PosterContainer>
  );
};

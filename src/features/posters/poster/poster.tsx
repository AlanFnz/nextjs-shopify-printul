import React from 'react';

import { PosterContainer, PosterImage } from './poster.styled';
import { useImagePosition } from '@hooks/.';

interface Props {
  title: string;
  src: string;
  setPoster: () => void;
}

export const Poster = ({ title, src, setPoster }: Props) => {
  const { getPaddingTop, paddingTop } = useImagePosition();

  return (
    <PosterContainer onClick={setPoster} title={title}>
      <PosterImage alt={title} src={src} fill onLoad={getPaddingTop} />
    </PosterContainer>
  );
};

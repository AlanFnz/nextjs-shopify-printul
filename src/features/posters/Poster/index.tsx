import React from 'react';
import useMasonryImage from '../../../hooks/useImagePosition';
import { PosterContainer, PosterImage } from './Poster.styles';

interface Props {
  title: string;
  src: string;
  setPoster: () => void;
}

const Poster = ({ title, src, setPoster }: Props) => {
  const { getPaddingTop, paddingTop } = useMasonryImage();

  return (
    <PosterContainer onClick={setPoster} title={title}>
      <PosterImage alt={title} src={src} fill onLoad={getPaddingTop} />
    </PosterContainer>
  );
};

export default Poster;

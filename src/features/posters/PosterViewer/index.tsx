'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/state/store';
import { cleanCurrentPoster } from '@/state/slices/shopifySlice';
import useModal from '@/hooks/useModal';

import { PosterContainer, PosterImage } from './PosterViewer.styles';
import Modal from '@/components/common/Modal';
import Dropdown from '@/components/common/Dropdown';
import AddToCartButton from '@/components/common/AddToCartButton';
import PosterInfoButton from '@/features/posters/PosterInfoButton';

interface Image {
  src: string;
}

interface Poster {
  title: string;
  images: Image[];
  id?: string;
  variants?: any[];
}

const PosterViewer = () => {
  const { isOpen, setIsOpen } = useModal();
  const dispatch = useDispatch<AppDispatch>();
  const currentPoster = useSelector<RootState, Poster | null>(
    (state) => state.shopify.currentPoster
  );
  const { title, images } = currentPoster || {
    title: '',
    images: [{ src: '' }],
  };

  useEffect(() => {
    setIsOpen(Boolean(currentPoster?.id));
  }, [currentPoster, setIsOpen]);

  const closeAction = () => {
    dispatch(cleanCurrentPoster());
  };

  return (
    <Modal isOpen={isOpen} closeAction={closeAction}>
      <PosterContainer>
        <PosterImage
          alt={title}
          src={images[0].src}
          width={100}
          height={100}
          unoptimized={true}
        />
      </PosterContainer>
      {currentPoster?.variants && <Dropdown options={currentPoster.variants} />}
      <PosterInfoButton />
      <AddToCartButton />
    </Modal>
  );
};

export default PosterViewer;

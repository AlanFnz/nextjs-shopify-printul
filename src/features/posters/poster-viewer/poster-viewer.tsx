'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

import { AddToCartButton } from '@components/ui/add-to-cart-button';
import { Dropdown, DropdownOption } from '@components/ui/dropdown';
import {
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '@components/ui/dialog';
import { PosterInfoButton } from '@features/posters/poster-info-button';
import { useStore } from '@state/shopify/store';

const IMAGE_SIZE = 600;

interface Image {
  src: string;
}

export const PosterViewer = () => {
  const { addToCart } = useStore();
  const currentPoster = useStore((state) => state.currentPoster);
  const cleanCurrentPoster = useStore((state) => state.cleanCurrentPoster);

  const [showDescription, setShowDescription] = useState(false);
  const [variantError, setVariantError] = useState(false);
  const [errorAnimationKey, setErrorAnimationKey] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<DropdownOption | null>(
    null
  );

  const title = currentPoster?.title || '';
  const images = currentPoster?.images;
  const variants = currentPoster?.variants || [];

  const handleAddToCart = async () => {
    if (selectedVariant) {
      await addToCart(selectedVariant.id, 1);
      toast.success('Added successfully');
    } else {
      !variantError && setVariantError(true);
      setErrorAnimationKey((prevKey) => prevKey + 1);
      toast.error('Please select a variant');
    }
  };

  const handleSelectVariant = (option: DropdownOption) => {
    setVariantError(false);
    setSelectedVariant(option);
  };

  const handleClose = () => {
    cleanCurrentPoster();
    setVariantError(false);
    setErrorAnimationKey(0);
    setSelectedVariant(null);
  };

  return (
    <DialogContent onClose={handleClose}>
      <div
        className={`relative h-full w-full ${
          showDescription ? 'show-description' : ''
        }`}
      >
        <VisuallyHidden>
          <DialogTitle>Poster viewer</DialogTitle>
        </VisuallyHidden>
        {images?.[0] && (
          <Image
            className={`object-contain w-full h-full relative ${
              showDescription ? 'blur' : ''
            }`}
            alt={title}
            src={images[0].src}
            width={IMAGE_SIZE}
            height={IMAGE_SIZE}
          />
        )}
        <div className='description-overlay'>
          <p className='description-text'>{currentPoster?.description}</p>
        </div>
      </div>
      <DialogFooter>
        {currentPoster?.variants && (
          <Dropdown
            key={errorAnimationKey}
            classNames={`${variantError ? 'animate-shake-once' : ''}`}
            options={currentPoster.variants}
            selectedOption={selectedVariant}
            onSelectOption={handleSelectVariant}
          />
        )}
        <AddToCartButton onClick={handleAddToCart} />
        <PosterInfoButton
          onClick={() => setShowDescription(!showDescription)}
        />
      </DialogFooter>
    </DialogContent>
  );
};
